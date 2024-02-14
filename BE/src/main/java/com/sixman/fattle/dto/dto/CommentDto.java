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
public class CommentDto {

    private int commentCode;

    private int boardCode;

    private long triggerCode;

    private String nickname;

    private String profileImgPath;

    private String content;

    private LocalDateTime recDt;

}
