package com.dhiman.w3app.rest.controller;

import com.dhiman.w3app.dto.EventRequest;
import com.dhiman.w3app.service.EventManagementService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.FileSystemResource;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/data")
public class DataLoadController {

    private final EventManagementService eventManagementService;
    private final ObjectMapper objectMapper;

    public DataLoadController(EventManagementService eventManagementService, ObjectMapper objectMapper) {
        this.eventManagementService = eventManagementService;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/load")
    public String loadEventsFromFile(@RequestParam String filePath) {
        try {
            File file = new File(filePath);
            if (!file.exists()) {
                return "❌ File not found: " + filePath;
            }

            List<EventRequest> events = objectMapper.readValue(
                new FileSystemResource(file).getInputStream(),
                    new TypeReference<>() {
                    });
            events.forEach(eventManagementService::createEvent);

            return "✅ Loaded " + events.size() + " events into database.";
        } catch (IOException e) {
            return "❌ Error reading file: " + e.getMessage();
        }
    }
}
