package com.sixman.fattle.repository;


import com.sixman.fattle.entity.ExerciseType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciseTypeRepository extends JpaRepository<ExerciseType, String>, ExerciseTypeRepositoryCustom {

    ExerciseType findByTypeCode(String typeCode);

}
