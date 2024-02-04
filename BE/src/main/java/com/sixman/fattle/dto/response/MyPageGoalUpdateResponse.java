package com.sixman.fattle.dto.response;

import lombok.Data;

@Data
public class MyPageGoalUpdateResponse {

    private long userCode;
    private Float goalWeight;
    private int goalCalory;
    private int goalCarbo;
    private int goalProtein;
    private int goalFat;

}