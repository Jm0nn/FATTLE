package com.sixman.fattle.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RemainPointResponse {

    private int maxPoint;

    private int currentPoint;

    private int remainPoint;

}
