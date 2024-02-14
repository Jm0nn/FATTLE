package com.sixman.fattle.api.service;

import com.sixman.fattle.dto.dto.*;
import com.sixman.fattle.dto.request.*;
import com.sixman.fattle.dto.response.*;
import com.sixman.fattle.entity.Battle;
import com.sixman.fattle.repository.BattleRepository;
import com.sixman.fattle.utils.CodeGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.sixman.fattle.utils.Const.*;

@Service
@Transactional
@RequiredArgsConstructor
public class BattleService {

    private final BattleRepository battleRepository;

    private final BattlePointService battlePointService;
    private final ExpService expService;

    public BattleCreateResponse createBattle(BattleCreateRequest request) {
        long userCode = request.getUserCode();

        String battleCode = "";

        do {
            battleCode = CodeGenerator.createBattleCode();
        } while (battleRepository.isBattleCodeExist(battleCode) > 0);

        Battle battle = Battle.builder()
                        .battleCd(battleCode)
                        .creatorCd(userCode)
                        .build();

        long result = battleRepository.createBattle(battle);

        return BattleCreateResponse.builder()
                .code(battleCode)
                .build();
    }

    public BattleListResponse getBattleList(long userCode) {
        List<String> battleCodeList = battleRepository.getBattleCodeList(userCode);

        List<BattleInfoDto> infoList = battleRepository.getBattleList(battleCodeList);

        return BattleListResponse.builder()
                .list(infoList)
                .build();
    }

    public HttpStatus registPlayer(PlayerRequest request) {
        if (battleRepository.setPlayer(request)) {
            return HttpStatus.OK;
        } else {
            return HttpStatus.BAD_REQUEST;
        }
    }

    public void registTrigger(TriggerRequest request) {
        battleRepository.setTrigger(request);
    }

    public void battleSetting(BattleSettingRequest request) {
        battleRepository.setBattle(request);
    }

    public HttpStatus battleStart(String battleCode) {
        return setBattleStatus(battleCode, BATTLE_STATUS_START);
    }

    public HttpStatus battleFinish(String battleCode) {
        return setBattleStatus(battleCode, BATTLE_STATUS_END);
    }

    private HttpStatus setBattleStatus(String battleCode, int status) {
        if (battleRepository.setBattleStatus(battleCode, status)) {
            if (status == BATTLE_STATUS_END) {
                giveExp(battleCode);
            }

            return HttpStatus.OK;
        } else {
            return HttpStatus.BAD_REQUEST;
        }
    }

    private void giveExp(String battleCode) {
        List<BattlePlayerInfoDto> playerList = battleRepository.getPlayerList(battleCode);

        BattlePlayerInfoDto playerA = playerList.get(0);
        BattlePlayerInfoDto playerB = playerList.get(1);

        int sumA = playerA.sumPoints();
        int sumB = playerB.sumPoints();

        if (sumA > sumB) {
            expService.setExp(playerA.getUserCode(), EXP_TYPE_BATTLE, EXP_CONTENT_WIN, (int) (sumA * BATTLE_WIN_EXP_RATIO));
            expService.setExp(playerB.getUserCode(), EXP_TYPE_BATTLE, EXP_CONTENT_LOSE, (int) (sumB * BATTLE_LOSE_EXP_RATIO));
        } else if (sumA < sumB) {
            expService.setExp(playerA.getUserCode(), EXP_TYPE_BATTLE, EXP_CONTENT_LOSE, (int) (sumA * BATTLE_LOSE_EXP_RATIO));
            expService.setExp(playerB.getUserCode(), EXP_TYPE_BATTLE, EXP_CONTENT_WIN, (int) (sumB * BATTLE_WIN_EXP_RATIO));
        } else {
            expService.setExp(playerA.getUserCode(), EXP_TYPE_BATTLE, EXP_CONTENT_DRAW, (int) (sumA * BATTLE_WIN_EXP_RATIO));
            expService.setExp(playerB.getUserCode(), EXP_TYPE_BATTLE, EXP_CONTENT_DRAW, (int) (sumB * BATTLE_WIN_EXP_RATIO));
        }
    }

    public void setPlayerWeight(PlayerWeightRequest request) {
        battleRepository.setPlayerWeight(request);

        int point = battleRepository.getGoalPoint(request);

        battlePointService.setBattlePoint(request.getBattleCode(), request.getUserCode(), TYPE_GOAL_POINT, point);
    }

    public BattleInfoResponse getBattleInfo(String battleCode) {
        SimpleBattleInfoDto battleInfo = battleRepository.getBattleInfo(battleCode);
        List<String> betting = battleRepository.getBettings(battleCode);
        List<BattlePlayerInfoDto> playerList = battleRepository.getPlayerList(battleCode);

        int status = battleInfo.getStatus();

        if (status != BATTLE_STATUS_END) {
            for (BattlePlayerInfoDto info : playerList) {
                info.setLivePoint(0);
                info.setFoodPoint(0);
                info.setQuestPoint(0);
                info.setGoalPoint(0);
            }
        }

        List<BattleTriggerInfoDto> triggerList = battleRepository.getTriggerList(battleCode);

        return BattleInfoResponse.builder()
                .battleCode(battleCode)
                .battleName(battleInfo.getName())
                .startDate(battleInfo.getStartDate().toLocalDateTime())
                .endDate(battleInfo.getEndDate().toLocalDateTime())
                .betting(betting)
                .playerList(playerList)
                .triggerList(triggerList)
                .build();
    }

    public HttpStatus deleteBattle(String battleCode) {
        int chk = battleRepository.isBattleCodeExist(battleCode);

        if (chk == 0) {
            return HttpStatus.BAD_REQUEST;
        }

        battleRepository.deleteBoard(battleCode);
        battleRepository.deletePoint(battleCode);
        battleRepository.deleteTrigger(battleCode);
        battleRepository.deletePlayer(battleCode);
        battleRepository.deleteBetting(battleCode);
        battleRepository.deleteBattle(battleCode);

        return HttpStatus.OK;
    }

    public HttpStatus deletePlayer(String battleCode, long userCode) {
        int chk = battleRepository.isPlayerExist(battleCode, userCode);

        if (chk == 0) {
            return HttpStatus.BAD_REQUEST;
        }

        battleRepository.deletePlayer(battleCode, userCode);

        return HttpStatus.OK;
    }

    public HttpStatus deleteTrigger(String battleCode, long userCode) {
        int chk = battleRepository.isTriggerExist(battleCode, userCode);

        if (chk == 0) {
            return HttpStatus.BAD_REQUEST;
        }

        battleRepository.deleteTrigger(battleCode, userCode);

        return HttpStatus.OK;
    }

    public HttpStatus modifyPlayer(PlayerRequest request) {
        long cnt = battleRepository.modifyPlayer(request);
        if (cnt == 0) {
            return HttpStatus.BAD_REQUEST;
        } else {
            return HttpStatus.OK;
        }
    }

    public void liveOn(String battleCode, long userCode) {
        battleRepository.liveOn(battleCode, userCode);
        battlePointService.liveOn(battleCode, userCode);
    }

    public void liveOff(String battleCode, long userCode) {
        battleRepository.liveOff(battleCode, userCode);
    }

}
