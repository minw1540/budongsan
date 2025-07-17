import { cn, convertArea, formatPrice, formatDate } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('combines class names correctly', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('handles conditional classes', () => {
      expect(cn('foo', true && 'bar', false && 'baz')).toBe('foo bar');
    });

    it('handles undefined and null values', () => {
      expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
    });
  });

  describe('convertArea', () => {
    it('converts square meters to pyeong correctly', () => {
      expect(convertArea(33.058, 'sqm', 'pyeong')).toBeCloseTo(10, 2);
    });

    it('converts pyeong to square meters correctly', () => {
      expect(convertArea(10, 'pyeong', 'sqm')).toBeCloseTo(33.058, 2);
    });

    it('returns same value when converting same unit', () => {
      expect(convertArea(100, 'sqm', 'sqm')).toBe(100);
      expect(convertArea(30, 'pyeong', 'pyeong')).toBe(30);
    });
  });

  describe('formatPrice', () => {
    it('formats prices in 만원 correctly', () => {
      expect(formatPrice(5000)).toBe('5,000만원');
    });

    it('formats prices in 억원 correctly', () => {
      expect(formatPrice(50000)).toBe('5억원');
    });

    it('formats mixed 억만원 correctly', () => {
      expect(formatPrice(52000)).toBe('5억 2,000만원');
    });

    it('handles zero price', () => {
      expect(formatPrice(0)).toBe('0만원');
    });
  });

  describe('formatDate', () => {
    it('formats date string correctly', () => {
      const date = '2024-01-15';
      expect(formatDate(date)).toBe('2024. 01. 15.');
    });

    it('formats Date object correctly', () => {
      const date = new Date('2024-12-25');
      expect(formatDate(date)).toBe('2024. 12. 25.');
    });

    it('handles invalid date gracefully', () => {
      expect(() => formatDate('invalid-date')).not.toThrow();
    });
  });
}); 