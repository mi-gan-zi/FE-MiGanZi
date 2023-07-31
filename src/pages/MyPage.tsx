import { useEffect } from "react";
import { Container } from "components/myPage/Container";
import { localTokenRepoInstance } from "repository/LocalTokenRepository";
import { useLocation, useNavigate } from "react-router-dom";

export const MyPage = ({ isUser }: { isUser: string | null }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isUser) {
      navigate("/login");
    } else {
      navigate("/user");
    }
  }, [isUser]);
  return (
    <div>
      <Container />
    </div>
  );
};
