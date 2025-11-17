export interface User {
  id: string
  email: string
  role: 'donor' | 'medical_staff' | 'admin'
  full_name: string
  created_at?: string
}

export interface AuthTokens {
  access: string
  refresh: string
}

export interface AuthResponse {
  data: User
  tokens: AuthTokens
}

export interface Campaign {
  id: string
  title: string
  description?: string
  location: string
  start_date: string
  end_date: string
  capacity_total: number
  capacity_available: number
  slots?: CampaignSlot[]
}

export interface CampaignSlot {
  slot_datetime: string
  available: boolean
}

export interface Appointment {
  id: string
  donor_id: string
  campaign_id: string
  slot_datetime: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
  campaign?: string
}

export interface MedicalCheck {
  id: string
  appointment_id: string
  apto: boolean
  checked_by: string
  created_at: string
  vitals?: { pressure: string; weight: number }
  answers?: Record<string, boolean>
  observations?: string
}

export interface Donation {
  id: string
  donor_id: string
  blood_type: string
  volume_ml: number
  donation_date: string
  campaign_id?: string
  collector_id?: string
  observations?: string
}

export interface InventoryItem {
  blood_type: string
  units_available: number
}

export interface Notification {
  id: string
  status: 'queued' | 'sent' | 'failed'
}
