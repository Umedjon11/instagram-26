"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { getPosts, Postlike, Postkomment } from "../../reducers/home";
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

  const [openPostId, setOpenPostId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const AddComment = async () => {
    if (!commentText.trim() || !openPostId) return;
    try {
      await dispatch(
        Postkomment({
          id: openPostId,
          komment: commentText,
        })
      ).unwrap();
      setCommentText("");
      dispatch(getPosts());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[630px] flex flex-col gap-2 mx-auto">
      
      {openPostId && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
          onClick={() => setOpenPostId(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-black w-[420px] h-[520px] rounded-xl flex flex-col text-white"
          >
            <div className="h-[48px] border-b border-zinc-800 flex items-center justify-center relative">
              <span className="font-semibold text-[15px]">Comments</span>
              <button
                onClick={() => setOpenPostId(null)}
                className="absolute right-4 text-xl text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
              {data
                ?.find((p: any) => Number(p.postId) === Number(openPostId))
                ?.comments?.map((c: any, i: number) => (
                  <div key={i} className="flex gap-3">
                    <img
                      src={
                        c.userImage
                          ? `https://instagram-api.softclub.tj/images/${c.userImage}`
                          : "/userImage.png"
                      }
                      className="w-8 h-8 rounded-full object-cover"
                      alt="user"
                    />
                    <div className="text-sm">
                      <span className="font-semibold mr-2">
                        {c.userName || "User"}
                      </span>
                      <span className="text-gray-300">{c.comment}</span>
                    </div>
                  </div>
                ))}
            </div>

            <div className="h-[56px] border-t border-zinc-800 px-4 flex items-center gap-3">
              <img
                src="/userImage.png"
                className="w-8 h-8 rounded-full object-cover"
                alt="me"
              />

              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-transparent text-sm outline-none placeholder-gray-500"
              />

              <button
                onClick={AddComment}
                disabled={!commentText.trim()}
                className={`text-sm font-semibold transition ${
                  commentText.trim()
                    ? "text-blue-500"
                    : "text-blue-500/40 cursor-default"
                }`}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {data && data.length > 0 && data.map((e: any) => (
        <div key={e.postId} className="mb-6">

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
                    : "/userImage.png"
                    : "/homePage.jpg"
                }
                className="w-8 h-8 rounded-full object-cover"
                alt="avatar"
              />
              <div className="flex flex-col leading-5">
                <span className="text-[17px] font-semibold cursor-pointer">
                  {e.userName}
                </span>
                <span className="text-sm text-gray-500">{e.title}</span>
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
                  <button className="w-full py-3 px-4 text-left font-semibold rounded-lg hover:bg-gray-700">
                    Complain
                  </button>
                  <button className="w-full py-3 px-4 text-left rounded-lg hover:bg-gray-700">
                    Share
                  </button>
                  <button className="w-full py-3 px-4 text-left rounded-lg hover:bg-gray-700">
                    Copy Link
                  </button>
                  <button className="w-full py-3 px-4 text-left rounded-lg hover:bg-gray-700">
                    Save
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </header>
          
          {e.images && e.images.length > 0 ? (
            e.images.length === 1 ? (
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
                {e.images.map((img: string, i: number) => (
                  <SwiperSlide key={i}>
                    <img
                      src={
                        img
                          ? `https://instagram-api.softclub.tj/images/${img}`
                          : "/userImage.png"
                      }
                      className="w-full h-full object-cover"
                      alt="post"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )
          ) : (
            <div className="w-full aspect-square bg-gray-300 flex items-center justify-center rounded-md text-gray-500">
              No Photo
            </div>
          )}

          <div className="flex justify-between pt-4">
            <div className="flex gap-4">
              <button
                onClick={() => dispatch(Postlike(e.postId))}
                className="flex items-center gap-2"
              >
                <Heart
                  className={`cursor-pointer hover:scale-110 transition ${
                    e.postLike
                      ? "fill-red-500 text-red-500"
                      : "text-black"
                  }`}
                />
                <span>{e.postLikeCount}</span>
              </button>

              <button
                onClick={() => setOpenPostId(e.postId)}
                className="flex items-center gap-2"
              >
                <MessageCircle className="cursor-pointer hover:scale-110 transition" />
                <span>{e.commentCount}</span>
              </button>

              <SendHorizontal className="cursor-pointer hover:scale-110 transition" />
            </div>

            <Bookmark className="cursor-pointer hover:scale-110 transition" />
          </div>

          <div className="flex gap-2 mt-2">
            <span className="font-semibold">{e.userName}</span>
            <span>{e.content}</span>
          </div>


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
