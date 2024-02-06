package com.sixman.fattle.api.service;

import com.sixman.fattle.dto.dto.ExerciseDto;
import com.sixman.fattle.dto.request.QuestRequest;
import com.sixman.fattle.dto.response.DailyQuestResponse;
import com.sixman.fattle.entity.Quest;
import com.sixman.fattle.entity.Exercise;
import com.sixman.fattle.repository.ExerciseRepository;
import com.sixman.fattle.repository.ExerciseTypeRepository;
import com.sixman.fattle.repository.QuestRepository;
import com.sixman.fattle.utils.Const;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.sixman.fattle.utils.Const.*;

@Service
@Transactional
@RequiredArgsConstructor
public class QuestServiceImpl implements QuestService {

    private final ExpService expService;
    private final BattlePointService battlePointService;

    private final QuestRepository questRepository;
    private final ExerciseRepository exerciseRepository;
    private final ExerciseTypeRepository typeRepository;

    @Override
    public ResponseEntity<DailyQuestResponse> getDailyQuests(long userCode) {
        List<Exercise> exercises = exerciseRepository.getTodayExercise(userCode);

        ExerciseDto exerciseDto = new ExerciseDto(0, 0, 0, 0, 0, 0);

        for (Exercise exercise : exercises) {
            String exerciseCd = exercise.getTypeCd();

            switch (exerciseCd) {
                case EXERCISE_CODE_RUNNING:
                    exerciseDto.setRUN(1);
                    continue;
                case EXERCISE_CODE_BURPEE:
                    exerciseDto.setBUR(1);
                    continue;
                case EXERCISE_CODE_PLANK:
                    exerciseDto.setPLA(1);
                    continue;
                case EXERCISE_CODE_PULLUP:
                    exerciseDto.setPUL(1);
                    continue;
                case EXERCISE_CODE_PUSHUP:
                    exerciseDto.setPUS(1);
                    continue;
                case EXERCISE_CODE_SQUAT:
                    exerciseDto.setSQU(1);
            }
        }

        Quest lastQuest = getDailyQuest(userCode);

        DailyQuestResponse dailyQuest = DailyQuestResponse.builder()
                .foodCnt(lastQuest.getFoodCnt())
                .exercise(exerciseDto)
                .exerciseCnt(lastQuest.getExerciseCnt())
                .build();

        return ResponseEntity.ok(dailyQuest);
    }

    @Override
    public void questRecord(QuestRequest request) {
        Exercise exercise = Exercise.builder()
                .userCd(request.getUserCode())
                .typeCd(request.getExercise())
                .build();

        exerciseRepository.save(exercise);

        String exTypeName = typeRepository.getName(request.getExercise());

        expService.setExp(request.getUserCode(), Const.EXP_TYPE_EXERCISE, exTypeName, Const.DAILY_QUEST_EXP);
    }

    @Override
    public Quest getDailyQuest(long userCode) {
        return questRepository.getDailyQuest(userCode);
    }

    @Override
    public void createQuest(long userCode) {
        questRepository.createQuest(userCode);
        expService.setExp(userCode, EXP_TYPE_DAILY, EXP_TYPE_DAILY, DAILY_QUEST_EXP);
    }

    @Override
    public void checkFinish(long userCode) {
        int cnt = questRepository.getCount(userCode);

        if (cnt == 5) {
            questRepository.setFinish(userCode);
            battlePointService.quest(userCode);
            expService.setExp(userCode, EXP_TYPE_FINISH, EXP_CONTENT_DAILY, DAILY_QUEST_FINISH_EXP);
        }
    }

}
