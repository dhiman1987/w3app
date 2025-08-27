import { useEffect, useState } from 'react';
import './App.css';
import type { HistoricalEvent } from './types';
import Timeline from './Timeline';
import { EventType, EVENT_TYPE_LABELS } from './constants/eventTypes';

const EARLIEST_YEAR = -4600000000; // 4600 MYA
const LATEST_YEAR = new Date().getFullYear();

export default function App() {
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<EventType[]>([EventType.WAR_CONFLICT]);

  // These will be updated by Timeline when the user scrolls/zooms
  const [startYear, setStartYear] = useState(1900);
  const [endYear, setEndYear] = useState(2000);

  useEffect(() => {
    if (selectedTypes.length === 0) {
      setEvents([]);
      return;
    }

      // Debounce: wait 400ms after last change before fetching
      const handler = setTimeout(() => {
        // Clamp years to valid range
        const clampedStart = Math.max(EARLIEST_YEAR, startYear);
        const clampedEnd = Math.min(LATEST_YEAR, endYear);

        const params = new URLSearchParams({
        startYear: clampedStart.toString(),
        endYear: clampedEnd.toString()
        });
        selectedTypes.forEach(type => params.append('types', type));

        fetch(`http://localhost:8080/api/events/range/type?${params.toString()}`)
          .then(res => res.json())
          .then((data: HistoricalEvent[]) => setEvents(data))
          .catch(err => console.error(err));
      }, 1000);
  // Cleanup: clear timer if values change before timeout
  return () => clearTimeout(handler);
  }, [selectedTypes,startYear,endYear]);

  return (
    <div className="app-container">
    <aside className="filters-panel">
      <h2>Filters</h2>
      <div className="filter-list">
        {EVENT_TYPE_LABELS.map(({ key, label }) => (
         <label key={key} className="filter-item">
         <input
            type="checkbox"
            checked={selectedTypes.includes(key)}
            onChange={(e) => {
            setSelectedTypes(prev =>
              e.target.checked
                ? [...prev, key]
                : prev.filter(t => t !== key)
            );
          }}
        />
          {label}
        </label>
      ))}
    </div>
    </aside>

      <main className="timeline-panel">
        <Timeline 
          events={events}
          startYear={1900} 
          endYear={2000} 
          onSelectEvent={setSelectedEvent}
          onRangeChange={(newStart, newEnd) => {
            console.log('on range change ',newStart, newEnd);
            setStartYear(newStart);
            setEndYear(newEnd);
          }}
        />
      </main>

      <aside className="info-panel">
        <h2>Info</h2>
        {selectedEvent ? (
          <>
            <h3>{selectedEvent.title}</h3>
            <p>{selectedEvent.description}</p>
            <p><strong>{selectedEvent.start.display}</strong> – <strong>{selectedEvent.end.display}</strong></p>
          </>
        ) : (
          <p>Select an event to see details</p>
        )}
      </aside>
    </div>
  );
}
