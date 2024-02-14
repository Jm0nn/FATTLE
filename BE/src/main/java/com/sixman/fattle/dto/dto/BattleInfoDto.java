package com.sixman.fattle.dto.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BattleInfoDto {

    private String battleCode;

    private String name;

    private int status;

    private Timestamp startDate;

    private Timestamp endDate;

    private int triggerCnt;

    private long userCode;

    private String nickname;

    private String imgPath;

    private String profileImgPath;

    private List<SimpleBattlePlayerInfoDto> playerList;

}
