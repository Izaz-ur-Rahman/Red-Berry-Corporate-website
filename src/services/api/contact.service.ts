/**
 * Contact Service
 * Handles all contact-related API calls
 */

import type { ContactFormData, ApiResponse } from "./types";
import { ApiError } from "./types";
import { buildApiUrl, API_ENDPOINTS, DEFAULT_HEADERS, DEFAULT_TIMEOUT } from "./client";

/**
 * Submit contact form to backend API
 * @param data Contact form data
 * @returns Promise resolving to API response
 * @throws ApiError on failure
 */
export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  try {
    const url = buildApiUrl(API_ENDPOINTS.CONTACT_CREATE);
    
    // Log request details for debugging
    console.log("Submitting contact form:", {
      url,
      data,
      headers: DEFAULT_HEADERS
    });
    
    const response = await fetch(url, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Log response details
    console.log("API Response:", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries())
    });

    // Parse response body
    let responseData: any;
    const contentType = response.headers.get("content-type");
    
    console.log("=== Backend Response Details ===");
    console.log("Status:", response.status);
    console.log("Status Text:", response.statusText);
    console.log("Content-Type:", contentType);
    
    if (contentType?.includes("application/json")) {
      responseData = await response.json();
      console.log("Response JSON:", responseData);
      console.log("Response data:", responseData);
    } else {
      // Non-JSON response
      const text = await response.text();
      console.error("Non-JSON response:", text);
      console.error("Full response text:", text);
      throw new ApiError(
        `Unexpected response format: ${text.slice(0, 100)}`,
        response.status
      );
    }

    // Handle success
    if (response.ok) {
      // Status 200-299 are success
      // Backend returns 201 (Created) on successful contact creation
      console.log("Request successful! Status:", response.status);
      
      // Check if response has success flag
      if (responseData.success === true) {
        console.log("Contact created successfully:", responseData.data);
        return responseData as ApiSuccessResponse;
      }
      
      // If success is false but status is OK, treat as error
      if (responseData.success === false) {
        console.warn("Response OK but success is false:", responseData);
        throw new ApiError(
          responseData.message || "Submission failed",
          response.status,
          responseData.errors || undefined
        );
      }
      
      // Success flag missing - still return success for backward compatibility
      console.log("Success flag missing, treating as success");
      return { 
        success: true,
        message: "Contact submitted successfully.",
        data: responseData.data || responseData,
        errors: null,
        timeStamp: responseData.timeStamp || new Date().toISOString()
      };
    }

    // Handle error responses
    if (response.status >= 400 && response.status < 500) {
      // Client error (400-499)
      console.error("=== Client Error (4xx) ===");
      console.error("Status:", response.status);
      console.error("Response data:", responseData);
      console.error("Error message:", responseData.message);
      console.error("Error details:", responseData.errors);
      
      throw new ApiError(
        responseData.message || "Invalid request. Please check your input.",
        response.status,
        responseData.errors
      );
    }

    if (response.status >= 500) {
      // Server error (500-599)
      console.error("=== Server Error (5xx) ===");
      console.error("Status:", response.status);
      console.error("Response data:", responseData);
      console.error("Error message:", responseData.message);
      console.error("Full error object:", JSON.stringify(responseData, null, 2));
      
      // Check if it's a captcha-related server error
      const message = responseData.message || "";
      if (message.toLowerCase().includes("captcha")) {
        throw new ApiError(
          "Server-side captcha validation error. The backend is unable to verify the captcha token. Please contact support.",
          response.status,
          responseData.errors
        );
      }
      
      throw new ApiError(
        responseData.message || "Server error. Please try again later.",
        response.status,
        responseData.errors
      );
    }

    // Other status codes
    throw new ApiError(
      responseData.message || "An unexpected error occurred",
      response.status
    );

  } catch (error) {
    clearTimeout(timeoutId);

    // Log error for debugging
    console.error("Contact form submission error:", error);

    // Re-throw ApiError as-is
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle abort/timeout
    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError("Request timeout. Please check your connection and try again.");
    }

    // Handle network errors
    if (error instanceof TypeError) {
      throw new ApiError("Network error. Please check your internet connection.");
    }

    // Unknown errors
    console.error("Unknown error details:", {
      error,
      type: typeof error,
      name: error instanceof Error ? error.name : "unknown",
      message: error instanceof Error ? error.message : String(error)
    });
    
    throw new ApiError(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
}
