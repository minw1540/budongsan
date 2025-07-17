/**
 * 단위 변환 유틸리티 함수
 */

/**
 * 제곱미터를 평으로 변환
 * @param squareMeters 제곱미터 값
 * @returns 평 값 (소수점 2자리까지)
 */
export const squareMetersToPyeong = (squareMeters: number): number => {
  if (squareMeters < 0) {
    throw new Error('면적은 음수가 될 수 없습니다.');
  }
  return Math.round((squareMeters / 3.3058) * 100) / 100;
};

/**
 * 평을 제곱미터로 변환
 * @param pyeong 평 값
 * @returns 제곱미터 값 (소수점 2자리까지)
 */
export const pyeongToSquareMeters = (pyeong: number): number => {
  if (pyeong < 0) {
    throw new Error('면적은 음수가 될 수 없습니다.');
  }
  return Math.round((pyeong * 3.3058) * 100) / 100;
};

/**
 * 금액을 한국어 단위로 포맷팅
 * @param amount 금액 (원)
 * @param options 포맷팅 옵션
 * @returns 포맷팅된 금액 문자열
 */
export const formatKoreanCurrency = (
  amount: number,
  options: {
    includeUnit?: boolean;
    precision?: number;
    shortForm?: boolean;
  } = {}
): string => {
  const {
    includeUnit = true,
    precision = 0,
    shortForm = false
  } = options;

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
    } else {
      result += `${eok.toLocaleString()}억`;
    }
  }

  if (man > 0) {
    if (result) result += ' ';
    if (shortForm) {
      result += `${man}만`;
    } else {
      result += `${man.toLocaleString()}만`;
    }
  }

  if (remainder > 0 || (eok === 0 && man === 0)) {
    if (result) result += ' ';
    if (precision > 0 && remainder < 10000) {
      const formatted = (remainder / 10000).toFixed(precision);
      result += `${formatted}만`;
    } else {
      result += remainder.toLocaleString();
    }
  }

  return includeUnit ? `${result}원` : result;
};

/**
 * 평당 가격 계산
 * @param totalPrice 총 가격
 * @param area 면적 (제곱미터)
 * @param unit 면적 단위 ('sqm' | 'pyeong')
 * @returns 평당 가격
 */
export const calculatePricePerUnit = (
  totalPrice: number,
  area: number,
  unit: 'sqm' | 'pyeong' = 'sqm'
): number => {
  if (totalPrice < 0 || area <= 0) {
    throw new Error('가격과 면적은 양수여야 합니다.');
  }

  if (unit === 'sqm') {
    // 제곱미터를 평으로 변환 후 계산
    const pyeongArea = squareMetersToPyeong(area);
    return Math.round(totalPrice / pyeongArea);
  } else {
    // 이미 평 단위
    return Math.round(totalPrice / area);
  }
};

/**
 * 숫자를 축약된 형태로 포맷팅 (K, M, B)
 * @param num 숫자
 * @param precision 소수점 자릿수
 * @returns 포맷팅된 문자열
 */
export const formatCompactNumber = (num: number, precision: number = 1): string => {
  if (num < 0) {
    return `-${formatCompactNumber(-num, precision)}`;
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

/**
 * 백분율 변화 계산
 * @param oldValue 이전 값
 * @param newValue 새로운 값
 * @param precision 소수점 자릿수
 * @returns 백분율 변화 (-100 ~ Infinity)
 */
export const calculatePercentageChange = (
  oldValue: number,
  newValue: number,
  precision: number = 2
): number => {
  if (oldValue === 0) {
    return newValue === 0 ? 0 : Infinity;
  }

  const change = ((newValue - oldValue) / Math.abs(oldValue)) * 100;
  return Number(change.toFixed(precision));
};

/**
 * 범위 내 값으로 제한
 * @param value 값
 * @param min 최소값
 * @param max 최대값
 * @returns 제한된 값
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * 면적대 분류
 * @param area 면적 (제곱미터)
 * @returns 면적대 분류
 */
export const categorizeAreaSize = (area: number): string => {
  const pyeong = squareMetersToPyeong(area);

  if (pyeong < 15) return '소형';
  if (pyeong < 25) return '중소형';
  if (pyeong < 35) return '중형';
  if (pyeong < 45) return '중대형';
  return '대형';
}; 