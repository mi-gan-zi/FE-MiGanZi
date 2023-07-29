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
import useAuth from "hooks/useAuth";
export default function Router() {
  const { isUser } = useAuth();
  console.log(isUser);
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
          <Route path="/create" element={isUser ? <Create /> : <SignIn />} />
          <Route path="/user" element={isUser ? <MyPage /> : <SignIn />} />
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
//expier를 체킹하는 로직을 따로 만들어야함