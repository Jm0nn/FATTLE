package com.sixman.fattle.dto.request;

import lombok.*;

@Getter
public class FoodUploadRequest {

    private long userCode;

    private int type;

    private String name;

    private int calory;

    private int carbo;

    private int protein;

    private int fat;

    private String imgName;

}
