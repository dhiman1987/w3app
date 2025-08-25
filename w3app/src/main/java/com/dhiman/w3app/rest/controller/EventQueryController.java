package com.dhiman.w3app.rest.controller;

import com.dhiman.w3app.dto.EventResponse;
import com.dhiman.w3app.model.EventType;
import com.dhiman.w3app.service.EventQueryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin
public class EventQueryController {

    private final EventQueryService eventQueryService;

    public EventQueryController(EventQueryService eventQueryService) {
        this.eventQueryService = eventQueryService;
    }

    @GetMapping("/year/{year}")
    public List<EventResponse> getByYear(@PathVariable int year) {
        return eventQueryService.findByYear(year);
    }

    @GetMapping("/range")
    public List<EventResponse> getByYearRange(@RequestParam int startYear,
                                              @RequestParam int endYear) {
        return eventQueryService.findByYearRange(startYear, endYear);
    }

    @GetMapping("/range/type")
    public List<EventResponse> getByYearRangeAndType(@RequestParam int startYear,
                                                     @RequestParam int endYear,
                                                     @RequestParam List<EventType> types) {
        return eventQueryService.findByYearRangeAndType(startYear, endYear, types);
    }

    @GetMapping("/type/{type}")
    public List<EventResponse> getByEventType(@PathVariable EventType type) {
        return eventQueryService.findByEventType(type);
    }

    @GetMapping("/tags")
    public List<EventResponse> getByAnyTagIds(@RequestParam List<String> tagIds) {
        return eventQueryService.findByAnyTagIds(tagIds);
    }
}
