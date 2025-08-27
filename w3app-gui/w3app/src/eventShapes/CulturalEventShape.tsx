import React from 'react';
import type { ShapeProps } from './ShapeProps';

const CulturalEventShape: React.FC<ShapeProps> = ({ key, cx, cy, title, onClick }) => (
  <ellipse
    key={key}
    cx={cx}
    cy={cy}
    rx={7}
    ry={10}
    fill="#9c27b0"
    stroke="#4a148c"
    style={{ cursor: 'pointer' }}
    onClick={onClick}
  >
    <title>{title}</title>
  </ellipse>
);

export default CulturalEventShape;
