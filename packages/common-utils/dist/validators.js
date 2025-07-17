"use strict";
/**
 * 공통 유효성 검사 유틸리티 함수
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRequiredProperties = exports.hasUniqueElements = exports.isValidDateString = exports.isValidUrl = exports.isValidLegalDongCode = exports.isValidFloor = exports.isValidBuildYear = exports.isValidPrice = exports.isValidArea = exports.isInRange = exports.isEmpty = exports.validatePasswordStrength = exports.isValidPhoneNumber = exports.isValidEmail = void 0;
/**
 * 이메일 형식 검증
 * @param email 이메일 주소
 * @returns 유효한 이메일 형식인지 여부
 */
const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};
exports.isValidEmail = isValidEmail;
/**
 * 전화번호 형식 검증 (한국)
 * @param phoneNumber 전화번호
 * @returns 유효한 전화번호 형식인지 여부
 */
const isValidPhoneNumber = (phoneNumber) => {
    // 한국 전화번호 형식: 010-0000-0000, 02-000-0000, 031-000-0000 등
    const phoneRegex = /^(010|011|016|017|018|019)-\d{3,4}-\d{4}$|^(02|0[3-9]\d)-\d{3,4}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
};
exports.isValidPhoneNumber = isValidPhoneNumber;
/**
 * 비밀번호 강도 검증
 * @param password 비밀번호
 * @returns 비밀번호 강도 정보
 */
const validatePasswordStrength = (password) => {
    const requirements = {
        minLength: password.length >= 8,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumbers: /\d/.test(password),
        hasSpecialChars: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
    const score = Object.values(requirements).filter(Boolean).length;
    const isValid = score >= 4;
    const suggestions = [];
    if (!requirements.minLength)
        suggestions.push('최소 8자 이상이어야 합니다');
    if (!requirements.hasUppercase)
        suggestions.push('대문자를 포함해야 합니다');
    if (!requirements.hasLowercase)
        suggestions.push('소문자를 포함해야 합니다');
    if (!requirements.hasNumbers)
        suggestions.push('숫자를 포함해야 합니다');
    if (!requirements.hasSpecialChars)
        suggestions.push('특수문자를 포함해야 합니다');
    return {
        isValid,
        score,
        requirements,
        suggestions
    };
};
exports.validatePasswordStrength = validatePasswordStrength;
/**
 * 문자열이 빈 값인지 확인 (null, undefined, 공백 포함)
 * @param value 확인할 값
 * @returns 빈 값인지 여부
 */
const isEmpty = (value) => {
    if (value === null || value === undefined)
        return true;
    if (typeof value === 'string')
        return value.trim().length === 0;
    if (Array.isArray(value))
        return value.length === 0;
    if (typeof value === 'object')
        return Object.keys(value).length === 0;
    return false;
};
exports.isEmpty = isEmpty;
/**
 * 숫자 범위 검증
 * @param value 검증할 값
 * @param min 최소값
 * @param max 최대값
 * @returns 범위 내 값인지 여부
 */
const isInRange = (value, min, max) => {
    return value >= min && value <= max;
};
exports.isInRange = isInRange;
/**
 * 면적 유효성 검증
 * @param area 면적 (제곱미터)
 * @returns 유효한 면적인지 여부
 */
const isValidArea = (area) => {
    // 면적은 1㎡ 이상 1000㎡ 이하로 제한
    return (0, exports.isInRange)(area, 1, 1000);
};
exports.isValidArea = isValidArea;
/**
 * 가격 유효성 검증
 * @param price 가격 (원)
 * @returns 유효한 가격인지 여부
 */
const isValidPrice = (price) => {
    // 가격은 100만원 이상 1000억원 이하로 제한
    return (0, exports.isInRange)(price, 1000000, 100000000000);
};
exports.isValidPrice = isValidPrice;
/**
 * 건축연도 유효성 검증
 * @param year 건축연도
 * @returns 유효한 건축연도인지 여부
 */
const isValidBuildYear = (year) => {
    const currentYear = new Date().getFullYear();
    return (0, exports.isInRange)(year, 1950, currentYear + 2); // 1950년부터 내년까지
};
exports.isValidBuildYear = isValidBuildYear;
/**
 * 층수 유효성 검증
 * @param floor 층수
 * @returns 유효한 층수인지 여부
 */
const isValidFloor = (floor) => {
    return (0, exports.isInRange)(floor, -10, 200); // 지하 10층부터 200층까지
};
exports.isValidFloor = isValidFloor;
/**
 * 한국 법정동 코드 형식 검증
 * @param code 법정동 코드
 * @returns 유효한 법정동 코드 형식인지 여부
 */
const isValidLegalDongCode = (code) => {
    // 법정동 코드는 10자리 숫자
    const codeRegex = /^\d{10}$/;
    return codeRegex.test(code);
};
exports.isValidLegalDongCode = isValidLegalDongCode;
/**
 * URL 형식 검증
 * @param url URL 문자열
 * @returns 유효한 URL 형식인지 여부
 */
const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    }
    catch {
        return false;
    }
};
exports.isValidUrl = isValidUrl;
/**
 * 날짜 문자열 형식 검증 (YYYY-MM-DD)
 * @param dateString 날짜 문자열
 * @returns 유효한 날짜 형식인지 여부
 */
const isValidDateString = (dateString) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString))
        return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
};
exports.isValidDateString = isValidDateString;
/**
 * 배열의 모든 요소가 고유한지 확인
 * @param array 확인할 배열
 * @returns 모든 요소가 고유한지 여부
 */
const hasUniqueElements = (array) => {
    return new Set(array).size === array.length;
};
exports.hasUniqueElements = hasUniqueElements;
/**
 * 객체의 필수 속성이 모두 존재하는지 확인
 * @param obj 확인할 객체
 * @param requiredKeys 필수 속성 키 배열
 * @returns 필수 속성이 모두 존재하는지 여부
 */
const hasRequiredProperties = (obj, requiredKeys) => {
    return requiredKeys.every(key => key in obj && !(0, exports.isEmpty)(obj[key]));
};
exports.hasRequiredProperties = hasRequiredProperties;
//# sourceMappingURL=validators.js.map