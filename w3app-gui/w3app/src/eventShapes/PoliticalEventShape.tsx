import React from 'react';
import type { ShapeProps } from './ShapeProps';

const PoliticalEventShape: React.FC<ShapeProps> = ({ key, cx, cy, title, onClick }) => (
  <polygon
    key={key}
    points={`${cx-8},${cy+8} ${cx},${cy-8} ${cx+8},${cy+8}`}
    fill="#4caf50"
    stroke="#1b5e20"
    style={{ cursor: 'pointer' }}
    onClick={onClick}
  >
    <title>{title}</title>
  </polygon>
);

export default PoliticalEventShape;
