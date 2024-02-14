package com.sixman.fattle.dto.response;

import com.sixman.fattle.entity.ExpHistory;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ExpHistoryResponse {

    private List<ExpHistory> list;

}
