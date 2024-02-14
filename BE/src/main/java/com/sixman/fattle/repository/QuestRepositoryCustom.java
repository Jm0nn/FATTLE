package com.sixman.fattle.repository;

import com.sixman.fattle.dto.dto.DailyQuestCheckDto;
import com.sixman.fattle.dto.request.FoodUploadRequest;
import com.sixman.fattle.entity.Quest;

public interface QuestRepositoryCustom {

    Quest getDailyQuest(long userCode);

    void createQuest(long userCode);

    DailyQuestCheckDto check(long userCode);

    void setFinish(long userCode);

    void foodRecord(FoodUploadRequest request);

}
