// import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Layout from "shared/Layout/Layout";

interface Iinfo {
  commentCount: number;
  content: string;
  createdDate: Date;
  id: number;
  imageUrl: string;
  modifiedDate: Date;
  nickname: string;
  title: string;
  userComments?: string[];
  viewCount: number;
}

export default function Main() {
  // const [infoArray, setInfoArray] = useState<Iinfo[]>([]);
  // const observerRef = useRef<IntersectionObserver>();
  // const boxRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   // getInfo();
  // }, []);

  // useEffect(() => {
  //   observerRef.current = new IntersectionObserver(intersectionObserver);
  //   boxRef.current && observerRef.current.observe(boxRef.current);
  // });

  // const getInfo = async () => {
  //   const response = await axios.get(
  //     `https://port-0-java-springboot-teo-backend-7xwyjq992lljba9lba.sel4.cloudtype.app/board`
  //   );

  //   // setInfoArray((curInfoArray) => [...curInfoArray, ...response.data]);
  //   setInfoArray(response.data);

  //   console.log(infoArray);
  //   console.log("ADD info data...");
  // };

  // const intersectionObserver = (
  //   entries: IntersectionObserverEntry[],
  //   io: IntersectionObserver
  // ) => {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting) {
  //       io.unobserve(entry.target);
  //       getInfo();
  //     }
  //   });
  // };

  // const [posts, setPosts] = useState<Iinfo[]>([]);
  // const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  // const page = useRef<number>(1);
  // const observerTargetEl = useRef<HTMLDivElement>(null);

  // const fetch = useCallback(async () => {
  //   try {
  //     // const { data } = await axios.get(
  //     //   `https://port-0-java-springboot-teo-backend-7xwyjq992lljba9lba.sel4.cloudtype.app/board`
  //     // );
  //     const test = await axios.get(
  //       `https://port-0-java-springboot-teo-backend-7xwyjq992lljba9lba.sel4.cloudtype.app/board`
  //     );
  //     setPosts((prevPosts) => [...prevPosts, ...test.data]);
  //     console.log(posts);
  //     // setHasNextPage(data.length === 10);
  //     console.log("ADD data...");
  //     // if (data.length) {
  //     //   page.current += 1;
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!observerTargetEl.current || !hasNextPage) return;

  //   const io = new IntersectionObserver((entries, observer) => {
  //     // if (entries[0].isIntersecting) {
  //     fetch();
  //     // }
  //   });
  //   io.observe(observerTargetEl.current);
  //   return () => {
  //     io.disconnect();
  //   };
  // }, []);

  // {infoArray.map((info, index) => {
  //   if (infoArray.length - 1 === index) {
  //     console.log("인포 !! " + info.imageUrl);
  //     return (
  //       <div ref={boxRef} key={index}>
  //         <table>
  //           <tbody>
  //             <tr>
  //               <td>이름</td>
  //             </tr>
  //             <tr>
  //               <td>전화번호</td>
  //             </tr>
  //           </tbody>
  //         </table>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="h-[70px]" key={index}>
  //         <p> dd</p>
  //         {/* <div key={index}> */}
  //         {/* <img src={info.imageUrl} alt="미술관사진"></img> */}
  //         {/* </div> */}
  //       </div>
  //     );
  //   }
  // })}

  // const [page, setPage] = useState(1);
  // const [load, setLoad] = useState(false);
  // const preventRef = useRef(true);
  // const endRef = useRef(false);
  // const [infoArray, setInfoArray] = useState<Iinfo[]>([]);
  // const observerRef = useRef(null);
  // const boxRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   getInfo();
  // }, [page]);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
  //   if (observerRef.current) observer.observe(observerRef.current);
  //   return () => {
  //     observer.disconnect();
  //   };
  // });

  // const obsHandler = (entries: any) => {
  //   const target = entries[0];
  //   if (!endRef.current && target.isIntersecting && preventRef.current) {
  //     preventRef.current = false;
  //     setPage((prev) => prev + 1);
  //   }
  // };

  // const getInfo = useCallback(async () => {
  //   setLoad(true);
  //   try {
  //     const response = await axios.get(
  //       `https://port-0-java-springboot-teo-backend-7xwyjq992lljba9lba.sel4.cloudtype.app/board`
  //     );
  //     if (response.data.end) {
  //       endRef.current = true;
  //       setInfoArray((curInfoArray) => [...curInfoArray, ...response.data]);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoad(false);
  //   }
  // }, [page]);

  return (
    <>
      <>
        <div className="text-[20px] h-[70px] border-b-2 flex items-center ml-[40px]">
          유저가 뽑은 베스트 아티클
        </div>
        <div className="flex flex-row text-[14px] ml-[40px] h-[21px]">
          <div>JUNE 26</div>
          <div>|</div>
          <div>조회수 26</div>
        </div>
        <div className="flex flex-row ml-[40px] h-[60px]">
          <img
            src="street1.jpg"
            alt="profile"
            className="w-[60px] h-[60px] rounded-full"
          ></img>
          <div className="flex items-center ml-[10px]">Miganzi</div>
        </div>
        <div className="ml-[40px] w-[350px] h-[467px]">
          {/* 이미지 들어갈 곳 - 내부에 지도, 태그, 텍스트 내용 최대 2줄.
          가로방향으로 스크롤 */}
          <img src="logo512.png" alt="img"></img>
        </div>
        <div className="flex justify-center text-[20px] h-[70px] items-center">
          새로 작성된 아티클을 확인해보세요
        </div>
        <div className="flex flex-row w-[390px] mb-[5px] justify-evenly">
          <img
            className="w-[126px] h-[169px]"
            src="street1.jpg"
            alt="img"
          ></img>
          <img
            className="w-[126px] h-[169px]"
            src="street2.jpg"
            alt="img"
          ></img>
          <img
            className="w-[126px] h-[169px]"
            src="street3.jpg"
            alt="img"
          ></img>
        </div>
        <div className="flex flex-row w-[390px] mb-[5px] justify-evenly">
          <img
            className="w-[126px] h-[169px]"
            src="street4.jpg"
            alt="img"
          ></img>
          <img
            className="w-[126px] h-[169px]"
            src="street5.jpg"
            alt="img"
          ></img>
          <img
            className="w-[126px] h-[169px]"
            src="street6.jpg"
            alt="img"
          ></img>
        </div>
      </>
    </>
  );
}
