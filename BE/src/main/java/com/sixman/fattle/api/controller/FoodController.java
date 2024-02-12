package com.sixman.fattle.api.controller;

import com.sixman.fattle.api.service.FoodService;
import com.sixman.fattle.dto.dto.FoodInfoDto;
import com.sixman.fattle.dto.request.FoodUploadRequest;
import com.sixman.fattle.dto.response.FoodInfoResponse;
import com.sixman.fattle.dto.response.FoodSearchResponse;
import com.sixman.fattle.dto.response.TodaysFoodResponse;
import com.sixman.fattle.exceptions.FileSaveFailedException;
import com.sixman.fattle.exceptions.NoFileException;
import com.sixman.fattle.exceptions.NoImageExceptoin;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/food")
@RequiredArgsConstructor
@Tag(name = "Food 컨트롤러", description = "식단 업로드, 관리를 위한 API")
public class FoodController {

    private final FoodService foodService;

    @Operation(summary = "오늘의 식단",
            description = "오늘의 식단 조회")
    @ApiResponse(responseCode = "200", description = "식단 정보 응답")
    @GetMapping("/todays/{userCode}")
    public ResponseEntity<TodaysFoodResponse> todaysFood(@PathVariable long userCode) {
        TodaysFoodResponse response = foodService.todaysFood(userCode);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "음식 사진 업로드 & 음식 정보 얻기",
            description = "음식 사진을 업로드해 음식 정보 얻기")
    @ApiResponse(responseCode = "200", description = "음식 정보 응답")
    @PostMapping("/img-upload/{userCode}/{type}")
    public ResponseEntity<FoodInfoResponse> imgUpload(@PathVariable long userCode, @PathVariable int type, MultipartFile uploadFile)
            throws FileSaveFailedException, NoImageExceptoin, NoFileException {
        String imgPath = foodService.saveImage(userCode, type, uploadFile);
        FoodInfoDto info = foodService.getFoodInfo(imgPath);

        FoodInfoResponse response = FoodInfoResponse.builder()
                .name(info.getName())
                .gram(info.getGram())
                .calory(info.getCalory())
                .protein(info.getProtein())
                .fat(info.getFat())
                .imgPath(imgPath)
                .build();

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "식단 업로드",
            description = "식단을 업로드 해 서버에 저장<br/>type 1: 아침<br/>type 2: 점심<br/>type 3: 저녁")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "식단 업로드 성공"),
            @ApiResponse(responseCode = "400", description = "식단 중복 업로드")
    })
    @PostMapping("/upload")
    public ResponseEntity<?> foodUpload(@RequestBody FoodUploadRequest request) {
        HttpStatus status = foodService.foodUpload(request);
        return ResponseEntity.status(status).build();
    }

    @Operation(summary = "음식 검색",
            description = "키워드를 통해 음식 리스트 검색")
    @ApiResponse(responseCode = "200", description = "음식 검색 성공")
    @GetMapping("/search")
    public ResponseEntity<FoodSearchResponse> foodSearch(@RequestParam String word) {
        FoodSearchResponse response = foodService.foodSearch(word);
        return ResponseEntity.ok(response);
    }

}
