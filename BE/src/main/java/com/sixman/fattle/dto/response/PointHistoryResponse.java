package com.sixman.fattle.dto.response;

import com.sixman.fattle.dto.dto.PointHistoryDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PointHistoryResponse {

    private List<PointHistoryDto> list;

}
