package com.sixman.fattle.dto.response;

import com.sixman.fattle.dto.dto.FoodSearchDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FoodSearchResponse {

    private List<FoodSearchDto> list;

}
