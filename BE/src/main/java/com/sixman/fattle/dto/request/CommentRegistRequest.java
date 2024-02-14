package com.sixman.fattle.dto.request;

import lombok.Getter;

@Getter
public class CommentRegistRequest {

    private int boardCode;

    private long userCode;

    private String content;

}
