export const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }
  
  export const formatTimeRange = (startTime: string, endTime: string): string => {
    return `${formatTime(startTime)} - ${formatTime(endTime)}`
  }
  
  export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
  
  export const formatDateShort = (date: string): string => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }
  
  export const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate()
  }
  
  export const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay()
  }
  
  export const isToday = (date: string): boolean => {
    const today = new Date().toISOString().split("T")[0]
    return date === today
  }
  
  export const isPastDate = (date: string): boolean => {
    const today = new Date().toISOString().split("T")[0]
    return date < today
  }
  
  export const addDays = (date: string, days: number): string => {
    const dateObj = new Date(date)
    dateObj.setDate(dateObj.getDate() + days)
    return dateObj.toISOString().split("T")[0]
  }
  
  export const getWeekDates = (date: string): string[] => {
    const dateObj = new Date(date)
    const dayOfWeek = dateObj.getDay()
    const startOfWeek = new Date(dateObj)
    startOfWeek.setDate(dateObj.getDate() - dayOfWeek)
  
    const weekDates: string[] = []
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek)
      currentDate.setDate(startOfWeek.getDate() + i)
      weekDates.push(currentDate.toISOString().split("T")[0])
    }
  
    return weekDates
  }
  