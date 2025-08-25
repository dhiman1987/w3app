package com.dhiman.w3app.dto;

import java.util.List;

public record EventSearchRequest(
        YearDTO start,
        YearDTO end,
        String eventType,
        List<String> tagIds,
        int page,
        int size,
        String sortBy,
        String sortDirection
) {
}
