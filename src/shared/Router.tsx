import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Main from "pages/Main";
// import Detail from "pages/Detail";
// import Search from "pages/Search";
// import SignIn from "pages/SignIn";
// import Create from "pages/Create";
// import Layout from "components/common/Layout/Layout";
// import SignUp from "pages/SignUp";
// import TestDetail from "pages/TestDetail";
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
export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/testde" element={<TestDetail />} />
          <Route path="/" element={<Main />} />
          <Route path="/detail/:id" element={<Detail />} />
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
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
