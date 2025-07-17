import { BaseEntity } from './common';
/**
 * 사용자 정의 컬럼 타입
 */
export type CustomColumnType = 'text' | 'number' | 'date' | 'boolean' | 'select';
/**
 * 사용자 정의 컬럼 정의
 */
export interface CustomColumn {
    id: string;
    name: string;
    type: CustomColumnType;
    required: boolean;
    options?: string[];
    defaultValue?: any;
}
/**
 * 시트 내 매물 항목
 */
export interface SheetProperty {
    sheetPropertyId: string;
    aptSeq: string;
    aptNm: string;
    exclusiveUseArea: number;
    addressDisplay: string;
    latestDealAmount: number;
    latestJeonseAmount?: number;
    buildYear?: number;
    totalHouseholds?: number;
    myMemo?: string;
    tags: string[];
    userDefinedColumns: Record<string, any>;
    addedAt: Date;
    updatedAt: Date;
}
/**
 * 사용자 시트
 */
export interface UserSheet extends BaseEntity {
    userId: string;
    name: string;
    description?: string;
    customColumns: CustomColumn[];
    properties: SheetProperty[];
    isDefault: boolean;
    sortOrder: number;
}
/**
 * 시트에 매물 추가 요청
 */
export interface AddPropertyToSheetRequest {
    sheetId: string;
    aptSeq: string;
    exclusiveUseArea: number;
    memo?: string;
    tags?: string[];
    userDefinedData?: Record<string, any>;
}
/**
 * 시트 매물 업데이트 요청
 */
export interface UpdateSheetPropertyRequest {
    sheetPropertyId: string;
    memo?: string;
    tags?: string[];
    userDefinedData?: Record<string, any>;
}
/**
 * 시트 생성 요청
 */
export interface CreateSheetRequest {
    name: string;
    description?: string;
    customColumns?: CustomColumn[];
}
/**
 * 시트 업데이트 요청
 */
export interface UpdateSheetRequest {
    name?: string;
    description?: string;
    customColumns?: CustomColumn[];
}
/**
 * 시트 정렬 옵션
 */
export interface SheetSortOption {
    field: keyof SheetProperty | string;
    order: 'asc' | 'desc';
}
/**
 * 시트 필터 옵션
 */
export interface SheetFilterOption {
    tags?: string[];
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
    keyword?: string;
    customFilters?: Record<string, any>;
}
/**
 * 시트 뷰 설정
 */
export interface SheetViewSettings {
    visibleColumns: string[];
    columnWidths: Record<string, number>;
    sort: SheetSortOption;
    filter: SheetFilterOption;
}
/**
 * 시트 통계 정보
 */
export interface SheetStatistics {
    totalProperties: number;
    avgPrice: number;
    avgArea: number;
    avgBuildYear: number;
    tagDistribution: Record<string, number>;
    priceDistribution: {
        ranges: string[];
        counts: number[];
    };
}
/**
 * 시트 비교 분석
 */
export interface SheetComparison {
    properties: SheetProperty[];
    comparisonFields: string[];
    analysis: {
        priceComparison: {
            highest: SheetProperty;
            lowest: SheetProperty;
            average: number;
        };
        areaComparison: {
            largest: SheetProperty;
            smallest: SheetProperty;
            average: number;
        };
        recommendations: string[];
    };
}
/**
 * 알림 설정
 */
export interface NotificationSettings extends BaseEntity {
    userId: string;
    priceChangeAlertEnabled: boolean;
    priceChangeThreshold?: number;
    newTransactionAlertEnabled: boolean;
    customConditionAlertEnabled: boolean;
    customAlertConditions?: Record<string, any>;
    webPushToken?: string;
    appPushToken?: string;
}
/**
 * 가격 스냅샷 (알림용)
 */
export interface PriceSnapshot extends BaseEntity {
    aptSeq: string;
    exclusiveUseArea: number;
    snapshotDate: Date;
    averageDealAmount?: number;
    averageJeonseAmount?: number;
    transactionCount: number;
}
//# sourceMappingURL=sheet.d.ts.map