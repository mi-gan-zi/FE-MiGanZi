import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LocalTokenRepository } from "repository/LocalTokenRepository";
import { AxioisClient } from "client/axios";
import { UserService } from "services/apis/user";
import { UserProvider } from "context/userContext";

const localTokenRepository = new LocalTokenRepository();
const axiosClient = new AxioisClient(
  `${process.env.REACT_APP_ENDPOIN}`,
  localTokenRepository.get()
);
const userService = new UserService(axiosClient);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <UserProvider userService={userService}>
    <App />
  </UserProvider>
);
