# Backend Codebase Analysis - Taeketmaster Event Ticketing System

**Analysis Date:** May 9, 2026  
**Scope:** `server/src/` directory  
**Status:** Complete with comprehensive findings

---

## Executive Summary

The backend codebase has **8 critical issues**, **12 major issues**, and **15+ minor issues** that need addressing. The application has solid architectural patterns but suffers from inconsistencies, incomplete error handling, and missing functionality for managing events and showtimes.

---

## Table of Contents
1. [Critical Issues](#critical-issues)
2. [Major Issues by Component](#major-issues-by-component)
3. [Missing Features](#missing-features)
4. [Consistency Issues](#consistency-issues)
5. [Code Quality Issues](#code-quality-issues)

---

## CRITICAL ISSUES

### 1. **Incorrect Database Import in models/tables.model.js**
**File:** [server/src/models/tables.model.js](server/src/models/tables.model.js#L1)  
**Issue:** Line 1 imports `query` from db.js, but db.js exports `pool` (default export)
```javascript
import { query } from "../config/db.js";  // ❌ WRONG - no named export
```
**Should be:**
```javascript
import pool from "../config/db.js";  // ✓ CORRECT
```
**Impact:** All queries in this file will fail with "query is not a function"

---

### 2. **Incorrect Database Import in models/dashboard.model.js**
**File:** [server/src/models/dashboard.model.js](server/src/models/dashboard.model.js#L1)  
**Issue:** Same problem - imports `query` instead of `pool`
```javascript
import { query } from "../config/db.js";  // ❌ WRONG
```
**Impact:** Dashboard endpoints completely non-functional

---

### 3. **Incorrect Database Import in models/reports.model.js**
**File:** [server/src/models/reports.model.js](server/src/models/reports.model.js#L1)  
**Issue:** Same problem - imports `query` instead of `pool`
```javascript
import { query } from "../config/db.js";  // ❌ WRONG
```
**Impact:** Reports endpoints completely non-functional

---

### 4. **Undefined Variables in updateUser Function**
**File:** [server/src/models/users.model.js](server/src/models/users.model.js#L1-L14)  
**Issue:** `date_of_birth` and `gender` parameters used but never received from `userData`
```javascript
export const updateUser = async (id, userData) => {
    const { first_name, last_name, username, phone } = userData;  // ❌ Missing date_of_birth, gender
    // ...
    [first_name, last_name, username, phone, date_of_birth, gender, id]  // ❌ UNDEFINED variables
```
**Impact:** Update user endpoint will crash with ReferenceError

---

### 5. **Inconsistent User ID Field Access**
**File:** [server/src/controllers/bookings.controller.js](server/src/controllers/bookings.controller.js#L11)  
**Issue:** Accesses `req.user.user_id` but auth middleware sets `req.user.id`
```javascript
const userId = req.user.user_id;  // ❌ Should be req.user.id
```
**File:** [server/src/middlewares/auth.middleware.js](server/src/middlewares/auth.middleware.js#L13)  
**Sets:** `req.user = decoded;` where decoded contains `id`, not `user_id`

**Impact:** Booking endpoints will fail with "Cannot read property 'user_id' of undefined"

---

### 6. **Missing handleResponse Import in Dashboard Controller**
**File:** [server/src/controllers/dashboard.controller.js](server/src/controllers/dashboard.controller.js#L1)  
**Issue:** Line 1 correctly imports `handleResponse`, but line 5 calls non-existent method
```javascript
controller.getTopSpender()  // ❌ Calls getTopSpender()
```
**Routes call:** `controller.getTopSpender()` but model doesn't have this - it has `getTopSpenders()`

---

### 7. **Missing Routes Parameter Validation**
**File:** [server/src/routes/eventDetail.routes.js](server/src/routes/eventDetail.routes.js)  
**Issue:** Routes use query parameters but don't validate them
```javascript
router.get("/event", controller.getEventDetail);  // id comes from query, no validation
```
**Impact:** Missing query parameters not validated, will cause SQL errors

---

### 8. **Missing JWT Secret Consistency**
**File:** [server/src/middlewares/auth.middleware.js](server/src/middlewares/auth.middleware.js#L8)  
**Issue:** Line 8 defines JWT_SECRET with fallback, but line 43 uses `process.env.JWT_SECRET` (different)
```javascript
const JWT_SECRET = process.env.JWT_SECRET || "alm1ghtymut4ntpuppy6sevenhokjedhokjed";
// Line 43: jwt.verify(token, process.env.JWT_SECRET);  // ❌ Different!
```
**Impact:** If environment variable not set, token verification will fail

---

## MAJOR ISSUES BY COMPONENT

### Controllers

#### Auth Controller
- **No password validation rules** - accepts any password in signUp
- **No email format validation**
- **No phone format validation** (if required)
- **Parameter mismatch in signIn:** Uses `usorem` instead of `username` or `email`
  ```javascript
  const { usorem, password } = req.body;  // ❌ "usorem" appears to be typo
  ```

#### Users Controller
- **Missing validation:** `updateProfile` doesn't validate input fields
- **Missing validation:** `upsertAddress` doesn't validate address fields (postal code format, etc.)
- **No phone number validation** in update

#### Bookings Controller
- **Missing validation:** `reserveTicket` doesn't validate showtimeId/seatId formats
- **Missing validation:** `createPayment` accepts any bookingId without verifying it belongs to user
- **No booking ownership validation** - user could pay for someone else's booking
- **No error handling for database errors** - only catches and logs

#### Tables Controller
- **No consistent validation** across all CRUD endpoints
- **Missing validation:** Agent name length, email format
- **Missing validation:** Venue latitude/longitude ranges
- **Missing validation:** Zone color format (should be hex)

#### Home Controller
- **Missing validation:** `getEventFeed` doesn't validate date ranges (startDate > endDate)
- **No search input sanitization**

#### Event Details Controller
- **Missing validation:** Query parameter `id` not validated
- **Missing error messages:** Some errors return 404 without context

#### Dashboard & Reports Controllers
- **Date range validation incomplete** - doesn't check endDate >= startDate
- **No limit on report results** - could return millions of rows

---

### Models

#### Users Model
- **Critical:** `updateUser` has undefined variables (see critical issues #4)
- **No duplicate username check** - while controller checks, model doesn't prevent race conditions

#### Bookings Model
- **Missing:** `cancelBooking` operation
- **Missing:** `getBookingByID` for ownership verification
- **Missing:** `removeTicketFromBooking` operation
- **Weak seat booking check:** Only checks if ticket exists, not if seat is actually available

#### Home Model
- **Complex query** - difficult to maintain and potentially slow
- **Missing:** Pagination support for large result sets

#### Event Details Model
- **Duplicate queries:** `getEventDetailService` and `getEventDetailTwoService` both fetch similar data
- **Missing:** Filtering for past events (should be hidden)
- **Missing:** Pagination for available seats

#### Tables Model
- **All CRUD functions use generic queries** - no transaction support
- **No conflict detection** - can't prevent duplicate zone names in same venue
- **Missing:** Bulk operations for importing venues/zones/seats

#### Dashboard Model
- **Hard-coded limits** (limit 5, limit 10) - not configurable
- **All queries assume tickets table has `created_at`** - not verified in schema

#### Reports Model
- **All queries assume tickets table has `created_at`** - not verified
- **No pagination** - reports could be massive
- **No caching** - running expensive queries repeatedly

---

### Routes

#### Auth Routes
- **Issue:** Commented-out route but no deprecation handling
  ```javascript
  // router.get("/profile", authenticate, controller.getProfile);
  ```
- **Should be:** Either remove or replace with actual endpoint

#### Users Routes
- **Inconsistent:** POST and PUT both call `upsertAddress` - confusing API design
- **Missing:** DELETE route for address
- **Missing:** GET/PUT for other user fields (email change, password reset)

#### Bookings Routes
- **Missing:** GET routes to retrieve user's bookings and payments
- **Missing:** PUT/DELETE to cancel booking or remove ticket
- **Missing:** Route to confirm/complete payment

#### Tables Routes  
- **Missing:** Error handling for cascade deletes (deleting venue with zones should fail)
- **Routes don't validate nested parameters** - e.g., `/venues/:venueId/zones` accepts invalid venueId

#### Home Routes
- **Only one route:** `GET /home` - no ability to filter or search
- **Query parameters not documented**

#### Event Detail Routes
- **Route naming inconsistent:** `/event`, `/event2`, `/event/available`, `/event/zones`, `/event/seats`
- **Should be:** `/events/:id`, `/events/:id/available-seats`, etc.
- **Missing:** Route versioning or clear naming convention

#### Dashboard Routes
- **Cryptic route names:** `/001` through `/007` - no meaning
- **Should be:** `/today-tickets`, `/top-artists`, `/top-spenders`, etc.

#### Reports Routes
- **Well-named** ✓ - This is the good example

---

### Middlewares

#### Auth Middleware
- **Issue #5:** Inconsistent field names (`id` vs `user_id`)
- **Issue #8:** JWT secret inconsistency
- **Missing:** Token refresh capability
- **Missing:** Role-based access control beyond admin check
- **Missing:** Request logging for security audits
- **Generic error message** - doesn't help with debugging
  ```javascript
  return handleResponse(res, 403, "Invalid or expired token.");
  ```

#### Error Handler
- **Extremely generic:** Only returns "Oh no" message
- **Missing:** Error categorization (validation, auth, database, etc.)
- **Missing:** Error logging to file/monitoring service
- **Missing:** Stack trace hiding in production
- **Missing:** Request ID for error tracking
- **Problem:** Doesn't preserve original error status codes from thrown errors

---

### Config

#### Database Config
- **Missing:** Connection pooling configuration
- **Missing:** Timeout settings
- **Missing:** SSL/TLS configuration for production
- **Debug logging:** Console logs database credentials in development (should use sanitized log)
  ```javascript
  console.log(process.env.DB_USER);  // ❌ Logs credentials
  ```
- **Missing:** Connection error handling

---

### Main App

#### app.js
- **Issue:** Missing route for `/api/reports` doesn't use `/reports` prefix correctly
- **Comment:** Line 28 has duplicated commented route
- **Missing:** Request logging middleware (morgan, etc.)
- **Missing:** Rate limiting middleware
- **Missing:** Request validation middleware
- **Missing:** CORS configuration (currently allows all)
- **Missing:** HTTPS enforcement
- **Missing:** Security headers middleware (helmet)
- **Missing:** Compression middleware
- **Testing endpoint:** Line 46-49 should be removed or moved to separate route
- **Missing:** Health check endpoint
- **Missing:** 404 handler before error middleware
- **No graceful shutdown:** Server doesn't handle SIGTERM signals

---

## MISSING FEATURES

### Complete CRUD Operations Missing

#### Events Management (Critical for ticketing system)
- **No Create Event endpoint** - Cannot create new events
- **No Update Event endpoint** - Cannot edit event details
- **No Delete Event endpoint** - Cannot remove events
- **No List Events endpoint** (admin view) - Can only get public feed
- **Missing Model:** `events.model.js`
- **Missing Controller:** `events.controller.js`
- **Missing Routes:** `events.routes.js`

#### Showtimes Management
- **No Create Showtime endpoint**
- **No Update Showtime endpoint**
- **No Delete Showtime endpoint**
- **No List Showtimes endpoint** (admin view)
- **Missing Model:** `showtimes.model.js`
- **Missing Controller:** `showtimes.controller.js`

#### Event-Artist Relations
- **No endpoint to assign artists to events**
- **No endpoint to remove artists from events**

#### Event-Genre Relations
- **No endpoint to assign genres to events**
- **No endpoint to remove genres from events**

#### Event-Zone Pricing
- **No endpoint to set/update zone prices for events**
- **No endpoint to remove zone from event**

### Business Logic Operations Missing

- **Ticket Cancellation:** No endpoint to cancel tickets
- **Booking Cancellation:** No endpoint to cancel entire booking with refund
- **Payment Status:** No endpoint to check payment status or resend payment link
- **Ticket Usage:** No endpoint to mark ticket as used
- **Refunds:** No refund processing logic
- **Booking Confirmation:** No endpoint to confirm booking after payment
- **Email Notifications:** No email sending logic for confirmations/receipts
- **QR Code Generation:** No QR code generation for tickets
- **Bulk Seat Operations:** Cannot bulk-import seats to a zone
- **Event Search:** Limited to simple string matching, no faceted search

### Admin Features Missing

- **Event Publishing:** No workflow to go from draft to published
- **Sales Period Management:** No ability to set sales start/end dates per event
- **Inventory Management:** Cannot view or adjust seat inventory
- **User Management:** Cannot delete users, reset passwords, modify roles
- **Discount Management:** No discount/promo code functionality
- **Reporting Filters:** Reports have no date validation, no pagination

---

## CONSISTENCY ISSUES

### Response Format Inconsistency

**Pattern 1 (used in most controllers):**
```javascript
{
    status: 200,
    message: "...",
    data: {...}
}
```

**Pattern 2 (used in auth.controller.js):**
```javascript
{
    success: true/false,
    message: "...",
    data: {...}
}
```

**Pattern 3 (used in bookings.controller.js):**
```javascript
{
    success: true/false,
    message: "...",
    data: {...}
}
```

**Issue:** Frontend must handle 3 different response formats. Should standardize to one.

---

### Function Naming Inconsistency

| Component | Pattern |
|-----------|---------|
| Bookings | `getActiveBookingService`, `createBookingService` (with "Service" suffix) |
| Home | `getEventFeedService` |
| Event Details | `getEventDetailService` |
| Others | `getArtist`, `createArtist` (no suffix) |

**Issue:** Some models use "Service" suffix, others don't. Should be consistent.

---

### Parameter Naming Inconsistency

| File | Field Name |
|------|-----------|
| Auth Controller | Sets `req.user = decoded` with `id` field |
| Bookings Controller | Accesses `req.user.user_id` |
| Tables Model | Uses `agent_name`, `zone_name`, etc. |
| Users Controller | Uses `first_name`, `last_name` |

**Issue:** Database schema uses snake_case, but not consistently enforced everywhere.

---

### Error Handling Inconsistency

**Pattern 1: Throwing errors**
```javascript
throw new Error("Username already taken");  // models/users.model.js
```

**Pattern 2: Returning errors**
```javascript
return handleResponse(res, 400, "Username already taken. Cry about it, lol.");  // auth.controller.js
```

**Issue:** No consistent error handling strategy. Some errors thrown, some returned.

---

### Validation Inconsistency

| Endpoint | Validation |
|----------|-----------|
| Create Artist | ✓ Checks artist_name |
| Create Agent | ✓ Checks agent_name |
| Update Profile | ✗ No validation |
| Upsert Address | ✗ No validation |
| Reserve Ticket | ✓ Checks showtimeId and seatId |
| Create Payment | ✓ Validates payment method |

**Issue:** Some endpoints validate, others don't. Should apply consistently.

---

## CODE QUALITY ISSUES

### 1. **Hardcoded Values**

- Hardcoded JWT secret (should be env-only)
- Hardcoded report limits (5, 10, 6 results)
- Hardcoded time window (15 minutes for active booking)
- Hardcoded payment methods (in controller logic)

### 2. **Magic Numbers**

```javascript
limit 5        // Why 5?
limit 10       // Why 10?
interval '15 minutes'  // Why 15?
```

### 3. **TODO/FIXME Comments**

```javascript
// Fin wrote to line 70, others are generated TT
```

This comment in tables.controller.js indicates incomplete code.

### 4. **Commented-Out Code**

```javascript
// import userRoutes from "./routes/users.routes.js"  // in app.js
// router.get("/profile", authenticate, controller.getProfile);  // in auth.routes.js
```

Should remove or properly deprecate.

### 5. **Inconsistent Async Error Handling**

Some functions use try-catch with `next(err)`, others use `.catch()`, others don't have error handling.

### 6. **Unused Imports**

Models import `pool` but some never use it in methods.

### 7. **SQL Injection Concerns**

While parameterized queries are used (good!), there are inline SQL strings with string interpolation:

```javascript
const whereClause = queryConditions.length > 0 
    ? `where ${queryConditions.join(' and ')}` 
    : '';
```

This is safe because conditions are built programmatically, but could be clearer.

### 8. **Missing JSDoc Comments**

No function documentation. Should add:
```javascript
/**
 * Reserves a ticket for a user
 * @param {Object} req - Express request
 * @param {number} req.user.id - User ID from JWT
 * @param {Object} req.body - Request body
 * @param {number} req.body.showtimeId - Showtime ID
 * @param {number} req.body.seatId - Seat ID
 * @returns {Promise<Object>} Booking and ticket data
 */
```

### 9. **No Input Sanitization**

Search functionality doesn't sanitize input (though parameterized queries prevent SQL injection):
```javascript
if(search){
    queryParams.push(`%${search}%`);  // No sanitization for XSS if used in frontend
}
```

### 10. **No Rate Limiting**

Could allow brute force attacks on:
- Login endpoints
- Booking endpoints
- Payment endpoints

---

## MISSING VALIDATIONS

### Input Validation Missing

| Endpoint | Missing Validation |
|----------|-------------------|
| signUp | Email format, password strength, age requirement |
| signIn | None (actually good) |
| updateProfile | Field lengths, special characters |
| upsertAddress | Postal code format, province validity |
| reserveTicket | Showtime must be in future, seat must exist |
| createPayment | Amount validation, booking status check |
| Create Artist | Name length limits |
| Create Venue | Phone format, email format, coordinates validation |
| getEventFeed | Date range validation (start < end) |
| Reports | Date range validation, limit validation |

### Authorization Validation Missing

| Endpoint | Issue |
|----------|-------|
| Payment | No check that payment belongs to current user |
| Address | No check that address belongs to current user |
| Booking tickets | No check that user can book this event |

---

## MISSING ERROR CASES

### Bookings Controller
- No check if event is sold out
- No check if booking is already paid
- No check if seat is already booked
- No check if showtime has already happened

### Payments Controller
- No check if payment already exists
- No check if booking is complete
- No handling of payment failures

---

## Database Schema Concerns

Based on queries, the schema appears to use:
- `users`, `bookings`, `tickets`, `payments`
- `events`, `showtimes`, `venues`, `zones`, `seats`
- `artists`, `genres`, `agents`
- `addresses`, `event_zones`, `event_artists`

**Missing from code:**
- No CRUD for creating events
- No CRUD for creating showtimes
- No way to manage event_zones (pricing)
- No way to manage event_artists

---

## RECOMMENDATIONS BY PRIORITY

### 🔴 CRITICAL (Fix immediately)
1. Fix database imports in tables.model.js, dashboard.model.js, reports.model.js
2. Fix undefined variables in users.model.js updateUser
3. Fix user ID field inconsistency (req.user.id vs req.user.user_id)
4. Add payment ownership validation
5. Fix JWT secret consistency
6. Add booking ownership validation

### 🟠 MAJOR (Fix before production)
1. Create events CRUD endpoints and models
2. Create showtimes CRUD endpoints and models
3. Implement input validation across all endpoints
4. Implement proper error handling and logging
5. Standardize response format
6. Fix route naming conventions
7. Add ticket cancellation logic
8. Add booking confirmation flow

### 🟡 IMPORTANT (Fix soon)
1. Add rate limiting
2. Add request logging
3. Add security headers
4. Implement email notifications
5. Fix error handler to be more informative
6. Add JSDoc comments
7. Remove commented-out code
8. Remove debug console.logs

### 🔵 NICE TO HAVE
1. Add pagination to reports
2. Add caching for reports
3. Add QR code generation
4. Add discount/promo codes
5. Add bulk operations
6. Add advanced search/filtering

---

## Files Requiring Changes

**Critical:**
- `server/src/models/tables.model.js` (fix import)
- `server/src/models/dashboard.model.js` (fix import)
- `server/src/models/reports.model.js` (fix import)
- `server/src/models/users.model.js` (fix variables)
- `server/src/controllers/bookings.controller.js` (fix user ID access)
- `server/src/middlewares/auth.middleware.js` (fix JWT secret)

**Major:**
- `server/src/controllers/tables.controller.js` (add validations)
- `server/src/controllers/bookings.controller.js` (add validations)
- `server/src/controllers/auth.controller.js` (add validations)
- `server/src/routes/home.routes.js` (add routes)
- `server/src/middlewares/errorHandler.js` (improve error handling)
- `server/src/app.js` (add security middleware)

**Missing files needed:**
- `server/src/models/events.model.js`
- `server/src/controllers/events.controller.js`
- `server/src/routes/events.routes.js`
- `server/src/models/showtimes.model.js`
- `server/src/controllers/showtimes.controller.js`
- `server/src/routes/showtimes.routes.js`

---

## Conclusion

The backend has a **solid foundation** with good architectural patterns (MVC structure, parameterized queries, JWT auth) but needs **immediate fixes for critical bugs** and **comprehensive additions for missing features**. The most urgent work involves fixing database imports and user ID inconsistencies, followed by implementing missing CRUD operations for core entities (Events, Showtimes).
