/**
 * 단위 변환 유틸리티 함수
 */
/**
 * 제곱미터를 평으로 변환
 * @param squareMeters 제곱미터 값
 * @returns 평 값 (소수점 2자리까지)
 */
export declare const squareMetersToPyeong: (squareMeters: number) => number;
/**
 * 평을 제곱미터로 변환
 * @param pyeong 평 값
 * @returns 제곱미터 값 (소수점 2자리까지)
 */
export declare const pyeongToSquareMeters: (pyeong: number) => number;
/**
 * 금액을 한국어 단위로 포맷팅
 * @param amount 금액 (원)
 * @param options 포맷팅 옵션
 * @returns 포맷팅된 금액 문자열
 */
export declare const formatKoreanCurrency: (amount: number, options?: {
    includeUnit?: boolean;
    precision?: number;
    shortForm?: boolean;
}) => string;
/**
 * 평당 가격 계산
 * @param totalPrice 총 가격
 * @param area 면적 (제곱미터)
 * @param unit 면적 단위 ('sqm' | 'pyeong')
 * @returns 평당 가격
 */
export declare const calculatePricePerUnit: (totalPrice: number, area: number, unit?: "sqm" | "pyeong") => number;
/**
 * 숫자를 축약된 형태로 포맷팅 (K, M, B)
 * @param num 숫자
 * @param precision 소수점 자릿수
 * @returns 포맷팅된 문자열
 */
export declare const formatCompactNumber: (num: number, precision?: number) => string;
/**
 * 백분율 변화 계산
 * @param oldValue 이전 값
 * @param newValue 새로운 값
 * @param precision 소수점 자릿수
 * @returns 백분율 변화 (-100 ~ Infinity)
 */
export declare const calculatePercentageChange: (oldValue: number, newValue: number, precision?: number) => number;
/**
 * 범위 내 값으로 제한
 * @param value 값
 * @param min 최소값
 * @param max 최대값
 * @returns 제한된 값
 */
export declare const clamp: (value: number, min: number, max: number) => number;
/**
 * 면적대 분류
 * @param area 면적 (제곱미터)
 * @returns 면적대 분류
 */
export declare const categorizeAreaSize: (area: number) => string;
//# sourceMappingURL=converters.d.ts.map