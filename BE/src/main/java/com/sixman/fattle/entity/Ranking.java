package com.sixman.fattle.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "ranking_vw")
@AllArgsConstructor
@NoArgsConstructor
public class Ranking {

    @Column(name = "rank")
    private int rank;

    @Id
    @Column(name = "user_cd")
    private long userCd;

    @Column(name = "nickname")
    private String nickName;

    @Column(name = "growth_exp")
    private int growthExp;

    @Column(name = "stack_exp")
    private int stackExp;

    @Column(name = "img_path")
    private String imgPath;

    @Column(name = "profile_img_path")
    private String profileImgPath;

    @Transient
    private int page;



}
