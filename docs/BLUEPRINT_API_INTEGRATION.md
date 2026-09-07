# Blueprint API Integration Documentation

## Overview
The Blueprint Tool is now integrated with the Red Berry Corporate API to submit assessment results and contact information. When users complete the assessment and fill in their contact details, the data is submitted to the backend API.

## API Endpoint
- **URL**: `https://api.redberry.ae/api/Blueprint/create`
- **Method**: POST
- **Authorization**: None required (public endpoint)

## Implementation Details

### Files Created/Modified

#### 1. New API Service (`src/services/blueprintApi.ts`)
A dedicated service module for Blueprint API operations:
- `submitBlueprint()` - Submits blueprint assessment to the API
- Type definitions for API requests and responses
- Error handling

#### 2. Updated Component (`src/components/blueprint-tool/BlueprintTool.tsx`)
Enhanced with:
- Loading state during submission (`isSubmitting`)
- Error handling and display (`submitError`)
- API integration in `handleContactSubmit()`
- Disabled form fields during submission
- Visual feedback (loading spinner, error messages)

## Data Mapping

### Contact Form to API
| Form Field | API Field | Type | Enum | Notes |
|------------|-----------|------|------|-------|
| Name | `name` | string | - | Required |
| Email | `email` | string | - | Required, validated |
| WhatsApp | `whatsapp` | string | - | Required |
| Company | `company` | string | - | Required |
| Location | `location` | string | - | Optional |
| Business Stage | `businessStage` | integer | BusinessStage | Required, see enum below |
| Review Method | `reviewMethod` | integer | ReviewMethod | Required, see enum below |
| Message | `message` | string | - | Optional |

### BusinessStage Enum
According to API documentation, use one of the following integer values:

| Value | Enum | Description | Form Option |
|-------|------|-------------|-------------|
| 1 | IdeaPlanning | Business is still in the planning or idea stage | "Idea / Planning" |
| 2 | NewSetup | Newly established business | "New Setup" |
| 3 | Operating | Business is actively operating | "Operating" |
| 4 | Scaling | Business is expanding and scaling operations | "Scaling" |
| 5 | Restructuring | Business is going through restructuring or transformation | "Restructuring" |
| 6 | PreparingForInvestment | Business is preparing for investment or fundraising | "Preparing for Investment" |

### ReviewMethod Enum
According to API documentation, use one of the following integer values:

| Value | Enum | Description | Form Option |
|-------|------|-------------|-------------|
| 1 | WhatsApp | User prefers to be contacted via WhatsApp | "WhatsApp" |
| 2 | PhoneCall | User prefers a phone call | "Phone Call" |
| 3 | PrivateMeeting | User prefers an in-person/private meeting | "Private Meeting" |

### BlueprintLayer Enum (Returned by API)
The following enum values are returned by the API inside the assessment result:

| Value | Enum |
|-------|------|
| 1 | Corporate |
| 2 | Financial |
| 3 | Market |
| 4 | Legacy |

### Assessment Result Structure
The `result` object contains:
- `ambition` - User's selected business ambition
- `totalScore` - Sum of all layer scores (0-60)
- `corporateScore` - Corporate infrastructure score (0-15)
- `financialScore` - Financial infrastructure score (0-15)
- `marketScore` - Market & mobility score (0-15)
- `legacyScore` - Business legacy score (0-15)
- `strongestLayer` - Name of highest scoring layer
- `exposedLayer` - Name of lowest scoring layer
- `improvementLayers` - Array of layer names needing improvement
- `recommendedPathway` - Suggested pathway name (Groundwork/Framework/Cornerstone)
- `overallStatus` - Overall assessment status
- `patterns` - Array of detected pattern objects with title and description

## User Experience Flow

1. **Assessment Completion**: User completes all 20 questions across 4 layers
2. **Contact Form**: User fills in their contact information
3. **Submission**: Click "Unlock My Blueprint"
   - Button shows loading spinner
   - Form fields become disabled
   - API request is sent
4. **Success**: 
   - User is taken to results dashboard
   - Can download PDF report
   - Can request private review
5. **Error**:
   - Error message displays above form
   - Form remains editable
   - User can retry submission

## Error Handling

### Client-Side Validation
- Name, email, WhatsApp, and company are required
- Email format validation
- Fields cannot be empty strings

### API Error Handling
- Network errors caught and displayed
- HTTP errors (non-200 status) caught
- API response errors shown to user
- Error message displayed in red alert box

### Error Messages
```typescript
// Generic error
"An error occurred while submitting your blueprint. Please try again."

// API-specific error (from response)
response.message || "Failed to submit blueprint. Please try again."
```

## Response Handling

### Success Response
```json
{
  "success": true,
  "message": "Blueprint submitted successfully.",
  "data": {
    "id": 13,
    "name": "John Smith",
    "email": "john@example.com",
    ...
  },
  "errors": null,
  "timeStamp": "2026-07-13T07:13:19.461433Z"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Validation error message",
  "data": null,
  "errors": { ... },
  "timeStamp": "2026-07-13T07:13:19.461433Z"
}
```

## Testing

### Manual Testing Checklist
- [ ] Complete blueprint assessment
- [ ] Fill in all required contact fields
- [ ] Submit with valid data
- [ ] Verify submission success
- [ ] Test with invalid email format
- [ ] Test with empty required fields
- [ ] Test network error handling (offline)
- [ ] Verify loading states
- [ ] Verify error display
- [ ] Test form re-enablement after error

### Test Data Example
```typescript
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
    "strongestLayer": "Financial Infrastructure",
    "exposedLayer": "Market & Mobility Infrastructure",
    "improvementLayers": ["Market & Mobility Infrastructure"],
    "recommendedPathway": "Framework",
    "overallStatus": "Growth-Ready, But Incomplete",
    "patterns": [
      {
        "title": "Financially Stable",
        "description": "Strong financial structure."
      }
    ]
  }
}
```

## Configuration

### Environment Variables
The API URL is configured in `.env`:
```env
VITE_API_URL=https://api.redberry.ae/api
```

To use a different API endpoint:
1. Update `.env` file
2. Restart development server
3. Rebuild for production

## Future Enhancements

### Potential Improvements
1. **Offline Support**: Queue submissions when offline
2. **Progress Saving**: Save partial assessments to localStorage
3. **Email Verification**: Verify email before submission
4. **Retry Logic**: Auto-retry failed submissions
5. **Analytics**: Track submission success/failure rates
6. **Validation**: Server-side validation feedback
7. **Rate Limiting**: Handle API rate limit responses

## Troubleshooting

### Common Issues

**Issue**: Submission fails with network error
- **Solution**: Check internet connection, verify API URL in `.env`

**Issue**: Form doesn't submit
- **Solution**: Ensure all required fields are filled and valid

**Issue**: API returns validation error
- **Solution**: Check data mapping, verify enum values are correct

**Issue**: CORS error in browser
- **Solution**: API backend must allow requests from frontend domain

## Support

For API-related issues, contact the backend team with:
- Request payload
- Response (if any)
- Timestamp
- User details (if applicable)
- Browser console errors
