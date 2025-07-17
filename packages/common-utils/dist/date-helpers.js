"use strict";
/**
 * 날짜/시간 관련 유틸리티 함수
 * date-fns 라이브러리를 활용하여 안전하고 일관된 날짜 처리를 제공
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKoreanTime = exports.toISODateString = exports.getRecentMonthsRange = exports.getCurrentMonthRange = exports.manipulateDate = exports.isDateInRange = exports.generateDateRange = exports.getPeriodRange = exports.calculateDateDifference = exports.formatRelativeTime = exports.formatKoreanDate = exports.formatDate = void 0;
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
/**
 * 날짜를 지정된 형식으로 포맷팅 (한국어)
 * @param date 날짜 객체 또는 ISO 문자열
 * @param formatString 포맷 문자열 (기본: 'yyyy-MM-dd')
 * @returns 포맷팅된 날짜 문자열
 */
const formatDate = (date, formatString = 'yyyy-MM-dd') => {
    const dateObj = typeof date === 'string' ? (0, date_fns_1.parseISO)(date) : date;
    if (!(0, date_fns_1.isValid)(dateObj)) {
        throw new Error('유효하지 않은 날짜입니다.');
    }
    return (0, date_fns_1.format)(dateObj, formatString, { locale: locale_1.ko });
};
exports.formatDate = formatDate;
/**
 * 날짜를 한국어 형식으로 포맷팅
 * @param date 날짜 객체 또는 ISO 문자열
 * @param style 포맷 스타일
 * @returns 한국어 포맷 날짜 문자열
 */
const formatKoreanDate = (date, style = 'medium') => {
    const dateObj = typeof date === 'string' ? (0, date_fns_1.parseISO)(date) : date;
    if (!(0, date_fns_1.isValid)(dateObj)) {
        throw new Error('유효하지 않은 날짜입니다.');
    }
    const formatMap = {
        short: 'yy.MM.dd',
        medium: 'yyyy년 MM월 dd일',
        long: 'yyyy년 MM월 dd일 (eee)',
        full: 'yyyy년 MM월 dd일 (eeee)'
    };
    return (0, date_fns_1.format)(dateObj, formatMap[style], { locale: locale_1.ko });
};
exports.formatKoreanDate = formatKoreanDate;
/**
 * 현재로부터의 상대적 시간 표시 (한국어)
 * @param date 날짜 객체 또는 ISO 문자열
 * @returns 상대적 시간 문자열 (예: "3일 전", "2개월 후")
 */
const formatRelativeTime = (date) => {
    const dateObj = typeof date === 'string' ? (0, date_fns_1.parseISO)(date) : date;
    if (!(0, date_fns_1.isValid)(dateObj)) {
        throw new Error('유효하지 않은 날짜입니다.');
    }
    return (0, date_fns_1.formatDistanceToNow)(dateObj, {
        addSuffix: true,
        locale: locale_1.ko
    });
};
exports.formatRelativeTime = formatRelativeTime;
/**
 * 두 날짜 사이의 기간 계산
 * @param startDate 시작 날짜
 * @param endDate 종료 날짜
 * @param unit 단위 ('days' | 'months' | 'years')
 * @returns 기간 (숫자)
 */
const calculateDateDifference = (startDate, endDate, unit = 'days') => {
    const start = typeof startDate === 'string' ? (0, date_fns_1.parseISO)(startDate) : startDate;
    const end = typeof endDate === 'string' ? (0, date_fns_1.parseISO)(endDate) : endDate;
    if (!(0, date_fns_1.isValid)(start) || !(0, date_fns_1.isValid)(end)) {
        throw new Error('유효하지 않은 날짜입니다.');
    }
    switch (unit) {
        case 'days':
            return (0, date_fns_1.differenceInDays)(end, start);
        case 'months':
            return (0, date_fns_1.differenceInMonths)(end, start);
        case 'years':
            return (0, date_fns_1.differenceInYears)(end, start);
        default:
            throw new Error('지원하지 않는 단위입니다.');
    }
};
exports.calculateDateDifference = calculateDateDifference;
/**
 * 특정 기간의 시작과 끝 날짜 생성
 * @param date 기준 날짜
 * @param period 기간 ('day' | 'month' | 'year')
 * @returns 시작과 끝 날짜 객체
 */
const getPeriodRange = (date, period) => {
    const dateObj = typeof date === 'string' ? (0, date_fns_1.parseISO)(date) : date;
    if (!(0, date_fns_1.isValid)(dateObj)) {
        throw new Error('유효하지 않은 날짜입니다.');
    }
    switch (period) {
        case 'day':
            return {
                start: (0, date_fns_1.startOfDay)(dateObj),
                end: (0, date_fns_1.endOfDay)(dateObj)
            };
        case 'month':
            return {
                start: (0, date_fns_1.startOfMonth)(dateObj),
                end: (0, date_fns_1.endOfMonth)(dateObj)
            };
        case 'year':
            return {
                start: (0, date_fns_1.startOfYear)(dateObj),
                end: (0, date_fns_1.endOfYear)(dateObj)
            };
        default:
            throw new Error('지원하지 않는 기간입니다.');
    }
};
exports.getPeriodRange = getPeriodRange;
/**
 * 날짜 범위 생성
 * @param startDate 시작 날짜
 * @param days 기간 (일수)
 * @returns 날짜 범위 배열
 */
