import React from 'react';
import type { ShapeProps } from './ShapeProps';

const DefaultShape: React.FC<ShapeProps> = ({ key, cx, cy, title, onClick }) => (
  <circle
    key={key}
    cx={cx}
    cy={cy}
    r={6}
    fill="steelblue"
    style={{ cursor: 'pointer' }}
    onClick={onClick}
  >
    <title>{title}</title>
  </circle>
);

export default DefaultShape;
