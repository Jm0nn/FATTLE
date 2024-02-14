package com.sixman.fattle.api.service;

import com.sixman.fattle.dto.response.FollowResponse;
import com.sixman.fattle.dto.request.MyPageGoalUpdateRequest;
import com.sixman.fattle.dto.response.MyPageResponse;
import com.sixman.fattle.dto.request.MyPageUpdateRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MyPageService {
    ResponseEntity<MyPageResponse> getMyPageInfo(Long userCode);
    ResponseEntity<MyPageUpdateRequest> updateMyPageInfo(MyPageUpdateRequest myPageInfo);
    ResponseEntity<MyPageGoalUpdateRequest> updateGoalInfo(MyPageGoalUpdateRequest myPageGoalInfo);
    ResponseEntity<List<FollowResponse>> getFollowingList(Long userCode);
    ResponseEntity<List<FollowResponse>> getFollowerList(Long userCode);
}