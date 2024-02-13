package com.sixman.fattle.dto.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PointHistoryDto {

    @QueryProjection
    public PointHistoryDto(String playerName, String triggerName, int typeCode, int point, LocalDateTime recDate) {
        this.playerName = playerName;
        this.triggerName = triggerName;
        this.typeCode = typeCode;
        this.point = point;
        this.recDate = recDate;
    }

    private String playerName;

    private String triggerName;

    private int typeCode;

    private String type;

    private int point;

    private LocalDateTime recDate;

}
