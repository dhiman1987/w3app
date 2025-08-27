import React from 'react';
import type { ShapeProps } from './ShapeProps';

const EraPeriodShape: React.FC<ShapeProps> = ({ key, cx, cy, title, onClick }) => (
  <rect
    key={key}
    x={cx - 10}
    y={cy - 4}
    width={20}
    height={8}
    fill="#90caf9"
    stroke="#1565c0"
    style={{ cursor: 'pointer' }}
    onClick={onClick}
  >
    <title>{title}</title>
  </rect>
);

export default EraPeriodShape;
