package com.sixman.fattle.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sixman.fattle.entity.QExercise;
import com.sixman.fattle.entity.QExerciseType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ExerciseTypeRepositoryImpl implements ExerciseTypeRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    private final QExerciseType qtype = QExerciseType.exerciseType;

    @Override
    public String getName(String exercise) {
        return queryFactory
                .select(qtype.name)
                .from(qtype)
                .where(qtype.typeCode.eq(exercise))
                .fetchFirst();
    }

}
