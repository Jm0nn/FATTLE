package com.sixman.fattle.dto.response;

import com.sixman.fattle.dto.dto.RankingInfoDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RankingListResponse {
    private List<RankingInfoDto> rankingList;
    private int myRank;
    private boolean end;
}