const generateDateRange = (startDate, days) => {
    const start = typeof startDate === 'string' ? (0, date_fns_1.parseISO)(startDate) : startDate;
    if (!(0, date_fns_1.isValid)(start)) {
        throw new Error('유효하지 않은 날짜입니다.');
    }
    const range = [];
    for (let i = 0; i < days; i++) {
        range.push((0, date_fns_1.addDays)(start, i));
    }
    return range;
};
exports.generateDateRange = generateDateRange;
/**
 * 날짜가 특정 범위 내에 있는지 확인
 * @param date 확인할 날짜
 * @param startDate 범위 시작 날짜
 * @param endDate 범위 종료 날짜
 * @returns 범위 내 여부
 */
const isDateInRange = (date, startDate, endDate) => {
    const targetDate = typeof date === 'string' ? (0, date_fns_1.parseISO)(date) : date;
    const start = typeof startDate === 'string' ? (0, date_fns_1.parseISO)(startDate) : startDate;
    const end = typeof endDate === 'string' ? (0, date_fns_1.parseISO)(endDate) : endDate;
    if (!(0, date_fns_1.isValid)(targetDate) || !(0, date_fns_1.isValid)(start) || !(0, date_fns_1.isValid)(end)) {
        throw new Error('유효하지 않은 날짜입니다.');
    }
    return (0, date_fns_1.isWithinInterval)(targetDate, { start, end });
};
exports.isDateInRange = isDateInRange;
/**
 * 날짜 추가/빼기
 * @param date 기준 날짜
 * @param amount 추가/빼기할 양 (음수면 빼기)
 * @param unit 단위 ('days' | 'months' | 'years')
 * @returns 계산된 날짜
 */
const manipulateDate = (date, amount, unit) => {
    const dateObj = typeof date === 'string' ? (0, date_fns_1.parseISO)(date) : date;
    if (!(0, date_fns_1.isValid)(dateObj)) {
        throw new Error('유효하지 않은 날짜입니다.');
    }
    if (amount === 0)
        return dateObj;
    const isPositive = amount > 0;
    const absAmount = Math.abs(amount);
    switch (unit) {
        case 'days':
            return isPositive ? (0, date_fns_1.addDays)(dateObj, absAmount) : (0, date_fns_1.subDays)(dateObj, absAmount);
        case 'months':
            return isPositive ? (0, date_fns_1.addMonths)(dateObj, absAmount) : (0, date_fns_1.subMonths)(dateObj, absAmount);
        case 'years':
            return isPositive ? (0, date_fns_1.addYears)(dateObj, absAmount) : (0, date_fns_1.subYears)(dateObj, absAmount);
        default:
            throw new Error('지원하지 않는 단위입니다.');
    }
};
exports.manipulateDate = manipulateDate;
/**
 * 이번 달 거래 데이터 날짜 범위 생성
 * @returns 이번 달 시작과 끝 날짜
 */
const getCurrentMonthRange = () => {
    return (0, exports.getPeriodRange)(new Date(), 'month');
};
exports.getCurrentMonthRange = getCurrentMonthRange;
/**
 * 최근 N개월 날짜 범위 생성
 * @param months 개월 수
 * @returns 날짜 범위
 */
const getRecentMonthsRange = (months) => {
    const end = new Date();
    const start = (0, date_fns_1.subMonths)(end, months);
    return {
        start: (0, date_fns_1.startOfMonth)(start),
        end: (0, date_fns_1.endOfMonth)(end)
    };
};
exports.getRecentMonthsRange = getRecentMonthsRange;
/**
 * 날짜를 ISO 문자열로 변환 (시간 제거)
 * @param date 날짜 객체
 * @returns ISO 날짜 문자열 (YYYY-MM-DD)
 */
const toISODateString = (date) => {
    return (0, date_fns_1.format)(date, 'yyyy-MM-dd');
};
exports.toISODateString = toISODateString;
/**
 * 한국 시간대로 날짜 조정
 * @param date 날짜 객체 또는 ISO 문자열
 * @returns 한국 시간대로 조정된 날짜
 */
const toKoreanTime = (date) => {
    const dateObj = typeof date === 'string' ? (0, date_fns_1.parseISO)(date) : date;
    if (!(0, date_fns_1.isValid)(dateObj)) {
        throw new Error('유효하지 않은 날짜입니다.');
    }
    // UTC+9 (한국 시간) 으로 조정
    const koreanTime = new Date(dateObj.getTime() + (9 * 60 * 60 * 1000));
    return koreanTime;
};
exports.toKoreanTime = toKoreanTime;
//# sourceMappingURL=date-helpers.js.map