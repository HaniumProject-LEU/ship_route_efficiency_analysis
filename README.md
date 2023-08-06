# 설명
팀 LEU의 한이음에서 진행하는 항로 효율성 분석 프로젝트의 백앤드 저장소입니다.

# 프로젝트 개요

## MERN Stack

[MEAN 스택 프로젝트 기본구조 - Tistory](https://imcreator.tistory.com/64)

- MongoDB - 데이터베이스
- Express(.js) - Node.js 웹 프레임워크
- React(.js) - 프론트엔드 자바스크립트 프레임워크
- Node(.js) - 자바스크립트 웹서버

<img src="https://blog.kakaocdn.net/dn/FfulK/btrzzqrkUJ5/lY77t0LUzTBCa0TC2jpCYk/img.jpg">

## MVC 패턴

[MVC 패턴이란 - Naver Blog](https://m.blog.naver.com/jhc9639/220967034588)

MVC 는 Model, View, Controller의 약자이다. 하나의 애플리케이션, 프로젝트를 구성할 때 그 구성요소를 세가지의 역할로 구분한 패턴이다.

<img src="https://mblogthumb-phinf.pstatic.net/MjAxNzAzMjVfMjIg/MDAxNDkwNDM4ODMzNjI2.nzDNB5K0LuyP4joE2C4rIbL5Ue2F3at7wiI6ZpuTJN0g.WZ6V-WHZygLYW2WSdzcs7uAiAWgAJe3_H0XdkYKkutkg.PNG.jhc9639/1262.png?type=w800">

# 기능 목록

- [ ] Data generator1
    노선 데이터(노선의 항구들의 위치값)과 TEU 값을 받아서 "가능성 있는 경로 데이터"를 생성한다.
- [ ] Data generator2
    Data generator1의 생성 데이터로 해당 노선의 특정 기간동안 총수송량, 수송거리, 운항시간, 대기시간, 작업시간, 항만비용, 자본비용, 선원수, 연료량 데이터를 생성한다.
- [ ] DEA Calculator
    Data generator2의 생성 데이터로 DEA 모델의 효율성 값을 계산하여 반환한다.
- [ ] 시각화1: 도표 차트
    DEA 결과값들을 도표로 나타낸다.
- [ ] 시각화2: 네트워크 차트
    DEA 결과값에 따라 지도 위에서 각 노선의 색을 다르게 해서 표현한다.
- [ ] 시각화3: 시각화 페이지
    위 네트워크 차트와 비슷하지만 노선 위에서 배가 움직이는 시뮬레이션 동작
    각 배를 클릭 시 배가 다니는 노선의 효율성 순위, 노선 정보 출력