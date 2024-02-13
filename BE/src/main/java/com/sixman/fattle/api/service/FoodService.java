package com.sixman.fattle.api.service;

import com.sixman.fattle.dto.dto.FoodImageDto;
import com.sixman.fattle.dto.dto.FoodInfoDto;
import com.sixman.fattle.dto.dto.FoodSearchDto;
import com.sixman.fattle.dto.request.FoodUploadRequest;
import com.sixman.fattle.dto.response.FoodSearchResponse;
import com.sixman.fattle.dto.response.TodaysFoodResponse;
import com.sixman.fattle.entity.Food;
import com.sixman.fattle.exceptions.FileSaveFailedException;
import com.sixman.fattle.exceptions.NoFileException;
import com.sixman.fattle.exceptions.NoImageExceptoin;
import com.sixman.fattle.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class FoodService {

    private final BattlePointService battlePointService;
    private final BattleBoardService battleBoardService;
    private final QuestService questService;

    private final FoodRepository foodRepository;

    @Value("${flask.img-path}")
    private String UPLOAD_PATH;

    @Value("${flask.connection-uri}")
    private String CONNECTION_URI;

    public TodaysFoodResponse todaysFood(long userCode) {
        List<Food> foodList = foodRepository.todaysFood(userCode);

        return TodaysFoodResponse.builder()
                .list(foodList)
                .build();
    }

    public String saveImage(long userCode, int type, MultipartFile file)
            throws NoFileException, NoImageExceptoin, FileSaveFailedException {
        if(file == null){
            throw new NoFileException("파일이 존재하지 않습니다.");
        }

        if (!Objects.requireNonNull(file.getContentType()).startsWith("image")) {
            throw new NoImageExceptoin("이미지 파일이 아닙니다.");
        }

        String originalName = file.getOriginalFilename();

        String fileName = originalName.substring(originalName.lastIndexOf("/") + 1);

        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy_MM_dd"));

        // UUID
        String uuid = UUID.randomUUID().toString();

        // 저장할 파일 이름 중간에 "_"를 이용해서 구현
        String saveName = uuid + "_" + userCode + "_" + date + "_" + type + "_" + fileName;

        Path savePath = Paths.get(UPLOAD_PATH + "/" + saveName);

        try {
            file.transferTo(savePath); // 실제 이미지 저장
        } catch (IOException e) {
            throw new FileSaveFailedException("이미지 저장에 실패했습니다.");
        }

        return saveName;
    }

    public FoodInfoDto getFoodInfo(String imgPath) {
        FoodImageDto body = FoodImageDto.builder()
                .source(UPLOAD_PATH + "/" + imgPath)
                .build();

        return WebClient.create()
                .post()
                .uri(CONNECTION_URI)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .body(Mono.just(body), FoodImageDto.class)
                .retrieve()
                .bodyToMono(FoodInfoDto.class)
                .block();
    }

    public HttpStatus foodUpload(FoodUploadRequest request) {
        int cnt = foodRepository.foodCount(request.getUserCode(), request.getType());
        if (cnt == 0) {
            foodRepository.setFood(request);

            questService.foodRecord(request);
            questService.checkFinish(request.getUserCode());

            battlePointService.foodUpload(request.getUserCode());
            battleBoardService.registBoard(request);
            return HttpStatus.CREATED;
        } else {
            return HttpStatus.BAD_REQUEST;
        }
    }

    public FoodSearchResponse foodSearch(String word) {
        List<FoodSearchDto> list = foodRepository.foodSearch(word);

        return FoodSearchResponse.builder()
                .list(list)
                .build();
    }

    public byte[] getImage(String name) throws IOException {
        InputStream in = new FileInputStream(UPLOAD_PATH + "/" + name);
        return IOUtils.toByteArray(in);
    }

}
