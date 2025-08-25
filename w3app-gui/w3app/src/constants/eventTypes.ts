// src/constants/eventTypes.ts
export enum EventType {
  WAR_CONFLICT = 'WAR_CONFLICT',
  EMPIRE_DYNASTY = 'EMPIRE_DYNASTY',
  ERA_PERIOD = 'ERA_PERIOD',
  POLITICAL_EVENT = 'POLITICAL_EVENT',
  DISCOVERY_INVENTION = 'DISCOVERY_INVENTION',
  FAMOUS_PERSON = 'FAMOUS_PERSON',
  CULTURAL_EVENT = 'CULTURAL_EVENT',
  NATURAL_DISASTER = 'NATURAL_DISASTER',
  ECONOMIC_EVENT = 'ECONOMIC_EVENT'
}

// Optional: an array for iteration in UI
export const EVENT_TYPE_LABELS: { key: EventType; label: string }[] = [
  { key: EventType.WAR_CONFLICT, label: 'Wars' },
  { key: EventType.EMPIRE_DYNASTY, label: 'Empires' },
  { key: EventType.ERA_PERIOD, label: 'Eras' },
  { key: EventType.POLITICAL_EVENT, label: 'Political Events' },
  { key: EventType.DISCOVERY_INVENTION, label: 'Discoveries & Inventions' },
  { key: EventType.FAMOUS_PERSON, label: 'Famous People' },
  { key: EventType.CULTURAL_EVENT, label: 'Cultural Events' },
  { key: EventType.NATURAL_DISASTER, label: 'Natural Disasters' },
  { key: EventType.ECONOMIC_EVENT, label: 'Economic Events' }
];
