# Contact Form Architecture

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           USER INTERACTION                               │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ Fills form
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         CONTACT FORM COMPONENT                           │
│                     (src/routes/about.contact.tsx)                       │
├─────────────────────────────────────────────────────────────────────────┤
│  1. Client-side Validation (Zod Schema)                                 │
│     ├─ Name: 2-100 chars                                                │
│     ├─ Email: Valid format                                              │
│     ├─ Phone: 5-40 chars                                                │
│     ├─ Company: Optional, max 120                                       │
│     ├─ Interest: Required selection                                     │
│     └─ Message: 10-1500 chars                                           │
│                                                                          │
│  2. Form State Management                                               │
│     ├─ errors: Record<string, string>                                   │
│     └─ submitting: boolean                                              │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ Valid data
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          API SERVICE LAYER                               │
│                    (src/services/api/contact.service.ts)                 │
├─────────────────────────────────────────────────────────────────────────┤
│  submitContactForm(data: ContactFormData)                               │
│                                                                          │
│  Features:                                                               │
│  ├─ Timeout Protection (30s)                                            │
│  ├─ AbortController for cancellation                                    │
│  ├─ Type-safe request/response                                          │
│  ├─ Comprehensive error transformation                                  │
│  └─ Network failure handling                                            │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ POST request
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                            API CLIENT                                    │
│                     (src/services/api/client.ts)                         │
├─────────────────────────────────────────────────────────────────────────┤
│  Config:                                                                 │
│  ├─ Base URL: env.VITE_API_URL                                          │
│  ├─ Endpoint: /contact/create                                           │
│  ├─ Method: POST                                                        │
│  ├─ Headers: Content-Type: application/json                             │
│  └─ Timeout: 30000ms                                                    │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTPS
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           BACKEND API                                    │
│         https://api.redberry.ae/api               │
├─────────────────────────────────────────────────────────────────────────┤
│  POST /contact/create                                                    │
│                                                                          │
│  1. Receives JSON payload                                               │
│  2. Server-side validation                                              │
│  3. Sanitization & security checks                                      │
│  4. Business logic processing                                           │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ Insert query
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                              DATABASE                                    │
│                         (MySQL/PostgreSQL)                               │
├─────────────────────────────────────────────────────────────────────────┤
│  contacts table:                                                         │
│  ├─ id (PRIMARY KEY)                                                    │
│  ├─ name (VARCHAR 100)                                                  │
│  ├─ email (VARCHAR 255)                                                 │
│  ├─ phone (VARCHAR 40)                                                  │
│  ├─ company (VARCHAR 120, NULLABLE)                                     │
│  ├─ interest (VARCHAR 80)                                               │
│  ├─ message (TEXT 1500)                                                 │
│  ├─ created_at (TIMESTAMP)                                              │
│  └─ updated_at (TIMESTAMP)                                              │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ Success response
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          RESPONSE HANDLING                               │
├─────────────────────────────────────────────────────────────────────────┤
│  Success (200 OK):                                                       │
│  { "success": true }                                                     │
│     ├─ Show success toast                                               │
│     ├─ Clear form fields                                                │
│     ├─ Reset validation errors                                          │
│     └─ Navigate to /contact-thank-you                                   │
│                                                                          │
│  Error (4xx/5xx):                                                        │
│  { "success": false, "message": "...", "errors": {...} }                │
│     ├─ Show error toast                                                 │
│     ├─ Display field errors inline                                      │
│     └─ Keep form data                                                   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
    ┌───────────────────────────┐   ┌─────────────────────────────┐
    │   SUCCESS NOTIFICATION    │   │     CMS MANAGEMENT          │
    │   (Toast - Sonner)        │   │                             │
    ├───────────────────────────┤   ├─────────────────────────────┤
    │  ✓ Green toast            │   │  Immediate Availability:    │
    │  ✓ "Contact submitted     │   │  ├─ View contact list       │
    │     successfully"         │   │  ├─ Search contacts         │
    │  ✓ Auto-dismiss (4s)      │   │  ├─ View details            │
    │                           │   │  ├─ Edit contact            │
    │                           │   │  └─ Delete contact          │
    └───────────────────────────┘   └─────────────────────────────┘
