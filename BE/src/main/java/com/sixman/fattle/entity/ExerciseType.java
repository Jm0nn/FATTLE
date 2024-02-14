package com.sixman.fattle.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "exercise_type_tb")
public class ExerciseType {

    @Id
    @Column(name = "type_cd")
    private String typeCode;

    @Column(name = "name")
    private String name;

}
