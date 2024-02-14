package com.sixman.fattle.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "avatar_tb")
public class Avatar {

    @Id
    @Column(name = "avatar_cd")
    private String avatarCd;

    @Column(name = "level")
    private int level;

    @Column(name = "info")
    private String info;

    @Column(name = "img_path")
    private String imgPath;

    @Column(name = "profile_img_path")
    private String profileImgPath;

}
