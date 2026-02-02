import { useState, useRef } from 'react';

const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp'];

export default function ImageConverter() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState('image/png');
  const [result, setResult] = useState<{ success: boolean; message: string; imageUrl?: string; originalSize?: number; convertedSize?: number } | null>(null);
  const [converting, setConverting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setResult(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setResult(null);
    }
  };

  const convertImage = async () => {
    if (!imageFile) return;
    setConverting(true);
    setResult(null);

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = async () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              throw new Error('Could not get canvas context');
            }
            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL(targetFormat, 0.9);
            const originalSize = imageFile.size;
            const base64Data = dataUrl.split(',')[1];
            const binaryString = atob(base64Data);
            const convertedSize = binaryString.length;
            setResult({
              success: true,
              message: 'Successfully converted to ' + targetFormat.toUpperCase(),
              imageUrl: dataUrl,
              originalSize,
              convertedSize,
            });
          } catch (error) {
            setResult({
              success: false,
              message: 'Conversion failed: ' + String(error),
            });
          } finally {
            setConverting(false);
          }
        };
        img.onerror = () => {
          setResult({
            success: false,
            message: 'Failed to load image',
          });
          setConverting(false);
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = () => {
        setResult({
          success: false,
          message: 'Failed to read file',
        });
        setConverting(false);
      };
      reader.readAsDataURL(imageFile);
    } catch (error) {
      setResult({
        success: false,
        message: 'Error: ' + String(error),
      });
      setConverting(false);
    }
  };

  const downloadConverted = () => {
    if (!result?.imageUrl) return;
    const link = document.createElement('a');
    link.href = result.imageUrl;
    const extension = targetFormat === 'image/jpeg' ? '.jpg' : targetFormat === 'image/png' ? '.png' : targetFormat === 'image/webp' ? '.webp' : targetFormat === 'image/gif' ? '.gif' : '.bmp';
    link.download = 'converted-image' + extension;
    link.click();
    link.remove();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) {
      return bytes + ' B';
    }
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + ' KB';
    }
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="image-converter">
      <div className={`drop-zone ${dragActive ? 'drag-active' : ''} ${imageFile ? 'has-file' : ''}`}>
        <div className="drop-content">
          <div className="drop-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l1.293-1.293a1 1.414 0 0 1.414l-1.293a1 1.414 0 0H6a1 1.414 0 0 1.414 1.293a1 1.414 0 6.003 6.003c0 3.414 3.414 3.414 0 6.003z" />
            </svg>
          </div>
          <div className="drop-text">
            <div className="drop-title">
              {imageFile ? imageFile.name : 'Drop image here'}
            </div>
          </div>
        </div>
        <div className="drop-zone" onClick={() => fileInputRef.current?.click()}>
          Click or drag image here
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="file-input"
        id="imageInput"
      />

      {imageFile && (
        <div className="converter-controls">
          <div className="file-info">
            <div className="info-item">
              <span className="info-label">Selected File:</span>
              <span className="info-value">{imageFile.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Format:</span>
              <span className="info-value">{imageFile.type.split('/')[1].toUpperCase()}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Size:</span>
              <span className="info-value">{formatFileSize(imageFile.size)}</span>
            </div>
          </div>

          <div className="format-selector">
            <label className="format-label">Convert to:</label>
            <div className="format-grid">
              {SUPPORTED_FORMATS.map((format) => (
                <label key={format} className={`format-option ${targetFormat === format ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="targetFormat"
                    value={format}
                    checked={targetFormat === format}
                    onChange={(e) => setTargetFormat(e.target.value)}
                  />
                  <span className="format-label-text">{format.split('/')[1].toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>

          <button onClick={convertImage} disabled={converting} className="btn btn-primary">
            {converting ? 'Converting...' : `Convert to ${targetFormat.split('/')[1].toUpperCase()}`}
          </button>
        </div>
      )}

      {result && (
        <div className={`conversion-result ${result.success ? 'success' : 'error'}`}>
          {result.success ? (
            <>
              <div className="result-header">
                <div className="result-icon success-icon">✓</div>
                <div className="result-message">
                  <h3>Conversion Complete!</h3>
                  <p>{result.message}</p>
                </div>
              </div>

              <div className="result-preview">
                <img src={result.imageUrl} alt="Converted image" className="preview-image" />
              </div>

              <div className="result-info">
                <div className="info-item">
                  <span className="info-label">Original:</span>
                  <span className="info-value">{formatFileSize(result.originalSize || 0)}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Converted:</span>
                  <span className="info-value">{formatFileSize(result.convertedSize || 0)}</span>
                </div>
                {result.originalSize && result.convertedSize && (
                  <div className="info-item">
                    <span className="info-label">Size Change:</span>
                    <span className={`info-value ${result.convertedSize < result.originalSize ? 'smaller' : 'larger'}`}>
                      {result.convertedSize < result.originalSize ? '↓' : '↑'}
                      {Math.abs(result.convertedSize - result.originalSize)} KB
                    </span>
                  </div>
                )}
              </div>

              <button onClick={downloadConverted} className="btn btn-success">
                Download {targetFormat.split('/')[1].toUpperCase()}
              </button>

              <button onClick={() => setImageFile(null)} className="btn btn-secondary">
                Convert Another
              </button>
            </>
          ) : (
            <div className="result-header">
              <div className="result-icon error-icon">✕</div>
              <div className="result-message">
                <h3>Conversion Failed</h3>
                <p>{result.message}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {!imageFile && !result && (
        <div className="tips">
          <h3>Tips:</h3>
          <ul>
            <li>WEBP provides better compression than PNG or JPG</li>
            <li>PNG supports transparency, better for logos and icons</li>
            <li>JPG is best for photographs and images with many colors</li>
            <li>Conversion happens in your browser - no data is uploaded</li>
          </ul>
        </div>
      )}
    </div>
  );
}
