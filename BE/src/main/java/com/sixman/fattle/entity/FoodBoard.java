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
@Table(name = "food_board_tb")
public class FoodBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_board_cd")
    private int foodBoardCd;

    @Column(name = "battle_cd")
    private String battleCd;

    @Column(name = "player_cd")
    private long playerCd;

    @Column(name = "rec_dt")
    private LocalDateTime recDt;

    @Column(name = "img_name")
    private String imgName;

}
