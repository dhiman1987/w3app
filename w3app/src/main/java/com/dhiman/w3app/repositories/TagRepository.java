package com.dhiman.w3app.repositories;

import com.dhiman.w3app.model.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface TagRepository extends MongoRepository<Tag, String> {

    /**
     * Find tags whose label or synonyms contain the given text (case-insensitive).
     * Useful when user is adding a new event and wants to see matching tags.
     */
    @Query("{ '$or': [ " +
            "{ 'label': { $regex: ?0, $options: 'i' } }, " +
            "{ 'synonyms': { $regex: ?0, $options: 'i' } } " +
            "] }")
    List<Tag> searchByText(String text);
}
