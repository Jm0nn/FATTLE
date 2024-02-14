package com.sixman.fattle.api.controller;

import com.sixman.fattle.api.service.QuestService;
import com.sixman.fattle.dto.request.QuestRequest;
import com.sixman.fattle.dto.response.DailyQuestResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/quest")
@RequiredArgsConstructor
@Tag(name = "Quest 컨트롤러", description = "퀘스트 관리 API")
public class QuestController {

    private final QuestService questService;

    @Operation(summary = "퀘스트 정보",
            description = "유저 코드를 받아 메인 페이지에 퀘스트 정보를 응답<br/><br/>" +
                    "<b>exercise 코드</b><br/>" +
                    "RUN: 달리기<br/>" +
                    "PUS: 윗몸 일으키기<br/>" +
                    "SQU: 스쿼트<br/>" +
                    "BUR: 버피<br/>" +
                    "PUL: 턱걸이<br/>" +
                    "PLA: 플랭크")
    @ApiResponse(responseCode = "200", description = "유저 정보 응답")
    @GetMapping("/list/{userCode}")
    public ResponseEntity<DailyQuestResponse> getDailyQuests(@PathVariable long userCode) {
        return questService.getDailyQuests(userCode);
    }

    @Operation(summary = "퀘스트 등록 (운동)",
            description = "운동 기록 퀘스트 등록<br/><br/>" +
                    "<b>exercise 코드</b><br/>" +
                    "RUN: 달리기<br/>" +
                    "PUS: 윗몸 일으키기<br/>" +
                    "SQU: 스쿼트<br/>" +
                    "BUR: 버피<br/>" +
                    "PUL: 턱걸이<br/>" +
                    "PLA: 플랭크")
    @ApiResponse(responseCode = "200", description = "퀘스트 등록 성공")
    @PostMapping("/record")
    public ResponseEntity<?> exerciseRecord(@RequestBody QuestRequest request) {
        questService.exerciseRecord(request);
        questService.checkFinish(request.getUserCode());
        return ResponseEntity.ok().build();
    }

}

