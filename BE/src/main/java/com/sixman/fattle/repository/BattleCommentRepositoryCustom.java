package com.sixman.fattle.repository;

import com.sixman.fattle.dto.dto.CommentDto;
import com.sixman.fattle.dto.request.CommentModifyRequest;
import com.sixman.fattle.dto.request.CommentRegistRequest;

import java.util.List;

public interface BattleCommentRepositoryCustom {

    List<CommentDto> getCommentList(int boardCode);

    void registComment(CommentRegistRequest request);

    void modifyComment(CommentModifyRequest request);

    void deleteComment(int commentCode);

}
