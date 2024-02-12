package com.sixman.fattle.dto.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SimpleBattlePlayerInfoDto {

    private long userCode;

    private String nickname;

    private int liveStatus;

}
