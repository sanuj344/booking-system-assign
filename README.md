# 🏠 On-Demand Home Services – Booking Lifecycle System

## Overview

This project implements the **core booking lifecycle** for an on-demand home services marketplace, where customers create service bookings and providers fulfill them.

The goal of this assignment is to demonstrate **real-world backend design**, focusing on:
- booking state management
- provider workflows
- failure handling
- admin intervention
- observability

Rather than building a full production system, the project intentionally implements a **small but meaningful slice** of functionality.

---

## Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router
- Custom CSS (no UI library)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

---

## Core Design Principle

### Booking as a State Machine

A booking is modeled as a **finite state machine** to prevent invalid transitions and ensure predictable behavior.

### Booking States
PENDING

ASSIGNED

IN_PROGRESS

COMPLETED

CANCELLED

FAILED



### Valid Transitions

PENDING → ASSIGNED → IN_PROGRESS → COMPLETED

PENDING → CANCELLED

ASSIGNED → CANCELLED

ASSIGNED → FAILED

markdown


All state transitions are **validated at the backend**.

---

## Booking Lifecycle

### 1. Create Booking (Customer)
- Customer creates a booking
- Initial state: `PENDING`
- Event logged: `null → PENDING`

### 2. Provider Assignment (System)
- Provider is automatically assigned by the system
- State transition: `PENDING → ASSIGNED`
- If provider rejects, retry logic assigns the next provider

### 3. Provider Workflow (Accept / Reject)
- Provider actions:
  - **Accept** → `ASSIGNED → IN_PROGRESS`
  - **Reject** → `ASSIGNED → PENDING`
- Rejection is **not allowed after acceptance**

Provider workflow is implemented via backend APIs rather than a full provider UI to keep the scope focused on lifecycle behavior.

### 4. Completion
- Provider completes service
- State transition: `IN_PROGRESS → COMPLETED`

### 5. Failures & Cancellations
- Customer or provider cancellation
- Provider no-show
- System marks booking as `FAILED`

### 6. Admin / Ops Override
- Admin can manually override booking state
- Used for operational intervention
- Every override is logged as an `ADMIN` event

---

## Observability (Event Logging)

Every booking state change creates a **BookingEvent** record.

This provides:
- full audit trail
- debugging support
- operational visibility

### Example Event Timeline
null → PENDING (CUSTOMER)

PENDING → ASSIGNED (SYSTEM)

ASSIGNED → PENDING (PROVIDER)

PENDING → ASSIGNED (SYSTEM)

ASSIGNED → IN_PROGRESS (PROVIDER)

IN_PROGRESS → COMPLETED (PROVIDER)



---

## API Endpoints

### Booking APIs

POST /api/bookings

GET /api/bookings/:id

POST /api/bookings/:id/cancel



### Provider Workflow APIs
POST /api/bookings/:id/assign

POST /api/bookings/:id/accept

POST /api/bookings/:id/reject

POST /api/bookings/:id/complete



### Admin / Ops APIs

POST /api/bookings/:id/override


---

## Frontend Screens

### 1. Create Booking
- Customer creates a new booking

### 2. Booking Details
- View current booking status
- View complete event timeline

### 3. Admin Panel
- Override booking state
- Used for operational recovery and manual fixes

---

## Design Decisions & Trade-offs

- Authentication was intentionally skipped to keep focus on **core booking lifecycle**
- Provider dashboard was not built; provider behavior is simulated via APIs
- Emphasis was placed on:
  - correctness of state transitions
  - retry handling
  - failure scenarios
  - observability

---

## Future Improvements

- Provider authentication & dashboard
- Provider availability management
- Notifications (email / SMS)
- Pagination for booking history
- Role-based access control (RBAC)

---

## How to Run Locally

### Backend
```bash
cd backend
npm install
npm run dev
Frontend
bash
Copy code
cd frontend
npm install
npm run dev
```
Summary
This project demonstrates how to design and implement a real-world booking system with:

1.strict lifecycle management

2.failure handling

3.admin operations

4.complete observability through event logging
