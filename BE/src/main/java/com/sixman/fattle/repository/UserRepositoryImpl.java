package com.sixman.fattle.repository;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sixman.fattle.dto.request.SignUpRequest;
import com.sixman.fattle.dto.request.UserInfoRequest;
import com.sixman.fattle.dto.response.UserInfoResponse;
import com.sixman.fattle.entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    private final QUser quser = QUser.user;
    private final QAvatar qavatar = QAvatar.avatar;
    private final QHealth qhealth = QHealth.health;
    private final QFood qfood = QFood.food;
    private final QRanking qranking = QRanking.ranking;

    public User getUser(long userCode) {
        return queryFactory
                .select(quser)
                .from(quser)
                .where(quser.userCd.eq(userCode))
                .fetchFirst();
    }

    public void joinUser(SignUpRequest request) {
        queryFactory
                .insert(quser)
                .columns(
                        quser.userCd,
                        quser.nickname,
                        quser.sex,
                        quser.goalWeight,
                        quser.goalCalory,
                        quser.goalCarbo,
                        quser.goalProtein,
                        quser.goalFat)
                .values(
                        request.getUserCode(),
                        request.getNickname(),
                        request.getSex(),
                        request.getGoalWeight(),
                        request.getGoalCalory(),
                        request.getGoalCarbo(),
                        request.getGoalProtein(),
                        request.getGoalFat())
                .execute();

        queryFactory
                .insert(qhealth)
                .columns(
                        qhealth.userCd,
                        qhealth.height,
                        qhealth.weight)
                .values(
                        request.getUserCode(),
                        request.getHeight(),
                        request.getWeight())
                .execute();
    }

    public int checkNickname(String nickname) {
        return queryFactory
                .select(quser.count())
                .from(quser)
                .where(quser.nickname.eq(nickname))
                .fetchFirst()
                .intValue();
    }

    public UserInfoResponse getUserInfo(long userCode) {
        int rank = queryFactory
                .select(qranking.rank)
                .from(qranking)
                .where(qranking.userCd.eq(userCode))
                .fetchFirst();

        LocalDate today = LocalDate.now();

        List<Tuple> foodList
                = queryFactory
                .select(
                        qfood.calory,
                        qfood.carbo,
                        qfood.protein,
                        qfood.fat)
                .from(qfood)
                .where(qfood.userCd.eq(userCode),
                        qfood.recDt.after(today.atStartOfDay()))
                .fetch();

        int calory = 0;
        int carbo = 0;
        int protein = 0;
        int fat = 0;

        for (Tuple tuple : foodList) {
            calory += tuple.get(qfood.calory);
            carbo += tuple.get(qfood.carbo);
            protein += tuple.get(qfood.protein);
            fat += tuple.get(qfood.fat);
        }

        Tuple health = queryFactory
                .select(
                        qhealth.height,
                        qhealth.weight)
                .from(qhealth)
                .where(qhealth.userCd.eq(userCode))
                .orderBy(qhealth.recDt.desc())
                .fetchFirst();

        Tuple user = queryFactory
                .select(
                        quser.nickname,
                        quser.goalWeight,
                        quser.goalCalory,
                        quser.goalCarbo,
                        quser.goalProtein,
                        quser.goalFat,
                        quser.growthExp,
                        quser.stackExp,
                        qavatar.imgPath,
                        qavatar.profileImgPath)
                .from(quser)
                .where(quser.userCd.eq(userCode))
                .join(qavatar)
                .on(quser.avatarCd.eq(qavatar.avatarCd))
                .fetchFirst();

        return UserInfoResponse.builder()
                .ranking(rank)
                .nickname(user.get(quser.nickname))
                .height(health.get(qhealth.height))
                .weight(health.get(qhealth.weight))
                .goalWeight(user.get(quser.goalWeight))
                .calory(calory)
                .goalCalory(user.get(quser.goalCalory))
                .carbo(carbo)
                .goalCarbo(user.get(quser.goalCarbo))
                .protein(protein)
                .goalProtein(user.get(quser.goalProtein))
                .fat(fat)
                .goalFat(user.get(quser.goalFat))
                .growthExp(user.get(quser.growthExp))
                .stackExp(user.get(quser.stackExp))
                .imgPath(user.get(qavatar.imgPath))
                .profileImgPath(user.get(qavatar.profileImgPath))
                .build();
    }

    @Override
    public void setUserInfo(UserInfoRequest request) {
        queryFactory.insert(qhealth)
                .columns(
                        qhealth.userCd,
                        qhealth.height,
                        qhealth.weight)
                .values(
                        request.getUserCode(),
                        request.getHeight(),
                        request.getWeight())
                .execute();
    }

}
