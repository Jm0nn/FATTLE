package com.sixman.fattle.api.controller;

import com.sixman.fattle.api.service.BattlePointService;
import com.sixman.fattle.dto.request.BattlePointRequest;
import com.sixman.fattle.dto.response.PointHistoryResponse;
import com.sixman.fattle.dto.response.RemainPointResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/battle/point")
@RequiredArgsConstructor
@Tag(name = "BattlePoint 컨트롤러", description = "배틀 포인트 관리를 위한 API")
public class BattlePointController {

    private final BattlePointService battlePointService;

    @Operation(summary = "자극자 남은 라이브 점수",
            description = "자극자 남은 라이브 점수 조회")
    @ApiResponse(responseCode = "200", description = "자극자 남은 라이브 점수 조회 성공")
    @GetMapping("/{battleCode}/{userCode}")
    public ResponseEntity<RemainPointResponse> getRemainPoint(@PathVariable String battleCode,
                                                              @PathVariable long userCode) {
        RemainPointResponse response = battlePointService.getRemainPoint(battleCode, userCode);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "자극자 점수 부여",
            description = "배틀 중 자극자 점수 부여<br/><br/>" +
                    "<b>type 코드</b><br/>" +
                    "1: 라이브 점수<br/>" +
                    "2: 식단 점수")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "점수 부여 성공"),
            @ApiResponse(responseCode = "400", description = "점수 부여 실패")
    })
    @PatchMapping("/give")
    public ResponseEntity<?> setBattlePoint(@RequestBody BattlePointRequest request) {
        HttpStatus status = battlePointService.setBattlePoint(request);
        return ResponseEntity.status(status).build();
    }

    @Operation(summary = "배틀 점수 조회",
            description = "배틀 점수 내역 조회<br/><br/>" +
                    "<b>type 코드</b><br/>" +
                    "1: 라이브 자극자 점수<br/>" +
                    "2: 식단 자극자 점수<br/>" +
                    "3: 라이브 기본 점수<br/>" +
                    "4: 식단 기본 점수<br/>" +
                    "5: 일일퀘스트 점수<br/>" +
                    "6: 목표량 달성 점수")
    @ApiResponse(responseCode = "200", description = "배틀 점수 조회 성공")
    @GetMapping("/history/{battleCode}")
    public ResponseEntity<PointHistoryResponse> getPointHistory(@PathVariable String battleCode) {
        PointHistoryResponse response = battlePointService.getPointHistory(battleCode);
        return ResponseEntity.ok(response);
    }

}
