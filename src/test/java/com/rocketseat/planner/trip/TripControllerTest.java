package com.rocketseat.planner.trip;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rocketseat.planner.activity.Activity;
import com.rocketseat.planner.activity.ActivityData;
import com.rocketseat.planner.activity.ActivityRequestPayload;
import com.rocketseat.planner.activity.ActivityResponse;
import com.rocketseat.planner.activity.ActivityService;
import com.rocketseat.planner.link.Link;
import com.rocketseat.planner.link.LinkData;
import com.rocketseat.planner.link.LinkRequestPayload;
import com.rocketseat.planner.link.LinkResponse;
import com.rocketseat.planner.link.LinkService;
import com.rocketseat.planner.participant.Participant;
import com.rocketseat.planner.participant.ParticipantCreateResponse;
import com.rocketseat.planner.participant.ParticipantData;
import com.rocketseat.planner.participant.ParticipantRequestPayload;
import com.rocketseat.planner.participant.ParticipantService;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class TripControllerTest {

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @InjectMocks
    private TripController tripController;

    @Mock
    private TripService tripService;

    @Mock
    private ParticipantService participantService;

    @Mock
    private ActivityService activityService;

    @Mock
    private LinkService linkService;

    @Mock
    private TripRepository repository;

    private Trip newTrip;
    private TripRequestPayload payload;
    private Participant newParticipant;
    private Activity newActivity;
    private Link newLink;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(tripController).build();
        objectMapper = new ObjectMapper();

        payload = new TripRequestPayload("Xanxere, SC", "2024-06-21T21:51:54.734Z", "2024-06-22T21:51:54.734Z", Collections.emptyList(), "John Doe", "5Pb9E@example.com");
        newTrip = new Trip(payload);
        newTrip.setId(new UUID(0, 1));

        newParticipant = new Participant("test@example.com", newTrip);
        newParticipant.setId(new UUID(0, 1));

        newActivity = new Activity("teste", "2024-06-21T21:51:54.734Z", newTrip);
        newActivity.setId(new UUID(0, 1));

        newLink = new Link("github", "https://github.com", newTrip);
        newLink.setId(new UUID(0, 1));
    }

    @Test
    public void testCreateTrip() throws Exception {
        when(tripService.registerTrip(payload)).thenReturn(newTrip);
        mockMvc.perform(post("/trips")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetTripDetails() throws Exception {
        
        when(repository.findById(newTrip.getId())).thenReturn(Optional.of(newTrip));
        mockMvc.perform(get("/trips/" + newTrip.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(newTrip.getId().toString()));
    }

    @Test
    public void testUpdateTrip() throws Exception {
        when(repository.findById(newTrip.getId())).thenReturn(Optional.of(newTrip));
        when(tripService.updateTrip(newTrip.getId(), payload)).thenReturn(new TripCreateResponse(newTrip.getId()));

        mockMvc.perform(put("/trips/" + newTrip.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isOk());
    }

    @Test
    public void testConfirmTrip() throws Exception {
        when(repository.findById(newTrip.getId())).thenReturn(Optional.of(newTrip));
        when(tripService.confirmTrip(newTrip.getId())).thenReturn(new TripCreateResponse(newTrip.getId()));

        mockMvc.perform(get("/trips/" + newTrip.getId() + "/confirm"))
                .andExpect(status().isOk());
    }

    @Test
    public void testInviteParticipant() throws Exception {
        ParticipantRequestPayload payload = new ParticipantRequestPayload("John Doe", "test@example.com");

        when(repository.findById(newTrip.getId())).thenReturn(Optional.of(newTrip));
        when(participantService.registerParticipantToEvent(payload.email(), newTrip))
                .thenReturn(new ParticipantCreateResponse(newParticipant.getId()));

        mockMvc.perform(post("/trips/" + newTrip.getId() + "/invite")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetAllParticipants() throws Exception {
        List<ParticipantData> participants = List.of(new ParticipantData(newParticipant.getId(), newParticipant.getName(), newParticipant.getEmail(), newParticipant.getIsConfirmed()));

        when(participantService.getAllParticipantsFromTrip(newTrip.getId())).thenReturn(participants);

        mockMvc.perform(get("/trips/" + newTrip.getId() + "/participants"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testGetAllActivities() throws Exception {
        List<ActivityData> activities = List.of(new ActivityData(newActivity.getId(), newActivity.getTitle(), newActivity.getOccursAt()));

        when(activityService.getAllActivitiesFromId(newTrip.getId())).thenReturn(activities);

        mockMvc.perform(get("/trips/" + newTrip.getId() + "/activities"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testRegisterActivity() throws Exception {
        ActivityRequestPayload payload = new ActivityRequestPayload("teste", "2024-06-21T21:51:54.734Z");

        when(repository.findById(newTrip.getId())).thenReturn(Optional.of(newTrip));
        when(activityService.registerActivitie(payload, newTrip))
                .thenReturn(new ActivityResponse(newActivity.getId()));

        mockMvc.perform(post("/trips/" + newTrip.getId() + "/activities")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetAllLinks() throws Exception {
        List<LinkData> links = List.of(new LinkData(newLink.getId(), newLink.getTitle(), newLink.getUrl()));

        when(linkService.getAllLinksFromId(newTrip.getId())).thenReturn(links);

        mockMvc.perform(get("/trips/" + newTrip.getId() + "/links"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testRegisterLink() throws Exception {
        LinkRequestPayload payload = new LinkRequestPayload(newLink.getTitle(), newLink.getUrl());

        when(repository.findById(newTrip.getId())).thenReturn(Optional.of(newTrip));
        when(linkService.registerLink(payload, newTrip))
                .thenReturn(new LinkResponse(newLink.getId()));

        mockMvc.perform(post("/trips/" + newTrip.getId() + "/links")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isOk());
    }
}
