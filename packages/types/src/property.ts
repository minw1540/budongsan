/**
 * 부동산 매물/단지 관련 타입 정의
 */

import { BaseEntity, Coordinates } from './common';

/**
 * 거래 유형
 */
export type TransactionType = 'sale' | 'lease' | 'rent';

/**
 * 부동산 유형
 */
export type PropertyType = 'apartment' | 'villa' | 'house' | 'office' | 'commercial';

/**
 * 지역 정보
 */
export interface Region extends BaseEntity {
  code: string;
  name: string;
  level: 'sido' | 'sigungu' | 'dong';
  parentCode?: string;
  coordinates?: Coordinates;
}

/**
 * 아파트 단지 정보
 */
export interface Complex extends BaseEntity {
  aptSeq: number;
  name: string;
  buildYear: number;
  address: string;
  roadAddress: string;
  coordinates: Coordinates;
  totalHouseholds: number;
  dongCount: number;
  parkingCount?: number;
  region: {
    sidoCode: string;
    sidoName: string;
    sigunguCode: string;
    sigunguName: string;
    dongCode: string;
    dongName: string;
  };
  facilities?: {
    elevator: boolean;
    parking: boolean;
    security: boolean;
    playground: boolean;
    gym: boolean;
    sauna: boolean;
  };
}

/**
 * 아파트 세대 정보
 */
export interface Unit {
  dong: string;
  ho: string;
  exclusiveUseArea: number;
  supplyArea?: number;
  floor: number;
  direction?: string;
  roomCount?: number;
  bathroomCount?: number;
}

/**
 * 부동산 거래 정보
 */
export interface PropertyTransaction extends BaseEntity {
  aptSeq: number;
  complexName: string;
  dong: string;
  ho?: string;
  exclusiveUseArea: number;
  floor: number;
  transactionType: TransactionType;
  price: number;
  deposit?: number; // 전세금, 보증금
  monthlyRent?: number; // 월세
  transactionDate: Date;
  address: string;
  buildYear: number;
  coordinates: Coordinates;
  region: {
    sidoCode: string;
    sidoName: string;
    sigunguCode: string;
    sigunguName: string;
    dongCode: string;
    dongName: string;
  };
  isNewBuilding?: boolean;
  cancelYN?: 'Y' | 'N';
  cancelDate?: Date;
  estateAgentName?: string;
}

/**
 * 매물 검색 필터
 */
export interface PropertySearchFilter {
  region?: {
    sidoCode?: string;
    sigunguCode?: string;
    dongCode?: string;
  };
  transactionType?: TransactionType[];
  priceRange?: {
    min?: number;
    max?: number;
  };
  areaRange?: {
    min?: number;
    max?: number;
  };
  buildYearRange?: {
    min?: number;
    max?: number;
  };
  transactionDateRange?: {
    startDate?: Date;
    endDate?: Date;
  };
  complexName?: string;
  coordinates?: {
    center: Coordinates;
    radius: number; // 미터 단위
  };
}

/**
 * 매물 통계 정보
 */
export interface PropertyStatistics {
  aptSeq: number;
  exclusiveUseArea: number;
  transactionType: TransactionType;
  statistics: {
    totalCount: number;
    averagePrice: number;
    medianPrice: number;
    minPrice: number;
    maxPrice: number;
    pricePerArea: number;
    lastTransactionDate: Date;
    monthlyTrend: {
      month: string;
      averagePrice: number;
      transactionCount: number;
    }[];
  };
}

/**
 * 매물 즐겨찾기
 */
export interface PropertyBookmark extends BaseEntity {
  userId: string;
  aptSeq: number;
  exclusiveUseArea?: number;
  transactionType?: TransactionType;
  memo?: string;
  alertSettings?: {
    priceAlert: boolean;
    priceThreshold?: number;
    newTransactionAlert: boolean;
  };
} 