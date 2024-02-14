package com.sixman.fattle.dto.response;

import com.sixman.fattle.entity.Food;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TodaysFoodResponse {

    List<Food> list;

}
