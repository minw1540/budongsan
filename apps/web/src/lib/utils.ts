import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * 면적 단위 변환 (제곱미터 <-> 평)
 */
export function convertArea(value: number, from: 'sqm' | 'pyeong', to: 'sqm' | 'pyeong'): number {
  if (from === to) return value;
  
  if (from === 'sqm' && to === 'pyeong') {
    return value / 3.3058; // 1평 = 3.3058㎡
  }
  
  if (from === 'pyeong' && to === 'sqm') {
    return value * 3.3058;
  }
  
  return value;
}

/**
 * 가격 포맷팅 (만원 단위)
 */
export function formatPrice(price: number): string {
  if (price >= 10000) {
    const billions = Math.floor(price / 10000);
    const remainder = price % 10000;
    if (remainder === 0) {
      return `${billions}억원`;
    }
    return `${billions}억 ${remainder.toLocaleString()}만원`;
  }
  return `${price.toLocaleString()}만원`;
}

/**
 * 날짜 포맷팅
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
} 