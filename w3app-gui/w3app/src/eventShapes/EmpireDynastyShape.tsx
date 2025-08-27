import React from 'react';
import type { ShapeProps } from './ShapeProps';

const EmpireDynastyShape: React.FC<ShapeProps> = ({ key, cx, cy, title, onClick }) => (
  <ellipse
    key={key}
    cx={cx}
    cy={cy}
    rx={10}
    ry={6}
    fill="#ffd700"
    stroke="#b8860b"
    style={{ cursor: 'pointer' }}
    onClick={onClick}
  >
    <title>{title}</title>
  </ellipse>
);

export default EmpireDynastyShape;
