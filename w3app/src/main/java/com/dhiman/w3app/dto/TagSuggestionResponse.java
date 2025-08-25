package com.dhiman.w3app.dto;

import java.util.List;

public record TagSuggestionResponse(
        List<TagDTO> suggestions
) {
}
