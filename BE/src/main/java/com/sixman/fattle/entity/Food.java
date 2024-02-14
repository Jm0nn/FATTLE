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
@Table(name = "food_tb")
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_cd")
    private int foodCd;

    @Column(name = "user_cd")
    private long userCd;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private int type;

    @Column(name = "calory")
    private int calory;

    @Column(name = "carbo")
    private int carbo;

    @Column(name = "protein")
    private int protein;

    @Column(name = "fat")
    private int fat;

    @Column(name = "rec_dt")
    private LocalDateTime recDt;

    @Column(name = "img_name")
    private String imgName;

}
