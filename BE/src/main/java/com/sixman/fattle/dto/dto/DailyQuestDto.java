package com.sixman.fattle.dto.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class DailyQuestDto {

    private LocalDateTime recordDate;
    private long userCd;
    private int dayCheck;
    private int exerciseCount;
    private int foodCount;
    private int Finish;

}
