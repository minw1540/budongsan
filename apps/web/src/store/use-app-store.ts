import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
}

interface AppState {
  // 사용자 인증 상태
  user: User | null;
  isAuthenticated: boolean;
  
  // 면적 단위 설정
  areaUnit: 'sqm' | 'pyeong';
  
  // 검색 및 필터 상태
  searchFilters: {
    region?: string;
    priceRange?: [number, number];
    areaRange?: [number, number];
  };
  
  // UI 상태
  isLoading: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setAreaUnit: (unit: 'sqm' | 'pyeong') => void;
  setSearchFilters: (filters: AppState['searchFilters']) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      areaUnit: 'sqm',
      searchFilters: {},
      isLoading: false,
      
      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAreaUnit: (areaUnit) => set({ areaUnit }),
      setSearchFilters: (searchFilters) => set({ searchFilters }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        searchFilters: {} 
      }),
    }),
    {
      name: 'smart-real-estate-storage',
      partialize: (state) => ({
        areaUnit: state.areaUnit,
        searchFilters: state.searchFilters,
      }),
    }
  )
); 