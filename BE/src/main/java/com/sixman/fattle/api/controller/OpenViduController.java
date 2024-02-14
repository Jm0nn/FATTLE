package com.sixman.fattle.api.controller;

import io.openvidu.java.client.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/openvidu")
@RequiredArgsConstructor
@Tag(name = "OpenVidu 컨트롤러", description = "화상 서비스를 위한 OpenVidu API")
public class OpenViduController {

    @Value("${openvidu.public-ip}")
    private String OPENVIDU_URL;

    @Value("${openvidu.secret}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    @Operation(summary = "Session 시작",
            description = "OpenVidu session 시작")
    @ApiResponse(responseCode = "200", description = "세션 ID 응답")
    @PostMapping("/sessions")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);
        return ResponseEntity.ok(session.getSessionId());
    }

    @Operation(summary = "Session 연결",
            description = "OpenVidu session에 연결")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Session connection token 응답"),
            @ApiResponse(responseCode = "404", description = "Session을 찾지 못함")
    })
    @PostMapping("/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return ResponseEntity.notFound().build();
        }
        ConnectionProperties properties = new ConnectionProperties.Builder()
                .type(ConnectionType.WEBRTC)
                .data("user_data")
                .role(OpenViduRole.PUBLISHER)
                .kurentoOptions(
                        new KurentoOptions.Builder()
                                .allowedFilters(new String[]{"GStreamerFilter"})
                                .build())
                .build();
        Connection connection = session.createConnection(properties);
        return ResponseEntity.ok(connection.getToken());
    }

}
