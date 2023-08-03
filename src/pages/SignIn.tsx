import MapMark from "components/common/map/MapMark";
import SignInComponent from "components/signin/SignInComponent";
import React, { useEffect, useState } from "react";
import Footer from "components/common/Layout/Footer";
import Header from "components/signin/Header";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (isUser) {
  //     navigate("/");
  //   }
  // }, []);
  return (
    <>
      <Header />
      <SignInComponent />
    </>
  );
}
