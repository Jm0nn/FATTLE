package com.sixman.fattle.api.service;

import com.sixman.fattle.dto.response.RankingListResponse;
import org.springframework.http.ResponseEntity;

public interface RankingService {
    ResponseEntity<RankingListResponse> getRankingResponse(int page, Long userCode);
}
