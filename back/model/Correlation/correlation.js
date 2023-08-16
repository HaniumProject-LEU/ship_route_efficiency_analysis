class Correlation {
    constructor(data) {
        this.dmuAry = transpose(data);
        this.dataMean = [
            "총수송량 y1", "수송거리 y2", "운항시간 x1",
            "대기시간 x2", "작업시간 x3", "항만비용 x4",
            "자본비용 x5", "선원수  x6", "연료량  x7"
        ];
    }

    // 두 배열의 상관관계 계산
    calculateCorrelation(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            throw new Error("Arrays must have the same length.");
        }

        const mean1 = arr1.reduce((sum, value) => sum + value, 0) / arr1.length;
        const mean2 = arr2.reduce((sum, value) => sum + value, 0) / arr2.length;

        let covariance = 0;
        let variance1 = 0;
        let variance2 = 0;

        for (let i = 0; i < arr1.length; i++) {
            const diff1 = arr1[i] - mean1;
            const diff2 = arr2[i] - mean2;

            covariance += diff1 * diff2;
            variance1 += diff1 * diff1;
            variance2 += diff2 * diff2;
        }

        const correlation = covariance / Math.sqrt(variance1 * variance2);
        return correlation;
    }

    // 상관관계 출력 함수
    displayCorrelation(index) {
        const corAry = [];
        const indexArray = this.dmuAry[index];

        for (let i = 0; i < this.dmuAry.length; i++) {
            let result = this.calculateCorrelation(indexArray, this.dmuAry[i]);

            if (Math.abs(result - 1.0) <= 0.00000000001) {
                result = 1.0;
            }

            console.log(this.dataMean[i], result);
            corAry.push(result);
        }

        return corAry;
    }
}

// 배열 전치 함수
function transpose(array) {
    return array[0].map((col, i) => array.map(row => row[i]));
}

module.exports = Correlation;