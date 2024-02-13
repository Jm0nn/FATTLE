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
@Table(name = "food_comment_tb")
public class FoodComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_comment_cd")
    private int foodCommentCd;

    @Column(name = "food_board_cd")
    private int foodBoardCd;

    @Column(name = "trigger_cd")
    private long triggerCd;

    @Column(name = "content")
    private String content;

    @Column(name = "rec_dt")
    private LocalDateTime recDt;

}
