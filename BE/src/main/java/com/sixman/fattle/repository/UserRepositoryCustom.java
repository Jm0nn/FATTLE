package com.sixman.fattle.repository;

import com.sixman.fattle.dto.request.SignUpRequest;
import com.sixman.fattle.dto.request.UserInfoRequest;
import com.sixman.fattle.dto.response.UserInfoResponse;
import com.sixman.fattle.entity.User;

public interface UserRepositoryCustom {

    User getUser(long userCode);

    void joinUser(SignUpRequest request);

    int checkNickname(String nickname);

    UserInfoResponse getUserInfo(long userCode);

    void setUserInfo(UserInfoRequest request);

}
