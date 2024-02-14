package com.sixman.fattle.repository;

import com.sixman.fattle.entity.FoodComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BattleCommentRepository extends JpaRepository<FoodComment, Long>, BattleCommentRepositoryCustom {
}
