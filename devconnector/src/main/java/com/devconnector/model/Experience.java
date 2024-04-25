package com.devconnector.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String company;
    private String location;
    @Column(name = "from_date")
    private Instant fromDate;
    @Column(name = "to_date")
    private Instant toDate;
    private boolean current;
    private String description;

    @ManyToOne
    @JoinColumn(name = "profile_id", referencedColumnName = "profile_id", nullable = true)
    private Profile profile;
}