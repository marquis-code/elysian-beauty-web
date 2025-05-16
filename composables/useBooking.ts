<script lang="ts">
import { ref, reactive, watch } from 'vue';

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
}

export interface BookingState {
  selectedServices: Service[];
  selectedDate: string | null;
  selectedTime: string | null;
  paymentMethod: string | null;
  totalAmount: number;
}

export function useBooking() {
  // Initialize state from localStorage if available
  const getInitialState = (): BookingState => {
    const savedState = localStorage.getItem('beautyBookingData');
    if (savedState) {
      return JSON.parse(savedState);
    }
    
    return {
      selectedServices: [],
      selectedDate: null,
      selectedTime: null,
      paymentMethod: null,
      totalAmount: 0
    };
  };
  
  const state = reactive<BookingState>(getInitialState());
  
  // Save state to localStorage whenever it changes
  watch(
    () => state,
    (newState) => {
      localStorage.setItem('beautyBookingData', JSON.stringify(newState));
    },
    { deep: true }
  );
  
  // Methods to update state
  const addService = (service: Service) => {
    state.selectedServices.push(service);
    calculateTotal();
  };
  
  const removeService = (serviceId: string) => {
    state.selectedServices = state.selectedServices.filter(s => s.id !== serviceId);
    calculateTotal();
  };
  
  const setDate = (date: string) => {
    state.selectedDate = date;
  };
  
  const setTime = (time: string) => {
    state.selectedTime = time;
  };
  
  const setPaymentMethod = (method: string) => {
    state.paymentMethod = method;
  };
  
  const calculateTotal = () => {
    state.totalAmount = state.selectedServices.reduce((total, service) => total + service.price, 0);
  };
  
  const resetBooking = () => {
    state.selectedServices = [];
    state.selectedDate = null;
    state.selectedTime = null;
    state.paymentMethod = null;
    state.totalAmount = 0;
    localStorage.removeItem('beautyBookingData');
  };
  
  return {
    state,
    addService,
    removeService,
    setDate,
    setTime,
    setPaymentMethod,
    resetBooking
  };
}
</script>