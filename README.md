> 아직 학습 진행 중...

# What's this?

- CRUD를 기반으로 한 Todo App을 만들기
- CRUD를 직접 제작하여 어떤 식으로 클라이언트, 서버, 데이터베이스가 소통하는지 학습하기 위함
- 테일윈드 사용 연습을 더하였음
- 내용은 [코딩애플](https://codingapple.com/)에서 학습

---

# SETUP

### Client

- html
- TailwindCSS

### Server

- Node.js
- Express(body-parser)

### Database

- MongoDB

### Libraries

- nodemon
- EJS

---

# Things to remember

## MongoDB

- MongoDB 웹사이트에서 cluster와 연결할 수 있는 연결코드 가져와야 함

## EJS

- EJS는 서버데이터를 html에 쉽게 넣을 수 있는 html렌더링 엔진
- 사용하는 이유: 그냥 html 파일만 보내면(static페이지), DB를 넣을 수 없기 때문에
- 그래서 EJS, Pug같은 템플릿엔진이 필요
- React의 경우, ejs없이 html에 데이터 삽입 가능
- EJS 사용하기 위해서는 반드시 ejs로 만들 문서가 views 폴더 안에 있어야 함

---

# 개선할 부분

- 다음 CRUD 연습에는 React + Tailwind 조합을 학습할 예정
