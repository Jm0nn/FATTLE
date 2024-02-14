package com.sixman.fattle.dto.request;

import lombok.Data;

@Data
public class MyPageGoalUpdateRequest {

    private long userCode;
    private Float goalWeight;
    private int goalCalory;
    private int goalCarbo;
    private int goalProtein;
    private int goalFat;

}
