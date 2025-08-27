import React from 'react';
import type { ShapeProps } from './ShapeProps';

const DiscoveryInventionShape: React.FC<ShapeProps> = ({ key, cx, cy, title, onClick }) => (
  <polygon
    key={key}
    points={`${cx-7},${cy} ${cx},${cy-7} ${cx+7},${cy} ${cx},${cy+7}`}
    fill="#ff9800"
    stroke="#e65100"
    style={{ cursor: 'pointer' }}
    onClick={onClick}
  >
    <title>{title}</title>
  </polygon>
);

export default DiscoveryInventionShape;
