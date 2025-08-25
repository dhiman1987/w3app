package com.dhiman.w3app.mapper;

import com.dhiman.w3app.dto.EventResponse;
import com.dhiman.w3app.dto.EventRequest;
import com.dhiman.w3app.dto.TagDTO;
import com.dhiman.w3app.model.Event;
import com.dhiman.w3app.model.EventType;
import com.dhiman.w3app.repositories.TagRepository;
import com.dhiman.w3app.util.YearMapper;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class EventMapper {

    private final TagRepository tagRepository;

    public EventMapper(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public Event toEntity(EventRequest request) {
        EventType type = EventType.valueOf(request.eventType());

        return new Event(
                request.id(),
                request.title(),
                request.description(),
                YearMapper.toValue(request.start()),
                YearMapper.toValue(request.end()),
                type,
                request.tagIds()
        );
    }

    public EventResponse toResponse(Event entity) {
        List<TagDTO> tags = Collections.emptyList();
        if(null!=entity.tagIds() && !entity.tagIds().isEmpty()){
            tags = tagRepository.findAllById(entity.tagIds()).stream()
                    .map(tag -> new TagDTO(tag.id(), tag.label(), List.of(tag.synonyms())))
                    .toList();
        }


        Long duration = calculateDuration(entity.startYear(), entity.endYear());

        return new EventResponse(
            entity.id(),
            entity.title(),
            entity.description(),
            entity.eventType().name(),
            YearMapper.toDTO(entity.startYear()),
            YearMapper.toDTO(entity.endYear()),
            duration,
            tags
        );
    }

    private Long calculateDuration(long start, long end) {
        return Math.abs(end - start);
    }
}
