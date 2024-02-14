package com.sixman.fattle.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "quest_tb")
@IdClass(QuestId.class)
public class Quest {

    @Id
    @Column(name = "user_cd")
    private long userCd;

    @Id
    @Column(name = "rec_dt")
    private LocalDateTime recDt;

    @Column(name = "day_chk")
    private int dayChk;

    @Column(name = "exercise_cnt")
    private int exerciseCnt;

    @Column(name = "food_cnt")
    private int foodCnt;

    @Column(name = "is_finish")
    private int isFinish;

}
