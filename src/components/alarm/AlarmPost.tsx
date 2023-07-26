import useIntersectionObserver from "hooks/useIntersectionObserver";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import createAxiosInstance from "utils/axiosConfig";
import { ReactComponent as Pre } from "../../assets/pre.svg";
import { ReactComponent as NonImage } from "../../assets/non_image.svg";
import { AlarmComponent } from "components/common/alarm/AlarmComponet";

export const AlarmPost = () => {
  const [alarms, setAlarms] = useState<any>("");
  const [pageNumber, setPageNumber] = useState(0);
  const [checkLast, setcheckLast] = useState<boolean>();
  const navigate = useNavigate();
  const axios = createAxiosInstance();

  const getAlarms = async () => {
    const res = await axios.get("pubsub/user-alert");

    const newPosts = res.data.data.content;
    setAlarms((prevPosts: any) => Array.from(prevPosts || []).concat(newPosts));
    setPageNumber((prevPage) => prevPage + 1);
    setcheckLast(res.data.data.last);
    return newPosts;
  };

  const target = useIntersectionObserver(async (entry: any, observer: any) => {
    await getAlarms();
  });

  useEffect(() => {
    getAlarms();
  }, []);

  return (
    <div className="px-5">
      <div className="w-full h-[62px] px-4 py-5 flex gap-[10px] border-b-2 border-st-gray-03">
        <Pre onClick={() => navigate(-1)} className="cursor-pointer" />
        <p className="text-xl font-semibold">알림</p>
      </div>
      {alarms.length < 1 && (
        <div className="w-full h-[560px] flex flex-col items-center justify-center">
          <NonImage />
          <div className="h-[75px] flex flex-col items-center justify-between">
            <p className="text-st-gray-08 text-lg font-semibold">
              새로운 알림이 없어요.
            </p>
            <p className="text-st-gray-06 text-base font-medium">
              미(간)지를 천천히 둘러보세요
            </p>
          </div>
        </div>
      )}
      {alarms.length > 1 &&
        alarms?.map((alarm: any, i: number) => {
          return <AlarmComponent key={i} post={alarm} />;
        })}
    </div>
  );
};
