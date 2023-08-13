import React, { useState } from "react";
import { ReactComponent as Logo } from "../../assets/miganzi.svg";
import { ReactComponent as Notification } from "../../assets/notification.svg";
import { ReactComponent as MyProfile } from "../../assets/myProfile.svg";
import { ReactComponent as HaveNotification } from "../../assets/haveNotification.svg";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const [isNotification, setIsNotification] = useState<boolean>(false);
  const isLoggedIn = !!localStorage.getItem("access_token");
  const navigate = useNavigate();

  const handleOnClick = (props: string) => {
    navigate(`/${props}`);
  };
  
  return (
    <div className="flex w-[100%] pb-4 flex-col items-center justify-center px-5 border-b-[1px] border-st-gray-03 mt-4">
      <div className="flex w-[90%] justify-between items-center ml-[25px]">
        <Logo />
        <div className="flex flex-row items-center">
          {isLoggedIn ? (
            <>
              <div
                className="w-[34px] cursor-pointer"
                onClick={() => handleOnClick("user")}
              >
                <MyProfile />
              </div>
              <div className="w-[34px] cursor-pointer ml-[5px]">
                {isNotification ? <HaveNotification /> : <Notification />}
              </div>
            </>
          ) : (
            <p
              className="cursor-pointer"
              onClick={() => handleOnClick("login")}
            >
              로그인
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
