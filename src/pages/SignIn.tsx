import { NicknameComponent } from "components/signin/NicknameComponent";
import SignInComponent from "components/signin/SignInComponent";
import React, { useState } from "react";
import Footer from "shared/Layout/Footer";
import Header from "shared/Layout/Header";

export default function SignIn() {
  const [status, setStatus] = useState<Number>(0);
  return (
    <>
      {/* <Header /> */}
      {status === 0 && <SignInComponent setStatus={setStatus} />}
      {status === 1 && <NicknameComponent />}
      {/* <Footer /> */}
    </>
  );
}
