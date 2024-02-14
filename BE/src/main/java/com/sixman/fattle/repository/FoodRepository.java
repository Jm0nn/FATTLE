package com.sixman.fattle.repository;

import com.sixman.fattle.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, Integer>, FoodRepositoryCustom {

    List<Food> findByFoodCd(int foodCd);

}
