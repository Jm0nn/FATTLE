package com.sixman.fattle.dto.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SimpleBattleInfoDto {

    private String name;

    private int status;

    private Timestamp startDate;

    private Timestamp endDate;

}
