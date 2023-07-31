import Container from "components/create/Container";
import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();
  const { isUser } = useAuth();

  useEffect(() => {
    if (isUser === false) {
      navigate("/login");
    } else {
      navigate("/create");
    }
  }, [isUser]);
  return (
    <>
      <Container />
    </>
  );
}
