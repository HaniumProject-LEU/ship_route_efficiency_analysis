(function (window) {// 전역으로 window 객체를 전달받아 익명 함수를 실행
    var utils = {// 유틸리티 객체 정의
        calculateColor: function (color, opacity) {// 색상과 불투명도를 받아 rgba 형식의 색상값으로 변환
            if (color.indexOf('#') === 0) {// 만약 색상이 # 형식으로 시작한다면
                var color16 = color.slice(1); // 색상 코드에서 '#'을 제외한 부분을 추출하여 color16에 저장
                var r = parseInt(color16.slice(0, 2), 16); // 16진수 문자열을 10진수 숫자로 변환하여 R 값으로 저장 [ex: (11)1111]
                var g = parseInt(color16.slice(2, 4), 16); // 16진수 문자열을 10진수 숫자로 변환하여 G 값으로 저장 [ex: 11(11)11]
                var b = parseInt(color16.slice(4), 16);    // 16진수 문자열을 10진수 숫자로 변환하여 B 값으로 저장 [ex: 1111(11)]
                return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')'; // rgba 형식으로 변환된 색상값 반환
            }
            else if (/^rgb\(/.test(color)) {// 만약 색상이 rgb() 형식으로 시작한다면
                return color.replace(/rgb/, 'rgba').replace(')', ",") + opacity + ')';// rgb 를 rgba 로 변경하고 불투명도 값을 덧붙여 반환
            }
            else {// 그 외의 경우 색상값이 r, g, b 형식으로 주어진 것으로 가정
                return color.split(',').splice(0, 3).join(',') + opacity + ')'; // r, g, b 값을 추출하여 rgba 형식으로 변환된 색상값 반환
            }
        }
    };

    var arrayUtils = {// 배열 관련 유틸리티 객체를 정의
        forEach: function (arr, cb, scope) {// 배열의 각 항목에 대해 콜백 함수를 실행하는 함수
            if (typeof Array.prototype.forEach === 'function') {// 브라우저가 Array.prototype.forEach 메서드를 지원하는지 확인
                arr.forEach(cb, scope);// 지원하는 경우 내장 forEach 메서드를 사용하여 콜백을 실행
            } else {// 지원하지 않는 경우
                for (var i = 0, len = arr.length; i < len; i++) {//수동으로 배열을 순회하며 콜백을 실행
                    cb.apply(scope, [arr[i], i, arr]);// apply를 사용하여 콜백 함수를 호출하고 콜백의 인자로 배열의 요소, 인덱스, 배열 전체를 전달
                }
            }
        },

        map: function (arr, cb, scope) {// 배열의 각 항목을 주어진 콜백 함수를 통해 변환하여 새 배열을 생성하는 함수
            if (typeof Array.prototype.map === 'function') {// 브라우저가 Array.prototype.map 메서드를 지원하는지 확인
                return arr.map(cb, scope);// 지원하는 경우 내장 map 메서드를 사용하여 변환된 배열을 생성하여 반환
            } else {// 지원하지 않는 경우
                var mapped = [];// 배열 초기화
                for (var i = 0, len = arr.length; i < len; i++) {// 수동으로 배열을 순회하며 콜백을 실행하여 새 배열을 생성
                    mapped[i] = cb.apply(scope, [arr[i], i, arr]);// apply를 사용하여 콜백 함수를 호출하고 변환된 항목을 mapped 배열에 추가
                }
                return mapped;// 변환된 배열 반환
            }
        }
    };


    var Marker = (function () {// Marker 객체를 정의하는 즉시 실행 함수
        var M = function (options) {// Marker 생성자 함수

            // 생성자에 의해 생성되는 Marker 객체 속성 초기화
            this.x = options.x; // x 좌표
            this.y = options.y; // y 좌표
            this.rotation = options.rotation; // 회전 각도
            this.style = options.style; // 스타일 (circle 또는 arrow)
            this.color = options.color; // 색상
            this.size = options.size; // 크기
            this.borderWidth = options.borderWidth; // 테두리 두께
            this.borderColor = options.borderColor; // 테두리 색상
        };

        M.prototype.draw = function (context) {// Marker 객체의 프로토타입 메서드인 draw 함수 정의
            // 컨텍스트 저장
            context.save();

            // 해당 위치로 이동하고 회전
            context.translate(this.x, this.y);
            context.rotate(this.rotation);

            // 테두리 두께와 테두리 색상 설정
            context.lineWidth = this.borderWidth || 0;
            context.strokeStyle = this.borderColor || '#000';
            // 채우기 색상 설정
            context.fillStyle = this.color || '#000';

            // 현재 경로를 초기화하여 새로운 그리기 작업 시작
            context.beginPath();

            // 스타일에 따라 다른 그리기 작업 수행
            if (this.style === 'circle') {
                context.arc(0, 0, this.size, 0, Math.PI * 2, false); // 원 그리기
            } else if (this.style === 'arrow') {
                // 화살표 모양 그리기
                context.moveTo(-this.size * 2, -this.size);
                context.lineTo(-this.size * 5 / 4, 0);
                context.lineTo(-this.size * 2, this.size);
                context.lineTo(0, 0);
                context.lineTo(-this.size * 2, -this.size);
            }
            context.closePath();

            // 테두리와 채우기 작업 수행
            context.stroke();
            context.fill();
            // 컨텍스트 복원
            context.restore();
        };
        return M;// 생성자 함수 반환
    })();

    // Arc(호, 둥근부분) 객체를 정의하는 즉시 실행 함수
    var Arc = (function () {
        // Arc 생성자 함수 정의
        var A = function (options) {
            // Arc 속성 초기화
            var startX = options.startX, // 시작점 x 좌표
                startY = options.startY, // 시작점 y 좌표
                endX = options.endX, // 끝점 x 좌표
                endY = options.endY; // 끝점 y 좌표

            var L = Math.sqrt(Math.pow(startX - endX, 2) + Math.pow(startY - endY, 2));// 시작점과 끝점 사이의 거리 계산

            // 중간 지점 좌표 계산
            var m = (startX + endX) / 2;
            var n = (startY + endY) / 2;

            // 호의 중심 좌표 계산
            var factor = 1.5;
            var centerX = (startY - endY) * factor + m;
            var centerY = (endX - startX) * factor + n;

            // 호의 반지름 계산
            var radius = Math.sqrt(Math.pow(L / 2, 2) + Math.pow(L * factor, 2));

            // 호의 시작 각도와 끝 각도 계산
            var startAngle = Math.atan2(startY - centerY, startX - centerX);
            var endAngle = Math.atan2(endY - centerY, endX - centerX);

            // Arc 객체 속성 설정
            this.startX = startX; // 시작점의 x 좌표
            this.startY = startY; // 시작점의 y 좌표
            this.endX = endX; // 끝점의 x 좌표
            this.endY = endY; // 끝점의 y 좌표
            this.centerX = centerX; // 호의 중심 x 좌표
            this.centerY = centerY; // 호의 중심 y 좌표
            this.startAngle = startAngle; // 호의 시작 각도
            this.endAngle = endAngle; // 호의 끝 각도
            this.startLabel = options && options.labels && options.labels[0]; // 시작점 라벨 (있을 경우)
            this.endLabel = options && options.labels && options.labels[1]; // 끝점 라벨 (있을 경우)
            this.radius = radius; // 호의 반지름
            this.lineWidth = options.width || 1; // 선의 두께 설정, 기본값은 1
            this.strokeStyle = options.color || '#000'; // 선의 색상 설정, 기본값은 검정색
            this.label = options.label; // 라벨 텍스트
            this.font = options.font; // 라벨의 글꼴 설정
            this.shadowBlur = options.shadowBlur; // 그림자의 흐림 정도
            this.endAngle = endAngle - this.lineWidth / radius; // 호의 끝 각도 재조정 (두께 반영)
        };

        // Arc 객체의 프로토타입 메서드인 draw 함수 정의
        A.prototype.draw = function (context) {
            context.save();// 컨텍스트 저장 
            context.lineWidth = this.lineWidth;// 현재 경로의 라인 두께를 설정
            context.strokeStyle = this.strokeStyle;// 현재 경로의 테두리 색상 설정
            context.shadowColor = this.strokeStyle;// 그림자의 색상을 테두리 색상과 동일하게 설정
            context.shadowBlur = this.shadowBlur || 2;// 그림자의 흐림 정도 설정. 기본값은 2이며, 만약 shadowBlur 속성이 주어지지 않았다면 2를 사용

            context.beginPath();// 새로운 그리기 작업을 시작하기 위해 경로 초기화

            // 호(arc) 그리기 작업 수행
            // centerX와 centerY는 호의 중심 좌표, radius는 반지름,
            // startAngle은 시작 각도, endAngle은 끝 각도, false는 시계 방향으로 그리지 않음을 의미
            context.arc(this.centerX, this.centerY, this.radius, this.startAngle, this.endAngle, false);

            context.stroke();// 설정된 스타일에 따라 테두리 그리기 작업 수행

            context.restore();// 컨텍스트 복원

            context.save();// 컨텍스트 저장

            // 텍스트 스타일 설정 및 텍스트 그리기
            context.fillStyle = this.strokeStyle; // 텍스트의 채우기 스타일을 테두리 색상으로 설정

            // 텍스트를 그리는 조건 확인
            if (this.label) { // this.label이 true인 경우에만 텍스트를 그림
                context.font = this.font; // 텍스트의 폰트 스타일을 this.font으로 설정

                // 시작 라벨 그리기
                if (this.startLabel) { // this.startLabel이 존재하는 경우에만 시작 라벨을 그림
                    var x = this.startX - 15; // 시작 라벨 x 좌표 계산
                    var y = this.startY + 5; // 시작 라벨 y 좌표 계산
                    context.fillText(this.startLabel, x, y); // 시작 라벨을 (x, y) 좌표에 그림
                }

                // 끝 라벨 그리기
                if (this.endLabel) { // this.endLabel이 존재하는 경우에만 끝 라벨을 그림
                    var x = this.endX - 15; // 끝 라벨 x 좌표 계산
                    var y = this.endY - 5; // 끝 라벨 y 좌표 계산
                    context.fillText(this.endLabel, x, y); // 끝 라벨을 (x, y) 좌표에 그림
                }
            }
            context.restore();// 컨텍스트 복원
        };

        return A; // 생성자 함수 반환
    })();

    // Pulse 객체를 정의하는 즉시 실행 함수-> 원을 그리는 펄스효과[원이 반지름이 커지는 애니메이션 효과를 가지면서 그려짐]
    var Pulse = (function () {
        // P 생성자 함수 정의
        function P(options) {
            this.x = options.x; // x 좌표
            this.y = options.y; // y 좌표
            this.maxRadius = options.radius; // 최대 반지름
            this.color = options.color; // 색상
            this.shadowBlur = 5; // 그림자 효과 블러 정도
            this.lineWidth = options.borderWidth; // 테두리 두께
            this.r = 0; // 현재 반지름 초기값
            this.factor = 2 / options.radius; // 요소의 크기 계수
        };

        // draw 메서드 정의
        P.prototype.draw = function (context) {
            var vr = 0.5; // 반지름 변화 비율
            this.r += vr; // 반지름 증가

            context.save(); // 컨텍스트 저장
            context.translate(this.x, this.y); // (x, y) 좌표로 이동

            // 그려질 선의 색상 설정
            var strokeColor = this.color;
            strokeColor = utils.calculateColor(strokeColor, 1 - this.r / this.maxRadius);

            context.strokeStyle = strokeColor; // 선의 색상 설정
            context.shadowBlur = this.shadowBlur; // 그림자 효과 블러 정도
            context.shadowColor = strokeColor; // 그림자 효과 색상 설정
            context.lineWidth = this.lineWidth; // 선의 두께 설정

            context.beginPath(); // 새로운 그리기 작업 시작
            context.arc(0, 0, this.r, 0, Math.PI * 2, false); // 원 그리기
            context.stroke(); // 그리기 작업 수행
            context.restore(); // 컨텍스트 복원

            // 반지름이 최대 반지름과 거의 일치할 경우 반지름 초기화
            if (Math.abs(this.maxRadius - this.r) < 0.8) {
                this.r = 0;
            }
        }

        return P; // 생성자 함수 반환
    })();

    //Spark 객체를 정의하는 즉시 실행 -> 함수 시작 점과 끝점 사이에 경로(arc)를 생성하며, 이 경로의 꼬리(tail)를 그려주는 역할
    var Spark = (function () {
        // Spark 생성자 함수 정의
        var S = function (options) {
            // 시작 및 끝 좌표 계산
            var startX = options.startX,
                startY = options.startY,
                endX = options.endX,
                endY = options.endY;

            // 기본 계산을 위한 변수 설정
            var L = Math.sqrt(Math.pow(startX - endX, 2) + Math.pow(startY - endY, 2));
            var m = (startX + endX) / 2;
            var n = (startY + endY) / 2;
            var factor = 1.5;
            var centerX = (startY - endY) * factor + m;
            var centerY = (endX - startX) * factor + n;
            var radius = Math.sqrt(Math.pow(L / 2, 2) + Math.pow(L * factor, 2));
            var startAngle = Math.atan2(startY - centerY, startX - centerX);
            var endAngle = Math.atan2(endY - centerY, endX - centerX);

            // 각도 조정
            if (startAngle * endAngle < 0) {
                if (startAngle < 0) {
                    startAngle += Math.PI * 2;
                    endAngle += Math.PI * 2;
                } else {
                    endAngle += Math.PI * 2;
                }
            }

            // Spark 객체 속성 설정
            this.tailPointsCount = 50;
            this.centerX = centerX;
            this.centerY = centerY;
            this.startAngle = startAngle;
            this.endAngle = endAngle;
            this.radius = radius;
            this.lineWidth = options.width || 1;
            this.strokeStyle = options.color || '#fff';
            this.factor = 2 / this.radius;
            this.deltaAngle = (80 / Math.min(this.radius, 400)) / this.tailPointsCount;
            this.trailAngle = this.startAngle;
            this.arcAngle = this.startAngle;
            this.animateBlur = true;
            const size = options.size ? options.size / 2 : 1;

            // Marker 객체 생성
            this.marker = new Marker({
                x: 50,
                y: 80,
                rotation: 50 * Math.PI / 180,
                style: 'arrow',
                color: 'rgb(255, 255, 255)',
                size: size + 1,
                borderWidth: size,
                borderColor: this.strokeStyle
            });
        };

        // Spark 객체의 메서드 정의
        S.prototype.drawArc = function (context, strokeColor, lineWidth, startAngle, endAngle) {
            context.save();
            context.lineWidth = lineWidth;
            context.strokeStyle = strokeColor;
            context.shadowColor = this.strokeStyle;
            context.lineCap = "round";
            context.beginPath();
            context.arc(this.centerX, this.centerY, this.radius, startAngle, endAngle, false);
            context.stroke();
            context.restore();
        };

        S.prototype.draw = function (context) {
            // 끝 각도 설정
            var endAngle = this.endAngle;

            // 각도 계산
            var angle = this.trailAngle + this.factor;
            var strokeColor = this.strokeStyle;

            // Blur 애니메이션 설정
            if (this.animateBlur) {
                this.arcAngle = angle;
            }
            this.trailAngle = angle;
            strokeColor = utils.calculateColor(strokeColor, 0.1);

            // 호 그리기
            this.drawArc(context, strokeColor, this.lineWidth, this.startAngle, this.arcAngle);

            var count = this.tailPointsCount;

            // 꼬리 그리기
            for (var i = 0; i < count; i++) {
                var arcColor = utils.calculateColor(this.strokeStyle, 0.3 - 0.3 / count * i);
                var tailLineWidth = 5;

                if (this.trailAngle - this.deltaAngle * i > this.startAngle) {
                    this.drawArc(context, arcColor,
                        tailLineWidth - tailLineWidth / count * i,
                        this.trailAngle - this.deltaAngle * i,
                        this.trailAngle
                    );
                }
            }

            // 마커 그리기
            context.save();
            context.translate(this.centerX, this.centerY);
            this.marker.x = Math.cos(this.trailAngle) * this.radius;
            this.marker.y = Math.sin(this.trailAngle) * this.radius;
            this.marker.rotation = this.trailAngle + Math.PI / 2;
            this.marker.draw(context);
            context.restore();
            

            // 애니메이션 완료 시 초기화
            if ((endAngle - this.trailAngle) * 180 / Math.PI < 0.5) {
                this.trailAngle = this.startAngle;
                this.animateBlur = false;
            }
        };

        return S; // 생성자 함수 반환
    })();



    // Migration 객체 정의
    var Migration = (function () {
        // Migration 생성자 함수
        var M = function (options) {
            this.data = options.data; // 데이터 배열
            this.store = { // 시각화 요소 저장 객체
                arcs: [], // 호(arc) 객체 배열
                markers: [], // 마커(marker) 객체 배열
                pulses: [], // 펄스(pulse) 객체 배열
                sparks: [] // 스파크(spark) 객체 배열
            };
            this.playAnimation = true; // 애니메이션 재생 여부 플래그
            this.started = false; // 애니메이션 시작 여부 플래그
            this.context = options.context; // 캔버스 컨텍스트
            this.style = options.style; // 시각화 스타일 설정
            this.init(); // 초기화 함수 호출
        };

        // Migration 객체의 프로토타입 메서드 init
        M.prototype.init = function () {
            this.updateData(this.data); // 데이터 업데이트 함수 호출
        };

        // Migration 객체의 프로토타입 메서드 add
        M.prototype.add = function (Shape) {
            // 도형 추가 로직
        };

        // Migration 객체의 프로토타입 메서드 remove
        M.prototype.remove = function () {
            // 도형 삭제 로직
        };

        // Migration 객체의 프로토타입 메서드 clear
        M.prototype.clear = function () {
            this.store = { // 시각화 요소 저장 객체 초기화
                arcs: [], // 호(arc) 객체 배열
                markers: [], // 마커(marker) 객체 배열
                pulses: [], // 펄스(pulse) 객체 배열
                sparks: [] // 스파크(spark) 객체 배열
            };
            this.playAnimation = true; // 애니메이션 재생 플래그 초기화
            this.started = false; // 애니메이션 시작 플래그 초기화
            window.cancelAnimationFrame(this.requestAnimationId); // 애니메이션 프레임 취소
        };

        // Migration 객체의 프로토타입 메서드 updateData
        M.prototype.updateData = function (data) {
            if (!data || data.length === 0) {
                return;
            }
            this.clear(); // 시각화 요소 초기화
            this.data = data; // 데이터 업데이트

            if (this.data && this.data.length > 0) {
                arrayUtils.forEach(this.data, function (element) {
                    // Arc, Marker, Pulse, Spark 객체 생성 및 저장
                    var arc = new Arc({
                        startX: element.from[0],
                        startY: element.from[1],
                        endX: element.to[0],
                        endY: element.to[1],
                        labels: element.labels,
                        label: this.style.arc.label,
                        font: this.style.arc.font,
                        width: element.arcWidth || this.style.arc.width,
                        color: element.color
                    });
                    var marker = new Marker({
                        x: element.to[0],
                        y: element.to[1],
                        rotation: arc.endAngle + Math.PI / 2,
                        style: 'arrow',
                        color: element.color,
                        size: element.arcWidth || this.style.arc.width + 3,
                        borderWidth: 0,
                        borderColor: element.color
                    });
                    var pulse = new Pulse({
                        x: element.to[0],
                        y: element.to[1],
                        radius: this.style.pulse.radius,
                        color: element.color,
                        borderWidth: this.style.pulse.borderWidth
                    });
                    var spark = new Spark({
                        startX: element.from[0],
                        startY: element.from[1],
                        endX: element.to[0],
                        endY: element.to[1],
                        width: 15,
                        color: element.color,
                        size: element.arcWidth
                    });

                    // 생성된 객체들을 store에 저장
                    this.store.arcs.push(arc);
                    this.store.markers.push(marker);
                    this.store.pulses.push(pulse);
                    this.store.sparks.push(spark);
                }, this);
            }
        };

        // Migration 객체의 프로토타입 메서드 start
        M.prototype.start = function (canvas) {
            var that = this;
            if (!this.started) {
                (function drawFrame() {
                    that.requestAnimationId = window.requestAnimationFrame(drawFrame, canvas);

                    if (that.playAnimation) {
                        canvas.width += 1;
                        canvas.width -= 1;
                        for (var p in that.store) {
                            var shapes = that.store[p];
                            for (var i = 0, len = shapes.length; i < len; i++) {
                                shapes[i].draw(that.context);
                            }
                        }
                    }
                })();
                this.started = true;
            }
        };

        // Migration 객체의 프로토타입 메서드 play
        M.prototype.play = function () {
            this.playAnimation = true;
        };

        // Migration 객체의 프로토타입 메서드 pause
        M.prototype.pause = function () {
            this.playAnimation = false;
        };

        return M; // 생성자 함수 반환
    })();


    // L.MigrationLayer 확장 정의
    L.MigrationLayer = L.Class.extend({
        // 기본 옵션 설정
        options: {
            map: {}, // 맵 객체
            data: {}, // 데이터
            pulseRadius: 25, // 펄스 반지름
            pulseBorderWidth: 3, // 펄스 테두리 두께
            arcWidth: 1, // 호(arc) 두께
            arcLabel: true, // 호(arc) 라벨 표시 여부
            arcLabelFont: '15px sans-serif', // 호(arc) 라벨 폰트
            Marker: {}, // 마커 객체
            Spark: {} // 스파크(spark) 객체
        },
        // 객체 옵션 설정 함수
        _setOptions: function (obj, options) {
            if (!obj.hasOwnProperty('options')) {
                obj.options = obj.options ? L.Util.create(obj.options) : {};
            }
            for (var i in options) {
                obj.options[i] = options[i];
            }
            return obj.options;
        },
        // 초기화 함수
        initialize: function (options) {
            this._setOptions(this, options); // 객체 옵션 설정
            this._map = this.options.map || {}; // 맵 객체 설정
            this._data = this.options.data || {}; // 데이터 설정
            this._style = { // 시각화 스타일 설정
                pulse: {
                    radius: this.options.pulseRadius,
                    borderWidth: this.options.pulseBorderWidth
                },
                arc: {
                    width: this.options.arcWidth,
                    label: this.options.arcLabel,
                    font: this.options.arcLabelFont
                }
            } || {}; // 시각화 스타일 또는 빈 객체
            this._show = true; // 표시 여부 플래그
            this._init(); // 초기화 함수 호출
        },
        // 초기화 함수 내부
        _init: function () {
            var container = L.DomUtil.create('div', 'leaflet-ODLayer-container');
            container.style.position = 'absolute';
            container.style.width = this._map.getSize().x + "px";
            container.style.height = this._map.getSize().y + "px";
            this.container = container;
            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d');
            container.appendChild(this.canvas);
            this._map.getPanes().overlayPane.appendChild(container);
            if (!this.migration) {
                var data = this._convertData();
                this.migration = new Migration({
                    data: data,
                    context: this.context,
                    style: this._style
                });
            }
        },
        // 맵 리사이즈 함수
        _resize: function () {
            // 현재 맵의 경계 가져오기
            var bounds = this._map.getBounds();
            var topleft = bounds.getNorthWest();

            // 현재 맵의 좌측 상단 지점을 화면 좌표로 변환
            var topLeftscreen = this._map.latLngToContainerPoint(topleft);

            // 좌측 상단 지점이 화면 위쪽에 있는지 확인하여 컨테이너 위치 조정
            if (topLeftscreen.y > 0) {
                this.container.style.top = -topLeftscreen.y + 'px';
            } else {
                this.container.style.top = '0px';
            }

            // 맵 컨테이너의 스타일 정보 가져오기
            var containerStyle = window.getComputedStyle(this._map.getContainer());

            // 캔버스의 너비와 높이 설정
            this.canvas.setAttribute('width', parseInt(containerStyle.width, 10));
            this.canvas.setAttribute('height', parseInt(containerStyle.height, 10));
        },

        // 데이터 변환 함수
        _convertData: function () {
            var bounds = this._map.getBounds();
            let maxValue;
            let minValue;

            // 데이터와 맵 경계가 존재하는 경우에만 처리
            if (this._data && bounds) {
                // 데이터의 최대값과 최소값 계산
                arrayUtils.forEach(this._data, function (d) {
                    if (d.value) {
                        if (!maxValue) {
                            maxValue = d.value;
                            minValue = d.value;
                        }
                        if (maxValue < d.value) {
                            maxValue = d.value;
                        }
                        if (minValue > d.value) {
                            minValue = d.value;
                        }
                    }
                });

                // 최대 너비 설정 또는 기본값
                var maxWidth = this.options.maxWidth || 10;

                // 데이터 변환 작업
                var data = arrayUtils.map(this._data, function (d) {
                    if (d.value) {
                        if (!maxValue) {
                            maxValue = d.value;
                            minValue = d.value;
                        }
                        if (maxValue < d.value) {
                            maxValue = d.value;
                        }
                        if (minValue > d.value) {
                            minValue = d.value;
                        }
                    }

                    // 시작점과 끝점 좌표를 화면 좌표로 변환
                    var fromPixel = this._map.latLngToContainerPoint(new L.LatLng(d.from[1], d.from[0]));
                    var toPixel = this._map.latLngToContainerPoint(new L.LatLng(d.to[1], d.to[0]));

                    return {
                        from: [fromPixel.x, fromPixel.y],
                        to: [toPixel.x, toPixel.y],
                        labels: d.labels,
                        value: d.value,
                        color: d.color,
                        // 호(arc) 두께 계산
                        arcWidth: d.value ? parseInt((d.value - minValue) * (maxWidth - 1) / (maxValue - minValue)) + 1 : this.options.arcWidth
                    };
                }, this);

                return data;
            }
        },
        // 맵 이벤트 바인딩 함수
        _bindMapEvents: function () {
            var that = this;

            // 지도 이동이 끝난 후 실행될 함수 등록
            this._map.on('moveend', function () {
                that.migration.play();
                that._draw();
            });

            // 줌이 시작될 때 컨테이너 숨김
            this._map.on('zoomstart', function () {
                that.container.style.display = 'none';
            });

            // 줌이 끝난 후 실행될 함수 등록
            this._map.on('zoomend', function () {
                if (that._show) {
                    that.container.style.display = '';
                    that._draw();
                }
            });
        },

        // 데이터 그리기 함수
        _draw: function () {
            var bounds = this._map.getBounds();

            // 맵 경계와 재생 상태 확인하여 그리기
            if (bounds && this.migration.playAnimation) {
                this._resize();
                this._transform();
                var data = this._convertData();
                this.migration.updateData(data);
                this.migration.start(this.canvas);
            }
        },

        // 컨테이너 위치 변환 함수
        _transform: function () {
            var bounds = this._map.getBounds();
            var topLeft = this._map.latLngToLayerPoint(bounds.getNorthWest());
            L.DomUtil.setPosition(this.container, topLeft);
        },

        // 맵에 레이어 추가 함수
        addTo: function () {
            this._bindMapEvents();
            var bounds = this._map.getBounds();

            // 경계와 재생 상태 확인하여 레이어 추가
            if (bounds && this.migration.playAnimation) {
                this._resize();
                this._transform();
                var data = this._convertData();
                this.migration.updateData(data);
                this.migration.start(this.canvas);
            }
        },

        // 데이터 설정 함수
        setData: function (data) {
            this._data = data;
            this._draw();
        },

        // 레이어 숨기기 함수
        hide: function () {
            this.container.style.display = 'none';
            this._show = false;
        },

        // 레이어 표시 함수
        show: function () {
            this.container.style.display = '';
            this._show = true;
        },

        // 재생 함수
        play: function () {
            this.migration.play();
        },

        // 일시 정지 함수
        pause: function () {
            this.migration.pause();
        },

        // 레이어 삭제 함수
        destroy: function () {
            this.migration.clear();
            this.container.parentNode.removeChild(this.container);
            this._map.clearAllEventListeners();
            this.mapHandles = [];
        }
    });

    // L.migrationLayer 함수 정의
    L.migrationLayer = function (options) {
        return new L.MigrationLayer(options);
    };
})(window);