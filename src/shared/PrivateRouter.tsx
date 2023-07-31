import { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ isUser }: { isUser: string | null }) {
  const { pathname } = useLocation();
  if (pathname === "/create" || pathname === "/user") {
    return isUser ? <Outlet /> : <Navigate to="/login" replace />;
  } else {
    return <Outlet />;
  }
}

export default PrivateRoute;
