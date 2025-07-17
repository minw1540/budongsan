// 간단한 API 클라이언트 (추후 axios로 교체 예정)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1';

export const apiClient = {
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },
};

// API 응답 타입
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  code?: string;
  details?: string;
}

// 에러 타입
export interface ApiError {
  status: 'error';
  message: string;
  code?: string;
  details?: string;
} 