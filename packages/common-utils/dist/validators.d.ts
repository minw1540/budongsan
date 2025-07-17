/**
 * 공통 유효성 검사 유틸리티 함수
 */
/**
 * 이메일 형식 검증
 * @param email 이메일 주소
 * @returns 유효한 이메일 형식인지 여부
 */
export declare const isValidEmail: (email: string) => boolean;
/**
 * 전화번호 형식 검증 (한국)
 * @param phoneNumber 전화번호
 * @returns 유효한 전화번호 형식인지 여부
 */
export declare const isValidPhoneNumber: (phoneNumber: string) => boolean;
/**
 * 비밀번호 강도 검증
 * @param password 비밀번호
 * @returns 비밀번호 강도 정보
 */
export declare const validatePasswordStrength: (password: string) => {
    isValid: boolean;
    score: number;
    requirements: {
        minLength: boolean;
        hasUppercase: boolean;
        hasLowercase: boolean;
        hasNumbers: boolean;
        hasSpecialChars: boolean;
    };
    suggestions: string[];
};
/**
 * 문자열이 빈 값인지 확인 (null, undefined, 공백 포함)
 * @param value 확인할 값
 * @returns 빈 값인지 여부
 */
export declare const isEmpty: (value: unknown) => boolean;
/**
 * 숫자 범위 검증
 * @param value 검증할 값
 * @param min 최소값
 * @param max 최대값
 * @returns 범위 내 값인지 여부
 */
export declare const isInRange: (value: number, min: number, max: number) => boolean;
/**
 * 면적 유효성 검증
 * @param area 면적 (제곱미터)
 * @returns 유효한 면적인지 여부
 */
export declare const isValidArea: (area: number) => boolean;
/**
 * 가격 유효성 검증
 * @param price 가격 (원)
 * @returns 유효한 가격인지 여부
 */
export declare const isValidPrice: (price: number) => boolean;
/**
 * 건축연도 유효성 검증
 * @param year 건축연도
 * @returns 유효한 건축연도인지 여부
 */
export declare const isValidBuildYear: (year: number) => boolean;
/**
 * 층수 유효성 검증
 * @param floor 층수
 * @returns 유효한 층수인지 여부
 */
export declare const isValidFloor: (floor: number) => boolean;
/**
 * 한국 법정동 코드 형식 검증
 * @param code 법정동 코드
 * @returns 유효한 법정동 코드 형식인지 여부
 */
export declare const isValidLegalDongCode: (code: string) => boolean;
/**
 * URL 형식 검증
 * @param url URL 문자열
 * @returns 유효한 URL 형식인지 여부
 */
export declare const isValidUrl: (url: string) => boolean;
/**
 * 날짜 문자열 형식 검증 (YYYY-MM-DD)
 * @param dateString 날짜 문자열
 * @returns 유효한 날짜 형식인지 여부
 */
export declare const isValidDateString: (dateString: string) => boolean;
/**
 * 배열의 모든 요소가 고유한지 확인
 * @param array 확인할 배열
 * @returns 모든 요소가 고유한지 여부
 */
export declare const hasUniqueElements: <T>(array: T[]) => boolean;
/**
 * 객체의 필수 속성이 모두 존재하는지 확인
 * @param obj 확인할 객체
 * @param requiredKeys 필수 속성 키 배열
 * @returns 필수 속성이 모두 존재하는지 여부
 */
export declare const hasRequiredProperties: (obj: Record<string, unknown>, requiredKeys: string[]) => boolean;
//# sourceMappingURL=validators.d.ts.map