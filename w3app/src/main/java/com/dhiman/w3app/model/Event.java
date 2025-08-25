package com.dhiman.w3app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "events")
public record Event(
    @Id String id,
    String title,
    String description,
    long startYear,
    long endYear,
    EventType eventType,
    List<String> tagIds
) {}
