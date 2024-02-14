package com.sixman.fattle.repository;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sixman.fattle.entity.ExpHistory;
import com.sixman.fattle.entity.QExpHistory;
import com.sixman.fattle.entity.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import static com.sixman.fattle.utils.Const.*;

@Repository
@RequiredArgsConstructor
public class ExpRepositoryImpl implements ExpRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    private final QExpHistory qexp = QExpHistory.expHistory;
    private final QUser quser = QUser.user;

    @Override
    public List<ExpHistory> getExpHistory(long userCode, LocalDate date) {
        return queryFactory
                .select(qexp)
                .from(qexp)
                .where(qexp.userCd.eq(userCode),
                        qexp.recDt.between(date.atStartOfDay(), date.plusDays(1).atStartOfDay()))
                .fetch();
    }

    @Override
    public void setExp(long userCode, String type, String content, int exp) {
        Tuple exps = queryFactory
                .select(
                        quser.growthExp,
                        quser.stackExp,
                        quser.avatarCd)
                .from(quser)
                .where(quser.userCd.eq(userCode))
                .fetchFirst();

        int growthExp = exps.get(quser.growthExp);
        int stackExp = exps.get(quser.stackExp);

        int remGrowthExp = MAX_GROWTH_EXP - growthExp;

        int getGrowthExp = Math.min(exp, remGrowthExp);
        int getStackExp = exp - getGrowthExp;

        String avatarCode = exps.get(quser.avatarCd);
        int resGrowthExp = growthExp + getGrowthExp;

        switch (avatarCode) {
            case CHA_CODE_LV_1:
                if (growthExp < CHA_LV_1_TO_2_EXP && CHA_LV_1_TO_2_EXP <= resGrowthExp) {
                    avatarCode = CHA_CODE_LV_2;
                }
                break;

            case CHA_CODE_LV_2:
                if (growthExp < CHA_LV_2_TO_3_EXP && CHA_LV_2_TO_3_EXP <= resGrowthExp) {
                    avatarCode = CHA_CODE_LV_3;
                }
                break;

            case CHA_CODE_LV_3:
                if (growthExp < CHA_LV_3_TO_4_EXP && CHA_LV_3_TO_4_EXP <= resGrowthExp) {
                    avatarCode = CHA_CODE_LV_4;
                }
                break;

            case CHA_CODE_LV_4:
                if (growthExp < MAX_GROWTH_EXP && MAX_GROWTH_EXP <= resGrowthExp) {
                    avatarCode = CHA_CODE_LV_5;
                }
                break;
        }

        queryFactory
                .update(quser)
                .set(quser.growthExp, resGrowthExp)
                .set(quser.stackExp, stackExp + getStackExp)
                .set(quser.avatarCd, avatarCode)
                .where(quser.userCd.eq(userCode))
                .execute();

        queryFactory
                .insert(qexp)
                .columns(
                        qexp.userCd,
                        qexp.type,
                        qexp.content,
                        qexp.point)
                .values(
                        userCode,
                        type,
                        content,
                        exp)
                .execute();
    }

}
