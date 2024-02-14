package com.sixman.fattle.dto.response;

import com.sixman.fattle.dto.dto.ExerciseDto;
import com.sixman.fattle.entity.ExerciseType;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DailyQuestResponse {

    private int foodCnt;
    private int dayCheck;
    private ExerciseDto exercise;
    private int exerciseCnt;

}
