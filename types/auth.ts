// types/auth.ts
export interface RegistrationForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    location: string;
    accountType: 'client' | 'professional';
    verificationCode: string;
  }
  