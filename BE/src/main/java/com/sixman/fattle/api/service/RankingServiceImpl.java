package com.sixman.fattle.api.service;

import com.sixman.fattle.dto.dto.RankingInfoDto;
import com.sixman.fattle.dto.response.RankingListResponse;
import com.sixman.fattle.entity.Ranking;
import com.sixman.fattle.repository.RankingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RankingServiceImpl implements RankingService {
    @Autowired
    private final RankingRepository rankingRepository;
    @Override
    public ResponseEntity<RankingListResponse> getRankingResponse(int page, Long userCode) {
        List<RankingInfoDto> rankingList = rankingRepository.getRankingList();
        Ranking ranking = rankingRepository.findByUserCd(userCode);
        int myRank = ranking.getRank();
        boolean end = rankingList.size() <= 10 * page;
        List<RankingInfoDto> rankingListInfo;
        if (!end) {
            rankingListInfo = rankingList.subList(10 * (page - 1), 10 * page);
        }
        else {
            rankingListInfo = rankingList.subList(10 * (page - 1), rankingList.size());
        }
        RankingListResponse rankingListResponse = RankingListResponse.builder()
                .rankingList(rankingListInfo)
                .myRank(myRank)
                .end(end)
                .build();
        return ResponseEntity.ok(rankingListResponse);
    }
}
