# Job Portal

Full-stack job portal built with React, Express, MongoDB, Redux, and Cloudinary.

## Project Structure

```text
job-portal/
  backend/
    controllers/
    middlewares/
    models/
    routes/
    utils/
    index.js
  frontend/
    src/
    public/
    package.json
  .env.example
  package.json
```

## Tech Stack

- Frontend: React + Vite + Redux + Tailwind/shadcn UI
- Backend: Node.js + Express + JWT + Multer
- Database: MongoDB (Mongoose)
- File Storage: Cloudinary

## Environment Variables

Create `.env` in project root and use `.env.example` as template.

## Local Setup

Install dependencies:

```bash
npm install
npm install --prefix frontend
```

Run backend:

```bash
npm run dev
```

Run frontend:

```bash
npm run dev --prefix frontend
```

## Deploy Notes

- Frontend recommended on Vercel (`frontend` as root directory).
- Backend can stay on Render/Railway.
- Set frontend env:

```env
VITE_API_BASE_URL=https://your-backend-domain/api/v1
```

- Set backend env:

```env
NODE_ENV=production
FRONTEND_URL=https://your-vercel-domain.vercel.app
```

- In Vercel project settings:
1. Root Directory: `frontend`
2. Framework Preset: `Vite`
3. Build Command: `npm run build`
4. Output Directory: `dist`

## Security Improvements Included

- Route-level auth + role checks
- ObjectId validation for sensitive routes
- Ownership checks for recruiter resources
- Safe update payload handling
- Multer file type and size restrictions