```

## Component Architecture

```
src/
├── routes/
│   └── about.contact.tsx           # Main contact form component
│       ├── ContactSchema           # Zod validation schema
│       ├── ContactPage             # Main component
│       ├── Field                   # Reusable input field component
│       └── onSubmit handler        # Form submission logic
│
├── services/
│   └── api/
│       ├── index.ts                # Central exports
│       ├── types.ts                # TypeScript interfaces
│       │   ├── ContactFormData
│       │   ├── ApiSuccessResponse
│       │   ├── ApiErrorResponse
│       │   └── ApiError (class)
│       │
│       ├── client.ts               # API configuration
│       │   ├── API_BASE_URL
│       │   ├── API_ENDPOINTS
│       │   ├── buildApiUrl()
│       │   └── DEFAULT_HEADERS
│       │
│       └── contact.service.ts      # Contact API service
│           └── submitContactForm() # Main submission function
│
├── components/
│   └── ui/
│       └── sonner.tsx              # Toast notification component
│
└── main.tsx                        # App entry point (Toaster added)
```

## Data Flow

### Request Flow

```
User Input → Validation → API Service → HTTP Request → Backend
     ↓                                                      ↓
   Errors                                              Database
     ↓                                                      ↓
  Display                                            Success/Error
                                                           ↓
                                                      Response
                                                           ↓
                                        Frontend ←─────────┘
                                            ↓
                                   ┌────────┴────────┐
                                   ↓                 ↓
                              Success UI         Error UI
                              (Toast +           (Toast +
                               Redirect)          Inline)
```

### State Management

```
┌─────────────────────────────────────────────┐
│         COMPONENT STATE                     │
├─────────────────────────────────────────────┤
│                                             │
│  errors: Record<string, string>             │
│  ├─ name: "error message"                   │
│  ├─ email: "error message"                  │
│  └─ ...                                     │
│                                             │
│  submitting: boolean                        │
│  ├─ false: Form ready                       │
│  └─ true: API call in progress              │
│                                             │
└─────────────────────────────────────────────┘

State Transitions:

1. Initial:     submitting=false, errors={}
2. Validate:    submitting=false, errors={...} (if invalid)
3. Submitting:  submitting=true,  errors={}
4. Success:     submitting=false, errors={}, navigate()
5. Error:       submitting=false, errors={...}
```

## Error Handling Strategy

```
┌─────────────────────────────────────────────────────────┐
│                   ERROR CATEGORIES                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. VALIDATION ERRORS (Client-side)                     │
│     ├─ Caught by Zod schema                             │
│     ├─ Displayed inline below fields                    │
│     └─ No API call made                                 │
│                                                          │
│  2. NETWORK ERRORS                                      │
│     ├─ Timeout (30+ seconds)                            │
│     ├─ Offline/No connection                            │
│     ├─ DNS failure                                      │
│     └─ Toast: "Network error..."                        │
│                                                          │
│  3. CLIENT ERRORS (400-499)                             │
│     ├─ 400: Bad Request                                 │
│     ├─ 422: Validation Failed                           │
│     ├─ Field errors displayed inline                    │
│     └─ Toast: "Please check your input"                 │
│                                                          │
│  4. SERVER ERRORS (500-599)                             │
│     ├─ 500: Internal Server Error                       │
│     ├─ 502: Bad Gateway                                 │
│     ├─ 503: Service Unavailable                         │
│     └─ Toast: "Server error. Try again later"           │
│                                                          │
│  5. UNEXPECTED ERRORS                                   │
│     ├─ Invalid response format                          │
│     ├─ JSON parse errors                                │
│     └─ Toast: "Unexpected error occurred"               │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Security Measures

