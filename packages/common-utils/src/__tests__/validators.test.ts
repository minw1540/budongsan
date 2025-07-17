/**
 * 유효성 검사 유틸리티 함수 테스트
 */

import {
  isValidEmail,
  isValidPhoneNumber,
  validatePasswordStrength,
  isEmpty,
  isInRange,
  isValidArea,
  isValidPrice,
  isValidBuildYear,
  isValidFloor,
  isValidLegalDongCode,
  isValidUrl,
  isValidDateString,
  hasUniqueElements,
  hasRequiredProperties
} from '../validators';

describe('Validators', () => {
  describe('isValidEmail', () => {
    it('유효한 이메일을 올바르게 검증해야 함', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag@domain.co.kr')).toBe(true);
    });

    it('유효하지 않은 이메일을 올바르게 검증해야 함', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
    });
  });

  describe('isValidPhoneNumber', () => {
    it('유효한 한국 전화번호를 올바르게 검증해야 함', () => {
      expect(isValidPhoneNumber('010-1234-5678')).toBe(true);
      expect(isValidPhoneNumber('02-123-4567')).toBe(true);
      expect(isValidPhoneNumber('031-123-4567')).toBe(true);
    });

    it('유효하지 않은 전화번호를 올바르게 검증해야 함', () => {
      expect(isValidPhoneNumber('010-123-456')).toBe(false);
      expect(isValidPhoneNumber('123-456-7890')).toBe(false);
      expect(isValidPhoneNumber('010123456')).toBe(false);
    });
  });

  describe('validatePasswordStrength', () => {
    it('강한 비밀번호를 올바르게 검증해야 함', () => {
      const result = validatePasswordStrength('StrongPass123!');
      expect(result.isValid).toBe(true);
      expect(result.score).toBe(5);
      expect(result.requirements.minLength).toBe(true);
      expect(result.requirements.hasUppercase).toBe(true);
      expect(result.requirements.hasLowercase).toBe(true);
      expect(result.requirements.hasNumbers).toBe(true);
      expect(result.requirements.hasSpecialChars).toBe(true);
    });

    it('약한 비밀번호를 올바르게 검증해야 함', () => {
      const result = validatePasswordStrength('weak');
      expect(result.isValid).toBe(false);
      expect(result.score).toBe(1);
      expect(result.suggestions.length).toBeGreaterThan(0);
    });
  });

  describe('isEmpty', () => {
    it('빈 값들을 올바르게 검증해야 함', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('   ')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
    });

    it('비어있지 않은 값들을 올바르게 검증해야 함', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty([1, 2, 3])).toBe(false);
      expect(isEmpty({ key: 'value' })).toBe(false);
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(false)).toBe(false);
    });
  });

  describe('isInRange', () => {
    it('범위 검증을 올바르게 수행해야 함', () => {
      expect(isInRange(5, 1, 10)).toBe(true);
      expect(isInRange(1, 1, 10)).toBe(true);
      expect(isInRange(10, 1, 10)).toBe(true);
      expect(isInRange(0, 1, 10)).toBe(false);
      expect(isInRange(11, 1, 10)).toBe(false);
    });
  });

  describe('isValidArea', () => {
    it('유효한 면적을 올바르게 검증해야 함', () => {
      expect(isValidArea(50)).toBe(true);
      expect(isValidArea(100)).toBe(true);
      expect(isValidArea(1)).toBe(true);
      expect(isValidArea(1000)).toBe(true);
    });

    it('유효하지 않은 면적을 올바르게 검증해야 함', () => {
      expect(isValidArea(0)).toBe(false);
      expect(isValidArea(1001)).toBe(false);
      expect(isValidArea(-10)).toBe(false);
    });
  });

  describe('isValidPrice', () => {
    it('유효한 가격을 올바르게 검증해야 함', () => {
      expect(isValidPrice(10000000)).toBe(true); // 1천만원
      expect(isValidPrice(100000000)).toBe(true); // 1억원
      expect(isValidPrice(1000000)).toBe(true); // 백만원
    });

    it('유효하지 않은 가격을 올바르게 검증해야 함', () => {
      expect(isValidPrice(500000)).toBe(false); // 50만원 (너무 낮음)
      expect(isValidPrice(200000000000)).toBe(false); // 2000억원 (너무 높음)
    });
  });

  describe('isValidBuildYear', () => {
    it('유효한 건축연도를 올바르게 검증해야 함', () => {
      const currentYear = new Date().getFullYear();
      expect(isValidBuildYear(2020)).toBe(true);
      expect(isValidBuildYear(1980)).toBe(true);
      expect(isValidBuildYear(currentYear)).toBe(true);
    });

    it('유효하지 않은 건축연도를 올바르게 검증해야 함', () => {
      const currentYear = new Date().getFullYear();
      expect(isValidBuildYear(1940)).toBe(false);
      expect(isValidBuildYear(currentYear + 5)).toBe(false);
    });
  });

  describe('isValidFloor', () => {
    it('유효한 층수를 올바르게 검증해야 함', () => {
      expect(isValidFloor(1)).toBe(true);
      expect(isValidFloor(20)).toBe(true);
      expect(isValidFloor(-2)).toBe(true); // 지하 2층
    });

    it('유효하지 않은 층수를 올바르게 검증해야 함', () => {
      expect(isValidFloor(-15)).toBe(false); // 지하 15층 (너무 깊음)
      expect(isValidFloor(300)).toBe(false); // 300층 (너무 높음)
    });
  });

  describe('isValidLegalDongCode', () => {
    it('유효한 법정동 코드를 올바르게 검증해야 함', () => {
      expect(isValidLegalDongCode('1168010100')).toBe(true);
      expect(isValidLegalDongCode('4113510300')).toBe(true);
    });

    it('유효하지 않은 법정동 코드를 올바르게 검증해야 함', () => {
      expect(isValidLegalDongCode('11680101')).toBe(false); // 8자리
      expect(isValidLegalDongCode('116801010a')).toBe(false); // 문자 포함
    });
  });

  describe('isValidUrl', () => {
    it('유효한 URL을 올바르게 검증해야 함', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://test.co.kr/path')).toBe(true);
      expect(isValidUrl('ftp://files.example.com')).toBe(true);
    });

    it('유효하지 않은 URL을 올바르게 검증해야 함', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('http://')).toBe(false);
    });
  });

  describe('isValidDateString', () => {
    it('유효한 날짜 문자열을 올바르게 검증해야 함', () => {
      expect(isValidDateString('2024-01-01')).toBe(true);
      expect(isValidDateString('2024-12-31')).toBe(true);
    });

    it('유효하지 않은 날짜 문자열을 올바르게 검증해야 함', () => {
      expect(isValidDateString('2024-13-01')).toBe(false); // 13월
      expect(isValidDateString('2024/01/01')).toBe(false); // 잘못된 형식
      expect(isValidDateString('not-a-date')).toBe(false);
    });
  });

  describe('hasUniqueElements', () => {
    it('고유 요소 검증을 올바르게 수행해야 함', () => {
      expect(hasUniqueElements([1, 2, 3, 4])).toBe(true);
      expect(hasUniqueElements(['a', 'b', 'c'])).toBe(true);
      expect(hasUniqueElements([1, 2, 2, 3])).toBe(false);
      expect(hasUniqueElements(['a', 'a', 'b'])).toBe(false);
    });
  });

  describe('hasRequiredProperties', () => {
    it('필수 속성 검증을 올바르게 수행해야 함', () => {
      const obj = { name: 'test', age: 30, email: 'test@example.com' };
      expect(hasRequiredProperties(obj, ['name', 'age'])).toBe(true);
      expect(hasRequiredProperties(obj, ['name', 'age', 'phone'])).toBe(false);
      expect(hasRequiredProperties({ name: '', age: 30 }, ['name', 'age'])).toBe(false);
    });
  });
}); 