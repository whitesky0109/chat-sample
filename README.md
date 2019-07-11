# 웹 기반 심플 채팅 어플리케이션

![](./user_guide/cap15.gif)

## 요구사항

해당 프로젝트를 사용하기 위해서는 아래와 같은 프로그램이 필요하다.

1. nodejs v10.16.x 또는 그 이상
2. (선택) yarn 1.16 또는 그 이상

## 사전 설치

해당 프로젝트에서 package.json 파일이 있는 디렉토리로 이동하여 다음과 같은 명령어를 실행한다.

```bash
npm install
```

## 프로젝트 통합 빌드 가이드

'사전 설치'와 마찬가지인 디렉토리에서 다음과 같은 명령어를 실행한다.

```bash
npm run build # or yarn build
npm run start # or yarn start
```

## 사용자 가이드

[user_guide](./user_guide/README.md) 참조

## 문제해결 전략

### 개발 환경

- 개발 언어 : Typescript
- 빌드 시스템 : Webpack
- 개발 도구 : Visual Studio Code
- 사용 브라우저 : 크로미움 기반 브라우저 사용
  - Brave
  - Chrome
- 주요 개발 오픈소스 라이브러리
  - 프론트엔드 : React
    - react-router : client-side rendering
    - redux
    - sass
    - font-awesome
  - 웹 서버 : Express.js
    - socket.io
    - socket-controllers
    - routing-controllers
    - sqlite3
    - typedi : Typescript 또는 Javascript에서 의존성 주입(DI)을 사용
  - 테스트(Jest)
    - enzyme

### 시스템 구조

### 컴포넌트 별 화면 레이어 구조

### 채팅방 메세지 이미지 / 텍스트 전송 전략

### 테스트 전략

### UI 스타일 참고 사이트

<https://codepen.io/vhtkr/pen/eaLBNK>

### 디렉토리 구조

## 기타

### 개발자용 서버 개발 가이드

```bash
npm run watch:server # or yarn watch:server
```

### 개발자용 프론트엔드 개발 가이드

```bash
npm run watch:client # or yarn watch:client
```

### 문제점

1. 동일한 브라우저로 여러 페이지를 접속 시 동작 오류가 있음

### refernce site

1. unit test

- <https://medium.com/@tejasupmanyu/setting-up-unit-tests-in-react-typescipt-with-jest-and-enzyme-56634e54703>
- <https://velopert.com/3591>
