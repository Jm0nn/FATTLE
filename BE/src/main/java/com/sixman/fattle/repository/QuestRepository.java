package com.sixman.fattle.repository;

import com.sixman.fattle.entity.Quest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface QuestRepository extends JpaRepository<Quest, Long>, QuestRepositoryCustom {

    List<Quest> findByUserCd(long userCd);

}
