import React from "react";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
// import Header from "./Header";

const Layout = () => {
  return (
    <div className="bg-st-white w-[390px] h-screen  mx-auto">
      <div className="overflow-y-scroll  scroll h-screen pb-28">
        {/* <Header /> */}
        <main>
          <Outlet />
        </main>
      </div>
      <div className="fixed bottom-0 w-[390px]  bg-st-white pt-2">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
