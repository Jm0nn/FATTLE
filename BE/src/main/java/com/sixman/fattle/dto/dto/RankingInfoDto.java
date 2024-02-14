package com.sixman.fattle.dto.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RankingInfoDto {

    private int rank;
    private long userCode;
    private String nickName;
    private int growthExp;
    private int stackExp;
    private String imgPath;
    private String profileImgPath;

}
