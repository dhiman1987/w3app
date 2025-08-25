package com.dhiman.w3app.dto;

import java.util.List;

public record EventRequest(
        String id,
        String title,
        String description,
        String eventType,
        YearDTO start,
        YearDTO end,
        List<String> tagIds
) {
}
