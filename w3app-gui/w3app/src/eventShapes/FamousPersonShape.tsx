import React from 'react';
import type { ShapeProps } from './ShapeProps';

const FamousPersonShape: React.FC<ShapeProps> = ({ key, cx, cy, title, onClick }) => (
  <circle
    key={key}
    cx={cx}
    cy={cy}
    r={8}
    fill="#e91e63"
    stroke="#880e4f"
    style={{ cursor: 'pointer' }}
    onClick={onClick}
  >
    <title>{title}</title>
  </circle>
);

export default FamousPersonShape;
