package com.sixman.fattle.api.service;

import com.sixman.fattle.dto.dto.DailyQuestDto;
import com.sixman.fattle.dto.response.FollowResponse;
import com.sixman.fattle.dto.request.MyPageGoalUpdateRequest;
import com.sixman.fattle.dto.response.MyPageResponse;
import com.sixman.fattle.dto.request.MyPageUpdateRequest;
import com.sixman.fattle.entity.Avatar;
import com.sixman.fattle.entity.Quest;
import com.sixman.fattle.entity.Follow;
import com.sixman.fattle.entity.User;
import com.sixman.fattle.repository.AvatarRepository;
import com.sixman.fattle.repository.QuestRepository;
import com.sixman.fattle.repository.FollowRepository;
import com.sixman.fattle.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final FollowRepository followRepository;

    @Autowired
    private final QuestRepository questRepository;

    @Autowired
    private final AvatarRepository avatarRepository;


    @Override
    public ResponseEntity<MyPageResponse> getMyPageInfo(Long userCode) {

        User user = userRepository.getUser(Long.parseLong(String.valueOf(userCode)));
        Avatar avatar = avatarRepository.findAvatarByAvatarCd(user.getAvatarCd());
        MyPageResponse myPageResponse = MyPageResponse.builder()
                .userCode(user.getUserCd())
                .nickname(user.getNickname())
                .introduction(user.getIntroduction())
                .goalWeight(user.getGoalWeight())
                .goalCalory(user.getGoalCalory())
                .goalCarbo(user.getGoalCarbo())
                .goalProtein(user.getGoalProtein())
                .goalFat(user.getGoalFat())
                .avatarCode(user.getAvatarCd())
                .imgPath(avatar.getImgPath())
                .profileImgPath(avatar.getProfileImgPath())
                .followerCnt(getFollowerCount(user))
                .followingCnt(getFollowingCount(user))
                .build();

        List<Quest> monthlyQuests = getMonthlyQuests(userCode);
        List<DailyQuestDto> monthlyQuestDTOs = monthlyQuests.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        myPageResponse.setDailyQuests(monthlyQuestDTOs);

        return ResponseEntity.ok(myPageResponse);
    }

    private List<Quest> getMonthlyQuests(long userCode) {
        User user = userRepository.getUser(userCode);
        List<Quest> quests = questRepository.findByUserCd(userCode);

        LocalDate now = LocalDate.now();
        int currentYear = now.getYear();
        Month currentMonth = now.getMonth();

        return quests.stream()
                .filter(dailyQuest -> {
                    LocalDate questDate = dailyQuest.getRecDt().toLocalDate();
                    return questDate.getYear() == currentYear && questDate.getMonth() == currentMonth;
                })
                .collect(Collectors.toList());
    }
    @Override

    public ResponseEntity<MyPageUpdateRequest> updateMyPageInfo(MyPageUpdateRequest myPageInfo) {
        userRepository.findById(myPageInfo.getUserCode())
                .ifPresent(user -> {
                    user.setNickname(myPageInfo.getNickname());
                    user.setIntroduction(myPageInfo.getIntroduction());
                    userRepository.save(user);
                });

        return ResponseEntity.ok(myPageInfo);
    }



    @Override
    public ResponseEntity<MyPageGoalUpdateRequest> updateGoalInfo(MyPageGoalUpdateRequest myPageGoalInfo) {
        userRepository.findById(myPageGoalInfo.getUserCode())
                .ifPresent(user -> {
                    user.setGoalWeight(myPageGoalInfo.getGoalWeight());
                    user.setGoalCalory(myPageGoalInfo.getGoalCalory());
                    user.setGoalCarbo(myPageGoalInfo.getGoalCarbo());
                    user.setGoalProtein(myPageGoalInfo.getGoalProtein());
                    user.setGoalFat(myPageGoalInfo.getGoalFat());
                    userRepository.save(user);
                });

        return ResponseEntity.ok(myPageGoalInfo);
    }

    @Override
    public ResponseEntity<List<FollowResponse>> getFollowingList(Long userCode) {
        User user = userRepository.getUser(userCode);
        List<Follow> following = followRepository.findByFromUser(user);
        List<User> followingList = following.stream()
                .map(Follow::getToUser)
                .toList();
        List<FollowResponse> response = new ArrayList<>();

        for (User u : followingList) {
            Avatar avatar = avatarRepository.findAvatarByAvatarCd(u.getAvatarCd());
            response.add(FollowResponse.builder()
                            .userCode(u.getUserCd())
                            .nickname(u.getNickname())
                            .avatarCode(u.getAvatarCd())
                            .imgPath(avatar.getImgPath())
                            .profileImgPath(avatar.getProfileImgPath())
                            .build());
        }
        return ResponseEntity.ok(response);

    }

    @Override
    public ResponseEntity<List<FollowResponse>> getFollowerList(Long userCode) {
        User user2 = userRepository.getUser(userCode);
        List<Follow> follower = followRepository.findByToUser(user2);
        List<User> followerList = follower.stream()
                .map(Follow::getFromUser)
                .toList();
        List<FollowResponse> response2 = new ArrayList<>();

        for (User u : followerList) {
            Avatar avatar = avatarRepository.findAvatarByAvatarCd(u.getAvatarCd());
            response2.add(FollowResponse.builder()
                    .userCode(u.getUserCd())
                    .nickname(u.getNickname())
                    .avatarCode(u.getAvatarCd())
                    .imgPath(avatar.getImgPath())
                    .profileImgPath(avatar.getProfileImgPath())
                    .build());
        }
        return ResponseEntity.ok(response2);
    }




    private int getFollowerCount(User user) {
        return followRepository.countByToUser(user);
    }

    private int getFollowingCount(User user) {
        return followRepository.countByFromUser(user);
    }





    private DailyQuestDto convertToDTO(Quest quest) {
        return DailyQuestDto.builder()
                .recordDate(quest.getRecDt())
                .userCd(quest.getUserCd())
                .dayCheck(quest.getDayChk())
                .exerciseCount(quest.getExerciseCnt())
                .foodCount(quest.getFoodCnt())
                .Finish(quest.getIsFinish())
                .build();
    }


}
