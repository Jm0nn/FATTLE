package com.sixman.fattle.api.service;

import com.sixman.fattle.dto.request.SignUpRequest;
import com.sixman.fattle.dto.request.UserInfoRequest;
import com.sixman.fattle.dto.response.UserInfoResponse;
import com.sixman.fattle.entity.Quest;
import com.sixman.fattle.entity.User;
import com.sixman.fattle.repository.QuestRepository;
import com.sixman.fattle.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final QuestService questService;

    public HttpStatus login(long userCode) {
        User user =  userRepository.getUser(userCode);

        if (user == null) {
            return HttpStatus.NO_CONTENT;
        }

        Quest quest = questService.getDailyQuest(userCode);

        if (quest == null) {
            questService.createQuest(userCode);
        }

        return HttpStatus.OK;

    }

    public void signUp(SignUpRequest request) {
        userRepository.joinUser(request);
    }

    public HttpStatus checkNickname(String nickname) {
        int cnt = userRepository.checkNickname(nickname);

        if (cnt == 0) {
            return HttpStatus.OK;
        } else {
            return HttpStatus.NOT_ACCEPTABLE;
        }
    }

    public UserInfoResponse userInfo(long userCode) {
        return userRepository.getUserInfo(userCode);
    }

    public HttpStatus modifyUserInfo(UserInfoRequest request) {
        long userCode = request.getUserCode();

        User user = userRepository.getUser(userCode);

        if (user == null) {
            return HttpStatus.BAD_REQUEST;
        } else {
            userRepository.setUserInfo(request);
            return HttpStatus.OK;
        }
    }

}
