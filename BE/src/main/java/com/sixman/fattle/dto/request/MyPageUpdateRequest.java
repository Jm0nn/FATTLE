package com.sixman.fattle.dto.request;

import lombok.Data;

@Data
public class MyPageUpdateRequest {

    private long userCode;
    private String nickname;
    private String introduction;

}
