package com.sixman.fattle.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BattlePointRequest {

    private String battleCode;

    private long playerUserCode;

    private long triggerUserCode;

    private int type;

    private int point;

}
