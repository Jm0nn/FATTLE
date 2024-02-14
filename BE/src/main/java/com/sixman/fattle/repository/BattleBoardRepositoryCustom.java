package com.sixman.fattle.repository;

import com.sixman.fattle.dto.dto.BoardDto;
import com.sixman.fattle.dto.request.FoodUploadRequest;

import java.util.List;

public interface BattleBoardRepositoryCustom {

    List<BoardDto> getBoardList(String battleCode);

    void registBoard(FoodUploadRequest request, List<String> codeList);

}
