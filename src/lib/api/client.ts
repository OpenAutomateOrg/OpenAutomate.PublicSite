/**
 * Simplified API client for basic public API requests
 * Uses the environment variable NEXT_PUBLIC_API_URL for the API base URL
 * No authentication handling - public website only
 */

import { config } from '@/lib/config'

type ApiError = {
  message: string
  status: number
  details?: string
}

// Default request headers from configuration
const defaultHeaders = config.api.defaultHeaders

/**
 * Create API error object from response
 */
const createApiError = async (response: Response): Promise<ApiError> => {
  const errorData: ApiError = {
    message: response.statusText,
    status: response.status,
  }

  try {
    // Try to parse error details from response
    const errorBody = await response.json()
    errorData.details = errorBody.message || JSON.stringify(errorBody)
  } catch {
    // If parsing fails, use status text
    errorData.details = response.statusText
  }

  return errorData
}

/**
 * Handle network errors
 */
const handleNetworkError = (error: unknown): never => {
  if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
    const apiError: ApiError = {
      message: 'Network error. Please check your connection.',
      status: 0,
      details: error.message,
    }
    throw apiError
  }
  throw error
}

/**
 * Process successful response
 */
const processSuccessResponse = async <T>(response: Response): Promise<T> => {
  // Return empty object for 204 No Content responses
  if (response.status === 204) {
    return {} as T
  }

  // Parse JSON response
  return (await response.json()) as T
}

/**
 * Get full API URL
 */
const getFullUrl = (endpoint: string): string => {
  if (endpoint.startsWith('http')) {
    return endpoint
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
  return `${config.api.baseUrl}/${cleanEndpoint}`
}

/**
 * Generic function to make API requests
 * Public API only - no auth handling
 */
export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = getFullUrl(endpoint)
  const headers = { ...defaultHeaders, ...options.headers } as Record<string, string>

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (response.ok) {
      return processSuccessResponse<T>(response)
    }

    const error = await createApiError(response)
    throw error
  } catch (error) {
    return handleNetworkError(error)
  }
}

/**
 * HTTP request methods with proper typing
 * Basic API client for public website
 */
export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    fetchApi<T>(endpoint, { ...options, method: 'GET' }),

  post: <T, D = unknown>(endpoint: string, data?: D, options?: RequestInit) =>
    fetchApi<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T, D = unknown>(endpoint: string, data?: D, options?: RequestInit) =>
    fetchApi<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T, D = unknown>(endpoint: string, data?: D, options?: RequestInit) =>
    fetchApi<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    fetchApi<T>(endpoint, { ...options, method: 'DELETE' }),
}
