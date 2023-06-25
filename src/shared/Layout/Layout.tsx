import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import background from "../../assets/background.png";
import { url } from "inspector";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <div
        className="w-full h-full bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${background})`, zIndex: -99 }}
      >
        <div className="w-[390px] mx-auto border z-10 bg-st-white">
          <Header />
          <main>{props.children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
