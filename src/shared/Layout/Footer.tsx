import { useLocation, useNavigate } from "react-router-dom";
import {
  main,
  search,
  upload,
  user,
  hoMain,
  hoSearch,
  hoUpload,
  hoUser,
} from "assets/footerListIcon/index";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const footerList = [
    {
      path: "/",
      name: "메인",
      img: `${main}`,
      hoverImg: `${hoMain}`,
    },
    {
      path: "/search",
      name: "검색",
      img: `${search}`,
      hoverImg: `${hoSearch}`,
    },
    {
      path: "/create",
      name: "업로드",
      img: `${upload}`,
      hoverImg: `${hoUpload}`,
    },
    {
      path: "/user",
      name: "마이페이지",
      img: `${user}`,
      hoverImg: `${hoUser}`,
    },
  ];

  return (
    <ul className="flex">
      {footerList.map((listItem, idx) => (
        <li key={idx} className="h-[6rem] bg-st-gray-03 ">
          <div
            onClick={() => {
              navigate(`${listItem.path}`);
            }}
          >
            <img
              src={
                path === listItem.path
                  ? `${listItem.hoverImg}`
                  : `${listItem.img}`
              }
              alt="main"
            />
            <div>{listItem.name}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Footer;
