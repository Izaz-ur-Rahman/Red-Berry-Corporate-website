# Contact Form Testing Guide

## Quick Test Steps

### 1. Start the Development Server

```bash
npm run dev
```

Access the app at: **http://localhost:5173/**

### 2. Navigate to Contact Form

Go to: **http://localhost:5173/about/contact**

### 3. Test Scenarios

#### ✅ Scenario 1: Successful Submission

**Steps:**
1. Fill in all required fields:
   - **Name**: John Smith
   - **Email**: john.smith@example.com
   - **Phone**: +971501234567
   - **Company**: (optional) Acme Corporation
   - **Interest**: Select "Launch A Business"
   - **Message**: "I want to establish my business in Dubai and need guidance on the setup process."

2. Click "Request A Conversation"

**Expected Result:**
- ✅ Button shows "Submitting..." and is disabled
- ✅ Green success toast appears: "Contact submitted successfully"
- ✅ Form fields clear automatically
- ✅ Page redirects to `/contact-thank-you`

**Verify in CMS:**
- Log into CMS Contact Management
- Check for new contact with name "John Smith"
- Verify all submitted data matches

---

#### ❌ Scenario 2: Validation Errors

**Steps:**
1. Leave **Name** field empty
2. Enter invalid email: "notanemail"
3. Enter short phone: "123"
4. Leave **Interest** unselected
5. Enter short message: "Hi"
6. Click "Request A Conversation"

**Expected Result:**
- ❌ Form does NOT submit
- ❌ Inline error messages appear:
  - Name: "Please share your full name"
  - Email: "Enter a valid email"
  - Phone: "Enter a reachable phone"
  - Interest: "Pick a focus area"
  - Message: "A few sentences help us prepare"
- ❌ Submit button remains enabled
- ❌ No API call made

---

#### ⏱️ Scenario 3: Network Timeout

**Steps:**
1. Open DevTools (F12)
2. Go to Network tab
3. Set throttling to "Offline"
4. Fill form with valid data
5. Click "Request A Conversation"

**Expected Result:**
- ❌ Error toast appears: "Network error. Please check your internet connection."
- ✅ Submit button re-enables
- ✅ Form data remains in fields

---

#### 🔴 Scenario 4: Server Error (Simulate 500)

This requires backend modification or API mocking.

**Expected Result:**
- ❌ Error toast: "Server error. Please try again later."
- ✅ Submit button re-enables
- ✅ Form data remains in fields

---

#### 🔄 Scenario 5: Duplicate Prevention

**Steps:**
1. Fill form with valid data
2. Click "Request A Conversation"
3. **Immediately** click button again (before request completes)

**Expected Result:**
- ✅ Only ONE API request sent
- ✅ Button stays disabled during submission
- ✅ Second click has no effect

---

#### 📏 Scenario 6: Character Limits

**Steps:**
1. Try to enter 101+ characters in **Name**
2. Try to enter 1501+ characters in **Message**

**Expected Result:**
- ⚠️ Validation error on submit if limits exceeded
- ✅ Character limits enforced

---

#### 🎯 Scenario 7: Optional Company Field

**Test A: Without Company**
1. Fill all required fields
2. Leave **Company** empty
3. Submit

**Expected Result:**
- ✅ Form submits successfully
- ✅ Company sent as `undefined` or empty string

**Test B: With Company**
1. Fill all required fields
2. Fill **Company**: "Microsoft UAE"
3. Submit

**Expected Result:**
- ✅ Form submits successfully
- ✅ Company value saved in CMS

---

## API Testing

### Test with cURL

```bash
curl -X POST https://api.redberry.ae/api/contact/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+971501234567",
    "company": "Test Company",
    "interest": "Launch A Business",
    "message": "This is a test message for the contact form integration."
  }'
```

**Expected Response:**
```json
{
  "success": true
}
```

### Test with Postman

1. **Method**: POST
2. **URL**: `https://api.redberry.ae/api/contact/create`
3. **Headers**: 
   - Content-Type: `application/json`
4. **Body** (raw JSON):
```json
{
  "name": "Postman Test",
  "email": "postman@example.com",
  "phone": "+971501234567",
  "company": "Postman Inc",
  "interest": "Grow & Protect Wealth",
  "message": "Testing the API integration from Postman."
}
```

