import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Detail from "../pages/Detail";
import Search from "../pages/Search";
import SignIn from "../pages/SignIn";
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/Sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
