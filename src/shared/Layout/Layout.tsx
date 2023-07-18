import React from "react";
import Footer from "./Footer";
import Header from "./Header";
// import backpng from "../../assets/backpng.png";
import backpng from "../../assets/background.png";
// import { ReactComponent as BackSVG } from "../../assets/background.svg";
import { url } from "inspector";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <div className="bg-st-white w-[390px] h-[800px] mx-auto overflow-y-scroll flex-col justify-between rounded-3xl relative top-[25px]">
      <div className="overflow-y-scrokll relative">
        <Header />
        <div className="h-[60px]"></div>
        <main>{props.children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
/**
 * 1. width 사이즈가 390일 때 Header hidden
 * 2.
 */
