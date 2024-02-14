package com.sixman.fattle.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sixman.fattle.entity.Exercise;
import com.sixman.fattle.entity.QExercise;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ExerciseRepositoryImpl implements ExerciseRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    private final QExercise qexercise = QExercise.exercise;

    @Override
    public List<Exercise> getTodayExercise(long userCode) {
        return queryFactory.select(qexercise)
                .from(qexercise)
                .where(qexercise.userCd.eq(userCode),
                        qexercise.recDt.after(LocalDate.now().atStartOfDay()))
                .fetch();
    }

}
