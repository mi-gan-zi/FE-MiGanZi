import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Layout from "shared/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { LocalTokenRepository } from "repository/LocalTokenRepository";
import { Client } from "client/axios";

// dotenv.config();
const endpoint = process.env.REACT_APP_ENDPOINT;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const localTokenRepository = new LocalTokenRepository();
const client = new Client(endpoint!, localTokenRepository);
root.render(
  <App />
  // <React.StrictMode>
  // </React.StrictMode>
);
