import React from "react";
import Footer from "./Footer";
import Header from "./Header";
// import backpng from "../../assets/backpng.png";
import backpng from "../../assets/background.png";
// import { ReactComponent as BackSVG } from "../../assets/background.svg";
import { url } from "inspector";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <div
        className="w-[1920px] h-[1080px] bg-center bg-cover bg-no-repeat flex items-center overflow-hidden "
        style={{
          backgroundImage: `url(${backpng})`,
          zIndex: -99,
          objectFit: "cover",
        }}
      >
        {/* <BackSVG className="w-full h-full -z-50 absolute inset-0 "></BackSVG> */}
        <div className="w-[390px] h-[844px] mx-auto  z-50 bg-st-white flex-col flex justify-between">
          <div className="overflow-y-scroll">
            <Header />
            <main>{props.children}</main>
          </div>
          <div>
            <Footer />
          </div>
        </div>
        {/* <div
        className="w-full h-full bg-st-gray-07 z-[-200px] absolute inset-0 "
        style={{
          zIndex: -200,
          minWidth: "100vw",
          // minHeight: "",
          backgroundSize: "contain",
        }}
      > */}
        {/* </BackSVG> */}
      </div>
    </>
  );
};

export default Layout;
