package com.dhiman.w3app.dto;

import java.util.List;

// --- Responses ---
public record TagDTO(
        String id,
        String label,
        List<String> synonyms
) {
}
