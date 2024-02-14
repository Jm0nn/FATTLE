package com.sixman.fattle.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "exercise_tb")
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exercise_cd")
    private int exerciseCd;

    @Column(name = "user_cd")
    private long userCd;

    @Column(name = "type_cd")
    private String typeCd;

    @Column(name = "rec_dt")
    @CreationTimestamp
    private LocalDateTime recDt;

}
