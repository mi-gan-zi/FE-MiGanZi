import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getDetail } from "services/apis/mianziService";

export default function TestDetail() {
  const { data, isLoading } = useQuery({
    queryKey: ["board"],
    queryFn: () => getDetail("1"),
  });
  useEffect(() => {}, []);
  return <div>ddsfdf</div>;
}
