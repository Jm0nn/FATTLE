package com.sixman.fattle.dto.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FoodInfoDto {

    private String food_cd;

    private String name;

    private float gram;

    private int calory;

    private int carbo;

    private int protein;

    private int fat;

}
