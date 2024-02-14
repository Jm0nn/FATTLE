package com.sixman.fattle.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "battle_betting_tb")
public class BattleBetting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "betting_cd")
    private int bettingCd;

    @Column(name = "battle_cd")
    private String battleCd;

    @Column(name = "content")
    private String content;

}
