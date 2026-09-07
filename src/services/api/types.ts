/**
 * API Types for Contact Management
 */

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  interest: string;
  message: string;
  CaptchaToken: string; // Backend expects capital C
}

export interface ContactData {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  interest: string;
  message: string;
}

export interface ApiSuccessResponse {
  success: true;
  message: string;
  data: ContactData;
  errors: null;
  timeStamp: string;
}

export interface ApiErrorResponse {
  success: false;
  message?: string;
  data?: null;
  errors?: Record<string, string[]> | null;
  timeStamp?: string;
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
  }
}
