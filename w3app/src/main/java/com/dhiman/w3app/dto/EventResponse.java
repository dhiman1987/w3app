package com.dhiman.w3app.dto;

import java.util.List;

public record EventResponse(
        String id,
        String title,
        String description,
        String eventType,
        YearDTO start,
        YearDTO end,
        Long durationYears,
        List<TagDTO> tags
) {
}
