import { useState, useRef, useEffect } from 'react';

export default function TextFileViewer() {
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [tailLines, setTailLines] = useState(20);
  const [watching, setWatching] = useState(false);
  const [isFolder, setIsFolder] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileOpen = (file: File) => {
    if ((file as any).webkitRelativePath) {
      setIsFolder(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setContent(`Folder: ${file.name}\n\n(Use a file browser to open files)`);
        setFileName(file.name);
      };
      reader.readAsText(file);
      return;
    }

    setIsFolder(false);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setContent(text);
      setFileName(file.name);
      
      // Start tailing if it's a .log or .txt file
      if (file.name.endsWith('.log') || file.name.endsWith('.txt')) {
        startTailing();
      }
    };
    reader.readAsText(file);
  };

  const handleFolderOpen = (files: File[]) => {
    // Find first text/log file
    const textFile = files.find(f => 
      f.name.endsWith('.txt') || f.name.endsWith('.log')
    );

    if (textFile) {
      handleFileOpen(textFile!);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileOpen(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileOpen(files[0]);
    }
  };

  const handleTailLinesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setTailLines(value);
    }
  };

  const startTailing = () => {
    setWatching(true);
  };

  const stopTailing = () => {
    setWatching(false);
  };

  // Tail the content - show last N lines
  const tailedContent = () => {
    const lines = content.split('\n');
    return lines.slice(-tailLines).join('\n');
  };

  // When watching, show last lines, otherwise show all
  const displayContent = watching ? tailedContent() : content;

  return (
    <div className="text-viewer">
      <div className="viewer-header">
        <h1>Text File Viewer</h1>
        <p className="subtitle">
          Open and view text files with auto-tail functionality
        </p>
      </div>

      {/* Controls */}
      <div className="controls">
        <div className="control-group">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleInputChange}
            accept=".txt,.log,.md"
            className="file-input"
            id="fileInput"
            style={{ display: 'none' }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-primary"
          >
            Open File
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-primary"
          >
            Open Folder
          </button>

          {(fileName.endsWith('.log') || fileName.endsWith('.txt')) && (
            <>
              <input
                type="number"
                min="1"
                max="10000"
                value={tailLines}
                onChange={handleTailLinesChange}
                className="tail-input"
                placeholder="Lines to tail"
              />
              {watching ? (
                <button onClick={stopTailing} className="btn btn-danger">
                  Stop Watching
                </button>
              ) : (
                <button onClick={startTailing} className="btn btn-success">
                  Auto-Tail (Last {tailLines} lines)
                </button>
              )}
            </>
          )}
        </div>

        {fileName && (
          <div className="file-info">
            <span className="file-name">
              {isFolder ? '📁 ' : '📄 '} {fileName}
            </span>
            {watching && (
              <span className="watching-indicator">
                🔄 Auto-tailing enabled
              </span>
            )}
          </div>
        )}
      </div>

      {/* Drop Zone */}
      <div
        className={`drop-zone ${content ? 'has-content' : ''}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="drop-zone-content">
          <div className="drop-icon">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 15v4a2 2 0 012-2 2v2a2 2 0 01-2 2v12a2 2 0 01-4 2-2v2a2 2 0 01-4 4 2v-2a2 2 0 01-4 4 2v12a2 2 0 01-4 4 2v-2a2 2 0 01-4 2 2v12a2 2 0 01-4 2zm-3 4a2 2 0 00-2 2v2a2 2 0 00-2 2V4a2 2 0 00-2 2zm-3 4a2 2 0 00-2 2v2a2 2 0 00-2 2V4a2 2 0 00-2 2zm-3 4a2 2 0 00-2 2v2a2 2 0 00-2 2V4a2 2 0 00-2 2zm-3 4a2 2 0 00-2 2v2a2 2 0 00-2 2V4a2 2 0 00-2 2zm-3 4a2 2 0 00-2 2v2a2 2 0 00-2 2V4a2 2 0 00-2 2z"
              />
            </svg>
          </div>
          <div className="drop-text">
            <div className="drop-title">
              Drop files here
            </div>
            <div className="drop-subtitle">
              or click to browse
            </div>
          </div>
        </div>
      </div>

      {/* Content Display */}
      {displayContent && (
        <div className="content-display">
          <div className="content-header">
            <h2>Content</h2>
            <div className="content-stats">
              <span className="stat">
                Lines: {displayContent.split('\n').length.toLocaleString()}
              </span>
              <span className="stat">
                Characters: {displayContent.length.toLocaleString()}
              </span>
              <span className="stat">
                Size: {Math.ceil(displayContent.length / 1024)} KB
              </span>
            </div>
          </div>
          <pre className="content-area">
            {displayContent}
          </pre>
        </div>
      )}
    </div>
  );
}
