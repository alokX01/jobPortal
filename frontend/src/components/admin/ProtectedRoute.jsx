import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsAllowed(false);
      setChecking(false);
      navigate("/login", { replace: true });
      return;
    }

    if (allowedRole && user.role !== allowedRole) {
      setIsAllowed(false);
      setChecking(false);
      navigate("/", { replace: true });
      return;
    }

    setIsAllowed(true);
    setChecking(false);
  }, [allowedRole, navigate, user]);

  if (checking) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-blue-600 font-semibold">
        Checking access...
      </div>
    );
  }

  if (!isAllowed) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
