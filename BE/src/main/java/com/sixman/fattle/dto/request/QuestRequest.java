package com.sixman.fattle.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuestRequest {

    private long userCode;
    private String exercise;

}
