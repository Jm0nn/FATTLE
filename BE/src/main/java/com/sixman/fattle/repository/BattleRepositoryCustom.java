package com.sixman.fattle.repository;

import com.sixman.fattle.dto.dto.*;
import com.sixman.fattle.dto.request.*;
import com.sixman.fattle.entity.Battle;

import java.util.List;

public interface BattleRepositoryCustom {

    int isBattleCodeExist(String battleCode);

    long createBattle(Battle battle);

    List<String> getBattleCodeList(long userCode);

    List<BattleInfoDto> getBattleList(List<String> battleCodeList);

    boolean setPlayer(PlayerRequest request);

    void setTrigger(TriggerRequest request);

    void setBattle(BattleSettingRequest request);

    boolean setBattleStatus(String battleCode, int status);

    void setPlayerWeight(PlayerWeightRequest request);

    SimpleBattleInfoDto getBattleInfo(String battleCode);

    List<String> getBettings(String battleCode);

    List<BattlePlayerInfoDto> getPlayerList(String battleCode);

    List<BattleTriggerInfoDto> getTriggerList(String battleCode);

    void deleteBoard(String battleCode);

    void deleteComment(List<Integer> boardCodeList);

    void deletePoint(String battleCode);

    void deleteTrigger(String battleCode);

    void deleteTrigger(String battleCode, long userCode);

    void deletePlayer(String battleCode);

    void deletePlayer(String battleCode, long userCode);

    void deleteBetting(String battleCode);

    void deleteBattle(String battleCode);

    int isPlayerExist(String battleCode, long userCode);

    int isTriggerExist(String battleCode, long userCode);

    long modifyPlayer(PlayerRequest request);

    int getCurrentPoint(String battleCode, long userCode);

    void setPoint(BattlePointRequest request);

    void setLiveUserPoint(BattlePointRequest request);

    void setFoodUserPoint(BattlePointRequest request);

    void setPoint(String battleCode, long userCode, int type, int point);

    List<PointHistoryDto> getPointHistory(String battleCode);

    int getGoalPoint(PlayerWeightRequest request);

    int getLivePoint(String battleCode, long userCode);

    List<String> getBattleCodeListAsPlayer(long userCode);

    void liveOn(String battleCode, long userCode);

    void liveOff(String battleCode, long userCode);

}
