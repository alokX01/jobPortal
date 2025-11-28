import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Not logged in → redirect to login
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    // Wrong role → redirect to home
    if (allowedRole && user.role !== allowedRole) {
      navigate("/", { replace: true });
      return;
    }

    // All good → Done checking
    setChecking(false);
  }, [user, allowedRole, navigate]);

  // Small loader to prevent blank screen flash
  if (checking) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-blue-600 font-semibold">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
