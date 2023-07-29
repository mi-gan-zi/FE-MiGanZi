import { Container } from "components/myPage/Container";
import useAuth from "hooks/useAuth";
import React, { useEffect } from "react";

export const MyPage = () => {
  const { isUser } = useAuth();
  useEffect(() => {}, []);
  return (
    <div>
      <Container />
    </div>
  );
};
