# FATTLE 포팅 매뉴얼

## 목차

1. [환경설정](#1-환경설정)
    - [기술 스택](#기술-스택)
    - [외부 서비스](#외부-서비스)
2. [빌드 및 배포](#2-빌드-및-배포)
    - [환경변수 설정](#환경변수-설정)
    - [빌드](#빌드)
    - [배포](#배포)
3. [시연 시나리오](#3-시연-시나리오)

## 1. 환경설정

### 기술 스택

  - 이슈 관리: Jira
  - 형상 관리: Gitlab
  - 빌드/배포 관리: Jenkins
  - 커뮤니케이션: Mattermost, Notion, Discord
  - 디자인: Figma

  - 개발 환경
    - IDE
      - Visual Studio Code 1.85.1
      - IntelliJ IDEA 2023.3.3 (Community Edition)
    - 데이터베이스: MySQL 8.0.36
    - 서버: AWS EC2
      - Ubuntu 20.04.6 LTS
      - Nginx 1.18.0
      - OpenSSL 1.1.1f

    - Front-End
      - React 18.2.0
      - Redux 9.1.0
      - Node.js 20.10.0
      - OpenVidu 2.29.1

    - Back-End
      - Java 17 (Azul Zulu version 17.0.9)
      - Spring boot 3.2.2
      - Python 3.8.10
      - Pytorch 1.8.0
      - MySQL 8.0.36

### 외부 서비스

- Kakao OAuth: application.yml 참조
- ChatGPT API: .env 참조

## 2. 빌드 및 배포

### 환경변수 설정

- .env
  - ChatGPT
    ```env
    API_KEY={ChatGpt API key}
    ```

- config.js
  - API 통신 주소
    ```js
    const BASE_URL = {URL}/api
    ```

- application.yml
  - MySQL
    ```yml
    datasource:
      url: MySQL DB 주소
      username: MySQL 유저 이름
      password: MySQL 유저 비밀번호
    ```
  - OpenVidu
    ```yml
    openvidu:
      public-ip: OpenVidu IP 주소
      secret: OpenVidu secret key
    ```
  - Flask
    ```yml
    flask:
      connection-uri: Flask 주소
    ```

- application-oauth.yml
  - Kakao OAuth
    ```yml
    spring:
      security:
        oauth2:
          client:
            registration:
              kakao:
                client-id: Kakao API key
                redirect-uri: 카카오 로그인 후 Redirect할 주소 ({URL}/login-callback)
                client-secret: Kakao API secret
    ```
  - JWT
    ```yml
    jwt:
      token:
        secret-key: JWT secret key
    ```

### 빌드
- Front
  ```bash
  npm install
  npm run build
  ```

- Back-Spring
  ```bash
  chmod +x gradlew
  ./gradlew clean build -x test
  ```

- Back-Flask
  ```bash
  pip install -r requirements.txt
  python app.py
  ```

### 배포
- /etc/nginx/sites-available/default
    ```
    server {
        listen 80;
        server_name i10e106.p.ssafy.io;
        client_max_body_size 100M;
        return 301 https://$host$request_uri;
    }

    server {
        listen 443 ssl;

        server_name i10e106.p.ssafy.io;
        client_max_body_size 100M;

        ssl_certificate /etc/letsencrypt/live/i10e106.p.ssafy.io/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/i10e106.p.ssafy.io/privkey.pem;

        access_log   /var/log/nginx/access.log;
        error_log    /var/log/nginx/error.log;

        location /api {
            proxy_pass http://localhost:8000;
        }

        location /food_detect {
            proxy_pass http://localhost:5000;
        }

        location /{
            proxy_pass http://localhost:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
    ```
이후 sudo service nginx start


## 3. 시연 시나리오

