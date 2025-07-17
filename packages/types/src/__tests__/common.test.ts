/**
 * 공통 타입 정의 검증 테스트
 */

import {
  ApiResponse,
  ErrorResponse,
  PaginationInfo,
  BaseEntity,
  Coordinates,
  DateRange,
  SortOption,
  FilterOption
} from '../common';

describe('Common Types', () => {
  describe('ApiResponse', () => {
    it('성공 응답 타입이 정의되어야 함', () => {
      const successResponse: ApiResponse<string> = {
        status: 'success',
        message: '성공',
        data: 'test data'
      };

      expect(successResponse.status).toBe('success');
      expect(successResponse.message).toBe('성공');
      expect(successResponse.data).toBe('test data');
    });

    it('에러 응답 타입이 정의되어야 함', () => {
      const errorResponse: ErrorResponse = {
        status: 'error',
        message: '에러 발생',
        code: 'ERR_001'
      };

      expect(errorResponse.status).toBe('error');
      expect(errorResponse.message).toBe('에러 발생');
      expect(errorResponse.code).toBe('ERR_001');
    });
  });

  describe('PaginationInfo', () => {
    it('페이지네이션 정보 타입이 정의되어야 함', () => {
      const pagination: PaginationInfo = {
        page: 1,
        limit: 10,
        total: 100,
        totalPages: 10,
        hasNext: true,
        hasPrev: false
      };

      expect(pagination.page).toBe(1);
      expect(pagination.limit).toBe(10);
      expect(pagination.total).toBe(100);
      expect(pagination.totalPages).toBe(10);
      expect(pagination.hasNext).toBe(true);
      expect(pagination.hasPrev).toBe(false);
    });
  });

  describe('BaseEntity', () => {
    it('기본 엔티티 타입이 정의되어야 함', () => {
      const entity: BaseEntity = {
        id: 'test-id',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      expect(entity.id).toBe('test-id');
      expect(entity.createdAt).toBeInstanceOf(Date);
      expect(entity.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('Coordinates', () => {
    it('좌표 타입이 정의되어야 함', () => {
      const coords: Coordinates = {
        latitude: 37.5665,
        longitude: 126.9780
      };

      expect(coords.latitude).toBe(37.5665);
      expect(coords.longitude).toBe(126.9780);
    });
  });

  describe('DateRange', () => {
    it('날짜 범위 타입이 정의되어야 함', () => {
      const range: DateRange = {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31')
      };

      expect(range.startDate).toBeInstanceOf(Date);
      expect(range.endDate).toBeInstanceOf(Date);
    });
  });

  describe('SortOption', () => {
    it('정렬 옵션 타입이 정의되어야 함', () => {
      const sortAsc: SortOption = {
        field: 'createdAt',
        direction: 'asc'
      };

      const sortDesc: SortOption = {
        field: 'updatedAt',
        direction: 'desc'
      };

      expect(sortAsc.field).toBe('createdAt');
      expect(sortAsc.direction).toBe('asc');
      expect(sortDesc.field).toBe('updatedAt');
      expect(sortDesc.direction).toBe('desc');
    });
  });

  describe('FilterOption', () => {
    it('필터 옵션 타입이 정의되어야 함', () => {
      const filter: FilterOption = {
        field: 'price',
        operator: 'gte',
        value: 100000000
      };

      expect(filter.field).toBe('price');
      expect(filter.operator).toBe('gte');
      expect(filter.value).toBe(100000000);
    });
  });
}); 