import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <div className="bg-st-white w-[390px]  mx-auto overflow-y-scroll ">
      <Header />
      <div className="overflow-y-scroll  h-screen bg-st-gray-09 scroll">
        <div className="h-[60px]"></div>
        <main>{props.children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
