package com.dhiman.w3app.service;

import com.dhiman.w3app.dto.EventResponse;
import com.dhiman.w3app.mapper.EventMapper;
import com.dhiman.w3app.model.EventType;
import com.dhiman.w3app.repositories.EventRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class EventQueryService {

    private static final Logger log = LoggerFactory.getLogger(EventQueryService.class);

    private final EventRepository eventRepository;
    private final EventMapper eventMapper;

    public EventQueryService(EventRepository eventRepository, EventMapper eventMapper) {
        this.eventRepository = eventRepository;
        this.eventMapper = eventMapper;
    }

    public List<EventResponse> findByYear(int year) {
        log.info("Searching events for year: {}", year);
        return eventRepository.findByYear(year)
                .stream()
                .map(eventMapper::toResponse)
                .toList();
    }

    public List<EventResponse> findByYearRange(int startYear, int endYear) {
        log.info("Searching events between {} and {}", startYear, endYear);
        return eventRepository.findByYearRange(startYear, endYear)
                .stream()
                .map(eventMapper::toResponse)
                .toList();
    }

    public List<EventResponse> findByYearRangeAndType(int startYear, int endYear, List<EventType> types) {
        log.info("Searching events between {} and {} of type {}", startYear, endYear, types);
        Objects.requireNonNull(types, "event type must not be null");
        return eventRepository.findByYearRangeAndTypes(startYear, endYear, types)
                .stream()
                .map(eventMapper::toResponse)
                .toList();
    }

    public List<EventResponse> findByEventType(EventType type) {
        log.info("Searching events of type {}", type);
        Objects.requireNonNull(type, "event type must not be null");
        return eventRepository.findByEventType(type)
                .stream()
                .map(eventMapper::toResponse)
                .toList();
    }

    public List<EventResponse> findByAnyTagIds(List<String> tagIds) {
        log.info("Searching events with any of tag IDs: {}", tagIds);
        if (tagIds == null || tagIds.isEmpty()) return List.of();
        return eventRepository.findByAnyTagIds(tagIds)
                .stream()
                .map(eventMapper::toResponse)
                .toList();
    }
}
