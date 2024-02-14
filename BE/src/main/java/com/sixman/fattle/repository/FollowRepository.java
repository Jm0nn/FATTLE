package com.sixman.fattle.repository;

import com.sixman.fattle.entity.Follow;
import com.sixman.fattle.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    int countByToUser(User toUser);
    int countByFromUser(User fromUser);

    List<Follow> findByFromUser(User fromUser);
    List<Follow> findByToUser(User toUser);
}