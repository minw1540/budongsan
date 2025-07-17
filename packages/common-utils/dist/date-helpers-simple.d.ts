/**
 * 날짜/시간 관련 유틸리티 함수 (내장 Date 객체 사용)
 */
/**
 * 날짜를 YYYY-MM-DD 형식으로 포맷팅
 * @param date 날짜 객체 또는 ISO 문자열
 * @returns YYYY-MM-DD 형식 문자열
 */
export declare const formatDate: (date: Date | string) => string;
/**
 * 날짜를 한국어 형식으로 포맷팅
 * @param date 날짜 객체 또는 ISO 문자열
 * @param style 포맷 스타일
 * @returns 한국어 포맷 날짜 문자열
 */
export declare const formatKoreanDate: (date: Date | string, style?: "short" | "medium" | "long") => string;
/**
 * 현재로부터의 상대적 시간 표시 (한국어)
 * @param date 날짜 객체 또는 ISO 문자열
 * @returns 상대적 시간 문자열
 */
export declare const formatRelativeTime: (date: Date | string) => string;
/**
 * 두 날짜 사이의 기간 계산
 * @param startDate 시작 날짜
 * @param endDate 종료 날짜
 * @param unit 단위 ('days' | 'months' | 'years')
 * @returns 기간 (숫자)
 */
export declare const calculateDateDifference: (startDate: Date | string, endDate: Date | string, unit?: "days" | "months" | "years") => number;
/**
 * 날짜가 특정 범위 내에 있는지 확인
 * @param date 확인할 날짜
 * @param startDate 범위 시작 날짜
 * @param endDate 범위 종료 날짜
 * @returns 범위 내 여부
 */
export declare const isDateInRange: (date: Date | string, startDate: Date | string, endDate: Date | string) => boolean;
/**
 * 날짜 추가/빼기
 * @param date 기준 날짜
 * @param amount 추가/빼기할 양 (음수면 빼기)
 * @param unit 단위 ('days' | 'months' | 'years')
 * @returns 계산된 날짜
 */
export declare const manipulateDate: (date: Date | string, amount: number, unit: "days" | "months" | "years") => Date;
/**
 * 이번 달 시작과 끝 날짜 가져오기
 * @returns 이번 달 시작과 끝 날짜
 */
export declare const getCurrentMonthRange: () => {
    start: Date;
    end: Date;
};
/**
 * 최근 N개월 날짜 범위 생성
 * @param months 개월 수
 * @returns 날짜 범위
 */
export declare const getRecentMonthsRange: (months: number) => {
    start: Date;
    end: Date;
};
/**
 * 날짜를 ISO 문자열로 변환 (시간 제거)
 * @param date 날짜 객체
 * @returns ISO 날짜 문자열 (YYYY-MM-DD)
 */
export declare const toISODateString: (date: Date) => string;
/**
 * 날짜 유효성 검사
 * @param date 확인할 날짜
 * @returns 유효한 날짜인지 여부
 */
export declare const isValidDate: (date: Date | string) => boolean;
//# sourceMappingURL=date-helpers-simple.d.ts.map