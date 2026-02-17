# 🚀 JobPortal – Full Stack MERN Job Portal

A production-ready **MERN Stack Job Portal Application** where candidates can explore & apply for jobs, and recruiters can post and manage jobs and companies.

🌐 **Live Demo:** https://job-portal-pink-pi.vercel.app  

---

## ✨ Features

### 👤 Authentication & Authorization
- JWT-based authentication
- HTTP-only secure cookies
- Role-based access control (Candidate / Recruiter)
- Protected routes using middleware

### 🧑‍💼 Candidate Features
- Signup / Login / Logout
- Browse jobs (public access supported)
- View detailed job descriptions
- Apply to jobs
- Track applied jobs

### 🏢 Recruiter Features
- Create and manage companies
- Post new jobs
- Edit / Delete jobs
- View applicants

### 🔒 Security
- Middleware-based route protection
- Secure JWT implementation
- CORS configuration with credentials support
- Environment-based configuration
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

## 📁 Project Structure

```bash
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
│   │
│   ├── .env.example
│   └── package.json
│
├── .env.example
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (.env)

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

---

### Frontend (frontend/.env)

```
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

---

### Production (Vercel Frontend Env)

```
VITE_API_BASE_URL=https://your-backend.up.railway.app/api/v1
```

---

## 🖥 Local Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/alokX01/jobPortal.git
cd jobPortal
```

### 2️⃣ Install Dependencies

```bash
npm install
npm install --prefix frontend
```

### 3️⃣ Add Environment Files

- Create `.env` in root (backend)
- Create `.env` inside `frontend/`

### 4️⃣ Run Development Server

```bash
npm run dev
```

Frontend → http://localhost:5173  
Backend → http://localhost:8000  

---

## 🔌 API Base Path

All backend routes are prefixed with:

```
/api/v1
```

### Main Route Groups

- `/api/v1/user/*`
- `/api/v1/job/*`
- `/api/v1/company/*`
- `/api/v1/application/*`

---

## 🚀 Deployment Guide

### Backend (Railway)

1. Connect GitHub repository  
2. Add environment variables (same as backend .env)  
3. Start command:

```bash
npm run start
```

4. Set `FRONTEND_URL` to your Vercel domain  
5. Deploy & copy backend URL  

Example:

```
https://your-backend.up.railway.app
```

---

### Frontend (Vercel)

1. Import GitHub repo  
2. Set root directory → `frontend`  
3. Build command:

```bash
npm run build
```

4. Output directory → `dist`  
5. Add env variable:

```
VITE_API_BASE_URL=https://your-backend.up.railway.app/api/v1
```

6. Redeploy  

---

## 🧠 Common Issues & Fixes

| Problem | Solution |
|----------|----------|
| Mongoose URI undefined | Check `MONGO_URI` in backend env |
| CORS blocked | Ensure `FRONTEND_URL` matches exact frontend domain |
| Login not working | Verify cookies & credentials config |
| vite not recognized | Run `npm install --prefix frontend` |

---

## 🔐 Security Notes

- Never commit `.env` files
- Rotate exposed secrets immediately
- Use strong JWT secret
- Restrict CORS to trusted origins only
- Enable secure cookie settings in production

---

## 💡 Key Learning Outcomes

- Implemented secure role-based authentication
- Built recruiter and candidate workflows
- Managed cross-origin cookie authentication
- Deployed frontend & backend on separate cloud platforms
- Handled production-level environment configuration

---

## 👨‍💻 Author

**Alok Kumar**  
GitHub: https://github.com/alokX01  

---

⭐ If you like this project, consider giving it a star!
