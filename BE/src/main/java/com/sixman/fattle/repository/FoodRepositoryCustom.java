package com.sixman.fattle.repository;

import com.sixman.fattle.dto.dto.FoodSearchDto;
import com.sixman.fattle.dto.request.FoodUploadRequest;
import com.sixman.fattle.entity.Food;

import java.util.List;

public interface FoodRepositoryCustom {

    List<Food> todaysFood(long userCode);

    int foodCount(long userCode, int type);

    void setFood(FoodUploadRequest request);

    List<FoodSearchDto> foodSearch(String word);

}
