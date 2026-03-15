export type LoginRequest = {
  email: string
  password: string
}

export type SignupRequest = {
  email: string
  password: string
  name: string
  phone?: string
  address?: string
}

export type SignupResponse = {
  id: number
  email: string
  name: string
  phone: string | null
  address: string | null
}

type ErrorResponse = {
  code?: string
  message?: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export async function requestSignup(payload: SignupRequest) {
  const response = await fetch(`${API_BASE_URL}/api/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const data = (await response.json()) as ErrorResponse
    throw new Error(data.message ?? '회원가입 API 요청에 실패했습니다.')
  }

  return (await response.json()) as SignupResponse
}

export async function requestLogin(payload: LoginRequest) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const data = (await response.json()) as ErrorResponse
    throw new Error(data.message ?? '로그인 API 요청에 실패했습니다.')
  }

  return true
}
