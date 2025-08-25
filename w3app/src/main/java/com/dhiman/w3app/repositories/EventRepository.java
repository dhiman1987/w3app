package com.dhiman.w3app.repositories;

import com.dhiman.w3app.model.Event;
import com.dhiman.w3app.model.EventType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {

    /**
     * Find events that occur in a specific year (startYear <= year <= endYear).
     */
    @Query("{ 'startYear': { $lte: ?0 }, 'endYear': { $gte: ?0 } }")
    List<Event> findByYear(int year);

    /**
     * Find events that overlap with a given date range.
     * Overlap means: startYear <= endYearParam AND endYear >= startYearParam.
     */
    @Query("{ 'startYear': { $lte: ?1 }, 'endYear': { $gte: ?0 } }")
    List<Event> findByYearRange(int startYear, int endYear);

    /**
     * Find events by type and overlapping a given date range.
     */
    @Query("{ 'eventType': { $in: ?2 }, 'startYear': { $lte: ?1 }, 'endYear': { $gte: ?0 } }")
    List<Event> findByYearRangeAndTypes(int startYear, int endYear, List<EventType> eventType);

    /**
     * Find events by type only.
     */
    List<Event> findByEventType(EventType eventType);

    /**
     * Find events by tag ID.
     */
    List<Event> findByTagIdsContains(String tagId);

    /**
     * Find events by multiple tag IDs (any match).
     */
    @Query("{ 'tagIds': { $in: ?0 } }")
    List<Event> findByAnyTagIds(List<String> tagIds);
}
