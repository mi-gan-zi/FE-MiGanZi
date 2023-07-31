import Container from "components/create/Container";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();
  const hasToken = localStorage.getItem("access_token");
  useEffect(() => {
    if (!hasToken) {
      navigate("/login");
    } else {
      navigate("/create");
    }
  }, [hasToken]);

  return <Container />;
}
