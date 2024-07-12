package com.rocketseat.planner.activity;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rocketseat.planner.trip.Trip;

@Service
public class ActivityService {

    @Autowired
    private ActivitiesRepository repository;

    public ActivityResponse registerActivitie(ActivityRequestPayload payload, Trip trip) {
        Activity newActivitie = new Activity(payload.title(), payload.occurs_at(), trip);

        if (newActivitie.getOccursAt().isAfter(trip.getEndsAt()) || newActivitie.getOccursAt().isBefore(trip.getStartsAt())) {
            throw new RuntimeException("It must occurs between trip date");
        }

        this.repository.save(newActivitie);

        return new ActivityResponse(newActivitie.getId());
    }

    public List<ActivityData> getAllActivitiesFromId(UUID tripId) {
        return this.repository.findByTripId(tripId).stream().map(activitie -> new ActivityData(activitie.getId(), activitie.getTitle(), activitie.getOccursAt())).toList();    
    }
}
