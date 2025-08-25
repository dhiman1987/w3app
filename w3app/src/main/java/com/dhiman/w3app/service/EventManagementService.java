package com.dhiman.w3app.service;

import com.dhiman.w3app.dto.EventResponse;
import com.dhiman.w3app.dto.EventRequest;
import com.dhiman.w3app.dto.YearDTO;
import com.dhiman.w3app.mapper.EventMapper;
import com.dhiman.w3app.model.Event;
import com.dhiman.w3app.repositories.EventRepository;
import com.dhiman.w3app.repositories.TagRepository;
import com.dhiman.w3app.util.YearMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
public class EventManagementService {

    private static final Logger log = LoggerFactory.getLogger(EventManagementService.class);

    private static final Set<String> STOP_WORDS = Set.of("the", "a", "an", "of", "and", "in", "on", "at");

    private final EventRepository eventRepository;
    private final TagRepository tagRepository;
    private final EventMapper eventMapper;

    public EventManagementService(EventRepository eventRepository,
                                  TagRepository tagRepository, EventMapper eventMapper) {
        this.eventRepository = eventRepository;
        this.tagRepository = tagRepository;
        this.eventMapper = eventMapper;
    }

    public EventResponse createEvent(EventRequest request) {
        log.info("Creating new event: {}", request.title());
        validateEvent(request.start(), request.end(), request.title(), request.eventType());
        ensureTagIdsExist(request.tagIds());

        Event entity = eventMapper.toEntity(request);
        Event saved = eventRepository.save(entity);
        return eventMapper.toResponse(saved);
    }

    public EventResponse updateEvent(EventRequest request) {
        log.info("Updating event with id: {}", request.id());
        Objects.requireNonNull(request.id(), "id must not be null");
        Objects.requireNonNull(request, "updated event must not be null");

        if (!eventRepository.existsById(request.id())) {
            log.warn("Event not found: {}", request.id());
            throw new IllegalArgumentException("Event not found: " + request.id());
        }

        validateEvent(request.start(), request.end(), request.title(), request.eventType());
        ensureTagIdsExist(request.tagIds());
        eventRepository.findById(request.id())
                .orElseThrow(() -> new IllegalArgumentException("Event not found: " + request.id()));
        Event saved = eventRepository.save(eventMapper.toEntity(request));
        return eventMapper.toResponse(saved);
    }

    public void deleteEvent(String id) {
        log.info("Deleting event with id: {}", id);
        eventRepository.deleteById(id);
    }

    private void validateEvent(YearDTO start, YearDTO end, String title, String eventType) {
        Objects.requireNonNull(eventType, "eventType must not be null");
        Objects.requireNonNull(title, "title must not be null");

        String trimmed = title.trim();
        if (trimmed.isBlank()) {
            log.error("Title is blank");
            throw new IllegalArgumentException("title must not be blank");
        }
        if (containsOnlyStopWords(trimmed)) {
            log.error("Title contains only stop words: {}", trimmed);
            throw new IllegalArgumentException("title cannot contain only stop words");
        }
        if (containsSpecialCharacters(trimmed)) {
            log.error("Title contains invalid special characters: {}", trimmed);
            throw new IllegalArgumentException("title contains invalid characters");
        }

        long startVal = YearMapper.toValue(start);
        long endVal = YearMapper.toValue(end);
        if (startVal > endVal) {
            log.error("Invalid year range: {} - {}", startVal, endVal);
            throw new IllegalArgumentException("startYear must be <= endYear");
        }
    }

    private void ensureTagIdsExist(List<String> tagIds) {
        if (tagIds == null || tagIds.isEmpty()) return;
        long found = tagRepository.findAllById(tagIds).stream().count();
        if (found != tagIds.size()) {
            log.error("One or more tagIds do not exist: {}", tagIds);
            throw new IllegalArgumentException("One or more tagIds do not exist");
        }
    }

    private boolean containsOnlyStopWords(String text) {
        String[] words = text.toLowerCase().split("\\s+");
        for (String w : words) {
            if (!STOP_WORDS.contains(w)) {
                return false;
            }
        }
        return true;
    }

    private boolean containsSpecialCharacters(String text) {
        // Allow only ASCII letters, digits, space, period, comma, apostrophe, and hyphen
        // Disallow curly quotes, accented letters, parentheses, etc.
        return !text.matches("[A-Za-z0-9 .,'()\\-]+");
    }

}
