## Service Introduction

<br/>

https://jasoseoai.co.kr/

<br/>

<img width="660" alt="image" src="https://github.com/peterhyun1234/jasoseoai_nextjs/assets/46476398/384b17b7-c3e9-4ca3-a654-a383a0ce70f9">

<br/>

자소서 AI는 사용자의 개별적인 필요와 상황에 맞게 **맞춤형 자기소개서를 작성**하는 데 도움을 줍니다. 

모든 사용자에게 더 나은 경험을 제공하고자 모든 기능은 **무료로 제공**됩니다. 그러나 무분별한 사용을 막기 위해 **각 계정에는 사용 제한**이 있습니다.

<br/>

## Table of Contents

- [1. Feature Introduction](#1-feature-introduction)
  - [1.1. 자기소개서 생성](#11-자기소개서-생성)
  - [1.2. 자기소개서 문장 추천](#12-자기소개서-문장-추천)
  - [1.3. 자기소개서 첨삭](#13-자기소개서-첨삭)
- [2. DevOps](#2-devops)
  - [2.1. DevOps pipeline](#21-devops-pipeline)
  - [2.2. API Health Test](#22-api-health-test)
  - [2.3. Monitoring](#23-monitoring)
  - [2.4. CI/CD pipeline](#24-cicd-pipeline)
- [3. API Server](#3-api-server)
  - [3.1. API Documentation](#31-api-documentation)
  - [3.2. API Server Interaction](#32-api-server-interaction)
- [4. How to use](#4-how-to-use)
- [Contacts](#contacts)

## 1. Feature Introduction

### 1.1. 자기소개서 생성
- **특징**:
  - model: gpt-4
  - temperature: 0.3
  - max_tokens: 4000
- **설명**: 회사와 개인의 특성을 분석하여, AI가 최적화된 자기소개서를 작성

<kbd>
  <img src="https://github.com/peterhyun1234/jasoseoai_nextjs/assets/46476398/4051d3ee-58e6-42d3-a4f6-64f42f0091c0" width="800" style="border: 1px solid gray;">
</kbd>

### 1.2. 자기소개서 문장 추천
- **특징**:
  - model: gpt-3.5-turbo
  - temperature: 0.5
  - max_tokens: 2000
- **설명**: 작성 중인 자기소개서와 제공하신 회사 정보, 개인 정보 기반 다음 문장 추천

<kbd>
  <img src="https://github.com/peterhyun1234/jasoseoai_nextjs/assets/46476398/a7522457-84aa-4a1b-a67c-a2d813adcede" width="800" style="border: 1px solid gray;">
</kbd>

### 1.3. 자기소개서 첨삭
- **특징**:
  - model: gpt-4
  - temperature: 0.3
  - max_tokens: 4000
- **설명**: 자기소개서에 대한 맞춤법 검사, 잘 쓴 점, 그리고 개선할 점을 상세하게 첨삭

<kbd>
  <img src="https://github.com/peterhyun1234/jasoseoai_nextjs/assets/46476398/698741c5-a3e6-4079-8b05-9fa5c25c6549" width="800" style="border: 1px solid gray;">
</kbd>



## 2. DevOps
### 2.1. DevOps pipeline

![image](https://github.com/peterhyun1234/neodohae_nextjs/assets/46476398/dff5ccdf-22c9-4a61-93e1-82f4803c0df9)

### 2.2. API Health Test
- 1분마다 각 API 호출을 통해서 서비스의 상태를 파악하고 관리자에게 알림을 보내는 시스템 구현

![image](https://github.com/peterhyun1234/neodohae_nextjs/assets/46476398/5e79b0b5-07ad-439b-bd6a-e64254c06600)


### 2.3. Monitoring
- Grafana, Loki, Promtail 기반 서버와 컨테이너의 메트릭, 로그를 수집하고 가시화하고 특정 상황에 맞게 알림 전송

![image](https://github.com/peterhyun1234/neodohae_nextjs/assets/46476398/482a85eb-95af-4b8f-b08c-e8a5dd88541e)

### 2.4. CI/CD pipeline
- Github actions를 통해서 ECR에 이미지가 저장되고, ArgoCD를 통해서 무중단 배포

![image](https://github.com/peterhyun1234/neodohae_nextjs/assets/46476398/cad3bdee-98ba-4e39-a08b-f1c99693e8eb)

## 3. API Server

### 3.1. API Server Interaction

<img src="https://github.com/peterhyun1234/jasoseoai_nextjs/assets/46476398/40610b3c-22e9-42b6-b5b1-399e30a6f3f7" width="500" alt="API Server Interaction">


### 3.2. API Documentation
- Swagger를 통한 REST API 문서화

<img src="https://github.com/peterhyun1234/neodohae_nextjs/assets/46476398/ebdce80e-53f1-45c4-861a-d0d511b8d717" width="800" alt="Documentation">

## 4. How to use

```bash

# Clone this repo
git clone https://github.com/peterhyun1234/jasoseoai_nextjs.git

# Create a files named `.env.development` and `.env.production` in the root directory of your project.
# Open the files and add the following environment variables:
RDS_HOSTNAME
RDS_PORT
RDS_USERNAME
RDS_PASSWORD
RDS_DB_NAME
OPENAI_API_KEY
JWT_SECRET
PORT

# Run
npm run start:dev
```

## Contacts
- email: peterhyun1234@gmail.com
- https://peterjeon.co.kr/
