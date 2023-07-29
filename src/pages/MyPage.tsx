import { checkToken } from "components/common/utils/checkAccessToken";
import { Container } from "components/myPage/Container";
import useAuth from "hooks/useAuth";
import React, { useEffect } from "react";
import { localTokenRepoInstance } from "repository/LocalTokenRepository";

export const MyPage = () => {
  // const { isUser } = useAuth();
  // console.log(isUser);

  return (
    <div>
      <Container />
    </div>
  );
};
