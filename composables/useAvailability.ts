import { ref, readonly } from "vue"
import type { SalonAvailability, DayAvailability, TimeSlot, DateRangeAvailability } from "~/types/availability"

export const useAvailability = () => {
  const availability = ref<SalonAvailability | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedDate = ref<string>(new Date().toISOString().split("T")[0])
  const selectedMonth = ref<number>(new Date().getMonth())
  const selectedYear = ref<number>(new Date().getFullYear())

  // Initialize default weekly schedule
  const initializeWeeklySchedule = (): DayAvailability[] => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return days.map((dayName, index) => ({
      dayOfWeek: index,
      dayName,
      isAvailable: index >= 1 && index <= 5, // Monday to Friday by default
      timeSlots: [
        {
          id: `${index}-morning`,
          startTime: "09:00:00",
          endTime: "12:00:00",
          isAvailable: true,
          maxBookings: 10,
          currentBookings: 0,
        },
        {
          id: `${index}-afternoon`,
          startTime: "14:00:00",
          endTime: "18:00:00",
          isAvailable: true,
          maxBookings: 10,
          currentBookings: 0,
        },
      ],
    }))
  }

  // Create new time slot
  const createTimeSlot = (dayIndex: number): TimeSlot => {
    return {
      id: `${dayIndex}-${Date.now()}`,
      startTime: "09:00:00",
      endTime: "10:00:00",
      isAvailable: true,
      maxBookings: 5,
      currentBookings: 0,
    }
  }

  // Add time slot to a specific day
  const addTimeSlot = (dayIndex: number) => {
    if (!availability.value) return

    const newSlot = createTimeSlot(dayIndex)
    availability.value.weeklySchedule[dayIndex].timeSlots.push(newSlot)
  }

  // Remove time slot
  const removeTimeSlot = (dayIndex: number, slotId: string) => {
    if (!availability.value) return

    availability.value.weeklySchedule[dayIndex].timeSlots = availability.value.weeklySchedule[
      dayIndex
    ].timeSlots.filter((slot) => slot.id !== slotId)
  }

  // Update time slot
  const updateTimeSlot = (dayIndex: number, slotId: string, updates: Partial<TimeSlot>) => {
    if (!availability.value) return

    const slotIndex = availability.value.weeklySchedule[dayIndex].timeSlots.findIndex((slot) => slot.id === slotId)
    if (slotIndex !== -1) {
      availability.value.weeklySchedule[dayIndex].timeSlots[slotIndex] = {
        ...availability.value.weeklySchedule[dayIndex].timeSlots[slotIndex],
        ...updates,
      }
    }
  }

  // Toggle day availability
  const toggleDayAvailability = (dayIndex: number) => {
    if (!availability.value) return

    availability.value.weeklySchedule[dayIndex].isAvailable = !availability.value.weeklySchedule[dayIndex].isAvailable
  }

  // Add date range
  const addDateRange = (dateRange: Omit<DateRangeAvailability, "id" | "createdAt" | "updatedAt">) => {
    if (!availability.value) return

    const newDateRange: DateRangeAvailability = {
      ...dateRange,
      id: `range-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    availability.value.dateRanges.push(newDateRange)
  }

  // Remove date range
  const removeDateRange = (rangeId: string) => {
    if (!availability.value) return

    availability.value.dateRanges = availability.value.dateRanges.filter((range) => range.id !== rangeId)
  }

  // Update date range
  const updateDateRange = (rangeId: string, updates: Partial<DateRangeAvailability>) => {
    if (!availability.value) return

    const rangeIndex = availability.value.dateRanges.findIndex((range) => range.id === rangeId)
    if (rangeIndex !== -1) {
      availability.value.dateRanges[rangeIndex] = {
        ...availability.value.dateRanges[rangeIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      }
    }
  }

  // Load availability data
  const loadAvailability = async (salonId: string) => {
    loading.value = true
    error.value = null

    try {
      // Simulate API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data - replace with actual API response
      availability.value = {
        id: `availability-${salonId}`,
        salonId,
        salonName: "Beauty Salon",
        isOperational: true,
        timezone: "Africa/Lagos",
        weeklySchedule: initializeWeeklySchedule(),
        dateRanges: [],
        lastUpdated: new Date().toISOString(),
      }
    } catch (err) {
      error.value = "Failed to load availability data"
      console.error("Error loading availability:", err)
    } finally {
      loading.value = false
    }
  }

  // Save availability data
  const saveAvailability = async () => {
    if (!availability.value) return false

    loading.value = true
    error.value = null

    try {
      // Simulate API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      availability.value.lastUpdated = new Date().toISOString()

      // Mock success response
      return true
    } catch (err) {
      error.value = "Failed to save availability data"
      console.error("Error saving availability:", err)
      return false
    } finally {
      loading.value = false
    }
  }

  // Get availability for specific date
  const getDateAvailability = (date: string) => {
    if (!availability.value) return null

    const dateObj = new Date(date)
    const dayOfWeek = dateObj.getDay()

    // Check for date range overrides
    const dateRange = availability.value.dateRanges.find((range) => date >= range.startDate && date <= range.endDate)

    if (dateRange) {
      return {
        isAvailable: dateRange.isAvailable,
        timeSlots: dateRange.customTimeSlots || availability.value.weeklySchedule[dayOfWeek].timeSlots,
        source: "dateRange",
        title: dateRange.title,
      }
    }

    // Return weekly schedule
    const daySchedule = availability.value.weeklySchedule[dayOfWeek]
    return {
      isAvailable: daySchedule.isAvailable,
      timeSlots: daySchedule.timeSlots,
      source: "weekly",
      title: daySchedule.dayName,
    }
  }

  // Validate time slot
  const validateTimeSlot = (slot: TimeSlot): string[] => {
    const errors: string[] = []

    if (!slot.startTime || !slot.endTime) {
      errors.push("Start time and end time are required")
    }

    if (slot.startTime >= slot.endTime) {
      errors.push("End time must be after start time")
    }

    if (slot.maxBookings && slot.maxBookings < 1) {
      errors.push("Maximum bookings must be at least 1")
    }

    return errors
  }

  // Check for time slot conflicts
  const checkTimeSlotConflicts = (dayIndex: number, newSlot: TimeSlot, excludeSlotId?: string): boolean => {
    if (!availability.value) return false

    const existingSlots = availability.value.weeklySchedule[dayIndex].timeSlots.filter(
      (slot) => slot.id !== excludeSlotId,
    )

    return existingSlots.some((slot) => {
      return newSlot.startTime < slot.endTime && newSlot.endTime > slot.startTime
    })
  }

  return {
    // State
    availability: readonly(availability),
    loading: readonly(loading),
    error: readonly(error),
    selectedDate,
    selectedMonth,
    selectedYear,

    // Methods
    loadAvailability,
    saveAvailability,
    addTimeSlot,
    removeTimeSlot,
    updateTimeSlot,
    toggleDayAvailability,
    addDateRange,
    removeDateRange,
    updateDateRange,
    getDateAvailability,
    validateTimeSlot,
    checkTimeSlotConflicts,
    createTimeSlot,
  }
}
