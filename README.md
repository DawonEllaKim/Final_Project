# 🐶 산책할개

>#### 나도 강아지도 혼자였던 산책에서 벗어나, 산책 메이트와 일상을 공유하고 같이 산책하는 서비스 '산책할개'입니다.

![logo](https://user-images.githubusercontent.com/50295043/144535569-91be75fa-2955-4b7d-8957-3af99c34645d.png)

- [산책할개 사이트](https://togaether.shop/)
- [시연 영상](https://www.youtube.com/watch?v=dKcawThqUME&t=16s)

## 👩‍👧‍👦 멤버 구성
- Front-end : 김다원, 김효진, 이수창
- Back-end : 탁정규, 허선희, 황유정
- Designer : 서연수, 이성원

## 🗓 개발기간
2021.10.25 - 2021.12.03 (총 6주)

## 📱 아키텍쳐
<img width="772" alt="architecture" src="https://user-images.githubusercontent.com/50295043/144492184-4cfb43dd-011f-4aad-ac8b-a1e3f710a78d.png">

## 🛠 기술 스택
- React
- 상태관리 : redux, redux-actions, redux-thunk, redux-logger, immer
- 통신 : axios, socket.io
- 배포 : Amazon s3, cloudfront
- API : kakao map API, OpenWeatherMap API
- 모니터링 : sentry
- 라이브러리 : react-slick, react-intersection-observer, react-icons, material-ui, react-datepicker, react-loading

## 💻 주요 기능
- 로그인 / 회원가입 / 강아지 정보 등록 (jwt 인증)
- 메인페이지
    - 현재 날씨 조회
    - 최신 개스타그램 조회
    - 카테고리별 산책 목록 조회

- 산책등록
    - 카카오맵 api를 사용해 제공하는 산책로 선택
    - 날짜, 시간 선택

- 산책가자 (산책목록 조회 페이지)
    - 장소별 산책목록 확인
    - 원하는 산책 신청 및 쪽지하기 기능 

- 개스타그램 (강아지 일상 공유 페이지)
    - 최신순, 좋아요 순 정렬
    - 일상 공유하는 페이지 등록
    - 좋아요, 댓글, 쪽지 보내기 기능

- 마이페이지
    - 유저가 등록한 개스타그램, 산책목록 조회
    - 유저 데이터, 강아지 데이터 조회 및 수정
    - 다른 유저 페이지 방문 가능

- 쪽지 
    - 받은 쪽지, 산책 신청 알람 기능
    - 받은 산책 신청 수락/거절 
    - 쪽지 보내기, 답장하기

## 📝 개발 일지
- [Team Notion](https://www.notion.so/dawon-ella-kim/1b368fc04ee9406695fc28435dd57097) 
- [Front-end github](https://github.com/O-K-O-K-O-K/Front-end)
- [Back-end github](https://github.com/O-K-O-K-O-K/Back_End)
