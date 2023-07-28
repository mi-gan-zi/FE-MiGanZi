import React from "react";
import { HeaderIcon } from "assets/Icon";
const Header = () => {
  const currentTime = new Date().toTimeString().split(" ")[0].slice(0, 5);
  return (
    <>
      <div>
        <div className="">{currentTime}</div>
        <div>
          <HeaderIcon />
        </div>
      </div>
    </>
  );
};

export default Header;
