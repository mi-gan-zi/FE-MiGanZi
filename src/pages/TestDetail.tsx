import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getBoard } from "services/apis/getAPIs";

export default function TestDetail() {
  const { data, isLoading } = useQuery({
    queryKey: ["board"],
    queryFn: () => getBoard("1"),
  });
  console.log(data);
  console.log(isLoading);
  useEffect(() => {}, []);
  return <div>test page</div>;
}
