package com.dhiman.w3app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tags")
public record Tag(
    @Id String id,
    String label,
    String[] synonyms
) {}
