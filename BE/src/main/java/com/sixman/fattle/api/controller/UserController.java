package com.sixman.fattle.api.controller;

import com.sixman.fattle.api.service.UserService;
import com.sixman.fattle.dto.request.SignUpRequest;
import com.sixman.fattle.dto.request.UserInfoRequest;
import com.sixman.fattle.dto.response.UserInfoResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Tag(name = "User 컨트롤러", description = "유저 관리 API")
public class UserController {

    private final UserService userService;

    @Operation(summary = "로그인",
            description = "유저 코드를 통해 로그인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그인 성공"),
            @ApiResponse(responseCode = "204", description = "회원가입 필요")
    })
    @GetMapping("/login/{userCode}")
    public ResponseEntity<?> login(@PathVariable long userCode) {
        return ResponseEntity.status(userService.login(userCode)).build();
    }

    @Operation(summary = "회원가입",
            description = "유저 정보를 받아 회원가입")
    @ApiResponse(responseCode = "201", description = "회원가입 성공")
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest request) {
        userService.signUp(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "닉네임 중복 확인",
            description = "기존에 존재하는 닉네임인지 확인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "닉네임 사용 가능"),
            @ApiResponse(responseCode = "204", description = "닉네임 중복")
    })
    @GetMapping("/nickname/{nickname}")
    public ResponseEntity<?> checkNickname(@PathVariable String nickname) {
        return ResponseEntity.status(userService.checkNickname(nickname)).build();
    }

    @Operation(summary = "유저 정보",
            description = "유저 코드를 받아 유저 정보를 응답")
    @ApiResponse(responseCode = "200", description = "유저 정보 응답")
    @GetMapping("/userinfo/{userCode}")
    public ResponseEntity<UserInfoResponse> userInfo(@PathVariable long userCode) {
        UserInfoResponse response = userService.userInfo(userCode);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "유저 정보 수정",
            description = "유저의 체중, 신장 정보 수정")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "유저 정보 수정 성공"),
            @ApiResponse(responseCode = "400", description = "존재하지 않는 유저")
    })
    @PatchMapping("/userinfo/modify")
    public ResponseEntity<?> modifyUser(@RequestBody UserInfoRequest request) {
        HttpStatus status = userService.modifyUserInfo(request);
        return ResponseEntity.status(status).build();
    }

}
