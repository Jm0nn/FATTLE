package com.sixman.fattle.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sixman.fattle.dto.dto.BoardDto;
import com.sixman.fattle.dto.request.FoodUploadRequest;
import com.sixman.fattle.entity.QAvatar;
import com.sixman.fattle.entity.QFoodBoard;
import com.sixman.fattle.entity.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BattleBoardRepositoryImpl implements BattleBoardRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    private final QFoodBoard qboard = QFoodBoard.foodBoard;
    private final QUser quser = QUser.user;
    private final QAvatar qavatar = QAvatar.avatar;

    @Override
    public List<BoardDto> getBoardList(String battleCode) {
        return queryFactory
                .select(
                        Projections.constructor(
                                BoardDto.class,
                                qboard.foodBoardCd,
                                qboard.battleCd,
                                qboard.playerCd,
                                quser.nickname,
                                qavatar.profileImgPath,
                                qboard.recDt,
                                qboard.imgName))
                .from(qboard)
                .join(quser)
                .on(qboard.playerCd.eq(quser.userCd))
                .join(qavatar)
                .on(quser.avatarCd.eq(qavatar.avatarCd))
                .where(qboard.battleCd.eq(battleCode))
                .fetch();
    }

    @Override
    public void registBoard(FoodUploadRequest request, List<String> codeList) {
        for (String code : codeList) {
            queryFactory
                    .insert(qboard)
                    .columns(
                            qboard.battleCd,
                            qboard.playerCd,
                            qboard.imgName)
                    .values(
                            code,
                            request.getUserCode(),
                            request.getImgName())
                    .execute();
        }
    }

}
