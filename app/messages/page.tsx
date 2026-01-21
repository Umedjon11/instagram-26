"use client";

import { getChats } from "@/reducers/mesage";
import { ChevronDown, Search, SquarePen } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Messages = () => {
  const { chats } = useSelector((state) => state.getChats);
  const dispatch = useDispatch();
  console.log(chats);

  useEffect(() => {
    dispatch(getChats());
  }, [dispatch]);
  return (
    <>
      <div className="w-[93%] ml-auto flex">
        <section className="w-[33%] p-1 h-100 mr-5">
          <section className="flex flex-col gap-5 mt-4">
            <article className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <h1 className="font-bold text-[20px]">ramziya</h1>
                <ChevronDown width={16} size={30} className="relative top-1" />
              </div>
              <SquarePen className="relative top-1" />
            </article>
            <article>
              <div className="relative p-[6px] bg-[#ebebeb6f]  border border-[#ebebeb6f] rounded-2xl">
                <Search
                  color="grey"
                  width={19}
                  style={{
                    position: "absolute",
                    left: 20,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-none border-none  bg-transparent w-full"
                  style={{ paddingLeft: "40px" }}
                />
              </div>
            </article>
            <article className="flex items-center justify-between">
              <h1 className="text-[#64748B] font-sold text-[16px]">Messages</h1>
              <span className="text-[#3B82F6]">Requests</span>
            </article>
            <article>
              {chats?.data?.map((e) => {
                return (
                  <>
                    <div key={e.id}>
                      <img className="w-20" src={`https://instagram-api.softclub.tj/images/${e.sendUserImage}`} alt="" />
                      <h1>{e.sendUserName}</h1>
                    </div>
                  </>
                );
              })}
            </article>
          </section>
        </section>

        <section className="w-full bg-[orange] h-100"></section>
      </div>
    </>
  );
};

export default Messages;
