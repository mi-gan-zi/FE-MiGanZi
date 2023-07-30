import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Main,
  Detail,
  Search,
  SignIn,
  Create,
  Layout,
  SignUp,
  TestDetail,
} from "pages/index";
import { MyPage } from "pages/MyPage";
import { ChangeNickname } from "components/myPage/ChangeNickname";
import { ChangePassword } from "components/myPage/ChangePassword";
import { DeleteUser } from "components/myPage/DeleteUser";
import { MyPosts } from "components/myPage/MyPosts";
import { MyComents } from "components/myPage/MyComents";
import { Alarm } from "pages/Alarm";
import { useEffect, useState } from "react";
import PrivateRoute from "./PrivateRouter";

export default function Router() {
  const [isAccessToken, setIsAccessToken] = useState(false);
  const path = window.location.pathname;
  const getCheck = async () => {};
  useEffect(() => {
    getCheck();
  }, [path, isAccessToken, setIsAccessToken]);
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/testde" element={<TestDetail />} />
            <Route path="/" element={<Main />} />
            <Route
              path="/detail/:id"
              element={<Detail isAccessToken={isAccessToken} />}
            />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/create" element={<Create />} />
            <Route path="/user" element={<MyPage />} />
            <Route path="/nickname" element={<ChangeNickname />} />
            <Route path="/password" element={<ChangePassword />} />
            <Route path="/delete" element={<DeleteUser />} />
            <Route path="/myposts" element={<MyPosts />} />
            <Route path="/mycommets" element={<MyComents />} />
            <Route path="/alarms" element={<Alarm />} />
            <Route path="*" element={<Main />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
//expier를 체킹하는 로직을 따로 만들어야함
