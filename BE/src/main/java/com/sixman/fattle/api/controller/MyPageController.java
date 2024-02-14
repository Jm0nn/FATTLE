package com.sixman.fattle.api.controller;

import com.sixman.fattle.api.service.MyPageService;
import com.sixman.fattle.dto.response.FollowResponse;
import com.sixman.fattle.dto.request.MyPageGoalUpdateRequest;
import com.sixman.fattle.dto.response.MyPageResponse;
import com.sixman.fattle.dto.request.MyPageUpdateRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/user/mypage")
@CrossOrigin("*")
@RequiredArgsConstructor
@Tag(name = "MyPage 컨트롤러", description = "마이페이지 API")
public class MyPageController {

    private final MyPageService myPageService;

    @Operation(summary = "마이페이지 조회",
            description = "유저코드를 통해 마이페이지 조회")
    @ApiResponse(responseCode = "200", description = "마이페이지 조회 응답")
    @GetMapping("/{userCode}")
    public ResponseEntity<MyPageResponse> getMyPageInfo(@PathVariable Long userCode) {
        return myPageService.getMyPageInfo(userCode);
    }

    @Operation(summary = "회원 정보 수정",
            description = "마이페이지에서 유저가 입력한 데이터로 회원 정보 수정")
    @ApiResponse(responseCode = "200", description = "유저 정보 변경 성공")
    @PatchMapping("/modify")
    public ResponseEntity<MyPageUpdateRequest> updateMyPageInfo(@RequestBody MyPageUpdateRequest myPageInfo) {
        return myPageService.updateMyPageInfo(myPageInfo);
    }

    @Operation(summary = "팔로잉 리스트 조회",
            description = "유저코드를 통해 팔로잉 리스트 조회")
    @ApiResponse(responseCode = "200", description = "팔로잉 리스트 조회 성공")
    @GetMapping("/following/{userCode}")
    public ResponseEntity<List<FollowResponse>> getFollowingList(@PathVariable Long userCode) {
        return myPageService.getFollowingList(userCode);
    }

    @Operation(summary = "팔로워 리스트 조회",
            description = "유저코드를 통해 팔로워 리스트 조회")
    @ApiResponse(responseCode = "200", description = "팔로워 리스트 조회 성공")
    @GetMapping("/follower/{userCode}")
    public ResponseEntity<List<FollowResponse>> getFollowerList(@PathVariable Long userCode) {
        return myPageService.getFollowerList(userCode);
    }

    @Operation(summary = "나의 목표 수정",
            description = "마이페이지에서 유저가 입력한 데이터로 나의 목표 수정")
    @ApiResponse(responseCode = "200", description = "나의 목표 수정 성공")
    @PatchMapping("/modify-goal")
    public ResponseEntity<?> updateGoalInfo(@RequestBody MyPageGoalUpdateRequest request) {
        return myPageService.updateGoalInfo(request);
    }

}