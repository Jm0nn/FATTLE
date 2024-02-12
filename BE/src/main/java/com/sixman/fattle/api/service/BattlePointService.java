package com.sixman.fattle.api.service;

import com.sixman.fattle.dto.dto.PointHistoryDto;
import com.sixman.fattle.dto.request.BattlePointRequest;
import com.sixman.fattle.dto.response.PointHistoryResponse;
import com.sixman.fattle.dto.response.RemainPointResponse;
import com.sixman.fattle.repository.BattleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.sixman.fattle.utils.Const.*;

@Service
@Transactional
@RequiredArgsConstructor
public class BattlePointService {

    private final BattleRepository battleRepository;

    public RemainPointResponse getRemainPoint(String battleCode, long userCode) {
        int currentPoint = battleRepository.getCurrentPoint(battleCode, userCode);
        return RemainPointResponse.builder()
                .maxPoint(MAX_LIVE_USER_POINT)
                .currentPoint(currentPoint)
                .remainPoint(MAX_LIVE_USER_POINT - currentPoint)
                .build();
    }

    public HttpStatus setBattlePoint(BattlePointRequest request) {
        String battleCode = request.getBattleCode();;
        long triggerUserCode = request.getTriggerUserCode();
        int type = request.getType();
        int point = request.getPoint();

        if (type == TYPE_LIVE_USER_POINT) {
            int currentPoint = battleRepository.getCurrentPoint(battleCode, triggerUserCode);
            if (currentPoint + point > MAX_LIVE_USER_POINT) {
                return HttpStatus.BAD_REQUEST;
            }
            battleRepository.setLiveUserPoint(request);
        } else if (type == TYPE_FOOD_USER_POINT) {
            if (0 > point || point > MAX_FOOD_USER_POINT) {
                return HttpStatus.BAD_REQUEST;
            }
            battleRepository.setFoodUserPoint(request);
        } else {
            return HttpStatus.BAD_REQUEST;
        }

        battleRepository.setPoint(request);

        return HttpStatus.OK;
    }

    public void setBattlePoint(String battleCode, long userCode, int type, int point) {
        battleRepository.setPoint(battleCode, userCode, type, point);
    }

    public PointHistoryResponse getPointHistory(String battleCode) {
        List<PointHistoryDto> pointHistoryDtoList = battleRepository.getPointHistory(battleCode);
        return PointHistoryResponse.builder()
                .list(pointHistoryDtoList)
                .build();
    }

    public void liveOn(String battleCode, long userCode) {
        int cnt = battleRepository.getLivePoint(battleCode, userCode);

        if (cnt == 0) {
            battleRepository.setPoint(battleCode, userCode, TYPE_LIVE_BASIC_POINT, LIVE_BASIC_POINT);
        }
    }

    public void foodUpload(long userCode) {
        List<String> list = battleRepository.getBattleCodeListAsPlayer(userCode);

        for (String code : list) {
            battleRepository.setPoint(code, userCode, TYPE_FOOD_BASIC_POINT, FOOD_BASIC_POINT);
        }
    }

    public void quest(long userCode) {
        List<String> list = battleRepository.getBattleCodeListAsPlayer(userCode);

        for (String code : list) {
            battleRepository.setPoint(code, userCode, TYPE_QUEST_POINT, QUEST_POINT);
        }
    }

}
