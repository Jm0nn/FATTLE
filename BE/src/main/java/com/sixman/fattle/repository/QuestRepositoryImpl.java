package com.sixman.fattle.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sixman.fattle.dto.dto.DailyQuestCheckDto;
import com.sixman.fattle.dto.request.FoodUploadRequest;
import com.sixman.fattle.entity.QQuest;
import com.sixman.fattle.entity.Quest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
@RequiredArgsConstructor
public class QuestRepositoryImpl implements QuestRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    private final QQuest qquest = QQuest.quest;

    @Override
    public Quest getDailyQuest(long userCode) {
        return queryFactory
                .select(qquest)
                .from(qquest)
                .where(qquest.userCd.eq(userCode),
                        qquest.recDt.after(LocalDate.now().atStartOfDay()))
                .fetchFirst();
    }

    @Override
    public void createQuest(long userCode) {
        queryFactory.insert(qquest)
                .columns(qquest.userCd)
                .values(userCode)
                .execute();
    }

    @Override
    public DailyQuestCheckDto check(long userCode) {
        return queryFactory
                .select(
                        Projections.constructor(
                                DailyQuestCheckDto.class,
                                qquest.dayChk,
                                qquest.exerciseCnt,
                                qquest.foodCnt,
                                qquest.isFinish))
                .from(qquest)
                .where(qquest.userCd.eq(userCode),
                        qquest.recDt.after(LocalDate.now().atStartOfDay()))
                .fetchFirst();
    }

    @Override
    public void setFinish(long userCode) {
        queryFactory
                .update(qquest)
                .set(qquest.isFinish, 1)
                .where(qquest.userCd.eq(userCode),
                        qquest.recDt.after(LocalDate.now().atStartOfDay()))
                .execute();
    }

    @Override
    public void foodRecord(FoodUploadRequest request) {
        int foodCnt = queryFactory
                .select(qquest.foodCnt)
                .from(qquest)
                .where(qquest.userCd.eq(request.getUserCode()),
                        qquest.recDt.after(LocalDate.now().atStartOfDay()))
                .fetchFirst();

        queryFactory
                .update(qquest)
                .set(qquest.foodCnt, Math.min(foodCnt + 1, 3))
                .where(qquest.userCd.eq(request.getUserCode()),
                        qquest.recDt.after(LocalDate.now().atStartOfDay()))
                .execute();
    }

}
