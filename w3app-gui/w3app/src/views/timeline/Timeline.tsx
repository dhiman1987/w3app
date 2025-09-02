import React, { useState } from 'react';
import type { HistoricalEvent } from '../../types';
import { EARLIEST_YEAR, LATEST_YEAR } from '../../constants/appContants';
import { eventShapeMap } from '../../eventShapes';

// Utility: Convert year to X coordinate
function yearToX(year: number, startYear: number, pxPerYear: number, padding: number) {
  return padding + (year - startYear) * pxPerYear;
}

// Utility: Generate ticks
function getTicks(startYear: number, endYear: number, yearsVisible: number) {
  const tickStep = Math.ceil(yearsVisible / 10);
  const ticks: number[] = [];
  for (
    let y = Math.floor(startYear / tickStep) * tickStep;
    y <= endYear;
    y += tickStep
  ) {
    ticks.push(y);
  }
  return ticks;
}

// Utility: Filter events to visible range
function getVisibleEvents(events: HistoricalEvent[], startYear: number, endYear: number) {
  return events.filter(
    ev => ev.start.value >= startYear && ev.start.value <= endYear
  );
}

// SVG: Axis line
function Axis({ width, height, padding }: { width: number; height: number; padding: number }) {
  return (
    <line
      x1={padding}
      y1={height / 2}
      x2={width - padding}
      y2={height / 2}
      stroke="black"
    />
  );
}

// SVG: Ticks and labels
function Ticks({ ticks, yearToX, height }: { ticks: number[]; yearToX: (year: number) => number; height: number }) {
  return (
    <>
      {ticks.map(tickYear => (
        <g key={tickYear}>
          <line
            x1={yearToX(tickYear)}
            y1={height / 2 - 5}
            x2={yearToX(tickYear)}
            y2={height / 2 + 5}
            stroke="black"
          />
          <text
            x={yearToX(tickYear)}
            y={height / 2 + 20}
            fontSize="12"
            textAnchor="middle"
          >
            {tickYear}
          </text>
        </g>
      ))}
    </>
  );
}

// SVG: Event dots
function EventDots({ events, yearToX, height, onSelectEvent }: {
  events: HistoricalEvent[];
  yearToX: (year: number) => number;
  height: number;
  onSelectEvent: (event: HistoricalEvent) => void;
}) {
  return (
    <>
      {events.map(ev => {
        const Shape = eventShapeMap[ev.eventType] ?? eventShapeMap['default'];
        return (
          <Shape
            key={ev.id}
            cx={yearToX(ev.start.value)}
            cy={height / 2}
            title={ev.title}
            onClick={() => onSelectEvent(ev)}
          />
        );
      })}
    </>
  );
}

interface TimelineProps {
  events: HistoricalEvent[];
  startYear: number;
  endYear: number;
  onSelectEvent: (event: HistoricalEvent) => void;
  onRangeChange: (newStart: number, newEnd: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({
  events,
  startYear: initialStart,
  endYear: initialEnd,
  onSelectEvent,
  onRangeChange
}) => {
  const width = 800;
  const height = 200;
  const padding = 50;

  // Local state for zoom/pan
  const [startYear, setStartYear] = useState(initialStart);
  const [endYear, setEndYear] = useState(initialEnd);

  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragStartYear, setDragStartYear] = useState<number | null>(null);

  const yearsVisible = endYear - startYear;
  const pxPerYear = (width - 2 * padding) / yearsVisible;

  const updateRange = (newStart: number, newEnd: number) => {
    const roundedStart = Math.round(newStart);
    const roundedEnd = Math.round(newEnd);
    const clampedStart = Math.max(EARLIEST_YEAR, Math.min(roundedStart, LATEST_YEAR));
    const clampedEnd = Math.max(EARLIEST_YEAR, Math.min(roundedEnd, LATEST_YEAR));
    setStartYear(clampedStart);
    setEndYear(clampedEnd);
    onRangeChange(clampedStart, clampedEnd);
  };

  // Zoom in/out around midpoint
  const zoom = (factor: number) => {
    const mid = (startYear + endYear) / 2;
    const newRange = yearsVisible * factor;
    //setStartYear(mid - newRange / 2);
    //setEndYear(mid + newRange / 2);
    updateRange(mid - newRange / 2, mid + newRange / 2);
  };

  // Mouse handlers for panning
  const onMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setDragStartX(e.clientX);
    setDragStartYear(startYear);
  };

  const onMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (dragStartX !== null && dragStartYear !== null) {
      const dx = e.clientX - dragStartX;
      const yearDelta = dx / pxPerYear;
      //setStartYear(dragStartYear - yearDelta);
      //setEndYear(dragStartYear - yearDelta + yearsVisible);
      updateRange(dragStartYear - yearDelta, dragStartYear - yearDelta + yearsVisible);
    }
  };

  const onMouseUp = () => {
    setDragStartX(null);
    setDragStartYear(null);
  };

  const ticks = getTicks(startYear, endYear, yearsVisible);
  const visibleEvents = getVisibleEvents(events, startYear, endYear);
  const yearToXLocal = (year: number) => yearToX(year, startYear, pxPerYear, padding);

  return (
    <div>
      <div style={{ marginBottom: '8px' }}>
        <button onClick={() => zoom(0.8)}>Zoom In</button>&nbsp;
        <button onClick={() => zoom(1.25)}>Zoom Out</button>
      </div>

      <svg
        width={width}
        height={height}
        style={{
          border: '1px solid #ccc',
          cursor: dragStartX !== null ? 'grabbing' : 'grab'
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <Axis width={width} height={height} padding={padding} />
        <Ticks ticks={ticks} yearToX={yearToXLocal} height={height} />
        <EventDots events={visibleEvents} yearToX={yearToXLocal} height={height} onSelectEvent={onSelectEvent} />
      </svg>
    </div>
  );
};

export default Timeline;
