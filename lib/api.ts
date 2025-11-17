const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

export class ApiError extends Error {
  constructor(public status: number, message: string, public data?: any) {
    super(message)
    this.name = 'ApiError'
  }
}

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  const tokens = localStorage.getItem('tokens')
  if (!tokens) return null
  try {
    const parsed = JSON.parse(tokens)
    return parsed.access || null
  } catch {
    return null
  }
}

async function fetcher<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = getAuthToken()
  
  const headers = new Headers(options?.headers as HeadersInit)
  headers.set('Content-Type', 'application/json')
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const url = `${BACKEND_URL}${endpoint}`
  console.log("[v0] API Request:", { method: options?.method || 'GET', url, hasToken: !!token })
  
  let response: Response
  try {
    response = await fetch(url, {
      ...options,
      headers,
    })
  } catch (networkError: any) {
    console.error("[v0] Network Error:", {
      url,
      message: networkError.message,
      backendURL: BACKEND_URL,
    })
    throw new ApiError(0, `No se puede conectar con el servidor (${BACKEND_URL}). Verifica que el backend esté corriendo.`)
  }

  let data: any = null
  const contentType = response.headers.get('content-type')
  
  try {
    if (contentType?.includes('application/json')) {
      data = await response.json()
    } else {
      const text = await response.text()
      console.warn("[v0] Non-JSON response:", { status: response.status, contentType, text })
      data = { message: text || 'Empty response from server' }
    }
  } catch (parseError: any) {
    console.error("[v0] Response parse error:", parseError.message)
    data = { message: 'Invalid response format from server' }
  }

  if (!response.ok) {
    const errorMessage = data?.message || data?.detail || data?.error || `Server Error: ${response.status} ${response.statusText}`
    console.error("[v0] API Error Response:", {
      status: response.status,
      statusText: response.statusText,
      message: errorMessage,
      data: JSON.stringify(data),
      url,
    })
    throw new ApiError(response.status, errorMessage, data)
  }

  console.log("[v0] API Success:", { status: response.status, url })
  return data
}

export const authAPI = {
  register: (data: {
    email: string
    password: string
    full_name: string
    document_type: string
    document_number: string
    birth_date: string
    phone: string
    blood_type: string
  }) => {
    // Validate required fields
    if (!data.email || !data.password || !data.full_name) {
      throw new Error('Email, contraseña y nombre son requeridos')
    }
    return fetcher('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then((response: any) => {
      return {
        data: response.user || response.data,
        tokens: {
          access: response.accessToken || response.tokens?.access,
          refresh: response.refreshToken || response.tokens?.refresh,
        }
      }
    })
  },

  login: (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email y contraseña son requeridos')
    }
    return fetcher('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }).then((response: any) => {
      return {
        data: response.user || response.data,
        tokens: {
          access: response.accessToken || response.tokens?.access,
          refresh: response.refreshToken || response.tokens?.refresh,
        }
      }
    })
  },
}

// Campaigns endpoints
export const campaignsAPI = {
  list: (params?: {
    date_from?: string
    date_to?: string
    near?: string
    page?: number
    size?: number
  }) => {
    const queryString = params ? `?${new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = String(value)
        }
        return acc
      }, {} as Record<string, string>)
    ).toString()}` : ''
    return fetcher(`/api/campaigns${queryString}`)
  },

  getById: (id: string) => {
    if (!id) throw new Error('Campaign ID is required')
    return fetcher(`/api/campaigns/${id}`)
  },
}

// Appointments endpoints
export const appointmentsAPI = {
  create: (data: { campaign_id: string; slot_datetime: string }) => {
    if (!data.campaign_id || !data.slot_datetime) {
      throw new Error('Campaign ID y fecha/hora del slot son requeridos')
    }
    return fetcher('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  getMine: () => fetcher('/api/appointments/me'),
}

export const medicalAPI = {
  createMedicalCheck: (data: {
    appointment_id: string
    vitals: { pressure: string; weight: number }
    answers: Record<string, boolean>
    apto: boolean
    observations: string
  }) => {
    if (!data.appointment_id || !data.vitals) {
      throw new Error('Appointment ID y vitales son requeridos')
    }
    return fetcher('/api/medical_checks', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  createDonation: (data: {
    appointment_id: string
    donor_id: string
    campaign_id: string
    volume_ml: number
    blood_type: string
    collector_id: string
    observations: string
  }) => {
    if (!data.appointment_id || !data.donor_id || !data.volume_ml) {
      throw new Error('Appointment ID, donor ID y volumen son requeridos')
    }
    return fetcher('/api/donations', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  getInventory: () => fetcher('/api/inventory'),
}

// Notifications endpoint
export const notificationsAPI = {
  send: (data: {
    user_id: string
    type: 'email' | 'sms' | 'push'
    subject: string
    body: string
  }) => {
    if (!data.user_id || !data.type || !data.body) {
      throw new Error('User ID, tipo y cuerpo del mensaje son requeridos')
    }
    return fetcher('/api/notifications/send', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
}

// Unified export
export const api = {
  auth: authAPI,
  campaigns: campaignsAPI,
  appointments: appointmentsAPI,
  medical: medicalAPI,
  notifications: notificationsAPI,
}
