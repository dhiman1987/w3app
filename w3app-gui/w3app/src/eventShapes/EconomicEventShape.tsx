import React from 'react';
import type { ShapeProps } from './ShapeProps';

const EconomicEventShape: React.FC<ShapeProps> = ({ key, cx, cy, title, onClick }) => (
  <rect
    key={key}
    x={cx - 6}
    y={cy - 6}
    width={12}
    height={12}
    fill="#8bc34a"
    stroke="#33691e"
    style={{ cursor: 'pointer' }}
    onClick={onClick}
  >
    <title>{title}</title>
  </rect>
);

export default EconomicEventShape;
