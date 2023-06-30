import Container from "components/create/Container";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  return <Container />;
}
