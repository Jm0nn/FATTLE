package com.sixman.fattle.repository;

import com.sixman.fattle.entity.ExpHistory;

import java.time.LocalDate;
import java.util.List;

public interface ExpRepositoryCustom {

    List<ExpHistory> getExpHistory(long userCode, LocalDate date);

    void setExp(long userCode, String type, String content, int exp);

}
