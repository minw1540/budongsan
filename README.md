# 🏡 나만의 스마트 부동산 시트

> 개인화된 부동산 정보 관리 및 분석을 위한 웹/앱 통합 서비스

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Yarn Version](https://img.shields.io/badge/yarn-%3E%3D1.22.0-blue)](https://yarnpkg.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📖 프로젝트 개요

'나만의 스마트 부동산 시트'는 사용자가 개인화된 부동산 매물 정보를 효율적으로 관리하고 분석할 수 있도록 도와주는 웹/앱 통합 서비스입니다.

### 🎯 주요 기능

- **개인화된 매물 시트**: 사용자 맞춤형 매물 관리 및 비교 분석
- **실시간 시세 정보**: 국토부 API 연동을 통한 실거래가 정보 제공
- **스마트 알림**: 가격 변동 및 신규 매물 알림 서비스
- **데이터 시각화**: 시세 변동 추이 및 지역별 분석 차트
- **크로스 플랫폼**: 웹과 모바일 앱에서 동일한 서비스 제공

## 🏗️ 모노레포 구조

이 프로젝트는 Yarn Workspaces를 활용한 모노레포 구조로 구성되어 있습니다.

```
smart-real-estate/
├── apps/                          # 애플리케이션
│   ├── web/                       # Next.js 웹 애플리케이션
│   └── mobile/                    # React Native 모바일 앱
├── packages/                      # 공유 패키지
│   ├── backend/                   # Node.js Express 백엔드
│   ├── types/                     # TypeScript 타입 정의
│   └── common-utils/              # 공통 유틸리티 함수
├── docs/                          # 프로젝트 문서
├── package.json                   # 루트 패키지 설정
├── .gitignore                     # Git 무시 파일 목록
├── .env.example                   # 환경 변수 예시
└── README.md                      # 프로젝트 설명서
```

## 🛠️ 기술 스택

### Frontend

- **Web**: Next.js, React, TypeScript, Tailwind CSS, Shadcn UI
- **Mobile**: React Native, TypeScript, React Native Paper
- **State Management**: Zustand
- **Data Visualization**: Recharts (Web), React Native Chart Kit (Mobile)

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM/ODM**: Sequelize (MySQL), Mongoose (MongoDB)

### Database

- **관계형 DB**: MySQL (사용자 계정, 지역 정보, 거래 내역)
- **NoSQL DB**: MongoDB (개인화 데이터, 알림 설정)

### DevOps & Tools

- **Package Manager**: Yarn Workspaces
- **Code Quality**: ESLint, Prettier, Husky
- **Testing**: Jest, React Testing Library
- **Cloud**: AWS (RDS, MongoDB Atlas)

## 🚀 시작하기

### 필수 요구사항

- Node.js >= 18.0.0
- Yarn >= 1.22.0
- Git

### 설치 및 실행

1. **저장소 클론**

   ```bash
   git clone <repository-url>
   cd smart-real-estate
   ```

2. **의존성 설치**

   ```bash
   yarn install
   ```

3. **환경 변수 설정**

   ```bash
   cp .env.example .env
   # .env 파일을 편집하여 필요한 환경 변수를 설정하세요
   ```

4. **개발 서버 실행**

   ```bash
   # 모든 애플리케이션 동시 실행
   yarn dev

   # 개별 애플리케이션 실행
   yarn start:web      # 웹 애플리케이션
   yarn start:mobile   # 모바일 앱
   yarn start:backend  # 백엔드 서버
   ```

## 📝 스크립트 명령어

| 명령어                 | 설명                                 |
| ---------------------- | ------------------------------------ |
| `yarn dev`             | 모든 워크스페이스에서 개발 서버 실행 |
| `yarn build`           | 모든 워크스페이스 빌드               |
| `yarn test`            | 모든 워크스페이스 테스트 실행        |
| `yarn lint`            | 코드 린팅 검사                       |
| `yarn type-check`      | TypeScript 타입 검사                 |
| `yarn clean`           | 빌드 파일 및 node_modules 정리       |
| `yarn workspace:setup` | 초기 워크스페이스 설정               |

## 🧪 테스트

```bash
# 전체 테스트 실행
yarn test

# 커버리지 포함 테스트
yarn test:coverage

# 특정 워크스페이스 테스트
yarn workspace @smart-real-estate/web test
```

## 📁 개발 가이드

### 새로운 패키지 추가

1. `packages/` 또는 `apps/` 디렉토리에 새 폴더 생성
2. 해당 폴더에 `package.json` 파일 생성
3. 루트에서 `yarn install` 실행

### 패키지 간 의존성 추가

```bash
# 패키지 A에서 패키지 B 사용
yarn workspace package-a add package-b

# 외부 라이브러리 추가
yarn workspace package-a add lodash
```

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋합니다 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

프로젝트 관련 문의사항이 있으시면 이슈를 생성해 주세요.

---

Made with ❤️ by Smart Real Estate Team
