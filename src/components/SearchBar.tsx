import { useState, useMemo } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  count: number;
}

export default function SearchBar({ onSearch, count }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <svg
          className="search-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search tools..."
          value={query}
          onChange={handleChange}
          className="search-input"
          aria-label="Search tools"
        />
      </div>
      <div className="search-results-count">
        {count === 0 ? 'No tools found' : `${count} tool${count !== 1 ? 's' : ''} found`}
      </div>
    </div>
  );
}
