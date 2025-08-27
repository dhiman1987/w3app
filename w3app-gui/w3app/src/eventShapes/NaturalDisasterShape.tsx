import React from 'react';
import type { ShapeProps } from './ShapeProps';

const NaturalDisasterShape: React.FC<ShapeProps> = ({ key, cx, cy, title, onClick }) => (
  <polygon
    key={key}
    points={`${cx-8},${cy} ${cx},${cy-8} ${cx+8},${cy} ${cx},${cy+8}`}
    fill="#00bcd4"
    stroke="#006064"
    style={{ cursor: 'pointer' }}
    onClick={onClick}
  >
    <title>{title}</title>
  </polygon>
);

export default NaturalDisasterShape;
