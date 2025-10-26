import { useEffect, useState } from 'react';
import type { HistoricalEvent } from '../../types';
import Timeline from './Timeline';
import { EventType, EVENT_TYPE_LABELS } from '../../constants/eventTypes';
import { EARLIEST_YEAR, LATEST_YEAR } from '../../constants/appContants';
import ManageEventsView from '../manageEvents/ManageEvents';

let base_url = "http://localhost:8080"
if (import.meta.env.MODE === 'development') {
  base_url = ""
}

function fetchEvents(selectedTypes: EventType[], startYear: number, endYear: number, setEvents: (evs: HistoricalEvent[]) => void) {
  if (selectedTypes.length === 0) {
    setEvents([]);
    return;
  }
  const clampedStart = Math.max(EARLIEST_YEAR, startYear);
  const clampedEnd = Math.min(LATEST_YEAR, endYear);

  const params = new URLSearchParams({
    startYear: clampedStart.toString(),
    endYear: clampedEnd.toString()
  });
  selectedTypes.forEach(type => params.append('types', type));

  fetch(`${base_url}/api/events/range/type?${params.toString()}`)
    .then(res => res.json())
    .then((data: HistoricalEvent[]) => setEvents(data))
    .catch(err => console.error(err));
}

function FilterPanel({ selectedTypes, setSelectedTypes }: {
  selectedTypes: EventType[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<EventType[]>>;
}) {
  return (
    <aside className="filters-panel">
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
  );
}

function InfoPanel({ selectedEvent }: { selectedEvent: HistoricalEvent | null }) {
  const [activeView, setActiveView] = useState<'create-event' | 'edit-event'|''>('');
  return (
    <aside className="info-panel">
      <h2>Info</h2>
      {selectedEvent ? (
        <>
          <h3>{selectedEvent.title}</h3>
          <p>{selectedEvent.description}</p>
          <p><strong>{selectedEvent.start.display}</strong> – <strong>{selectedEvent.end.display}</strong></p>
          <button onClick={() => setActiveView(prev => prev === 'edit-event' ? '' : 'edit-event')}>Update Event</button> &nbsp;
        </>
      ) : (
        <p>Select an event to see details</p>
      )}
      <button onClick={() => setActiveView(prev => prev === 'create-event' ? '' : 'create-event')}>Create Event</button>
      {activeView === 'create-event' && <ManageEventsView historicalEvent={null} />}
      {activeView === 'edit-event' && <ManageEventsView historicalEvent={selectedEvent} />}
    </aside>
  );
}



export default function TimelineView() {
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<EventType[]>([EventType.WAR_CONFLICT]);
  // These will be updated by Timeline when the user scrolls/zooms
  const [startYear, setStartYear] = useState(1900);
  const [endYear, setEndYear] = useState(2000);

  useEffect(() => {
    // Debounce: wait 400ms after last change before fetching
    const handler = setTimeout(() => {
      fetchEvents(selectedTypes, startYear, endYear, setEvents);
    }, 1000);
    return () => clearTimeout(handler);
  }, [selectedTypes, startYear, endYear]);

  return (
    <div className="app-container">
      <FilterPanel selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
      <main className="timeline-panel">
        <Timeline 
          events={events}
          startYear={1900} 
          endYear={2000} 
          onSelectEvent={setSelectedEvent}
          onRangeChange={(newStart, newEnd) => {
            setStartYear(newStart);
            setEndYear(newEnd);
          }}
        />
      </main>
      <InfoPanel selectedEvent={selectedEvent} />
    </div>
  );
}
