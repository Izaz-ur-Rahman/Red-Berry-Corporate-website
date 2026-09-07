const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.redberry.ae/api';

/**
 * Business Stage Enum
 * Maps business development stage to API integer values
 */
export enum BusinessStage {
  IdeaPlanning = 1,        // Business is still in the planning or idea stage
  NewSetup = 2,            // Newly established business
  Operating = 3,           // Business is actively operating
  Scaling = 4,             // Business is expanding and scaling operations
  Restructuring = 5,       // Business is going through restructuring or transformation
  PreparingForInvestment = 6  // Business is preparing for investment or fundraising
}

/**
 * Review Method Enum
 * Preferred contact method
 */
export enum ReviewMethod {
  WhatsApp = 1,      // User prefers to be contacted via WhatsApp
  PhoneCall = 2,     // User prefers a phone call
  PrivateMeeting = 3 // User prefers an in-person/private meeting
}

/**
 * Blueprint Layer Enum (returned by API)
 */
export enum BlueprintLayer {
  Corporate = 1,
  Financial = 2,
  Market = 3,
  Legacy = 4
}

export interface BlueprintResult {
  ambition: string;
  totalScore: number;
  corporateScore: number;
  financialScore: number;
  marketScore: number;
  legacyScore: number;
  strongestLayer: string;
  exposedLayer: string;
  improvementLayers: string[];
  recommendedPathway: string;
  overallStatus: string;
  patterns: Array<{
    title: string;
    description: string;
  }>;
}

export interface BlueprintSubmission {
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  location: string;
  businessStage: number;
  reviewMethod: number;
  message: string;
  result: BlueprintResult;
  CaptchaToken: string; // Backend expects capital C
}

export interface BlueprintApiResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    name: string;
    email: string;
    whatsapp: string;
    company: string;
    location: string;
    businessStage: number;
    reviewMethod: number;
    message: string;
    result: BlueprintResult;
    createdAt: string;
  };
  errors: any;
  timeStamp: string;
}

/**
 * Submit a Blueprint assessment to the API
 * @param submission The blueprint submission data
 * @returns The API response
 */
export async function submitBlueprint(
  submission: BlueprintSubmission
): Promise<BlueprintApiResponse> {
  try {
    console.log("=== Submitting to Blueprint API ===");
    console.log("URL:", `${API_BASE_URL}/Blueprint/create`);
    console.log("Payload:", JSON.stringify(submission, null, 2));
    
    const response = await fetch(`${API_BASE_URL}/Blueprint/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
    });

    console.log("=== Backend Response ===");
    console.log("Status:", response.status);
    console.log("Status Text:", response.statusText);
    console.log("OK:", response.ok);
    console.log("Headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      // Try to get error details from response
      const contentType = response.headers.get("content-type");
      let errorDetails = "";
      
      if (contentType?.includes("application/json")) {
        const errorData = await response.json();
        console.error("=== Error Response Body ===");
        console.error("Error data:", errorData);
        console.error("Error message:", errorData.message);
        console.error("Error details:", JSON.stringify(errorData, null, 2));
        errorDetails = errorData.message || JSON.stringify(errorData);
      } else {
        const errorText = await response.text();
        console.error("=== Error Response Text ===");
        console.error("Error text:", errorText);
        errorDetails = errorText;
      }
      
      throw new Error(`HTTP error! status: ${response.status}, details: ${errorDetails}`);
    }

    const data: BlueprintApiResponse = await response.json();
    console.log("=== Success Response ===");
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error('=== Blueprint Submission Error ===');
    console.error('Error:', error);
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    throw error;
  }
}
