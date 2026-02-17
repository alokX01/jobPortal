import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import EditJob from "./components/admin/EditJob";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/description/:id", element: <JobDescription /> },
  { path: "/browse", element: <Browse /> },
  { path: "/profile", element: <Profile /> },

  // We keep admin URLs behind recruiter check.
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute allowedRole="recruiter">
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute allowedRole="recruiter">
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute allowedRole="recruiter">
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute allowedRole="recruiter">
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute allowedRole="recruiter">
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute allowedRole="recruiter">
        <Applicants />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/edit",
    element: (
      <ProtectedRoute allowedRole="recruiter">
        <EditJob />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
