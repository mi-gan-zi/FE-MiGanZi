import Header from "components/signin/Header";
import { SignUp } from "components/signin/SignUpComponent";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <>
      <Header />
      <SignUp />
    </>
  );
}
