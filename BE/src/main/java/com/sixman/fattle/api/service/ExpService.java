package com.sixman.fattle.api.service;

import com.sixman.fattle.dto.response.ExpHistoryResponse;
import com.sixman.fattle.entity.ExpHistory;
import com.sixman.fattle.repository.ExpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ExpService {

    private final ExpRepository expRepository;

    public ExpHistoryResponse getExpHistory(long userCode, LocalDate date) {
        List<ExpHistory> list = expRepository.getExpHistory(userCode, date);
        return ExpHistoryResponse.builder()
                .list(list)
                .build();
    }

    public void setExp(long userCode, String type, String content, int exp) {
        expRepository.setExp(userCode, type, content, exp);
    }

}
