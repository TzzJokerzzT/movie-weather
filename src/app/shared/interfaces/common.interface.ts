export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: {
    page: number;
    totalPages: number;
    totalResults: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ErrorResponse {
  message: string;
  code?: string | number;
  details?: any;
}