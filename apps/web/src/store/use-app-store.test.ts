import { renderHook, act } from '@testing-library/react';
import { useAppStore } from './use-app-store';

// localStorage mock
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

describe('useAppStore', () => {
  beforeEach(() => {
    // Reset store state
    useAppStore.getState().logout();
    jest.clearAllMocks();
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useAppStore());
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.areaUnit).toBe('sqm');
    expect(result.current.isLoading).toBe(false);
  });

  it('sets user correctly', () => {
    const { result } = renderHook(() => useAppStore());
    
    const testUser = {
      id: 'test-id',
      email: 'test@example.com',
      name: 'Test User',
    };

    act(() => {
      result.current.setUser(testUser);
    });

    expect(result.current.user).toEqual(testUser);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('toggles area unit correctly', () => {
    const { result } = renderHook(() => useAppStore());
    
    expect(result.current.areaUnit).toBe('sqm');

    act(() => {
      result.current.setAreaUnit('pyeong');
    });

    expect(result.current.areaUnit).toBe('pyeong');
  });

  it('sets search filters correctly', () => {
    const { result } = renderHook(() => useAppStore());
    
    const filters = {
      region: '서울특별시',
      priceRange: [30000, 80000] as [number, number],
    };

    act(() => {
      result.current.setSearchFilters(filters);
    });

    expect(result.current.searchFilters).toEqual(filters);
  });

  it('sets loading state correctly', () => {
    const { result } = renderHook(() => useAppStore());
    
    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.setLoading(false);
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('logs out correctly', () => {
    const { result } = renderHook(() => useAppStore());
    
    // First set a user
    act(() => {
      result.current.setUser({
        id: 'test-id',
        email: 'test@example.com',
        name: 'Test User',
      });
    });

    expect(result.current.isAuthenticated).toBe(true);

    // Then logout
    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
}); 