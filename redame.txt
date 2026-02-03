College Bus Trip Management – Backend API
Overview

This is a backend system designed to manage college bus trips with role-based access and consistency guarantees.
The system focuses on correctness under concurrent usage rather than UI or presentation.

It supports students joining/leaving trips, seat availability enforcement, and secure media uploads.

Core Features

Role-based access

Student, Admin roles with controlled actions

Trip Join & Leave

Prevents duplicate joins

Ensures seat count consistency

One student can join only one trip at a time

Atomic Operations

MongoDB transactions used for critical operations (join/leave)

File Uploads

User avatar upload

Images streamed directly to Cloudinary (no disk storage in production)

Centralized Error Handling

Consistent API error responses

Proper HTTP status codes

Tech Stack

Runtime: Node.js

Framework: Express.js

Database: MongoDB (Mongoose)

File Uploads: Multer + Cloudinary

Auth: JWT (if applicable)

Key Design Decisions
1. Why MongoDB Transactions?

When multiple students try to join a trip simultaneously, race conditions can occur.
Transactions are used to ensure:

Seat count is accurate

Duplicate joins are prevented

Partial writes never occur

2. Why Stream File Uploads?

Files are uploaded using memory storage and streamed directly to Cloudinary:

Avoids disk usage on the server

Prevents storage leaks

Suitable for production environments

3. Centralized Error Handling

All errors are handled through a common error handler to:

Avoid inconsistent responses

Make debugging predictable

Enforce correct HTTP status codes

API Flow (High Level)

Request
→ Middleware (auth, validation, upload)
→ Controller
→ Database / Cloudinary
→ Central error handler
→ Response

How to Run Locally

Clone the repository

Install dependencies

npm install


Create a .env file with required environment variables

Start the server

npm run dev

Known Limitations / Future Improvements

Rate limiting for abuse prevention

Pagination for large data sets

Caching for frequently accessed data

CI/CD and production deployment setup

Notes

This project prioritizes backend correctness, failure handling, and real-world constraints over UI or feature count.