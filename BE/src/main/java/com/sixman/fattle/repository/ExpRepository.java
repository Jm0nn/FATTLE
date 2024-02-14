package com.sixman.fattle.repository;

import com.sixman.fattle.entity.ExpHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpRepository extends JpaRepository<ExpHistory, Long>, ExpRepositoryCustom {

    List<ExpHistory> findAllByUserCd(long userCd);

}
