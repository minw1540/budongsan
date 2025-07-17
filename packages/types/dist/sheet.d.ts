/**
 * 사용자 시트 관련 타입 정의
 */
import { BaseEntity } from './common';
import { TransactionType } from './property';
/**
 * 컬럼 데이터 타입
 */
export type ColumnDataType = 'text' | 'number' | 'date' | 'boolean' | 'select' | 'multiselect';
/**
 * 사용자 정의 컬럼
 */
export interface UserDefinedColumn {
    id: string;
    name: string;
    dataType: ColumnDataType;
    options?: string[];
    isRequired: boolean;
    defaultValue?: unknown;
    order: number;
}
/**
 * 시트 매물 정보
 */
export interface SheetProperty extends BaseEntity {
    userId: string;
    sheetId: string;
    propertyId?: string;
    complexName: string;
    dong?: string;
    ho?: string;
    exclusiveUseArea: number;
    floor?: number;
    transactionType: TransactionType;
    price: number;
    deposit?: number;
    monthlyRent?: number;
    transactionDate?: Date;
    address: string;
    buildYear?: number;
    customData: Record<string, unknown>;
    tags: string[];
    memo?: string;
    isBookmarked: boolean;
    priority: 'low' | 'medium' | 'high';
    status: 'interested' | 'visited' | 'negotiating' | 'completed' | 'canceled';
    rating?: number;
    pros?: string[];
    cons?: string[];
    pricePerArea?: number;
    isRecentTransaction?: boolean;
}
/**
 * 사용자 시트
 */
export interface UserSheet extends BaseEntity {
    userId: string;
    name: string;
    description?: string;
    isDefault: boolean;
    isPublic: boolean;
    settings: {
        columns: UserDefinedColumn[];
        filters: SheetFilter[];
        sorting: SheetSort[];
        view: 'table' | 'card' | 'map';
        theme?: string;
    };
    statistics: {
        totalProperties: number;
        averagePrice: number;
        priceRange: {
            min: number;
            max: number;
        };
        transactionTypes: Record<TransactionType, number>;
        lastUpdated: Date;
    };
}
/**
 * 시트 필터
 */
export interface SheetFilter {
    id: string;
    columnId: string;
    operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'like' | 'between';
    value: unknown;
    isActive: boolean;
}
/**
 * 시트 정렬
 */
export interface SheetSort {
    columnId: string;
    direction: 'asc' | 'desc';
    order: number;
}
/**
 * 시트 뷰 설정
 */
export interface SheetViewSettings {
    visibleColumns: string[];
    columnWidths: Record<string, number>;
    pinnedColumns: string[];
    rowHeight: 'compact' | 'normal' | 'large';
    showThumbnails: boolean;
    showMiniChart: boolean;
}
/**
 * 시트 내보내기 옵션
 */
export interface SheetExportOptions {
    format: 'csv' | 'xlsx' | 'pdf';
    includeHeaders: boolean;
    includeFilters: boolean;
    columns: string[];
    filters?: SheetFilter[];
}
/**
 * 시트 템플릿
 */
export interface SheetTemplate extends BaseEntity {
    name: string;
    description: string;
    category: 'investment' | 'residence' | 'commercial' | 'general';
    isPublic: boolean;
    createdBy: string;
    usageCount: number;
    template: {
        columns: UserDefinedColumn[];
        defaultFilters: SheetFilter[];
        defaultSorting: SheetSort[];
        viewSettings: SheetViewSettings;
    };
    tags: string[];
    rating: {
        average: number;
        count: number;
    };
}
/**
 * 매물 비교 그룹
 */
export interface PropertyComparisonGroup extends BaseEntity {
    userId: string;
    name: string;
    propertyIds: string[];
    comparisonMetrics: string[];
    memo?: string;
}
//# sourceMappingURL=sheet.d.ts.map