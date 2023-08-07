import React from "react";

export default function useAuth() {
  return;
}
// import { useCallback, useEffect, useState } from "react";
// import { localTokenRepoInstance } from "repository/LocalTokenRepository";
// import { postLogin } from "services/apis/miganziService";

// export default function useAuth() {
//   const [user, setUser] = useState("");
//   const [isUser, setIsUser] = useState<boolean>(false);

//   const login = async (nickName: string, password: string) => {
//     const formData = new FormData();
//     if (nickName && password) {
//       formData.append("nickname", nickName);
//       formData.append("password", password);
//       const response = await postLogin(formData);
//       setUser(response);
//     }
//     return nickName;
//   };
//   useEffect(() => {
//     const checkToken = async () => {
//       const hasToken = await localTokenRepoInstance.getAccess();
//       console.log(hasToken);
//       if (hasToken) {
//         return setIsUser(true);
//       } else if (!hasToken) {
//         return setIsUser(false);
//       }
//     };
//     checkToken();
//   }, [isUser]);
//   console.log(isUser);
//   return { user, login, isUser };
// }
