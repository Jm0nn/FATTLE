package com.sixman.fattle.repository;

import com.sixman.fattle.entity.Avatar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvatarRepository extends JpaRepository<Avatar, String> {

    Avatar findAvatarByAvatarCd(String avatarCd);

}
