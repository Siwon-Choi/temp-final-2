import { useAuthStore } from '../store/authStore'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

type RequestOptions = RequestInit & {
  auth?: boolean
}

type ErrorResponse = {
  message?: string
  error?: string
}

const buildHeaders = (headers?: HeadersInit) => {
  const nextHeaders = new Headers(headers)

  if (!nextHeaders.has('Content-Type')) {
    nextHeaders.set('Content-Type', 'application/json')
  }

  return nextHeaders
}

const readErrorMessage = async (response: Response) => {
  try {
    const data = (await response.json()) as ErrorResponse
    return data.message ?? data.error ?? '요청에 실패했습니다.'
  } catch {
    return '요청에 실패했습니다.'
  }
}

export const apiRequest = async <T>(
  path: string,
  { auth = false, headers, ...init }: RequestOptions = {},
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    credentials: 'include',
    headers: buildHeaders(headers),
  })

  if (response.status === 401 && auth) {
    useAuthStore.getState().clearAuth()
  }

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  return response.json() as Promise<T>
}