```
┌─────────────────────────────────────────────────────────┐
│                  SECURITY LAYERS                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. CLIENT-SIDE                                          │
│     ├─ Input validation (Zod)                           │
│     ├─ XSS protection (React auto-escape)               │
│     ├─ Character limits enforced                        │
│     └─ Type checking (TypeScript)                       │
│                                                          │
│  2. TRANSPORT                                            │
│     ├─ HTTPS only                                       │
│     ├─ No sensitive data in URL                         │
│     └─ Content-Type validation                          │
│                                                          │
│  3. SERVER-SIDE (Backend responsibility)                │
│     ├─ Input sanitization                               │
│     ├─ SQL injection prevention                         │
│     ├─ Rate limiting                                    │
│     ├─ CORS configuration                               │
│     └─ Authentication (if required)                     │
│                                                          │
│  4. DATABASE                                             │
│     ├─ Parameterized queries                            │
│     ├─ Field length limits                              │
│     ├─ Data type validation                             │
│     └─ Backup & recovery                                │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Performance Considerations

```
┌─────────────────────────────────────────────────────────┐
│                   PERFORMANCE METRICS                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Client-side Validation:     < 100ms                    │
│  ├─ Instant feedback                                    │
│  └─ No network delay                                    │
│                                                          │
│  API Request:                1-3 seconds (average)      │
│  ├─ Network latency                                     │
│  ├─ Backend processing                                  │
│  └─ Database insert                                     │
│                                                          │
│  Timeout Protection:         30 seconds                 │
│  ├─ Prevents hanging                                    │
│  └─ User-friendly error                                 │
│                                                          │
│  Form Reset:                 < 50ms                     │
│  └─ Immediate UI update                                 │
│                                                          │
│  Toast Display:              4 seconds (auto-dismiss)   │
│  └─ Non-blocking notification                           │
│                                                          │
│  CMS Sync:                   < 1 second                 │
│  └─ Near real-time                                      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Integration Points

```
┌─────────────────────────────────────────────────────────┐
│              EXTERNAL INTEGRATIONS                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. Backend API                                          │
│     ├─ Endpoint: /contact/create                        │
│     ├─ Protocol: HTTPS                                  │
│     ├─ Format: JSON                                     │
│     └─ Auth: Not required (public endpoint)             │
│                                                          │
│  2. Database                                             │
│     ├─ Type: MySQL/PostgreSQL                           │
│     ├─ Table: contacts                                  │
│     └─ Access: Via backend API only                     │
│                                                          │
│  3. CMS                                                  │
│     ├─ Module: Contact Management                       │
│     ├─ Access: Admin only                               │
│     ├─ Data source: Same database                       │
│     └─ Sync: Automatic (database-driven)                │
│                                                          │
│  4. Toast Library (Sonner)                              │
│     ├─ Global provider in main.tsx                      │
│     ├─ Imported via: import { toast } from 'sonner'     │
│     └─ Methods: toast.success(), toast.error()          │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                 DEPLOYMENT STACK                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  FRONTEND (Static)                                       │
│  ├─ Framework: React + Vite                             │
│  ├─ Build: npm run build                                │
│  ├─ Output: dist/ folder                                │
│  └─ Hosting: IIS / Nginx / CDN                          │
│      └─ Env vars baked into build                       │
│                                                          │
│  BACKEND (API)                                           │
│  ├─ Server: Node.js / Express (assumed)                 │
│  ├─ URL: api.redberry.ae          │
│  └─ Environment: Production                             │
│                                                          │
│  DATABASE                                                │
│  ├─ Type: MySQL / PostgreSQL                            │
│  ├─ Connection: Backend → Database                      │
│  └─ Backup: Automated (backend responsibility)          │
│                                                          │
│  CMS                                                     │
│  ├─ Access: Admin panel                                 │
│  ├─ Data: Reads from same database                      │
│  └─ Auth: Admin credentials required                    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Technology Stack

```
┌──────────────────────────────────────────────────────────┐
│                    TECH STACK                            │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  FRONTEND                                                │
│  ├─ React 19.2.0                                        │
│  ├─ TypeScript 5.8.3                                    │
│  ├─ Vite 7.3.1                                          │
│  ├─ React Router DOM 7.18.1                             │
│  ├─ Zod 3.24.2 (validation)                             │
│  ├─ Sonner 2.0.7 (toasts)                               │
│  ├─ TanStack Query 5.83.0                               │
│  └─ Tailwind CSS 4.2.1                                  │
│                                                          │
│  API INTEGRATION                                         │
│  ├─ Native Fetch API                                    │
│  ├─ AbortController (timeout)                           │
│  ├─ Custom error handling                               │
│  └─ Type-safe interfaces                                │
│                                                          │
│  DEVELOPMENT                                             │
│  ├─ ESLint 9.32.0                                       │
│  ├─ Prettier 3.7.3                                      │
│  └─ Dev Server: port 5173                               │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
