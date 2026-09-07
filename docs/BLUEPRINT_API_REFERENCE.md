# Blueprint Module API Documentation

Complete API reference for the Red Berry Corporate Blueprint Assessment system.

## Base URL
```
https://api.redberry.ae/api
```

---

## 1. Create Blueprint (Public Endpoint)

**Endpoint:** `POST /Blueprint/create`  
**Authorization:** None required

### Description
Creates a new Blueprint Assessment submission. This endpoint stores the user's contact information, assessment results, recommended pathway, and pattern analysis. After successfully saving the record, the system attempts to send assessment emails.

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Full name of the user |
| `email` | string | Yes | Email address |
| `whatsapp` | string | Yes | WhatsApp number |
| `company` | string | Yes | Company name |
| `location` | string | No | Business location |
| `businessStage` | integer | Yes | Business stage enum (1-6) |
| `reviewMethod` | integer | Yes | Review method enum (1-3) |
| `message` | string | No | Additional notes |
| `result` | object | Yes | Blueprint assessment result |

### BusinessStage Enum

| Value | Enum | Description |
|-------|------|-------------|
| 1 | IdeaPlanning | Business is still in the planning or idea stage |
| 2 | NewSetup | Newly established business |
| 3 | Operating | Business is actively operating |
| 4 | Scaling | Business is expanding and scaling operations |
| 5 | Restructuring | Business is going through restructuring or transformation |
| 6 | PreparingForInvestment | Business is preparing for investment or fundraising |

### ReviewMethod Enum

| Value | Enum | Description |
|-------|------|-------------|
| 1 | WhatsApp | User prefers to be contacted via WhatsApp |
| 2 | PhoneCall | User prefers a phone call |
| 3 | PrivateMeeting | User prefers an in-person/private meeting |

### BlueprintLayer Enum

The following enum values are returned by the API inside the assessment result:

| Value | Enum |
|-------|------|
| 1 | Corporate |
| 2 | Financial |
| 3 | Market |
| 4 | Legacy |

### Result Object Structure

```typescript
{
  ambition: string;           // User's selected business ambition
  totalScore: number;         // Total score (0-60)
  corporateScore: number;     // Corporate layer score (0-15)
  financialScore: number;     // Financial layer score (0-15)
  marketScore: number;        // Market layer score (0-15)
  legacyScore: number;        // Legacy layer score (0-15)
  strongestLayer: string;     // Name of strongest layer
  exposedLayer: string;       // Name of most exposed layer
  improvementLayers: string[];// Array of layers needing improvement
  recommendedPathway: string; // Recommended pathway
  overallStatus: string;      // Overall assessment status
  patterns: Array<{           // Detected patterns
    title: string;
    description: string;
  }>;
}
```

### Sample Request

```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "whatsapp": "+971501234567",
  "company": "ABC Holdings",
  "location": "Dubai",
  "businessStage": 2,
  "reviewMethod": 1,
  "message": "Need business growth consultation.",
  "result": {
    "ambition": "Regional Expansion",
    "totalScore": 74,
    "corporateScore": 18,
    "financialScore": 20,
    "marketScore": 17,
    "legacyScore": 19,
    "strongestLayer": "Financial",
    "exposedLayer": "Market",
    "improvementLayers": ["Market", "Corporate"],
    "recommendedPathway": "Growth Blueprint",
    "overallStatus": "Good",
    "patterns": [
      {
        "title": "Financially Stable",
        "description": "Strong financial structure."
      }
    ]
  }
}
```

### Sample Response (Success)

```json
{
  "success": true,
  "message": "Blueprint submitted successfully.",
  "data": {
    "id": 13,
    "name": "John Smith",
    "email": "john@example.com",
    "whatsapp": "+971501234567",
    "company": "ABC Holdings",
    "location": "Dubai",
    "businessStage": 2,
    "reviewMethod": 1,
    "message": "Need business growth consultation.",
    "result": {
      "ambition": "Regional Expansion",
      "totalScore": 74,
      "corporateScore": 18,
      "financialScore": 20,
      "marketScore": 17,
      "legacyScore": 19,
      "strongestLayer": "Financial",
      "exposedLayer": "Market",
      "improvementLayers": ["Market", "Corporate"],
      "recommendedPathway": "Growth Blueprint",
      "overallStatus": "Good",
      "patterns": [
        {
          "title": "Financially Stable",
          "message": ""
        }
      ]
    },
    "createdAt": "2026-07-13T07:12:51.4255827Z"
  },
  "errors": null,
  "timeStamp": "2026-07-13T07:13:19.461433Z"
}
```

