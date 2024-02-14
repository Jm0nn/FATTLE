package com.sixman.fattle.dto.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KakaoProfileDto {

    private Map<String, Object> attributes;

    public long getProviderId() {
        return Long.parseLong(String.valueOf(attributes.get("id")));
    }

}
