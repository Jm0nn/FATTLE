package com.sixman.fattle.dto.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyQuestCheckDto {

    private int dayChk;

    private int exerciseCnt;

    private int foodCnt;

    private int isFinish;

    public int chkSum() {
        return dayChk + exerciseCnt + foodCnt;
    }

}
