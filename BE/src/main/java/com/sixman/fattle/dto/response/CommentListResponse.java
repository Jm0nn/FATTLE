package com.sixman.fattle.dto.response;

import com.sixman.fattle.dto.dto.CommentDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CommentListResponse {

    private List<CommentDto> list;

}
