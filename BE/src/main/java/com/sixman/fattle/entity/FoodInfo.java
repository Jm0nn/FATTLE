package com.sixman.fattle.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "food_info_tb")
public class FoodInfo {

    @Id
    @Column(name = "food_cd")
    private String foodCd;

    @Column(name = "name")
    private String name;

    @Column(name = "gram")
    private float gram;

    @Column(name = "calory")
    private int calory;

    @Column(name = "carbo")
    private int carbo;

    @Column(name = "protein")
    private int protein;

    @Column(name = "fat")
    private int fat;

}
