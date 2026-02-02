interface ToolHeaderProps {
  toolTitle: string;
  toolDescription: string;
}

export default function ToolHeader({ toolTitle, toolDescription }: ToolHeaderProps) {
  return (
    <>
      {/* Main Header - Same as landing page */}
      <header className="header">
        <div className="header-content">
          <a href="/" className="back-link">
            <svg 
              className="back-icon" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back to Directory
          </a>
          <h1 className="title">Useful Tools</h1>
          <p className="subtitle">A collection of handy tools for developers</p>
        </div>
      </header>

      {/* Tool Title */}
      <div className="tool-header-bar">
        <div className="container">
          <h2 className="tool-title">{toolTitle}</h2>
          <p className="tool-description">{toolDescription}</p>
        </div>
      </div>
    </>
  );
}
