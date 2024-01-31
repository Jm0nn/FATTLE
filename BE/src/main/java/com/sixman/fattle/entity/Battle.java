package com.sixman.fattle.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Data
@Builder
@Table(name = "battle_tb")
public class Battle {

    @Id
    @Column(name = "battle_cd")
    private String battleCd;

    @Column(name = "creator_cd")
    private long creatorCd;

    @Column(name = "name")
    private String name;

    @Column(name = "start_dt")
    @CreationTimestamp
    private Timestamp startDt;

    @Column(name = "end_dt")
    private Timestamp endDt;

    @Column(name = "contract_path")
    private String contractPath;

    @Column(name = "status")
    private int status;

}
