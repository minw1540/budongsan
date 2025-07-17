import { BaseEntity, BaseFilter } from './common';
/**
 * 지역 정보
 */
export interface Region extends BaseEntity {
    lawdCd: string;
    sidoNm: string;
    sggNm: string;
    umdNm?: string;
    characteristics?: Record<string, any>;
}
/**
 * 아파트 단지 정보
 */
export interface Complex extends BaseEntity {
    aptSeq: string;
    aptNm: string;
    lawdCd: string;
    umdNm: string;
    jibun?: string;
    roadNm?: string;
    buildYear?: number;
    totalHouseholds?: number;
    totalParkingSpaces?: number;
    parkingPerHousehold?: number;
    floorAreaRatio?: number;
    buildingToLandRatio?: number;
    developer?: string;
    heatingType?: string;
    managementOfficeContact?: string;
    keySummary?: string;
    schoolDistrictInfo?: Record<string, any>;
    subwayStationInfo?: Record<string, any>;
}
/**
 * 거래 구분
 */
export type TransactionType = '매매' | '전세' | '월세';
/**
 * 부동산 거래 내역
 */
export interface PropertyTransaction extends BaseEntity {
    aptSeq: string;
    lawdCd: string;
    exclusiveUseArea: number;
    dealAmount: number;
    dealYear: number;
    dealMonth: number;
    dealDay: number;
    contractDate: Date;
    floor?: number;
    transactionType?: string;
    transactionGbn: TransactionType;
    sggCd?: string;
    umdCd?: string;
    umdNm?: string;
    jibun?: string;
    buildYear?: number;
    aptDong?: string;
}
/**
 * 매물 검색 필터
 */
export interface PropertySearchFilter extends BaseFilter {
    lawdCd?: string;
    aptSeq?: string;
    transactionGbn?: TransactionType;
    minArea?: number;
    maxArea?: number;
    minPrice?: number;
    maxPrice?: number;
    minBuildYear?: number;
    maxBuildYear?: number;
    keyword?: string;
    dateFrom?: Date;
    dateTo?: Date;
}
/**
 * 매물 검색 결과
 */
export interface PropertySearchResult {
    complex: Complex;
    recentTransactions: PropertyTransaction[];
    avgPrice: number;
    priceRange: {
        min: number;
        max: number;
    };
    transactionCount: number;
}
/**
 * 단지 상세 정보
 */
export interface ComplexDetail extends Complex {
    transactions: PropertyTransaction[];
    priceByArea: Record<string, {
        avgPrice: number;
        recentPrice: number;
        priceChange: number;
        transactionCount: number;
    }>;
    nearbyComplexes: Complex[];
}
/**
 * 매물 상세 분석 정보
 */
export interface PropertyDetailAnalysis {
    complex: Complex;
    exclusiveUseArea: number;
    transactions: PropertyTransaction[];
    priceAnalysis: {
        currentAvgPrice: number;
        prevMonthAvgPrice: number;
        priceChange: number;
        priceChangePercent: number;
        highestPrice: number;
        lowestPrice: number;
    };
    marketTrend: {
        period: string;
        priceHistory: Array<{
            date: Date;
            avgPrice: number;
            transactionCount: number;
        }>;
    };
    recommendationScore: number;
}
//# sourceMappingURL=property.d.ts.map