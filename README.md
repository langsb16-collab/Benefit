# 지역화폐 O2O 플랫폼-Benefit (베네핏)

## 프로젝트 개요

**목표**: 지역 소상공인의 디지털 전환을 지원하고, 지역화폐와 연계하여 골목 상권의 자생력을 강화하며, 새로운 지역 일자리를 창출하는 공공·민관협력 O2O 플랫폼

**주요 기능**:
- 다국어 지원 챗봇 (한국어, 영어, 중국어, 일본어, 베트남어, 태국어, 아랍어)
- 세련된 UI/UX 디자인
- 반응형 웹 디자인
- FAQ 기반 고객 지원 시스템
- 애니메이션 효과

## 기술 스택

- **Backend**: Hono.js (TypeScript) - 서버 사이드 렌더링
- **Frontend**: 순수 JavaScript (Vanilla JS) - 챗봇 기능
- **스타일**: Tailwind CSS (CDN), Font Awesome
- **배포**: Cloudflare Pages
- **개발 서버**: Wrangler, PM2

## 세 가지 핵심 혜택

### 1. 소상공인 부담 감소
- 민간 플랫폼 대비 수수료 **1~2%**로 대폭 절감
- 광고비·입점비 제로
- 연간 평균 800만원 절감
- 실질 순이익 증가

### 2. 지역경제 선순환
- 지역화폐 이용률 확대 및 수수료 지역 내 환류
- 역외 유출 차단
- 전통시장 활성화
- 상권 데이터 분석 제공

### 3. 일자리 창출
- 1개 시군 기준 **80~150명** 직간접 고용
- 배달·픽업 인력
- 플랫폼 운영·IT 유지보수
- 전통시장 물류센터

## 주요 기능

### 소비자 기능
- 지역화폐 결제 (카드/모바일)
- 즉시 할인·캐시백 (최대 10%)
- 가까운 소상공인 우선 노출
- 배달·포장·전통시장 장보기
- 마을 단위 공동구매
- 지역행사/축제 연계 쿠폰

### 소상공인 기능
- 수수료 1~2% 고정
- 광고비·입점비 무료
- POS/PDA 연동
- 지역화폐 신규 등록 자동 안내
- 메뉴 자동 등록 (사진·가격 OCR)
- 익일 정산 시스템

### 행정 기능
- 데이터 기반 상권 분석
- 지역화폐 소비 분석
- 시장/골목상권 활성화 지표
- 설문·긴급 공지 발송
- 정책 연계 대시보드

### 보안·안정성
- TLS/SSL 전송 암호화
- 이중 서버/Failover 시스템
- 결제 이력 암호화 저장
- 24시간 장애 모니터링
- 자동 환불/취소 처리

## 성공 사례

### 경기도 '배달특급'
- 29개 시군 서비스 제공
- 누적 거래액 **3,800억원** 돌파
- 가맹점 **5.2만개** 확보
- 회원 수 **150만명** 돌파
- 소상공인 수수료 절감 **380억원**

### 대구 '대구로'
- 중개 수수료 **1%** 운영
- 소상공인 총 **105억원** 수수료 절감
- 지역화폐 연계 최대 10% 할인
- 농특산물 라이브 커머스 연계
- 전통시장 장보기 서비스

## 로컬 개발 환경 설정

### 1. 의존성 설치
```bash
cd /home/user/webapp
npm install
```

### 2. 빌드
```bash
npm run build
```

### 3. 개발 서버 시작 (PM2 사용)
```bash
# 포트 정리
npm run clean-port

# PM2로 서버 시작
pm2 start ecosystem.config.cjs

# 서버 테스트
npm test

# 로그 확인
pm2 logs webapp --nostream
```

### 4. 서버 관리
```bash
# 서버 재시작
pm2 restart webapp

# 서버 중지
pm2 stop webapp

# 서버 삭제
pm2 delete webapp

# 상태 확인
pm2 list
```

## API 엔드포인트

### GET /api/faq
FAQ 데이터를 가져옵니다.

**Query Parameters**:
- `lang`: 언어 코드 (ko, en, zh, ja, vi, th, ar)

**Response**:
```json
{
  "title": "자주 묻는 질문",
  "questions": [
    {
      "q": "질문",
      "a": "답변"
    }
  ]
}
```

## 프로젝트 구조

```
webapp/
├── src/
│   ├── index.tsx           # Hono 애플리케이션 메인 파일
│   └── renderer.tsx        # SSR 렌더러
├── public/
│   └── static/
│       ├── app.js          # 프론트엔드 JavaScript
│       └── style.css       # 커스텀 스타일
├── dist/                   # 빌드 결과물
├── ecosystem.config.cjs    # PM2 설정
├── wrangler.jsonc          # Cloudflare 설정
├── package.json            # 프로젝트 설정
├── tsconfig.json           # TypeScript 설정
├── vite.config.ts          # Vite 설정
└── README.md               # 프로젝트 문서
```

## 배포

### Cloudflare Pages 배포
```bash
# 빌드
npm run build

# 배포
npm run deploy

# 프로덕션 배포
npm run deploy:prod
```

## 다국어 지원

현재 지원하는 언어:
- 🇰🇷 한국어 (ko)
- 🇬🇧 영어 (en)
- 🇨🇳 중국어 (zh)
- 🇯🇵 일본어 (ja)
- 🇻🇳 베트남어 (vi)
- 🇹🇭 태국어 (th)
- 🇸🇦 아랍어 (ar)

## 특징

### 디자인
- 세련된 그라디언트 컬러 스킴
- 부드러운 애니메이션 효과
- 반응형 레이아웃
- 모던한 카드 디자인

### 챗봇
- 다국어 지원
- FAQ 기반 자동 응답
- 실시간 메시지 표시
- 스무스한 스크롤 효과

### 성능
- Cloudflare Pages 엣지 배포
- 빠른 로딩 속도
- CDN 기반 리소스 로딩
- 최적화된 번들 크기

## 개발 스크립트

```json
{
  "dev": "vite",                              // Vite 개발 서버
  "dev:sandbox": "wrangler pages dev ...",    // Wrangler 개발 서버
  "build": "vite build",                      // 프로젝트 빌드
  "preview": "wrangler pages dev dist",       // 프리뷰 서버
  "deploy": "npm run build && wrangler ...",  // 배포
  "deploy:prod": "npm run build && ...",      // 프로덕션 배포
  "clean-port": "fuser -k 3000/tcp ...",      // 포트 정리
  "test": "curl http://localhost:3000"        // 서버 테스트
}
```

## 라이선스

© 2024 Benefit Platform. All rights reserved.

## 문의

질문이나 제안사항이 있으시면 챗봇을 통해 문의해주세요.
