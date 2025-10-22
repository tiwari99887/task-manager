import React from 'react';

function FilterBar({ filter, setFilter }) {
  const filters = ['All', 'To Do', 'In Progress', 'Completed'];

  return (
    <div className="filter-bar">
      <h3>Filter Tasks:</h3>
      <div className="filter-buttons">
        {filters.map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
