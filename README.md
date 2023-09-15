<div align="center">
유빈 깃허브 테스트
> 2023 스마트 해상물류 경진대회

# 정기선 항로의 효율성 분석 및 시각화

#### Efficiency analysis and visualization of liner routes

정기선이 이동하는 항로의 효율성을 비교하기 위해 각 항로의 효율성을 계산하여 시각화하는 서비스입니다.

</div>


## 기능 목록

### 항로 입력 or 생성

항로를 입력하거나 추가로 생성한다.


### 각 항로의 화물선 운항 데이터 입력 or 생성

입력하거나 생성된 항로의 기항지 데이터를 기반으로 각 정기선항로의 운항 지표 (총수송량, 수송거리, 운항시간, 대기시간, 작업시간, 항만비용, 자본비용, 선원수, 연료량)를 입력받거나 생성한다.


### 항로의 DEA 효율성 계산

각 항로의 효율성을 비교하기 위해 DEA 모델을 사용하여 계산한다.


### 시각화

DEA 결과값을 도표와 그래프, 지도에 나타낸다.





# 파일구조

```bash
├── views
│   ├── chart_views
│   │   ├── chart_europe.html
│   │   ├── chart_asia.html
│   │   └── chart_america.html
│   ├── page_views
│   └── visualization_views      
│       ├── visual_america.html
│       ├── visual_asia.html
│       ├── visual_europe.html
│       └── visual_world.html
├── public
│   ├── css
│   │   ├── boostrap.css
│   │   ├── bootstarap.min.css
│   │   ├── page_style.css
│   │   ├── chart_style.css
│   │   └── visual_style.css
│   └── js
│       ├── datagenerate
│       │   ├── data_waittime.js
│       │   ├── data_member.js
│       │   ├── data_distance.js
│       │   ├── data_fuel.js
│       │   ├── data_voyagetime.js
│       │   ├── data_capcost.js
│       │   ├── data_workhour.js
│       │   ├── data_totalvol.js
│       │   └── data_portcost.js
│       ├── lanegenerate
│       │   ├── lane_europe.js
│       │   ├── lane_asia.js
│       │   └── lane_america.js
│       ├── chart
│       │   ├── chart_europe.js
│       │   ├── chart_asia.js
│       │   └── chart_america.js
│       └── visualiztion
│           ├── visual_america.js
│           ├── visual_asia.js
│           ├── visual_europe.js
│           ├── visual_src.js
│           └── visual_world.js
├── scripts
│   └── ccr_model.py
├── server.js 
├── node_modules
├── package.json
└── package-lock.json
``` 



***

# 시각화 소스 사용방법

## 지원브라우저
구글 크롬
사파리
파이어폭스

## 사용법     
HTML에 하단의 스크립트 코드 추가
```html
<script src="./lib/src.js"></script>
```    
2.새로운 migrationLayer 만들기
```js
var migrationLayer = new L.migrationLayer({
    map: map,
    data: data
    //옵션
})
```     
3.migrationLayer 업데이트하거나 설정
```js
migrationLayer.setData(newData);
```   
4.migrationLayer 숨기기  
```js
migrationLayer.hide();
```   
5.migrationLayer 띄우기
```js
migrationLayer.show();
```   
6.migrationLayer 애니메이션 일시 중지
```js
migrationLayer.pause();
```   
7.migrationLayer 애니메이션을 재생
```js
migrationLayer.play();
```   
8.migrationLayer 제거    
```js
migrationLayer.destroy();
```   

## API(options)   

|옵션         | 	설명      | 기본값    | 가능한 값      | 필수 여부     |
| --------------- | ---------------------- | -----------------| ------------------------ | -------------- | 
| map             | 맵 객체            | null             | Map                      | yes            |
| data            | 	migrationLayer 데이터| null             | Json                     | yes            | 
| pulseRadius     | 펄스 반경      | 25               | any number>0             | no             |
| pulseBorderWidth| 펄스 테두리 너비    | 3                | any number>0             | no             |
| arcWidth        | 아크 너비              | 1                | any number>0             | no             |
| arcLabel        | 출발지와 도착지 레이블 표시 | true             | Bool                     | no             |
| arcLabelFont    | 레이블 폰트와 크기    | '15px sans-serif'| 'size font'              | no             |
| maxWidth        | 아크의 최대 너비   | 10               | any number>1             | no             |

## 데이터 형식

```js
data = [{"from":[-118.2705,33.9984],"to":[-122.789336,37.920458],"labels":["Los Angeles","San Francisco"],"color":"#ff3a31","value":15}];
```

value가 정의되지 않았다면, 아크의 너비는 value에 따라 달라짐

## Leaflet 1.0.2 이상 필요
  
