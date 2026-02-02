import { tools } from '../data/tools';
import SearchBar from './SearchBar';
import ToolCard from './ToolCard';
import Fuse from 'fuse.js';
import { useState, useMemo } from 'react';

const fuseOptions = {
  keys: ['title', 'description', 'tags'],
  threshold: 0.3,
  includeScore: true,
};

export default function ToolDirectory() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    if (!searchQuery) {
      return tools;
    }

    const fuse = new Fuse(tools, fuseOptions);
    return fuse.search(searchQuery).map((result) => result.item);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Useful Tools</h1>
        <p className="subtitle">A collection of handy tools for developers</p>
      </header>

      <SearchBar onSearch={handleSearch} count={filteredTools.length} />

      <div className="tools-grid">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="no-results">
          <p>No tools found matching "{searchQuery}"</p>
          <p>Try adjusting your search terms</p>
        </div>
      )}

      <footer className="footer">
        <p>Built with Astro and hosted on Cloudflare Pages</p>
      </footer>
    </div>
  );
}
