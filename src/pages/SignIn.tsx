import MapMark from "components/common/map/MapMark";
import { NicknameComponent } from "components/signin/NicknameComponent";
import SignInComponent from "components/signin/SignInComponent";
import React, { useEffect, useState } from "react";
import Footer from "shared/Layout/Footer";
import Header from "components/signin/Header";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Header />
      <SignInComponent />
    </>
  );
}
