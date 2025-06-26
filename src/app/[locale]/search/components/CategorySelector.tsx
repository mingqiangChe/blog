import React from 'react';

interface CategorySelectorProps {
  groups: { group: string }[];
  selectedGroup: string;
  onSelectGroup: (group: string) => void;
}

export default function CategorySelector({
  groups,
  selectedGroup,
  onSelectGroup,
}: CategorySelectorProps) {
  return (
    <aside
      className="neon-rotate-glow"
      style={{ minWidth: 200, marginBottom: 20 }}
    >
      <h1
        style={{
          color: '#00fff7',
          textShadow: '0 0 12px #00fff7, 0 2px 24px #2b6fff',
          marginBottom: 12,
          fontWeight: 'bold',
          fontSize: '1.2rem',
        }}
      >
        选择分组
      </h1>
      <select
        value={selectedGroup}
        onChange={(e) => onSelectGroup(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 16px',
          borderRadius: 12,
          border: 'none',
          background: 'rgba(30,40,60,0.7)',
          color: '#fff',
          outline: 'none',
          fontSize: 16,
          backdropFilter: 'blur(8px)',
          cursor: 'pointer',
        }}
      >
        <option value="">全部</option>
        {groups.map((g) => (
          <option key={g.group} value={g.group}>
            {g.group}
          </option>
        ))}
      </select>
    </aside>
  );
}
