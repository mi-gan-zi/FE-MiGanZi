import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getDetail, postReIssue } from "services/apis/miganziService";

export default function TestDetail() {
  const { data, isLoading } = useQuery({
    queryKey: ["board"],
    queryFn: () => getDetail("1"),
  });
  const handle = async () => {
    const res = await postReIssue(
      "eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTY5MDQzNDQxMiwiZXhwIjoxNjkzMDI2NDEyfQ.rmyrn9LPBqC0S3xR4c2KmPJpDfIHcUVsvKABkHlLqJk"
    );
    console.log(res);
  };

  useEffect(() => {}, []);
  return (
    <div>
      <button onClick={handle}>sdfsdf</button>
    </div>
  );
}
