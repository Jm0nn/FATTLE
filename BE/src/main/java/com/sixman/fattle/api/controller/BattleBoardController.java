package com.sixman.fattle.api.controller;

import com.sixman.fattle.api.service.BattleBoardService;
import com.sixman.fattle.dto.response.BoardListResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/battle/board")
@RequiredArgsConstructor
@Tag(name = "Battle Board 컨트롤러", description = "배틀 식단 게시판을 위한 API")
public class BattleBoardController {

    private final BattleBoardService boardService;

    @Operation(summary = "배틀 내기자 식단 리스트",
            description = "배틀 내기자 식단 리스트 조회")
    @ApiResponse(responseCode = "200", description = "식단 리스트 조회 성공")
    @GetMapping("/list/{battleCode}")
    public ResponseEntity<BoardListResponse> getBoardList(@PathVariable String battleCode) {
        BoardListResponse response = boardService.getBoardList(battleCode);
        return ResponseEntity.ok(response);
    }

}
