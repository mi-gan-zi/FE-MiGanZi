import { useEffect } from "react";
import { Container } from "components/myPage/Container";
import { localTokenRepoInstance } from "repository/LocalTokenRepository";
import { useLocation, useNavigate } from "react-router-dom";

export const MyPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const hasToken = localStorage.getItem("access_token");
  useEffect(() => {
    if (!hasToken) {
      navigate("/login");
    } else {
      navigate("/user");
    }
  }, [hasToken]);
  return (
    <div>
      <Container />
    </div>
  );
};
