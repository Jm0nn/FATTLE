package com.sixman.fattle.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sixman.fattle.dto.dto.*;
import com.sixman.fattle.dto.request.*;
import com.sixman.fattle.entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static com.sixman.fattle.utils.Const.*;

@Repository
@RequiredArgsConstructor
public class BattleRepositoryImpl implements BattleRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    private final QBattle qbattle = QBattle.battle;
    private final QUser quser = QUser.user;
    private final QAvatar qavatar = QAvatar.avatar;
    private final QBattlePlayer qplayer = QBattlePlayer.battlePlayer;
    private final QBattleTrigger qtrigger = QBattleTrigger.battleTrigger;
    private final QBattleBetting qbetting = QBattleBetting.battleBetting;
    private final QBattlePoint qpoint = QBattlePoint.battlePoint;
    private final QFoodBoard qboard = QFoodBoard.foodBoard;
    private final QFoodComment qcomment = QFoodComment.foodComment;
    private final QFood qfood = QFood.food;

    @Override
    public int isBattleCodeExist(String battleCode) {
        return queryFactory.select(qbattle.count())
                .from(qbattle)
                .where(qbattle.battleCd.in(battleCode))
                .fetchFirst()
                .intValue();
    }

    @Override
    public long createBattle(Battle battle) {
        return queryFactory.insert(qbattle)
                .columns(qbattle.battleCd, qbattle.creatorCd)
                .values(battle.getBattleCd(), battle.getCreatorCd())
                .execute();
    }

    @Override
    public List<String> getBattleCodeList(long userCode) {
        List<String> listAsPlayer = queryFactory.select(qplayer.battleCd)
                .from(qplayer)
                .where(qplayer.userCd.eq(userCode))
                .fetch();

        List<String> listAsTrigger = queryFactory.select(qtrigger.battleCd)
                .from(qtrigger)
                .where(qtrigger.userCd.eq(userCode))
                .fetch();

        listAsPlayer.addAll(listAsTrigger);

        return listAsPlayer;
    }

    @Override
    public List<BattleInfoDto> getBattleList(List<String> battleCodeList) {
        List<BattleInfoDto> battleList = new ArrayList<>();

        for (String code : battleCodeList) {
            Tuple tuple
                    = queryFactory.select(
                            qbattle.battleCd,
                            qbattle.name,
                            qbattle.status,
                            qbattle.startDt,
                            qbattle.endDt,
                            quser.userCd,
                            quser.nickname,
                            qavatar.imgPath,
                            qavatar.profileImgPath)
                    .from(qbattle)
                    .join(quser)
                    .on(qbattle.creatorCd.eq(quser.userCd))
                    .join(qavatar)
                    .on(quser.avatarCd.eq(qavatar.avatarCd))
                    .where(qbattle.battleCd.eq(code))
                    .fetchFirst();

            if (tuple == null) {
                continue;
            }

            List<SimpleBattlePlayerInfoDto> playerList
                    = queryFactory.select(
                            Projections.constructor(
                                    SimpleBattlePlayerInfoDto.class,
                                    quser.userCd,
                                    quser.nickname,
                                    qplayer.liveStatus))
                    .from(quser)
                    .join(qplayer)
                    .on(quser.userCd.eq(qplayer.userCd))
                    .where(qplayer.battleCd.eq(code))
                    .fetch();

            int triggerCnt
                    = queryFactory.select(qtrigger.count())
                    .from(qtrigger)
                    .where(qtrigger.battleCd.eq(tuple.get(qbattle.battleCd)))
                    .fetchFirst()
                    .intValue();

            BattleInfoDto info = BattleInfoDto.builder()
                    .battleCode(tuple.get(qbattle.battleCd))
                    .name(tuple.get(qbattle.name))
                    .status(tuple.get(qbattle.status))
                    .startDate(tuple.get(qbattle.startDt))
                    .endDate(tuple.get(qbattle.endDt))
                    .triggerCnt(triggerCnt)
                    .userCode(tuple.get(quser.userCd))
                    .nickname(tuple.get(quser.nickname))
                    .imgPath(tuple.get(qavatar.imgPath))
                    .playerList(playerList)
                    .build();

            battleList.add(info);
        }

        return battleList;
    }

    @Override
    public boolean setPlayer(PlayerRequest request) {
        int cnt = queryFactory
                .select(qplayer.count())
                .from(qplayer)
                .where(qplayer.battleCd.eq(request.getBattleCode()))
                .fetchFirst()
                .intValue();

        if (cnt >= 2) {
            return false;
        }

        queryFactory
                .insert(qplayer)
                .columns(
                        qplayer.battleCd,
                        qplayer.userCd,
                        qplayer.beforeWeight,
                        qplayer.goalWeight)
                .values(
                        request.getBattleCode(),
                        request.getUserCode(),
                        request.getBeforeWeight(),
                        request.getGoalWeight())
                .execute();

        return true;
    }

    @Override
    public void setTrigger(TriggerRequest request) {
        queryFactory
                .insert(qtrigger)
                .columns(
                        qtrigger.battleCd,
                        qtrigger.userCd)
                .values(
                        request.getBattleCode(),
                        request.getUserCode())
                .execute();
    }

    @Override
    public void setBattle(BattleSettingRequest request) {
        String battleCode = request.getBattleCode();

        queryFactory
                .update(qbattle)
                .set(qbattle.name, request.getBattleName())
                .set(qbattle.startDt, Timestamp.valueOf(request.getStartDate()))
                .set(qbattle.endDt, Timestamp.valueOf(request.getEndDate()))
                .where(qbattle.battleCd.eq(request.getBattleCode()))
                .execute();

        queryFactory
                .delete(qbetting)
                .where(qbetting.battleCd.eq(battleCode))
                .execute();

        List<String> bettingList = request.getBetting();

        for (String betting : bettingList) {
            queryFactory
                    .insert(qbetting)
                    .columns(
                            qbetting.battleCd,
                            qbetting.content)
                    .values(
                            battleCode,
                            betting)
                    .execute();
        }
    }

    @Override
    public boolean setBattleStatus(String battleCode, int status) {
        int curStatus = queryFactory
                .select(qbattle.status)
                .from(qbattle)
                .where(qbattle.battleCd.eq(battleCode))
                .fetchFirst();

        if (curStatus != 0 && status == 1) {
            return false;
        } else if (curStatus != 1 && status == 2) {
            return false;
        }

        queryFactory
                .update(qbattle)
                .set(qbattle.status, status)
                .where(qbattle.battleCd.eq(battleCode))
                .execute();

        return true;
    }

    @Override
    public void setPlayerWeight(PlayerWeightRequest request) {
        queryFactory
                .update(qplayer)
                .set(qplayer.afterWeight, request.getWeight())
                .where(qplayer.battleCd.eq(request.getBattleCode()),
                        qplayer.userCd.eq(request.getUserCode()))
                .execute();
    }

    @Override
    public SimpleBattleInfoDto getBattleInfo(String battleCode) {
        return queryFactory
                .select(
                        Projections.constructor(
                                SimpleBattleInfoDto.class,
                                qbattle.name,
                                qbattle.status,
                                qbattle.startDt,
                                qbattle.endDt))
                .from(qbattle)
                .where(qbattle.battleCd.eq(battleCode))
                .fetchFirst();
    }

    @Override
    public List<String> getBettings(String battleCode) {
        return queryFactory
                .select(qbetting.content)
                .from(qbetting)
                .where(qbetting.battleCd.eq(battleCode))
                .fetch();
    }

    @Override
    public List<BattlePlayerInfoDto> getPlayerList(String battleCode) {
        return queryFactory
                .select(
                        Projections.constructor(
                                BattlePlayerInfoDto.class,
                                qplayer.userCd,
                                quser.nickname,
                                qplayer.beforeWeight,
                                qplayer.afterWeight,
                                qplayer.goalWeight,
                                qplayer.livePt,
                                qplayer.foodPt,
                                qplayer.liveUserPt,
                                qplayer.foodUserPt,
                                qplayer.questPt,
                                qplayer.goalPt,
                                qplayer.liveStatus,
                                qavatar.imgPath,
                                qavatar.profileImgPath))
                .from(qplayer)
                .join(quser)
                .on(qplayer.userCd.eq(quser.userCd))
                .join(qavatar)
                .on(quser.avatarCd.eq(qavatar.avatarCd))
                .where(qplayer.battleCd.eq(battleCode))
                .fetch();
    }

    @Override
    public List<BattleTriggerInfoDto> getTriggerList(String battleCode) {
        return queryFactory
                .select(
                        Projections.constructor(
                                BattleTriggerInfoDto.class,
                                qtrigger.userCd,
                                quser.nickname,
                                qavatar.imgPath,
                                qavatar.profileImgPath))
                .from(qtrigger)
                .where(qtrigger.battleCd.eq(battleCode))
                .join(quser)
                .on(qtrigger.userCd.eq(quser.userCd))
                .join(qavatar)
                .on(quser.avatarCd.eq(qavatar.avatarCd))
                .fetch();
    }

    @Override
    public void deleteBoard(String battleCode) {
        List<Integer> boardCodeList
                = queryFactory
                .select(qboard.foodBoardCd)
                .from(qboard)
                .where(qboard.battleCd.eq(battleCode))
                .fetch();

        deleteComment(boardCodeList);

        queryFactory
                .delete(qboard)
                .where(qboard.battleCd.eq(battleCode))
                .execute();
    }

    @Override
    public void deleteComment(List<Integer> boardCodeList) {
        queryFactory
                .delete(qcomment)
                .where(qcomment.foodBoardCd.in(boardCodeList))
                .execute();
    }

    @Override
    public void deletePoint(String battleCode) {
        queryFactory
                .delete(qpoint)
                .where(qpoint.battleCd.eq(battleCode))
                .execute();
    }

    @Override
    public void deleteTrigger(String battleCode) {
        queryFactory
                .delete(qtrigger)
                .where(qtrigger.battleCd.eq(battleCode))
                .execute();
    }

    @Override
    public void deletePlayer(String battleCode) {
        queryFactory
                .delete(qplayer)
                .where(qplayer.battleCd.eq(battleCode))
                .execute();
    }

    @Override
    public void deletePlayer(String battleCode, long userCode) {
        queryFactory
                .delete(qplayer)
                .where(qplayer.battleCd.eq(battleCode),
                        qplayer.userCd.eq(userCode))
                .execute();
    }

    @Override
    public void deleteTrigger(String battleCode, long userCode) {
        queryFactory
                .delete(qtrigger)
                .where(qtrigger.battleCd.eq(battleCode),
                        qtrigger.userCd.eq(userCode))
                .execute();
    }

    @Override
    public void deleteBetting(String battleCode) {
        queryFactory
                .delete(qbetting)
                .where(qbetting.battleCd.eq(battleCode))
                .execute();
    }

    @Override
    public void deleteBattle(String battleCode) {
        queryFactory
                .delete(qbattle)
                .where(qbattle.battleCd.eq(battleCode))
                .execute();
    }

    @Override
    public int isPlayerExist(String battleCode, long userCode) {
        return queryFactory
                .select(qplayer.count())
                .from(qplayer)
                .where(qplayer.battleCd.eq(battleCode),
                        qplayer.userCd.eq(userCode))
                .fetchFirst()
                .intValue();
    }

    @Override
    public int isTriggerExist(String battleCode, long userCode) {
        return queryFactory
                .select(qtrigger.count())
                .from(qtrigger)
                .where(qtrigger.battleCd.eq(battleCode),
                        qtrigger.userCd.eq(userCode))
                .fetchFirst()
                .intValue();
    }

    @Override
    public long modifyPlayer(PlayerRequest request) {
        return queryFactory
                .update(qplayer)
                .set(qplayer.beforeWeight, request.getBeforeWeight())
                .set(qplayer.goalWeight, request.getGoalWeight())
                .where(qpoint.battleCd.eq(request.getBattleCode()),
                        qplayer.userCd.eq(request.getUserCode()))
                .execute();
    }

    @Override
    public int getCurrentPoint(String battleCode, long userCode) {
        Integer point
                = queryFactory
                .select(qpoint.point.sum())
                .from(qpoint)
                .where(qpoint.battleCd.eq(battleCode),
                        qpoint.triggerCd.eq(userCode),
                        qpoint.recDt.after(LocalDate.now().atStartOfDay()))
                .fetchFirst();

        return point == null ? 0 : point;
    }

    @Override
    public void setPoint(BattlePointRequest request) {
        queryFactory
                .insert(qpoint)
                .columns(
                        qpoint.battleCd,
                        qpoint.playerCd,
                        qpoint.triggerCd,
                        qpoint.type,
                        qpoint.point)
                .values(
                        request.getBattleCode(),
                        request.getPlayerUserCode(),
                        request.getTriggerUserCode(),
                        request.getType(),
                        request.getPoint())
                .execute();
    }

    @Override
    public void setLiveUserPoint(BattlePointRequest request) {
        int liveUserPoint
                = queryFactory
                .select(qplayer.liveUserPt)
                .from(qplayer)
                .where(qplayer.battleCd.eq(request.getBattleCode()),
                        qplayer.userCd.eq(request.getPlayerUserCode()))
                .fetchFirst();

        queryFactory
                .update(qplayer)
                .set(qplayer.liveUserPt, liveUserPoint + request.getPoint())
                .where(qplayer.battleCd.eq(request.getBattleCode()),
                        qplayer.userCd.eq(request.getPlayerUserCode()))
                .execute();
    }

    @Override
    public void setFoodUserPoint(BattlePointRequest request) {
        int foodUserPoint
                = queryFactory
                .select(qplayer.foodUserPt)
                .from(qplayer)
                .where(qplayer.battleCd.eq(request.getBattleCode()),
                        qplayer.userCd.eq(request.getPlayerUserCode()))
                .fetchFirst();

        queryFactory
                .update(qplayer)
                .set(qplayer.foodUserPt, foodUserPoint + request.getPoint())
                .where(qplayer.battleCd.eq(request.getBattleCode()),
                        qplayer.userCd.eq(request.getPlayerUserCode()))
                .execute();
    }

    @Override
    public void setPoint(String battleCode, long userCode, int type, int point) {
        Tuple points
                = queryFactory
                .select(
                        qplayer.livePt,
                        qplayer.foodPt,
                        qplayer.questPt)
                .from(qplayer)
                .where(qplayer.battleCd.eq(battleCode),
                        qplayer.userCd.eq(userCode))
                .fetchFirst();

        switch (type) {
            case TYPE_LIVE_BASIC_POINT:
                queryFactory
                        .update(qplayer)
                        .set(qplayer.livePt, point + points.get(qplayer.livePt))
                        .where(
                                qplayer.battleCd.eq(battleCode),
                                qplayer.userCd.eq(userCode))
                        .execute();
                break;
            case TYPE_FOOD_BASIC_POINT:
                queryFactory
                        .update(qplayer)
                        .set(qplayer.foodPt, point + points.get(qplayer.foodPt))
                        .where(
                                qplayer.battleCd.eq(battleCode),
                                qplayer.userCd.eq(userCode))
                        .execute();
                break;
            case TYPE_QUEST_POINT:
                queryFactory
                        .update(qplayer)
                        .set(qplayer.questPt, point + points.get(qplayer.questPt))
                        .where(
                                qplayer.battleCd.eq(battleCode),
                                qplayer.userCd.eq(userCode))
                        .execute();
                break;
            case TYPE_GOAL_POINT:
                queryFactory
                        .update(qplayer)
                        .set(qplayer.goalPt, point)
                        .where(
                                qplayer.battleCd.eq(battleCode),
                                qplayer.userCd.eq(userCode))
                        .execute();
                break;
        }

        queryFactory
                .insert(qpoint)
                .columns(
                        qpoint.battleCd,
                        qpoint.playerCd,
                        qpoint.type,
                        qpoint.point)
                .values(
                        battleCode,
                        userCode,
                        type,
                        point)
                .execute();
    }

    @Override
    public List<PointHistoryDto> getPointHistory(String battleCode) {
        QUser player = new QUser("player");
        QUser trigger = new QUser("trigger");

        return queryFactory
                .select(Projections.constructor(
                        PointHistoryDto.class,
                        player.nickname,
                        trigger.nickname,
                        qpoint.type,
                        qpoint.point,
                        qpoint.recDt
                ))
                .from(qpoint)
                .join(player)
                .on(qpoint.playerCd.eq(player.userCd))
                .leftJoin(trigger)
                .on(qpoint.triggerCd.eq(trigger.userCd))
                .where(qpoint.battleCd.eq(battleCode))
                .fetch();
    }

    @Override
    public int getGoalPoint(PlayerWeightRequest request) {
        int point;

        Tuple tuple
                = queryFactory
                .select(
                        qbattle.startDt,
                        qbattle.endDt,
                        qplayer.beforeWeight,
                        qplayer.goalWeight)
                .from(qbattle)
                .join(qplayer)
                .on(qbattle.battleCd.eq(qplayer.battleCd))
                .where(qplayer.userCd.eq(request.getUserCode()))
                .fetchFirst();

        int days = (int) Duration.between(
                tuple.get(qbattle.startDt).toLocalDateTime(),
                tuple.get(qbattle.endDt).toLocalDateTime()).toDays();

        float beforeWeight = tuple.get(qplayer.beforeWeight);
        float afterWeight = request.getWeight();
        float goalWeight = tuple.get(qplayer.goalWeight);

        if (goalWeight < beforeWeight) {
            if (beforeWeight < afterWeight) {
                point = 0;
            } else if (afterWeight < goalWeight) {
                point = MAX_GOAL_POINT * days;
            } else {
                float goalDiff = beforeWeight - goalWeight;
                float finalDiff = beforeWeight - afterWeight;

                point = (int) (finalDiff / goalDiff * MAX_GOAL_POINT * days);
            }
        } else {
            if (beforeWeight > afterWeight) {
                point = 0;
            } else if (afterWeight > goalWeight) {
                point = MAX_GOAL_POINT * days;
            } else {
                float goalDiff = goalWeight - beforeWeight;
                float finalDiff = afterWeight - beforeWeight;

                point = (int) (finalDiff / goalDiff * MAX_GOAL_POINT * days);
            }
        }

        return point;
    }

    @Override
    public int getLivePoint(String battleCode, long userCode) {
        return queryFactory
                .select(qpoint.count())
                .from(qpoint)
                .where(
                        qpoint.battleCd.eq(battleCode),
                        qpoint.playerCd.eq(userCode),
                        qpoint.recDt.after(LocalDate.now().atStartOfDay()))
                .fetchFirst()
                .intValue();
    }

    @Override
    public List<String> getBattleCodeListAsPlayer(long userCode) {
        return queryFactory
                .select(qplayer.battleCd)
                .from(qplayer)
                .join(qbattle)
                .on(qplayer.battleCd.eq(qbattle.battleCd))
                .where(qplayer.userCd.eq(userCode),
                        qbattle.status.eq(BATTLE_STATUS_START))
                .fetch();
    }

    @Override
    public void liveOn(String battleCode, long userCode) {
        queryFactory
                .update(qplayer)
                .set(qplayer.liveStatus, LIVE_STATUS_ON)
                .where(qplayer.userCd.eq(userCode),
                        qplayer.battleCd.eq(battleCode))
                .execute();
    }

    @Override
    public void liveOff(String battleCode, long userCode) {
        queryFactory
                .update(qplayer)
                .set(qplayer.liveStatus, LIVE_STATUS_OFF)
                .where(qplayer.userCd.eq(userCode),
                        qplayer.battleCd.eq(battleCode))
                .execute();
    }

}
