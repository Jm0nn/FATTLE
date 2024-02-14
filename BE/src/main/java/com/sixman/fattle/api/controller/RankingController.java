package com.sixman.fattle.api.controller;

import com.sixman.fattle.api.service.RankingService;
import com.sixman.fattle.dto.response.RankingListResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rank")
@CrossOrigin("*")
@RequiredArgsConstructor
@Tag(name = "Ranking 컨트롤러", description = "랭킹 API")
public class RankingController {

    @Autowired
    private final RankingService rankingService;

    @Operation(summary = "랭킹 리스트",
            description = "랭킹 리스트 조회")
    @ApiResponse(responseCode = "200", description = "랭킹 리스트 응답")
    @GetMapping("/list/{userCode}")
    public ResponseEntity<RankingListResponse> getRankingResponse(@RequestParam int page, @PathVariable Long userCode) {
        return rankingService.getRankingResponse(page, userCode);
    }

}
