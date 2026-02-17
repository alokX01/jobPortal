# 🚀 JobPortal – Full Stack MERN Job Portal

A production-ready **MERN Stack Job Portal Application** where candidates can explore & apply for jobs, and recruiters can post and manage jobs and companies.

🌐 **Live Frontend:** https://job-portal-pink-pi.vercel.app  

---

## ✨ Features

### 👤 Authentication & Authorization
- JWT-based authentication
- HTTP-only secure cookies
- Role-based access control (Candidate / Recruiter)
- Protected routes using middleware

### 🧑‍💼 Candidate Flow
- Signup / Login / Logout
- Browse all available jobs (public access supported)
- View job details
- Apply to jobs
- Track applied jobs

### 🏢 Recruiter Flow
- Create & manage company profiles
- Post new jobs
- Update & delete jobs
- View applicants

### 🔒 Security
- Middleware-based route protection
- Secure JWT implementation
- CORS configuration with credentials support
- Environment-based config system
- Cloudinary file upload integration

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Authentication
- JWT + HTTP-only cookies

### File Upload
- Cloudinary

### Deployment
- Frontend → Vercel  
- Backend → Railway  
- Database → MongoDB Atlas  

---

jobPortal/
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── redux/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── .env.example
│   └── package.json
│
├── .env.example
├── package.json
└── README.md


## ⚙️ Environment Variables

### Backend (.env)

PORT=8000  
MONGO_URI=your_mongodb_connection_string  
SECRET_KEY=your_jwt_secret  
NODE_ENV=development  
FRONTEND_URL=http://localhost:5173  
CLOUD_NAME=your_cloudinary_cloud_name  
API_KEY=your_cloudinary_api_key  
API_SECRET=your_cloudinary_api_secret  

---

### Frontend (frontend/.env)

VITE_API_BASE_URL=http://localhost:8000/api/v1  

---

### Production Frontend (Vercel)

VITE_API_BASE_URL=https://your-backend.up.railway.app/api/v1  

---

## 🖥 Local Setup

### 1️⃣ Clone the repository

git clone https://github.com/alokX01/jobPortal.git  
cd jobPortal  

### 2️⃣ Install dependencies

npm install  
npm install --prefix frontend  

### 3️⃣ Add Environment Files

Create `.env` in root  
Create `.env` in `frontend/`  

### 4️⃣ Run Development Servers

npm run dev  

Frontend → http://localhost:5173  
Backend → http://localhost:8000  

---

## 🔌 API Base Path

All backend routes are prefixed with:

/api/v1  

Main Route Groups:

/api/v1/user/*  
/api/v1/job/*  
/api/v1/company/*  
/api/v1/application/*  

---

## 🚀 Deployment Guide

### Backend (Railway)

1. Connect GitHub repo  
2. Add environment variables  
3. Start command: npm run start  
4. Set FRONTEND_URL to Vercel domain  
5. Deploy  

---

### Frontend (Vercel)

1. Set root directory → frontend  
2. Build command → npm run build  
3. Output directory → dist  
4. Add env variable → VITE_API_BASE_URL  
5. Redeploy  

---

## 🔐 Security Notes

- Never commit .env files  
- Rotate exposed secrets  
- Use strong JWT secret  
- Restrict CORS origins  

---

## 👨‍💻 Author

Alok Kumar  
GitHub: https://github.com/alokX01  

---

⭐ If you like this project, give it a star!
