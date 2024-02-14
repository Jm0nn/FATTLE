package com.sixman.fattle.dto.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {

    private int boardCode;

    private String battleCode;

    private long playerCode;

    private String nickname;

    private String profileImgPath;

    private LocalDateTime recDt;

    private String imgName;

}
