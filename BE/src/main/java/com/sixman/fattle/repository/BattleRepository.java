package com.sixman.fattle.repository;

import com.sixman.fattle.entity.Battle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BattleRepository extends JpaRepository<Battle, String>, BattleRepositoryCustom {

    List<Battle> findByBattleCd(String battleCd);

}
