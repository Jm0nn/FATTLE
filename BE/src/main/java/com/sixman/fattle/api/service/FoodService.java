package com.sixman.fattle.api.service;

import com.sixman.fattle.dto.dto.FoodImage;
import com.sixman.fattle.dto.response.FoodInfoResponse;
import com.sixman.fattle.dto.response.TodaysFoodResponse;
import com.sixman.fattle.entity.Food;
import com.sixman.fattle.exceptions.FileSaveFailedException;
import com.sixman.fattle.exceptions.NoFileException;
import com.sixman.fattle.exceptions.NoImageExceptoin;
import com.sixman.fattle.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class FoodService {

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

        String uploadPath = UPLOAD_PATH + "/" + userCode;
        String originalName = file.getOriginalFilename();

        String fileName = originalName.substring(originalName.lastIndexOf("/") + 1);

        System.out.println("fileName: "+fileName);

        // 날짜 폴더 생성
        String folderPath = makeFolder(uploadPath, type);

        // UUID
        String uuid = UUID.randomUUID().toString();

        // 저장할 파일 이름 중간에 "_"를 이용해서 구현
        String saveName = uploadPath + "/" + folderPath + "/" + uuid + "_" + fileName;

        System.out.println(saveName);

        Path savePath = Paths.get(saveName);

        try {
            file.transferTo(savePath); // 실제 이미지 저장
        } catch (IOException e) {
            throw new FileSaveFailedException("이미지 저장에 실패했습니다.");
        }

        return uploadPath + "/" + folderPath;
    }

    /*날짜 폴더 생성*/
    private String makeFolder(String uploadPath, int type) {
        String str = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));

        String folderPath = str + "/" + type;

        // make folder --------
        File uploadPathFolder = new File(uploadPath, folderPath);

        if (uploadPathFolder.exists()) {
            deleteDirectory(uploadPathFolder);
        }

        uploadPathFolder.mkdirs();
        System.out.println("make directory : " + uploadPath);

        return folderPath;
    }

    private void deleteDirectory(File directory) {
        File[] files = directory.listFiles();

        for (File file: Objects.requireNonNull(files)) {
            if (file.isDirectory()) {
                deleteDirectory(file);
            } else {
                file.delete();
            }
        }

        directory.delete();
    }

    public FoodInfoResponse getFoodInfo(String folderPath) {
        FoodImage body = FoodImage.builder()
                .source(folderPath)
                .build();

        return WebClient.create()
                .post()
                .uri(CONNECTION_URI)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .body(Mono.just(body), FoodImage.class)
                .retrieve()
                .bodyToMono(FoodInfoResponse.class)
                .block();
    }

}
