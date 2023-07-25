import { useAxios } from "context/AxiosContext";
import React, { useEffect } from "react";

export default function TestDetail() {
  const axiosClient = useAxios();
  const getPost = async () => {
    try {
      const url = `user/board/${1}`;
      const res = await axiosClient.axios(url);
      console.log(res);
    } catch (err) {
      console.log("Error:", err);
    }
  };
  useEffect(() => {
    getPost();
  }, []);
  return <div>ddsfdf</div>;
}
