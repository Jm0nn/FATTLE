package com.sixman.fattle.entity;

import jakarta.persistence.Column;

import java.time.LocalDateTime;

public class QuestId {

    @Column(name = "user_cd")
    private long userCd;

    @Column(name = "rec_dt")
    private LocalDateTime recDt;

}
