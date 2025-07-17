"use strict";
/**
 * 단위 변환 유틸리티 함수
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorizeAreaSize = exports.clamp = exports.calculatePercentageChange = exports.formatCompactNumber = exports.calculatePricePerUnit = exports.formatKoreanCurrency = exports.pyeongToSquareMeters = exports.squareMetersToPyeong = void 0;
/**
 * 제곱미터를 평으로 변환
 * @param squareMeters 제곱미터 값
 * @returns 평 값 (소수점 2자리까지)
 */
const squareMetersToPyeong = (squareMeters) => {
    if (squareMeters < 0) {
        throw new Error('면적은 음수가 될 수 없습니다.');
    }
    return Math.round((squareMeters / 3.3058) * 100) / 100;
};
exports.squareMetersToPyeong = squareMetersToPyeong;
/**
 * 평을 제곱미터로 변환
 * @param pyeong 평 값
 * @returns 제곱미터 값 (소수점 2자리까지)
 */
const pyeongToSquareMeters = (pyeong) => {
    if (pyeong < 0) {
        throw new Error('면적은 음수가 될 수 없습니다.');
    }
    return Math.round((pyeong * 3.3058) * 100) / 100;
};
exports.pyeongToSquareMeters = pyeongToSquareMeters;
/**
 * 금액을 한국어 단위로 포맷팅
 * @param amount 금액 (원)
 * @param options 포맷팅 옵션
 * @returns 포맷팅된 금액 문자열
 */
const formatKoreanCurrency = (amount, options = {}) => {
    const { includeUnit = true, precision = 0, shortForm = false } = options;
    if (amount < 0) {
        throw new Error('금액은 음수가 될 수 없습니다.');
    }
    const eok = Math.floor(amount / 100000000);
    const man = Math.floor((amount % 100000000) / 10000);
    const remainder = amount % 10000;
    let result = '';
    if (eok > 0) {
        if (shortForm) {
            result += `${eok}억`;
        }
        else {
            result += `${eok.toLocaleString()}억`;
        }
    }
    if (man > 0) {
        if (result)
            result += ' ';
        if (shortForm) {
            result += `${man}만`;
        }
        else {
            result += `${man.toLocaleString()}만`;
        }
    }
    if (remainder > 0 || (eok === 0 && man === 0)) {
        if (result)
            result += ' ';
        if (precision > 0 && remainder < 10000) {
            const formatted = (remainder / 10000).toFixed(precision);
            result += `${formatted}만`;
        }
        else {
            result += remainder.toLocaleString();
        }
    }
    return includeUnit ? `${result}원` : result;
};
exports.formatKoreanCurrency = formatKoreanCurrency;
/**
 * 평당 가격 계산
 * @param totalPrice 총 가격
 * @param area 면적 (제곱미터)
 * @param unit 면적 단위 ('sqm' | 'pyeong')
 * @returns 평당 가격
 */
const calculatePricePerUnit = (totalPrice, area, unit = 'sqm') => {
    if (totalPrice < 0 || area <= 0) {
        throw new Error('가격과 면적은 양수여야 합니다.');
    }
    if (unit === 'sqm') {
        // 제곱미터를 평으로 변환 후 계산
        const pyeongArea = (0, exports.squareMetersToPyeong)(area);
        return Math.round(totalPrice / pyeongArea);
    }
    else {
        // 이미 평 단위
        return Math.round(totalPrice / area);
    }
};
exports.calculatePricePerUnit = calculatePricePerUnit;
/**
 * 숫자를 축약된 형태로 포맷팅 (K, M, B)
 * @param num 숫자
 * @param precision 소수점 자릿수
 * @returns 포맷팅된 문자열
 */
const formatCompactNumber = (num, precision = 1) => {
    if (num < 0) {
        return `-${(0, exports.formatCompactNumber)(-num, precision)}`;
    }
    if (num < 1000) {
        return num.toString();
    }
    if (num < 1000000) {
        return `${(num / 1000).toFixed(precision)}K`;
    }
    if (num < 1000000000) {
        return `${(num / 1000000).toFixed(precision)}M`;
    }
    return `${(num / 1000000000).toFixed(precision)}B`;
};
exports.formatCompactNumber = formatCompactNumber;
/**
 * 백분율 변화 계산
 * @param oldValue 이전 값
 * @param newValue 새로운 값
 * @param precision 소수점 자릿수
 * @returns 백분율 변화 (-100 ~ Infinity)
 */
const calculatePercentageChange = (oldValue, newValue, precision = 2) => {
    if (oldValue === 0) {
        return newValue === 0 ? 0 : Infinity;
    }
    const change = ((newValue - oldValue) / Math.abs(oldValue)) * 100;
    return Number(change.toFixed(precision));
};
exports.calculatePercentageChange = calculatePercentageChange;
/**
 * 범위 내 값으로 제한
 * @param value 값
 * @param min 최소값
 * @param max 최대값
 * @returns 제한된 값
 */
const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
};
exports.clamp = clamp;
/**
 * 면적대 분류
 * @param area 면적 (제곱미터)
 * @returns 면적대 분류
 */
const categorizeAreaSize = (area) => {
    const pyeong = (0, exports.squareMetersToPyeong)(area);
    if (pyeong < 15)
        return '소형';
    if (pyeong < 25)
        return '중소형';
    if (pyeong < 35)
        return '중형';
    if (pyeong < 45)
        return '중대형';
    return '대형';
};
exports.categorizeAreaSize = categorizeAreaSize;
//# sourceMappingURL=converters.js.map