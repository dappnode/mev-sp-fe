import React from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: string | number }>;
  label?: string;
  resolvedTheme?: string;
}

function ChartsTooltip({ active, payload, label, resolvedTheme }: CustomTooltipProps): JSX.Element | null {
  const tooltipStyle = {
    color: resolvedTheme === 'dark' ? 'white' : 'black',
    backgroundColor: resolvedTheme === 'dark' ? 'rgba(63, 7, 86, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    padding: '5px 10px',
    borderRadius: '5px',
  };

  if (active && payload && payload.length) {
    return (
      <div style={tooltipStyle}>
        <p>{label}</p>
        <ul>
          {payload.map(({ name, value }) => (
            <li key={name}>{`${name}: ${value}`}</li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}

export default ChartsTooltip;
