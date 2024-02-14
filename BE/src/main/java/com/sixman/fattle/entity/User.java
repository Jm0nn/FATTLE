package com.sixman.fattle.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user_tb")
public class User {

    @Id
    @Column(name = "user_cd")
    private long userCd;

    @Column(name = "avatar_cd")
    private String avatarCd;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "sex")
    private String sex;

    @Column(name = "join_dt")
    @CreationTimestamp
    private Timestamp joinDt;

    @Column(name = "goal_weight")
    private float goalWeight;

    @Column(name = "goal_calory")
    private int goalCalory;

    @Column(name = "goal_carbo")
    private int goalCarbo;

    @Column(name = "goal_protein")
    private int goalProtein;

    @Column(name = "goal_fat")
    private int goalFat;

    @Column(name = "growth_exp")
    private int growthExp;

    @Column(name = "stack_exp")
    private int stackExp;

    @Column(name = "introduction")
    private String introduction;

}
