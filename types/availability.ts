export interface TimeSlot {
    id: string
    startTime: string // HH:MM:SS format
    endTime: string // HH:MM:SS format
    isAvailable: boolean
    maxBookings?: number
    currentBookings?: number
  }
  
  export interface DayAvailability {
    dayOfWeek: number // 0 = Sunday, 1 = Monday, etc.
    dayName: string
    isAvailable: boolean
    timeSlots: TimeSlot[]
    isHoliday?: boolean
    holidayName?: string
  }
  
  export interface DateRangeAvailability {
    id: string
    startDate: string // YYYY-MM-DD format
    endDate: string // YYYY-MM-DD format
    title: string
    description?: string
    isAvailable: boolean
    overrideWeeklySchedule: boolean
    customTimeSlots?: TimeSlot[]
    createdAt: string
    updatedAt: string
  }
  
  export interface SalonAvailability {
    id: string
    salonId: string
    salonName: string
    isOperational: boolean
    timezone: string
    weeklySchedule: DayAvailability[]
    dateRanges: DateRangeAvailability[]
    lastUpdated: string
  }
  
  export interface AvailabilityFormData {
    isOperational: boolean
    weeklySchedule: DayAvailability[]
    newDateRange: {
      title: string
      description: string
      startDate: string
      endDate: string
      isAvailable: boolean
      overrideWeeklySchedule: boolean
      customTimeSlots: TimeSlot[]
    }
  }
  