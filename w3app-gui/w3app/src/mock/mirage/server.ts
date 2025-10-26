// mirage/server.ts
import { createServer } from 'miragejs'
import { faker } from '@faker-js/faker'
import { EventType } from '../../constants/eventTypes'
import type { EventDate, HistoricalEvent } from '../../types'


const allEventTypes = Object.values(EventType) as EventType[]

function formatDate(year: number): EventDate {
  return {
    value: year,
    era: year < 0 ? 'BCE' : 'CE',
    display: `${Math.abs(year)} ${year < 0 ? 'BCE' : 'CE'}`
  }
}

function generateEvent(type: EventType): HistoricalEvent {
  const startYear = faker.number.int({ min: 1800, max: 1900 })
  const duration = faker.number.int({ min: 1, max: 100 })
  const endYear = startYear + duration

  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    eventType: type,
    start: formatDate(startYear),
    end: formatDate(endYear),
    durationYears: duration,
    tags: faker.helpers.arrayElements(
      ['war', 'politics', 'science', 'culture', 'economy', 'disaster', 'dynasty', 'personality'],
      faker.number.int({ min: 1, max: 3 })
    )
  }
}

export function makeServer() {
  return createServer({
    routes() {
      this.namespace = 'api'

      this.get('/events/range/type', (schema, request) => {
        const typeParam = request.queryParams.type as EventType
        const count = Number(request.queryParams.count) || 5

        const type = allEventTypes.includes(typeParam) ? typeParam : EventType.WAR_CONFLICT
        const events = Array.from({ length: count }, () => generateEvent(type))

        return events
      })
    }
  })
}
