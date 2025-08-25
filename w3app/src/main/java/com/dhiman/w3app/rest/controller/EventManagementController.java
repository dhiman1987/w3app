package com.dhiman.w3app.rest.controller;

import com.dhiman.w3app.dto.EventRequest;
import com.dhiman.w3app.dto.EventResponse;
import com.dhiman.w3app.service.EventManagementService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events")
public class EventManagementController {

    private final EventManagementService eventManagementService;

    public EventManagementController(EventManagementService eventManagementService) {
        this.eventManagementService = eventManagementService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EventResponse createEvent(@RequestBody EventRequest request) {
        return eventManagementService.createEvent(request);
    }

    @PutMapping
    public EventResponse updateEvent(@RequestBody EventRequest request) {
        return eventManagementService.updateEvent(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEvent(@PathVariable String id) {
        eventManagementService.deleteEvent(id);
    }
}
