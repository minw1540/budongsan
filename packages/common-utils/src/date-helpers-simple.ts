/**
 * 날짜/시간 관련 유틸리티 함수 (내장 Date 객체 사용)
 */

/**
 * 날짜를 YYYY-MM-DD 형식으로 포맷팅
 * @param date 날짜 객체 또는 ISO 문자열
 * @returns YYYY-MM-DD 형식 문자열
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    throw new Error('유효하지 않은 날짜입니다.');
  }

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * 날짜를 한국어 형식으로 포맷팅
 * @param date 날짜 객체 또는 ISO 문자열
 * @param style 포맷 스타일
 * @returns 한국어 포맷 날짜 문자열
 */
export const formatKoreanDate = (
  date: Date | string,
  style: 'short' | 'medium' | 'long' = 'medium'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    throw new Error('유효하지 않은 날짜입니다.');
  }

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[dateObj.getDay()];

  switch (style) {
    case 'short':
      return `${String(year).slice(2)}.${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`;
    case 'medium':
      return `${year}년 ${month}월 ${day}일`;
    case 'long':
      return `${year}년 ${month}월 ${day}일 (${weekday})`;
    default:
      return `${year}년 ${month}월 ${day}일`;
  }
};

/**
 * 현재로부터의 상대적 시간 표시 (한국어)
 * @param date 날짜 객체 또는 ISO 문자열
 * @returns 상대적 시간 문자열
 */
export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    throw new Error('유효하지 않은 날짜입니다.');
  }

  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInMs > 0) {
    // 과거
    if (diffInMinutes < 1) return '방금 전';
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    if (diffInDays < 30) return `${diffInDays}일 전`;
    if (diffInMonths < 12) return `${diffInMonths}개월 전`;
    return `${diffInYears}년 전`;
  } else {
    // 미래
    const absDiffInMinutes = Math.abs(diffInMinutes);
    const absDiffInHours = Math.abs(diffInHours);
    const absDiffInDays = Math.abs(diffInDays);
    const absDiffInMonths = Math.abs(diffInMonths);
    const absDiffInYears = Math.abs(diffInYears);

    if (absDiffInMinutes < 1) return '곧';
    if (absDiffInMinutes < 60) return `${absDiffInMinutes}분 후`;
    if (absDiffInHours < 24) return `${absDiffInHours}시간 후`;
    if (absDiffInDays < 30) return `${absDiffInDays}일 후`;
    if (absDiffInMonths < 12) return `${absDiffInMonths}개월 후`;
    return `${absDiffInYears}년 후`;
  }
};

/**
 * 두 날짜 사이의 기간 계산
 * @param startDate 시작 날짜
 * @param endDate 종료 날짜
 * @param unit 단위 ('days' | 'months' | 'years')
 * @returns 기간 (숫자)
 */
export const calculateDateDifference = (
  startDate: Date | string,
  endDate: Date | string,
  unit: 'days' | 'months' | 'years' = 'days'
): number => {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('유효하지 않은 날짜입니다.');
  }

  const diffInMs = end.getTime() - start.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  switch (unit) {
    case 'days':
      return diffInDays;
    case 'months':
      return Math.floor(diffInDays / 30);
    case 'years':
      return Math.floor(diffInDays / 365);
    default:
      throw new Error('지원하지 않는 단위입니다.');
  }
};

/**
 * 날짜가 특정 범위 내에 있는지 확인
 * @param date 확인할 날짜
 * @param startDate 범위 시작 날짜
 * @param endDate 범위 종료 날짜
 * @returns 범위 내 여부
 */
export const isDateInRange = (
  date: Date | string,
  startDate: Date | string,
  endDate: Date | string
): boolean => {
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  if (isNaN(targetDate.getTime()) || isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('유효하지 않은 날짜입니다.');
  }

  return targetDate >= start && targetDate <= end;
};

/**
 * 날짜 추가/빼기
 * @param date 기준 날짜
 * @param amount 추가/빼기할 양 (음수면 빼기)
 * @param unit 단위 ('days' | 'months' | 'years')
 * @returns 계산된 날짜
 */
export const manipulateDate = (
  date: Date | string,
  amount: number,
  unit: 'days' | 'months' | 'years'
): Date => {
  const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    throw new Error('유효하지 않은 날짜입니다.');
  }

  switch (unit) {
    case 'days':
      dateObj.setDate(dateObj.getDate() + amount);
      break;
    case 'months':
      dateObj.setMonth(dateObj.getMonth() + amount);
      break;
    case 'years':
      dateObj.setFullYear(dateObj.getFullYear() + amount);
      break;
    default:
      throw new Error('지원하지 않는 단위입니다.');
  }

  return dateObj;
};

/**
 * 이번 달 시작과 끝 날짜 가져오기
 * @returns 이번 달 시작과 끝 날짜
 */
export const getCurrentMonthRange = (): { start: Date; end: Date } => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  return { start, end };
};

/**
 * 최근 N개월 날짜 범위 생성
 * @param months 개월 수
 * @returns 날짜 범위
 */
export const getRecentMonthsRange = (months: number): { start: Date; end: Date } => {
  const end = new Date();
  const start = new Date();
  start.setMonth(start.getMonth() - months);
  
  return { start, end };
};

/**
 * 날짜를 ISO 문자열로 변환 (시간 제거)
 * @param date 날짜 객체
 * @returns ISO 날짜 문자열 (YYYY-MM-DD)
 */
export const toISODateString = (date: Date): string => {
  return formatDate(date);
};

/**
 * 날짜 유효성 검사
 * @param date 확인할 날짜
 * @returns 유효한 날짜인지 여부
 */
export const isValidDate = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return !isNaN(dateObj.getTime());
}; 