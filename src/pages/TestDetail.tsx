import { useQuery } from "@tanstack/react-query";
import { checkToken } from "components/common/utils/checkAccessToken";
import useAuth from "hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDetail, postReIssue } from "services/apis/miganziService";

export default function TestDetail() {
  const [isAccessToken, setIsAccessToken] = useState(false);
  const { isUser } = useAuth();
  // const path = window.location.pathname;
  const { pathname } = useLocation();
  console.log(pathname);
  const getCheck = async () => {
    const response = await checkToken();
    if (response) {
      setIsAccessToken(response);
      console.log(" testpage mypage", response);
    }
  };
  useEffect(() => {
    getCheck();
    console.log(" testpage isUser", isUser);
    console.log(" testpage isAccessToken", isAccessToken);
  }, [pathname]);
  return (
    <div>
      <button>sdfsdf</button>
    </div>
  );
}
