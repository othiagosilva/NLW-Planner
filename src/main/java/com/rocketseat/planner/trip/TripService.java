package com.rocketseat.planner.trip;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TripService {
    
    @Autowired
    public TripRepository repository;

    public Trip registerTrip(TripRequestPayload payload) {
        Trip newTrip = new Trip(payload);

        if (newTrip.getStartsAt().isAfter(newTrip.getEndsAt())){
            throw new RuntimeException("Start date must be before end date");
        }

        this.repository.save(newTrip);
        return newTrip;
    }

    public TripCreateResponse updateTrip(UUID id, TripRequestPayload payload) {
        Trip rawTrip = this.repository.findById(id).get();
        LocalDateTime endsAt = LocalDateTime.parse(payload.ends_at(), DateTimeFormatter.ISO_DATE_TIME);
        LocalDateTime startsAt = LocalDateTime.parse(payload.starts_at(), DateTimeFormatter.ISO_DATE_TIME);

        if (endsAt.isBefore(startsAt)) {
            throw new RuntimeException("Start date must be before end date");
        }

        rawTrip.setStartsAt(LocalDateTime.parse(payload.starts_at(), DateTimeFormatter.ISO_DATE_TIME));
        rawTrip.setEndsAt(LocalDateTime.parse(payload.ends_at(), DateTimeFormatter.ISO_DATE_TIME));
        rawTrip.setDestination(payload.destination());

        this.repository.save(rawTrip);
        return new TripCreateResponse(id);
    }

    public TripCreateResponse confirmTrip(UUID id) {
        Trip rawTrip = this.repository.findById(id).get();
        rawTrip.setIsConfirmed(true);
        this.repository.save(rawTrip);
        return new TripCreateResponse(id);
    }

}
