package com.sixman.fattle.dto.request;

import lombok.Getter;

@Getter
public class SignUpRequest {

    private long userCode;
    private String nickname;
    private String sex;
    private float height;
    private float weight;
    private float goalWeight;
    private int goalCalory;
    private int goalCarbo;
    private int goalProtein;
    private int goalFat;

}
