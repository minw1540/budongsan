/**
 * 단위 변환 유틸리티 함수 테스트
 */

import {
  squareMetersToPyeong,
  pyeongToSquareMeters,
  formatKoreanCurrency,
  calculatePricePerUnit,
  formatCompactNumber,
  calculatePercentageChange,
  clamp,
  categorizeAreaSize
} from '../converters';

describe('Converters', () => {
  describe('squareMetersToPyeong', () => {
    it('제곱미터를 평으로 정확히 변환해야 함', () => {
      expect(squareMetersToPyeong(33.058)).toBe(10);
      expect(squareMetersToPyeong(66.116)).toBe(20);
      expect(squareMetersToPyeong(99.174)).toBe(30);
    });

    it('음수 입력 시 에러를 발생시켜야 함', () => {
      expect(() => squareMetersToPyeong(-10)).toThrow('면적은 음수가 될 수 없습니다.');
    });
  });

  describe('pyeongToSquareMeters', () => {
    it('평을 제곱미터로 정확히 변환해야 함', () => {
      expect(pyeongToSquareMeters(10)).toBe(33.06);
      expect(pyeongToSquareMeters(20)).toBe(66.12);
      expect(pyeongToSquareMeters(30)).toBe(99.17);
    });

    it('음수 입력 시 에러를 발생시켜야 함', () => {
      expect(() => pyeongToSquareMeters(-10)).toThrow('면적은 음수가 될 수 없습니다.');
    });
  });

  describe('formatKoreanCurrency', () => {
    it('원화를 한국어 단위로 포맷팅해야 함', () => {
      expect(formatKoreanCurrency(100000000)).toBe('1억원');
      expect(formatKoreanCurrency(150000000)).toBe('1억 5,000만원');
      expect(formatKoreanCurrency(10000)).toBe('1만원');
      expect(formatKoreanCurrency(5000)).toBe('5,000원');
    });

    it('단위 없이 포맷팅 옵션이 동작해야 함', () => {
      expect(formatKoreanCurrency(100000000, { includeUnit: false })).toBe('1억');
    });

    it('짧은 형태 포맷팅이 동작해야 함', () => {
      expect(formatKoreanCurrency(150000000, { shortForm: true })).toBe('1억 5000만원');
    });

    it('음수 입력 시 에러를 발생시켜야 함', () => {
      expect(() => formatKoreanCurrency(-1000)).toThrow('금액은 음수가 될 수 없습니다.');
    });
  });

  describe('calculatePricePerUnit', () => {
    it('평당 가격을 정확히 계산해야 함', () => {
      const totalPrice = 500000000; // 5억원
      const area = 33.058; // 10평에 해당하는 제곱미터
      const expected = Math.round(totalPrice / 10); // 5천만원

      expect(calculatePricePerUnit(totalPrice, area, 'sqm')).toBe(expected);
    });

    it('이미 평 단위인 경우 직접 계산해야 함', () => {
      const totalPrice = 500000000;
      const pyeongArea = 10;
      const expected = Math.round(totalPrice / pyeongArea);

      expect(calculatePricePerUnit(totalPrice, pyeongArea, 'pyeong')).toBe(expected);
    });

    it('잘못된 입력에 대해 에러를 발생시켜야 함', () => {
      expect(() => calculatePricePerUnit(-1000, 10)).toThrow('가격과 면적은 양수여야 합니다.');
      expect(() => calculatePricePerUnit(1000, 0)).toThrow('가격과 면적은 양수여야 합니다.');
    });
  });

  describe('formatCompactNumber', () => {
    it('숫자를 축약 형태로 포맷팅해야 함', () => {
      expect(formatCompactNumber(1500)).toBe('1.5K');
      expect(formatCompactNumber(1500000)).toBe('1.5M');
      expect(formatCompactNumber(1500000000)).toBe('1.5B');
      expect(formatCompactNumber(500)).toBe('500');
    });

    it('음수를 올바르게 처리해야 함', () => {
      expect(formatCompactNumber(-1500)).toBe('-1.5K');
    });
  });

  describe('calculatePercentageChange', () => {
    it('백분율 변화를 정확히 계산해야 함', () => {
      expect(calculatePercentageChange(100, 120)).toBe(20);
      expect(calculatePercentageChange(120, 100)).toBe(-16.67);
      expect(calculatePercentageChange(100, 100)).toBe(0);
    });

    it('0에서 변화하는 경우 Infinity를 반환해야 함', () => {
      expect(calculatePercentageChange(0, 100)).toBe(Infinity);
      expect(calculatePercentageChange(0, 0)).toBe(0);
    });
  });

  describe('clamp', () => {
    it('값을 범위 내로 제한해야 함', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });
  });

  describe('categorizeAreaSize', () => {
    it('면적을 올바른 크기 분류로 나누어야 함', () => {
      expect(categorizeAreaSize(45)).toBe('소형'); // 약 13.6평
      expect(categorizeAreaSize(70)).toBe('중소형'); // 약 21평
      expect(categorizeAreaSize(100)).toBe('중형'); // 약 30평
      expect(categorizeAreaSize(130)).toBe('중대형'); // 약 39평
      expect(categorizeAreaSize(200)).toBe('대형'); // 약 60평
    });
  });
}); 