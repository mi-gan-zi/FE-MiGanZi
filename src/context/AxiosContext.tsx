import React, { createContext, useContext } from "react";
import { AxiosClient } from "services/axiosClient/axios";
const AxiosContext = createContext<AxiosClient>(
  new AxiosClient(process.env.REACT_APP_ENDPOINT)
);

export function AxiosProvider({ children }: { children: React.ReactNode }) {
  const baseURL = process.env.REACT_APP_ENDPOINT;
  const axiosClient = new AxiosClient(baseURL);

  return (
    <AxiosContext.Provider value={axiosClient}>
      {children}
    </AxiosContext.Provider>
  );
}

export function useAxios(): AxiosClient {
  return useContext(AxiosContext);
}
