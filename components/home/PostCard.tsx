"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { getPosts } from "../../reducers/home";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import {
  Heart,
  MessageCircle,
  SendHorizontal,
  Bookmark,
  Ellipsis,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function PostCard() {
  const { data } = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="w-[630px] flex flex-col gap-2 mx-auto">
      {data?.map((e: any) => (
        <div key={e.postId}>

          <header className="flex items-center justify-between h-[56px]">
            <div className="flex items-center gap-3">
              <img
                src={
                  e.userImage
                    ? `https://instagram-api.softclub.tj/images/${e.userImage}`
                    : "/homePage.jpg"
                }
                className="w-8 h-8 rounded-full object-cover"
                alt="avatar"
              />
              <div className="flex flex-col leading-5">
                <span className="text-[17px] font-semibold cursor-pointer">
                  {e.userName}
                </span>
                <span>
                  {e.title}
                </span>
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Ellipsis size={24} className="cursor-pointer" />
              </DialogTrigger>

              <DialogContent className="w-[300px] bg-gray-800 text-white rounded-2xl p-2 shadow-lg">
                <div className="flex flex-col gap-1">
                  <button className="w-full py-3 px-4 text-left font-semibold rounded-lg hover:bg-gray-700 transition">
                    Complain
                  </button>
                  <button className="w-full py-3 px-4 text-left rounded-lg hover:bg-gray-700 transition">
                    Share
                  </button>
                  <button className="w-full py-3 px-4 text-left rounded-lg hover:bg-gray-700 transition">
                    Copy Link
                  </button>
                  <button className="w-full py-3 px-4 text-left rounded-lg hover:bg-gray-700 transition">
                    Save
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </header>

          {e.images.length === 1 ? (
            <img
              src={`https://instagram-api.softclub.tj/images/${e.images[0]}`}
              className="w-full aspect-square object-cover rounded-md"
              alt="post"
            />
          ) : (
            <Swiper
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="w-full aspect-square rounded-md"
            >
              {e.images.map((image: string, index: number) => (
                <SwiperSlide key={index}>
                  <img
                    src={`https://instagram-api.softclub.tj/images/${image}`}
                    className="w-full h-full object-cover"
                    alt="post"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          <div className="flex justify-between pt-4">
            <div className="flex gap-4">
              <div className="flex items-center gap-[6px]">
                <Heart className="cursor-pointer hover:scale-110 transition" />
                <h1 className="text-[16px] font-[500]">{e.postLikeCount}</h1>
              </div>
              <div className="flex items-center gap-[6px]">
                <MessageCircle className="cursor-pointer hover:scale-110 transition" />
                <h1 className="text-[16px] font-[500]">{e.commentCount}</h1>
              </div>
              <SendHorizontal className="cursor-pointer hover:scale-110 transition" />
            </div>
            <Bookmark className="cursor-pointer hover:scale-110 transition" />
          </div>

          <div className="flex gap-2 text-[16px] mt-[10px] items-center">
            <span className="font-semibold text-[18px]">
              {e.userName}
            </span>
            <span className="font-medium text-[16px]">{e.content}</span>
          </div>

          <div className="border-b border-gray-200 mt-4"></div>
        </div>
      ))}
    </div>
  );
}
