package com.sixman.fattle.dto.response;

import com.sixman.fattle.dto.dto.BoardDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class BoardListResponse {

    private List<BoardDto> list;

}
