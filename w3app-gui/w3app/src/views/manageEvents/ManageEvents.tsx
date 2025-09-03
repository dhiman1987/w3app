import { useState } from "react";
import { EVENT_TYPE_LABELS } from "../../constants/eventTypes";
import type { EventType } from "../../constants/eventTypes";
import type { EventDate, HistoricalEvent } from "../../types";

import "./ManageEvents.css";

const ERA_OPTIONS = ["MYA", "BCE", "CE"];


interface CreateHistoricalEventFormProps {
  historicalEvent: HistoricalEvent | null;
}

const CreateHistoricalEventForm: React.FC<CreateHistoricalEventFormProps> = ({ historicalEvent }) => {
  const [id, setId] = useState(historicalEvent?.id ?? null)
  const [title, setTitle] = useState(historicalEvent?.title ?? "");
  const [description, setDescription] = useState(historicalEvent?.description ?? "");
  const [eventType, setEventType] = useState<EventType>(historicalEvent?.eventType ?? "ERA_PERIOD");
  const [startValue, setStartValue] = useState<number>(historicalEvent?.start.value ?? 0);
  const [startEra, setStartEra] = useState(historicalEvent?.start.era ?? "CE");
  const [endValue, setEndValue] = useState<number>(historicalEvent?.end.value ?? 0);
  const [endEra, setEndEra] = useState(historicalEvent?.end.era ?? "CE");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const start: EventDate = {
      value: startValue,
      era: startEra,
      display: `${startValue} ${startEra}`
    };

    const end: EventDate = {
      value: endValue,
      era: endEra,
      display: `${endValue} ${endEra}`
    };

    const durationYears = Math.abs(startValue - endValue);

    const newEvent: Partial<HistoricalEvent> = {
      title,
      description,
      eventType,
      start,
      end,
      durationYears,
      tags: []
    };

    let method = "POST";
    let operation = "create";
    if(id){
        newEvent.id = id;
        method= "PUT";
        operation = "update";
    }
      
    try {
      const response = await fetch("http://localhost:8080/api/events", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent)
      });

      if (!response.ok) throw new Error("Failed to "+operation+" event");
      alert("Event "+operation+" successfully done!");
    } catch (error) {
      console.error(error);
      alert("Error creating event");
    }
  };

  return (
  <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">{historicalEvent ? "Edit Event" : "Create Event"}</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>Event Type:</label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value as EventType)}
          >
            {EVENT_TYPE_LABELS.map(({ key, label }) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div className="date-fields">
          <fieldset>
            <legend>Start Date</legend>
            <input
              type="number"
              value={startValue}
              onChange={(e) => setStartValue(Number(e.target.value))}
              required
            />
            <select
              value={startEra}
              onChange={(e) => setStartEra(e.target.value)}
              style={{ marginTop: "0.5rem" }}
            >
              {ERA_OPTIONS.map((era) => (
                <option key={era} value={era}>{era}</option>
              ))}
            </select>
          </fieldset>

          <fieldset>
            <legend>End Date</legend>
            <input
              type="number"
              value={endValue}
              onChange={(e) => setEndValue(Number(e.target.value))}
              required
            />
            <select
              value={endEra}
              onChange={(e) => setEndEra(e.target.value)}
              style={{ marginTop: "0.5rem" }}
            >
              {ERA_OPTIONS.map((era) => (
                <option key={era} value={era}>{era}</option>
              ))}
            </select>
          </fieldset>
        </div>

        <button type="submit" className="submit-button">
          {historicalEvent ? "Update Event" : "Create Event"}
        </button>
      </div>
    </form>
  );
};

export default function ManageEventsView({ historicalEvent: HistoricalEvent }) {
  return (
    <div className="">
      <CreateHistoricalEventForm historicalEvent={HistoricalEvent} />
    </div>
  );
}