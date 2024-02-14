package com.sixman.fattle.repository;

import com.sixman.fattle.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {

    List<User> findByUserCd(long userCd);

}
