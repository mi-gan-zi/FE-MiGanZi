import MapComponent from "components/map/Map";
import { NicknameComponent } from "components/signin/NicknameComponent";
import SignInComponent from "components/signin/SignInComponent";
import React, { useState } from "react";

export default function SignIn() {
  const [status, setStatus] = useState<Number>(3);
  return (
    <>
      {status === 0 && <SignInComponent setStatus={setStatus} />}
      {status === 1 && <NicknameComponent />}
    </>
  );
}
