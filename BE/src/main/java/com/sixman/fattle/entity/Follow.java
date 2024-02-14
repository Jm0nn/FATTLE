package com.sixman.fattle.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Table(name = "follow_tb")
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_cd")
    private int followCode;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "TO_USER_CD", referencedColumnName = "USER_CD")
    private User toUser;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "FROM_USER_CD", referencedColumnName = "USER_CD")
    private User fromUser;

}