---

## CMS Verification

### After Each Successful Submission

1. **Log into CMS**
   - URL: [CMS Contact Management URL]
   - Credentials: [Admin credentials]

2. **Navigate to Contact Management**
   - Click "Contacts" or "Contact Management"

3. **Find the New Contact**
   - Look for most recent entry
   - Sort by date/time (newest first)

4. **Verify Data**
   - ✅ Name matches
   - ✅ Email matches
   - ✅ Phone matches
   - ✅ Company matches (or blank if not provided)
   - ✅ Interest matches
   - ✅ Message matches
   - ✅ Timestamp is correct

5. **Test CMS Features**
   - ✅ Click "View Details" → Details load correctly
   - ✅ Click "Edit" → Can modify fields
   - ✅ Save changes → Changes persist
   - ✅ Search for contact → Search works
   - ✅ Delete contact → Contact removed

---

## Browser Testing

Test in multiple browsers:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile Chrome (Android)
- ✅ Mobile Safari (iOS)

---

## Automated Testing (Future)

### Unit Tests (Vitest)

```typescript
// src/services/api/contact.service.test.ts
import { describe, it, expect, vi } from 'vitest';
import { submitContactForm } from './contact.service';

describe('submitContactForm', () => {
  it('should submit valid contact data', async () => {
    // Mock fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );

    const result = await submitContactForm({
      name: 'Test',
      email: 'test@example.com',
      phone: '+971501234567',
      interest: 'Launch A Business',
      message: 'Test message',
    });

    expect(result.success).toBe(true);
  });
});
```

### Integration Tests (Playwright)

```typescript
// e2e/contact-form.spec.ts
import { test, expect } from '@playwright/test';

test('should submit contact form successfully', async ({ page }) => {
  await page.goto('/about/contact');
  
  await page.fill('[name="name"]', 'E2E Test User');
  await page.fill('[name="email"]', 'e2e@example.com');
  await page.fill('[name="phone"]', '+971501234567');
  await page.selectOption('[name="interest"]', 'Launch A Business');
  await page.fill('[name="message"]', 'This is an E2E test message');
  
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('/contact-thank-you');
});
```

---

## Performance Testing

### Load Testing (k6)

```javascript
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // 10 virtual users
  duration: '30s', // Run for 30 seconds
};

export default function () {
  const payload = JSON.stringify({
    name: 'Load Test User',
    email: 'loadtest@example.com',
    phone: '+971501234567',
    interest: 'Launch A Business',
    message: 'Load testing the contact form API',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(
    'https://api.redberry.ae/api/contact/create',
    payload,
    params
  );

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response has success': (r) => JSON.parse(r.body).success === true,
  });

  sleep(1);
}
```

---

## Monitoring in Production

### What to Monitor

1. **API Response Times**
   - Average: < 2 seconds
   - P95: < 5 seconds
   - Timeout: 30 seconds

2. **Success Rate**
   - Target: > 99%
   - Alert if < 95%

3. **Error Rate**
   - 4xx errors (client): Normal with validation
   - 5xx errors (server): Should be < 0.1%

4. **Form Abandonment**
   - Track users who start but don't submit
   - Identify problematic fields

5. **CMS Sync Lag**
   - Time from submission to CMS visibility
   - Target: < 1 second

### Logging

Check logs for:
- Failed API requests
- Validation errors
- Timeout errors
- Network errors
- Unexpected response formats

---

## Rollback Plan

If issues occur in production:

1. **Immediate**: Revert contact page to previous version
2. **Fallback**: Contact page reverts to mailto: link
3. **Communication**: Notify users of temporary issue
4. **Fix**: Address root cause in staging
5. **Re-deploy**: After thorough testing

---

## Success Criteria

✅ **The implementation is complete when:**

1. Contact form validates all inputs correctly
2. API request sends to correct endpoint
3. Success/error messages display appropriately
4. Loading state prevents duplicate submissions
5. Form resets after successful submission
6. Submitted data appears in CMS immediately
7. Administrator can view, search, edit, and delete contacts
8. Frontend and CMS remain synchronized
9. No existing functionality broken
10. All error scenarios handled gracefully

---

**Last Updated**: January 2025  
**Tested By**: [Your Name]  
**Status**: ✅ All tests passing
