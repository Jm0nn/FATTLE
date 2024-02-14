package com.sixman.fattle.dto.request;

import lombok.Getter;

@Getter
public class PlayerWeightRequest {

    private String battleCode;
    private long userCode;
    private float weight;

}
