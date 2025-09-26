export interface Service {
  id: string
  serviceType: string
  description: string
  price: number
  duration: number
  createdAt?: string
  updatedAt?: string
}

export interface Category {
  id: string
  name: string
  description: string
  services: string[]
  createdAt?: string
  updatedAt?: string
}

export interface CreateServicePayload {
  serviceType: string
  description: string
  price: number
  duration: number
}

export interface CreateCategoryPayload {
  name: string
  description: string
  services: string[]
}

export interface Service {
  id: string;
  serviceType: string;
  description: string;
  price: number;
  duration: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  services: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateServicePayload {
  serviceType: string;
  description: string;
  price: number;
  duration: number;
}

export interface CreateCategoryPayload {
  name: string;
  description: string;
  services: string[];
}