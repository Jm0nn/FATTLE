package com.sixman.fattle.api.service;

import com.sixman.fattle.dto.dto.CommentDto;
import com.sixman.fattle.dto.request.CommentModifyRequest;
import com.sixman.fattle.dto.request.CommentRegistRequest;
import com.sixman.fattle.dto.response.CommentListResponse;
import com.sixman.fattle.repository.BattleCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class BattleCommentService {

    private final BattleCommentRepository commentRepository;

    private final BattlePointService battlePointService;

    public CommentListResponse getCommentList(int boardCode) {
        List<CommentDto> list = commentRepository.getCommentList(boardCode);

        return CommentListResponse.builder()
                .list(list)
                .build();
    }

    public void registComment(CommentRegistRequest request) {
        commentRepository.registComment(request);
    }

    public void modifyCommment(CommentModifyRequest request) {
        commentRepository.modifyComment(request);
    }

    public void deleteComment(int commentCode) {
        commentRepository.deleteComment(commentCode);
    }

}
