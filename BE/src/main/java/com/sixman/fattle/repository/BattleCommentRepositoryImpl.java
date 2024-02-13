package com.sixman.fattle.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sixman.fattle.dto.dto.CommentDto;
import com.sixman.fattle.dto.request.CommentModifyRequest;
import com.sixman.fattle.dto.request.CommentRegistRequest;
import com.sixman.fattle.entity.QAvatar;
import com.sixman.fattle.entity.QFoodBoard;
import com.sixman.fattle.entity.QFoodComment;
import com.sixman.fattle.entity.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BattleCommentRepositoryImpl implements BattleCommentRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    private final QFoodComment qcomment = QFoodComment.foodComment;
    private final QFoodBoard qboard = QFoodBoard.foodBoard;
    private final QUser quser = QUser.user;
    private final QAvatar qavatar = QAvatar.avatar;

    @Override
    public List<CommentDto> getCommentList(int boardCode) {
        return queryFactory
                .select(
                        Projections.constructor(
                                CommentDto.class,
                                qcomment.foodCommentCd,
                                qcomment.foodBoardCd,
                                qcomment.triggerCd,
                                quser.nickname,
                                qavatar.profileImgPath,
                                qcomment.content,
                                qcomment.recDt))
                .from(qcomment)
                .join(quser)
                .on(qcomment.triggerCd.eq(quser.userCd))
                .join(qavatar)
                .on(quser.avatarCd.eq(qavatar.avatarCd))
                .where(qcomment.foodBoardCd.eq(boardCode))
                .fetch();
    }

    @Override
    public void registComment(CommentRegistRequest request) {
        queryFactory
                .insert(qcomment)
                .columns(
                        qcomment.foodBoardCd,
                        qcomment.triggerCd,
                        qcomment.content)
                .values(
                        request.getBoardCode(),
                        request.getUserCode(),
                        request.getContent())
                .execute();
    }

    @Override
    public void modifyComment(CommentModifyRequest request) {
        queryFactory
                .update(qcomment)
                .set(qcomment.content, request.getContent())
                .where(qcomment.foodCommentCd.eq(request.getCommentCode()))
                .execute();
    }

    @Override
    public void deleteComment(int commentCode) {
        queryFactory
                .delete(qcomment)
                .where(qcomment.foodCommentCd.eq(commentCode))
                .execute();
    }

}
