package com.sixman.fattle.repository;

import com.sixman.fattle.entity.Exercise;

import java.util.List;

public interface ExerciseRepositoryCustom {

    List<Exercise> getTodayExercise(long userCode);

}
