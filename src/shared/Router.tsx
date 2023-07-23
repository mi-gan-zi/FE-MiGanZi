import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Detail from "../pages/Detail";
import Search from "../pages/Search";
import SignIn from "../pages/SignIn";
import Create from "../pages/Create";
import Layout from "./Layout/Layout";
import SignUp from "../pages/SignUp";
import { MyPage } from "pages/MyPage";
import { ChangeNickname } from "components/myPage/ChangeNickname";
export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create" element={<Create />} />
          <Route path="/user/:id" element={<MyPage />} />
          <Route path="/nickname/:id" element={<ChangeNickname />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
