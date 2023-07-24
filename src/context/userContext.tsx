import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Apis } from "services/apis/apis";
const UserContext = createContext<any>(null);
export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
  Apis: Apis;
}

export function UserProvider({ children, Apis }: UserProviderProps) {
  const [userData, setUserData] = useState<any>({});
  const [createData, setCreateData] = useState<any>({});
  // const hasPageNum = (page:) => {
  //   setGetPageNum(getPageNum);
  //   console.log(getPageNum);
  // };
  useEffect(() => {
    Apis.createPost(createData).then(setUserData);
  }, []);
  return (
    <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
  );
}
