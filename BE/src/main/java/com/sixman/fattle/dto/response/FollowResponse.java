package com.sixman.fattle.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FollowResponse {

    private long userCode;
    private String nickname;
    private String avatarCode;
    private String imgPath;
    private String profileImgPath;

}
