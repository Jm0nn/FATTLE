package com.sixman.fattle.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "exp_history_tb")
public class ExpHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exp_cd")
    private int expCd;

    @Column(name = "user_cd")
    private long userCd;

    @Column(name = "rec_dt")
    private LocalDateTime recDt;

    @Column(name = "type")
    private String type;

    @Column(name = "content")
    private String content;

    @Column(name = "point")
    private int point;

}
