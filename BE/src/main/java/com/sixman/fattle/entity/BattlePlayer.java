package com.sixman.fattle.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "battle_player_tb")
public class BattlePlayer extends BattleUser {

    @Column(name = "before_weight")
    private float beforeWeight;

    @Column(name = "after_weight")
    private float afterWeight;

    @Column(name = "goal_weight")
    private float goalWeight;

    @Column(name = "live_pt")
    private int livePt;

    @Column(name = "food_pt")
    private int foodPt;

    @Column(name = "live_user_pt")
    private int liveUserPt;

    @Column(name = "food_user_pt")
    private int foodUserPt;

    @Column(name = "quest_pt")
    private int questPt;

    @Column(name = "goal_pt")
    private int goalPt;

    @Column(name = "live_status")
    private int liveStatus;

}
