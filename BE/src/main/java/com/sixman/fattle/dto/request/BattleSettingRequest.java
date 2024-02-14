package com.sixman.fattle.dto.request;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class BattleSettingRequest {

    private String battleCode;
    private String battleName;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private List<String> betting;

}
