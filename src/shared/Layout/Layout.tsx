import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import background from "../../assets/background.png";
import { url } from "inspector";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <div
        className="w-[1920px] h-[1080px] bg-center bg-cover bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${background})`, zIndex: -99 }}
      >
        <div className="w-[390px] mx-auto border z-10 bg-st-white">
          {/* <Header /> */}
          <main>{props.children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
