/**
 * 공통 응답 구조 및 기본 타입 정의
 */
/**
 * API 응답 기본 구조
 */
export interface ApiResponse<T = unknown> {
    status: 'success' | 'error';
    message: string;
    data?: T;
    code?: string;
    details?: unknown;
}
/**
 * 에러 응답 구조
 */
export interface ErrorResponse {
    status: 'error';
    message: string;
    code: string;
    details?: unknown;
}
/**
 * 페이지네이션 정보
 */
export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}
/**
 * 페이지네이션이 포함된 리스트 응답
 */
export interface PaginatedResponse<T> {
    items: T[];
    pagination: PaginationInfo;
}
/**
 * 기본 엔티티 구조
 */
export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * 좌표 정보
 */
export interface Coordinates {
    latitude: number;
    longitude: number;
}
/**
 * 기간 정보
 */
export interface DateRange {
    startDate: Date;
    endDate: Date;
}
/**
 * 정렬 옵션
 */
export interface SortOption {
    field: string;
    direction: 'asc' | 'desc';
}
/**
 * 필터 옵션
 */
export interface FilterOption {
    field: string;
    operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'like';
    value: unknown;
}
//# sourceMappingURL=common.d.ts.map