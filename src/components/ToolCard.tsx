interface Tool {
  id: string;
  title: string;
  description: string;
  screenshot: string;
  url: string;
  tags?: string[];
}

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="tool-card">
      <a href={tool.url} className="tool-link">
        <div className="tool-screenshot">
          <img
            src={tool.screenshot}
            alt={`Screenshot of ${tool.title}`}
            loading="lazy"
          />
        </div>
        <div className="tool-info">
          <h2 className="tool-title">{tool.title}</h2>
          <p className="tool-description">{tool.description}</p>
          {tool.tags && tool.tags.length > 0 && (
            <div className="tool-tags">
              {tool.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </a>
    </div>
  );
}
