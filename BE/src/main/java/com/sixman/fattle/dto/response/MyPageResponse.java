package com.sixman.fattle.dto.response;

import com.sixman.fattle.dto.dto.DailyQuestDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MyPageResponse {

    private long userCode;
    private String nickname;
    private int followerCnt;
    private int followingCnt;
    private String introduction;
    private float goalWeight;
    private int goalCalory;
    private int goalCarbo;
    private int goalProtein;
    private int goalFat;
    private List<DailyQuestDto> dailyQuests;
    private String avatarCode;
    private String imgPath;
    private String profileImgPath;

}
