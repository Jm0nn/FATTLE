package com.sixman.fattle.api.controller;

import com.sixman.fattle.api.service.BattleCommentService;
import com.sixman.fattle.dto.request.CommentModifyRequest;
import com.sixman.fattle.dto.request.CommentRegistRequest;
import com.sixman.fattle.dto.response.CommentListResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/battle/comment")
@RequiredArgsConstructor
@Tag(name = "Battle Comment 컨트롤러", description = "배틀 식단 댓글을 위한 API")
public class BattleCommentController {

    private final BattleCommentService commentService;

    @Operation(summary = "배틀 식단 댓글 리스트",
            description = "배틀 식단 댓글 리스트 조회")
    @ApiResponse(responseCode = "200", description = "댓글 리스트 조회 성공")
    @GetMapping("/list/{boardCode}")
    public ResponseEntity<CommentListResponse> getCommentList(@PathVariable int boardCode) {
        CommentListResponse response = commentService.getCommentList(boardCode);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "배틀 식단 댓글 등록",
            description = "배틀 식단 댓글 등록")
    @ApiResponse(responseCode = "200", description = "댓글 등록 성공")
    @PostMapping("/regist")
    public ResponseEntity<?> registComment(@RequestBody CommentRegistRequest request) {
        commentService.registComment(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "배틀 식단 댓글 수정",
            description = "배틀 식단 댓글 수정")
    @ApiResponse(responseCode = "200", description = "댓글 수정 성공")
    @PutMapping("/modify")
    public ResponseEntity<?> modifyComment(@RequestBody CommentModifyRequest request) {
        commentService.modifyCommment(request);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "배틀 식단 댓글 삭제",
            description = "배틀 식단 댓글 삭제")
    @ApiResponse(responseCode = "200", description = "댓글 삭제 성공")
    @DeleteMapping("/delete/{commentCode}")
    public ResponseEntity<?> deleteComment(@PathVariable int commentCode) {
        commentService.deleteComment(commentCode);
        return ResponseEntity.ok().build();
    }

}
