import type { EventType } from "./constants/eventTypes";

export interface EventDate {
  value: number;
  era: string;
  display: string;
}

export interface HistoricalEvent {
  id: string;
  title: string;
  description: string;
  eventType: EventType;
  start: EventDate;
  end: EventDate;
  durationYears: number;
  tags: string[];
}
