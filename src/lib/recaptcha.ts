/**
 * Google reCAPTCHA v3 Configuration
 * Centralized configuration for reCAPTCHA integration across forms
 */

/**
 * Google reCAPTCHA v3 Site Key
 * This key is used by the frontend to initialize reCAPTCHA
 * The matching Secret Key must be configured on the backend
 */
export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeGimQtAAAAAMwdpKKAZo54bPG7DTsAn3slJJ8D";

/**
 * reCAPTCHA configuration options
 */
export const RECAPTCHA_CONFIG = {
  language: "en",
  useRecaptchaNet: false, // Set to true to use recaptcha.net for better accessibility in some regions
  useEnterprise: false,
} as const;
