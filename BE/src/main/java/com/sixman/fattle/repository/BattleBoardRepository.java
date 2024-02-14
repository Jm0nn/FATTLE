package com.sixman.fattle.repository;

import com.sixman.fattle.entity.FoodBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BattleBoardRepository extends JpaRepository<FoodBoard, Long>, BattleBoardRepositoryCustom {
}