---

## 2. Blueprint List (CMS - Authorization Required)

**Endpoint:** `POST /Blueprint/list`  
**Authorization:** Required

### Description
Returns paginated Blueprint submissions for the CMS dashboard.

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageNumber` | integer | Yes | Current page number |
| `pageSize` | integer | Yes | Records per page |
| `search` | string | No | Search by name, email or company |

### Sample Request

```json
{
  "pageNumber": 1,
  "pageSize": 10,
  "search": "john"
}
```

### Sample Response

```json
{
  "success": true,
  "message": "Blueprints retrieved successfully.",
  "data": {
    "totalRecords": 2,
    "data": [
      {
        "id": 13,
        "name": "John Smith",
        "email": "john@example.com",
        "whatsapp": "+971501234567",
        "company": "ABC Holdings",
        "location": "Dubai",
        "businessStage": 2,
        "reviewMethod": 1,
        "message": "Need business growth consultation.",
        "result": {
          "ambition": "Regional Expansion",
          "totalScore": 74,
          "corporateScore": 18,
          "financialScore": 20,
          "marketScore": 17,
          "legacyScore": 19,
          "strongestLayer": "Financial",
          "exposedLayer": "Market",
          "improvementLayers": ["Market", "Corporate"],
          "recommendedPathway": "Growth Blueprint",
          "overallStatus": "Good",
          "patterns": [
            {
              "title": "Financially Stable",
              "message": ""
            }
          ]
        },
        "createdAt": "2026-07-13T07:12:51.4255827"
      },
      {
        "id": 2,
        "name": "John",
        "email": "john@gmail.com",
        "whatsapp": "923001234567",
        "company": "ABC Ltd",
        "location": "Dubai",
        "businessStage": 4,
        "reviewMethod": 1,
        "message": "Planning expansion",
        "result": {
          "ambition": null,
          "totalScore": 53,
          "corporateScore": 14,
          "financialScore": 12,
          "marketScore": 13,
          "legacyScore": 14,
          "strongestLayer": "Corporate",
          "exposedLayer": "Financial",
          "improvementLayers": ["Financial"],
          "recommendedPathway": "Scale",
          "overallStatus": "Excellent",
          "patterns": []
        },
        "createdAt": "2026-07-07T09:36:51.4988112"
      }
    ]
  },
  "errors": null,
  "timeStamp": "2026-07-13T07:18:26.8746465Z"
}
```

---

## 3. Blueprint Details (CMS - Authorization Required)

**Endpoint:** `POST /Blueprint/details/{id}`  
**Authorization:** Required

### Description
Returns complete details of a Blueprint submission by its unique ID.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Blueprint Submission ID |

### Sample Request

```
POST https://api.redberry.ae/api/Blueprint/details/2
```

### Sample Response

```json
{
  "success": true,
  "message": "Blueprint retrieved successfully.",
  "data": {
    "id": 2,
    "name": "John",
    "email": "john@gmail.com",
    "whatsapp": "923001234567",
    "company": "ABC Ltd",
    "location": "Dubai",
    "businessStage": 4,
    "reviewMethod": 1,
    "message": "Planning expansion",
    "result": {
      "ambition": null,
      "totalScore": 53,
      "corporateScore": 14,
      "financialScore": 12,
      "marketScore": 13,
      "legacyScore": 14,
      "strongestLayer": "Corporate",
      "exposedLayer": "Financial",
      "improvementLayers": ["Financial"],
      "recommendedPathway": "Scale",
      "overallStatus": "Excellent",
      "patterns": []
    },
    "createdAt": "2026-07-07T09:36:51.4988112"
  },
  "errors": null,
  "timeStamp": "2026-07-13T07:22:19.4290981Z"
}
```

---

## 4. Update Blueprint (CMS - Authorization Required)

**Endpoint:** `POST /Blueprint/update/{id}`  
**Authorization:** Required

### Description
Updates an existing Blueprint Assessment including contact information, assessment scores, recommended pathway, and analysis results.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Blueprint Submission ID |

### Request Body
Same structure as Create Blueprint request (all fields can be updated).

### Sample Request

```json
{
  "name": "John Smith Updated",
  "email": "john@example.com",
  "whatsapp": "+971501234567",
  "company": "ABC Holdings LLC",
  "location": "Abu Dhabi",
  "businessStage": 3,
  "reviewMethod": 2,
  "message": "Updated after second consultation.",
  "result": {
    "ambition": "International Expansion",
    "totalScore": 86,
    "corporateScore": 21,
    "financialScore": 23,
    "marketScore": 20,
    "legacyScore": 22,
    "strongestLayer": "Financial",
    "exposedLayer": "Corporate",
    "improvementLayers": ["Corporate"],
    "recommendedPathway": "Scale Blueprint",
    "overallStatus": "Excellent",
    "patterns": [
      {
        "title": "Strong Leadership",
        "description": "Business leadership is well established."
      }
    ]
  }
}
```

### Sample Response

```json
{
  "success": true,
  "message": "Blueprint retrieved successfully.",
  "data": {
    "id": 13,
    "name": "John Smith Updated",
    "email": "john@example.com",
    "whatsapp": "+971501234567",
    "company": "ABC Holdings LLC",
    "location": "Abu Dhabi",
    "businessStage": 3,
    "reviewMethod": 2,
    "message": "Updated after second consultation.",
    "result": {
      "ambition": "International Expansion",
      "totalScore": 86,
      "corporateScore": 21,
      "financialScore": 23,
      "marketScore": 20,
      "legacyScore": 22,
      "strongestLayer": "Financial",
      "exposedLayer": "Corporate",
      "improvementLayers": ["Corporate"],
      "recommendedPathway": "Scale Blueprint",
      "overallStatus": "Excellent",
      "patterns": [
        {
          "title": "Strong Leadership",
          "message": ""
        }
      ]
    },
    "createdAt": "2026-07-13T07:12:51.4255827"
  },
  "errors": null,
  "timeStamp": "2026-07-13T07:31:49.6442507Z"
}
```

---

## 5. Delete Blueprint (CMS - Authorization Required)

**Endpoint:** `POST /Blueprint/delete/{id}`  
**Authorization:** Required

### Description
Deletes the selected Blueprint submission from the database.

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Blueprint Submission ID |

### Sample Response

```json
{
  "success": true,
  "message": "Blueprint deleted successfully."
}
```

---

## Response Format

All API endpoints follow a consistent response format:

### Success Response
```typescript
{
  success: true,
  message: string,
  data: any,          // Response data (varies by endpoint)
  errors: null,
  timeStamp: string   // ISO 8601 format
}
```

### Error Response
```typescript
{
  success: false,
  message: string,    // Error message
  data: null,
  errors: any,        // Error details
  timeStamp: string   // ISO 8601 format
}
```

---

## Frontend Integration

The frontend application uses endpoint #1 (Create Blueprint) which is publicly accessible and does not require authorization.

### Implementation Files
- `src/services/blueprintApi.ts` - API service with TypeScript types
- `src/components/blueprint-tool/BlueprintTool.tsx` - Component integration

### TypeScript Types
```typescript
// Available in src/services/blueprintApi.ts
export enum BusinessStage { ... }
export enum ReviewMethod { ... }
export enum BlueprintLayer { ... }
export interface BlueprintResult { ... }
export interface BlueprintSubmission { ... }
export interface BlueprintApiResponse { ... }
```

---

## Notes

1. **Email Automation**: After successful submission, the API attempts to send assessment emails
2. **Pattern Field**: Note that in responses, patterns may have either `description` or `message` field
3. **Timestamps**: All timestamps are in ISO 8601 format with timezone
4. **Authorization**: CMS endpoints (2-5) require authorization headers (not used in frontend)
5. **CORS**: Ensure API backend allows requests from the frontend domain
