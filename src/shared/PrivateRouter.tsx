import useAuth from "hooks/useAuth";
import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { localTokenRepoInstance } from "repository/LocalTokenRepository";

function PrivateRoute() {
  const { isUser } = useAuth();
  const { pathname } = useLocation();
  const [isToken, setIsToken] = useState<string | null>(null); // 초기 상태를 null로 설정

  const hasAccessToken = async () => {
    try {
      const response = await localTokenRepoInstance.getAccess();
      setIsToken(response);
    } catch (error) {
      setIsToken(null);
    }
  };

  useEffect(() => {
    hasAccessToken();
  }, []);

  if (pathname === "/create" || pathname === "/user") {
    return isToken ? <Outlet /> : <Navigate to="/login" replace />;
  } else {
    return <Outlet />;
  }
}

export default PrivateRoute;
