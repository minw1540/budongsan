import { useState, useEffect } from 'react';
import { apiClient, ApiResponse } from '@/lib/api-client';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(endpoint: string, immediate = true) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response: ApiResponse<T> = await apiClient.get(endpoint);
      
      if (response.status === 'success') {
        setState({
          data: response.data || null,
          loading: false,
          error: null,
        });
      } else {
        setState({
          data: null,
          loading: false,
          error: response.message,
        });
      }
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
      });
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [endpoint, immediate]);

  return {
    ...state,
    refetch: execute,
  };
}

export function useMutation<TData, TVariables>() {
  const [state, setState] = useState<UseApiState<TData>>({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = async (endpoint: string, variables: TVariables) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response: ApiResponse<TData> = await apiClient.post(endpoint, variables);
      
      if (response.status === 'success') {
        setState({
          data: response.data || null,
          loading: false,
          error: null,
        });
        return response.data;
      } else {
        setState({
          data: null,
          loading: false,
          error: response.message,
        });
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });
      throw error;
    }
  };

  return {
    ...state,
    mutate,
  };
} 