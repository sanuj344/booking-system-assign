🏠 On-Demand Home Services – Booking Lifecycle System

Overview
This project implements the core booking lifecycle for an on-demand home services marketplace, where customers create bookings and service providers fulfill them.
The focus of this assignment is backend correctness, state management, failure handling, and observability, rather than full-scale UI or authentication.


Tech Stack

1)Frontend

React (Vite)
Axios
React Router
CSS (custom, no UI library)

2)Backend

Node.js
Express.js
MongoDB (Mongoose)


Core Concepts
Booking as a State Machine

A booking is modeled as a finite state machine to prevent invalid transitions.

States

PENDING → ASSIGNED → IN_PROGRESS → COMPLETED
PENDING → CANCELLED
ASSIGNED → CANCELLED
ASSIGNED → FAILED
State transitions are strictly validated at the backend.


Booking Lifecycle
1. Create Booking (Customer)

Customer creates a booking
Initial state: PENDING
Event logged: null → PENDING

2. Provider Assignment (System)

System automatically assigns a provider
State: PENDING → ASSIGNED
If provider rejects, retry logic assigns next provider

3. Provider Workflow (Accept / Reject)

Providers can:
Accept a booking → ASSIGNED → IN_PROGRESS
Reject a booking → ASSIGNED → PENDING
Reject is not allowed after acceptance

Provider actions are simulated via API calls rather than a full provider UI to keep scope focused on lifecycle behavior.

4. Completion

Provider completes service
State: IN_PROGRESS → COMPLETED

5. Failures & Cancellations

Customer / Provider cancellation
Provider no-show
System marks booking as FAILED

6. Admin / Ops Override

Admin can manually override booking state
Every override is logged as an ADMIN event

Observability (Event Logging)

Every state change creates a BookingEvent record.

This provides:
Full audit trail
Debugging support
Ops visibility
Example Event Timeline

null → PENDING        (CUSTOMER)
PENDING → ASSIGNED    (SYSTEM)
ASSIGNED → PENDING    (PROVIDER)
PENDING → ASSIGNED    (SYSTEM)
ASSIGNED → IN_PROGRESS (PROVIDER)
IN_PROGRESS → COMPLETED (PROVIDER)

API Endpoints

Booking

POST   /api/bookings
GET    /api/bookings/:id
POST   /api/bookings/:id/cancel

Provider (Workflow APIs)

POST   /api/bookings/:id/assign
POST   /api/bookings/:id/accept
POST   /api/bookings/:id/reject
POST   /api/bookings/:id/complete

Admin / Ops

POST   /api/bookings/:id/override


Frontend Screens

Create Booking

Customer creates a booking

Booking Details

View current status
View full event timeline

Admin Panel

Override booking state
Used for operational intervention

Future Improvements

Provider authentication & dashboard
Provider availability management
Notifications (email / SMS)
Pagination for booking history
Role-based access control

How to Run Locally
Backend

cd backend
npm install
npm run dev

Frontend

cd frontend
npm install
npm run dev

Summary

This project demonstrates how to design and implement a real-world booking system with:

Robust lifecycle management
Failure handling
Admin operations
Full observability



















