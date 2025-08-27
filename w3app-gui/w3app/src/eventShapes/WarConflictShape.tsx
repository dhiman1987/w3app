import React from 'react';
import type { ShapeProps } from './ShapeProps';

const WarConflictShape: React.FC<ShapeProps> = ({ key, cx, cy, title, onClick }) => (
  <rect
    key={key}
    x={cx - 7}
    y={cy - 7}
    width={14}
    height={14}
    fill="firebrick"
    stroke="black"
    style={{ cursor: 'pointer' }}
    onClick={onClick}
  >
    <title>{title}</title>
  </rect>
);

export default WarConflictShape;
