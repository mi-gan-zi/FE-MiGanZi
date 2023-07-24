import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <div className="bg-st-white w-[390px]  mx-auto overflow-y-scroll ">
      <div className="overflow-y-scroll h-screen bg-st-gray-09">
        <Header />
        <div className="h-[60px]"></div>
        <main className="">{props.children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
