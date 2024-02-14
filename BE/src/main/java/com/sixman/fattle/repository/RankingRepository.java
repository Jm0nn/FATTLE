package com.sixman.fattle.repository;

import com.sixman.fattle.dto.dto.RankingInfoDto;
import com.sixman.fattle.entity.Ranking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RankingRepository extends JpaRepository<Ranking, Integer> {

    @Query(value = "SELECT new com.sixman.fattle.dto.dto.RankingInfoDto(r.rank, r.userCd, r.nickName, r.growthExp, r.stackExp, r.imgPath, r.profileImgPath) FROM Ranking r")
    List<RankingInfoDto> getRankingList();

    Ranking findByUserCd(Long userCd);

}
