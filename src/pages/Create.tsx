import Container from "components/create/Container";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Create({ isUser }: { isUser: string | null }) {
  const navigate = useNavigate();
  const hasToken = localStorage.getItem("access_token");
  console.log(hasToken);
  useEffect(() => {
    if (!hasToken) {
      navigate("/login");
    } else {
      navigate("/create");
    }
  }, [hasToken]);
  return <Container />;
}
