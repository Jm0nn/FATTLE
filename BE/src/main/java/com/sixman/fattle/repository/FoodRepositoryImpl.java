package com.sixman.fattle.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sixman.fattle.dto.dto.FoodSearchDto;
import com.sixman.fattle.dto.request.FoodUploadRequest;
import com.sixman.fattle.entity.Food;
import com.sixman.fattle.entity.QFood;
import com.sixman.fattle.entity.QFoodInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class FoodRepositoryImpl implements FoodRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    private final QFood qfood = QFood.food;
    private final QFoodInfo qinfo = QFoodInfo.foodInfo;

    @Override
    public List<Food> todaysFood(long userCode) {
        return queryFactory
                .select(qfood)
                .from(qfood)
                .where(qfood.userCd.eq(userCode),
                        qfood.recDt.after(LocalDate.now().atStartOfDay()))
                .fetch();
    }

    @Override
    public int foodCount(long userCode, int type) {
        return queryFactory
                .select(qfood.count())
                .from(qfood)
                .where(
                        qfood.userCd.eq(userCode),
                        qfood.type.eq(type),
                        qfood.recDt.after(LocalDate.now().atStartOfDay()))
                .fetchFirst()
                .intValue();
    }

    @Override
    public void setFood(FoodUploadRequest request) {
        queryFactory.insert(qfood)
                .columns(
                        qfood.userCd,
                        qfood.name,
                        qfood.type,
                        qfood.calory,
                        qfood.carbo,
                        qfood.protein,
                        qfood.fat,
                        qfood.imgPath)
                .values(
                        request.getUserCode(),
                        request.getName(),
                        request.getType(),
                        request.getCalory(),
                        request.getCarbo(),
                        request.getProtein(),
                        request.getFat(),
                        request.getImgPath())
                .execute();
    }

    @Override
    public List<FoodSearchDto> foodSearch(String word) {
        return queryFactory
                .select(
                        Projections.constructor(
                                FoodSearchDto.class,
                                qinfo.name,
                                qinfo.gram,
                                qinfo.calory,
                                qinfo.carbo,
                                qinfo.protein,
                                qinfo.fat))
                .from(qinfo)
                .where(qinfo.name.contains(word))
                .fetch();
    }

}
