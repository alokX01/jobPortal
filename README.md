# JobPortal

A full-stack MERN Job Portal application where users can register, log in, explore jobs, apply to jobs, and recruiters/admins can post and manage jobs/companies.

Live Frontend: https://job-portal-pink-pi.vercel.app

---

## Tech Stack

- Frontend: React, Vite, Redux Toolkit, Axios, Tailwind CSS
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Auth: JWT + HTTP-only cookies
- Media/File Upload: Cloudinary
- Deployment:
  - Frontend: Vercel
  - Backend: Railway
  - Database: MongoDB Atlas

---

## Main Features

- User signup/login/logout
- Role-based access (candidate/recruiter/admin style flows)
- Protected routes for authorized users only
- Job listing and job details
- Apply to jobs
- Recruiter job posting and management
- Company creation and management
- Secure middleware-based auth checks
- CORS + cookie-based cross-origin support

---

## Project Structure

```bash
jobPortal/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── redux/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── .env.example
│   └── package.json
├── .env.example
├── package.json
└── README.md
--------------------------------------------

Environment Variables
Create .env in project root (backend env):

PORT=8000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret


Create frontend/.env:
VITE_API_BASE_URL=http://localhost:8000/api/v1


Production frontend env (Vercel):

VITE_API_BASE_URL=https://your-railway-backend-domain/api/v1

Local Setup
1. Clone repo

git clone https://github.com/alokX01/jobPortal.git
cd jobPortal


2. Install dependencies
npm install
npm install --prefix frontend
3. Add env files
Root: .env
Frontend: frontend/.env
4. Run backend
npm run dev

Frontend runs on http://localhost:5173
Backend runs on http://localhost:8000


API Base Path
All backend routes are under:

/api/v1
Example groups:

/api/v1/user/*
/api/v1/job/*
/api/v1/company/*
/api/v1/application/*

Deployment Guide
Backend on Railway
Connect GitHub repo alokX01/jobPortal
Keep root directory as repo root (or set correctly if using custom)
Add service variables (same as backend .env)
Start command:
npm run start
Ensure FRONTEND_URL is your Vercel domain (exact URL)
Deploy and copy backend domain
Example backend URL:
https://your-backend.up.railway.app


Frontend on Vercel
Import same GitHub repo
Recommended root directory: frontend
Build command: npm run build
Output directory: dist
Add env variable:
VITE_API_BASE_URL=https://your-backend.up.railway.app/api/v1
Redeploy

Common Issues & Fix
Mongoose uri undefined:
MONGO_URI missing or wrong in backend env.
CORS blocked:
FRONTEND_URL in backend must match actual frontend domain exactly.
User not authenticated:
Login cookie not set or cross-origin cookie config mismatch.
Confirm frontend calls correct backend URL (VITE_API_BASE_URL).
vite not recognized:
run npm install --prefix frontend first.
Security Notes
Never commit real .env secrets.
Keep .env in .gitignore.
Rotate secrets if exposed.
Use strong JWT secret and limited CORS origins.
Built secure role-based MERN platform with JWT auth and protected APIs.
Implemented recruiter/candidate workflows (job posting + applying).
Deployed production frontend and backend on separate cloud platforms.
Managed environment-based configuration and cross-origin cookie auth.


Author
Alok Kumar
GitHub: https://github.com/alokX01
