import { reactive, computed } from "vue";

const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

export const useAvailabilityForm = (initialData?: {
  serviceProviderId?: string;
  workingDays?: Array<{
    day: string;
    startTime: string;
    endTime: string;
  }>;
}) => {
  // Form state
  const form = reactive({
    serviceProviderId: initialData?.serviceProviderId || '',
    workingDays: initialData?.workingDays || [],
  });

  // Validation state
  const errors = reactive({
    serviceProviderId: '',
    workingDays: '',
  });

  // Form actions
  const addWorkingDay = () => {
    form.workingDays.push({
      day: 'Monday',
      startTime: '09:00',
      endTime: '17:00',
    });
  };

  const removeWorkingDay = (index: number) => {
    form.workingDays.splice(index, 1);
    validateWorkingDays();
  };

  const updateWorkingDay = (index: number, field: string, value: string) => {
    if (form.workingDays[index]) {
      form.workingDays[index][field] = value;
      validateWorkingDays();
    }
  };

  // Validation functions
  const validateServiceProviderId = (): boolean => {
    errors.serviceProviderId = '';
    
    if (!form.serviceProviderId.trim()) {
      errors.serviceProviderId = 'Service Provider ID is required';
      return false;
    }
    
    // Basic UUID validation
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(form.serviceProviderId)) {
      errors.serviceProviderId = 'Service Provider ID must be a valid UUID';
      return false;
    }
    
    return true;
  };

  const validateWorkingDays = (): boolean => {
    errors.workingDays = '';
    
    if (form.workingDays.length === 0) {
      errors.workingDays = 'At least one working day is required';
      return false;
    }
    
    // Check for duplicate days
    const days = form.workingDays.map(wd => wd.day);
    const uniqueDays = new Set(days);
    if (days.length !== uniqueDays.size) {
      errors.workingDays = 'Duplicate days are not allowed';
      return false;
    }
    
    // Validate time formats and logic
    for (const workingDay of form.workingDays) {
      const startTime = new Date(`2000-01-01T${workingDay.startTime}:00`);
      const endTime = new Date(`2000-01-01T${workingDay.endTime}:00`);
      
      if (startTime >= endTime) {
        errors.workingDays = 'End time must be after start time for all working days';
        return false;
      }
    }
    
    return true;
  };

  const validateForm = (): boolean => {
    const isServiceProviderIdValid = validateServiceProviderId();
    const areWorkingDaysValid = validateWorkingDays();
    
    return isServiceProviderIdValid && areWorkingDaysValid;
  };

  // Reset form
  const resetForm = () => {
    form.serviceProviderId = initialData?.serviceProviderId || '';
    form.workingDays = initialData?.workingDays || [];
    
    // Clear errors
    errors.serviceProviderId = '';
    errors.workingDays = '';
  };

  // Computed properties
  const isValid = computed(() => {
    return form.serviceProviderId.trim() !== '' && 
           form.workingDays.length > 0 && 
           errors.serviceProviderId === '' && 
           errors.workingDays === '';
  });

  const availableDays = computed(() => {
    const usedDays = form.workingDays.map(wd => wd.day);
    return DAYS_OF_WEEK.filter(day => !usedDays.includes(day));
  });

  return {
    // Form state
    form,
    errors,
    
    // Constants
    DAYS_OF_WEEK,
    
    // Actions
    addWorkingDay,
    removeWorkingDay,
    updateWorkingDay,
    
    // Validation
    validateServiceProviderId,
    validateWorkingDays,
    validateForm,
    
    // Utility
    resetForm,
    
    // Computed
    isValid,
    availableDays,
  };
};