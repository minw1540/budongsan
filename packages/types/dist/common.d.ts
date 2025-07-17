/**
 * API 응답 기본 구조
 */
export interface ApiResponse<T = any> {
    status: 'success' | 'error';
    message: string;
    data?: T;
    code?: string;
    details?: any;
}
/**
 * 페이지네이션 메타 정보
 */
export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}
/**
 * 페이지네이션이 포함된 API 응답
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    meta: PaginationMeta;
}
/**
 * 기본 Entity 인터페이스
 */
export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * 로딩 상태
 */
export type LoadingState = 'idle' | 'pending' | 'succeeded' | 'failed';
/**
 * 에러 정보
 */
export interface ErrorInfo {
    message: string;
    code?: string;
    details?: any;
}
/**
 * 정렬 옵션
 */
export interface SortOption {
    field: string;
    order: 'asc' | 'desc';
}
/**
 * 필터 옵션 기본 타입
 */
export interface BaseFilter {
    page?: number;
    limit?: number;
    sort?: SortOption;
}
/**
 * 단위 변환 타입
 */
export type AreaUnit = 'sqm' | 'pyeong';
export type PriceUnit = 'won' | 'million_won';
/**
 * 좌표 정보
 */
export interface Coordinates {
    lat: number;
    lng: number;
}
//# sourceMappingURL=common.d.ts.map