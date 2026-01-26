"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { getPosts, Postlike, Postkomment } from "../../reducers/home";

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
  const { data }: { data: any } = useSelector((state: RootState) => state.home);
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
    <div className="w-[630px] flex flex-col gap-8 mx-auto py-10">
      {/* --- Comment Modal --- */}
      {openPostId && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
          onClick={() => setOpenPostId(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-black w-[420px] h-[520px] rounded-xl flex flex-col text-white border border-zinc-800"
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
                      src={c.userImage ? `https://instagram-api.softclub.tj/images/${c.userImage}` : "/userImage.png"}
                      className="w-8 h-8 rounded-full object-cover"
                      alt="user"
                    />
                    <div className="text-sm">
                      <span className="font-semibold mr-2">{c.userName || "User"}</span>
                      <span className="text-gray-300">{c.comment}</span>
                    </div>
                  </div>
                ))}
            </div>

            <div className="h-[56px] border-t border-zinc-800 px-4 flex items-center gap-3">
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
                  commentText.trim() ? "text-blue-500" : "text-blue-500/40 cursor-default"
                }`}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Posts List --- */}
      {data?.map((e: any) => (
        <div key={e.postId} className="flex flex-col gap-3">
          {/* Post Header */}
          <header className="flex items-center justify-between h-[56px]">
            <div className="flex items-center gap-3">
              <img
                src={e.userImage ? `https://instagram-api.softclub.tj/images/${e.userImage}` : "/userImage.png"}
                className="w-8 h-8 rounded-full object-cover border"
                alt="avatar"
              />
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold hover:text-gray-500 cursor-pointer">
                  {e.userName}
                </span>
                <span className="text-xs text-gray-500">{e.title}</span>
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Ellipsis size={20} className="cursor-pointer text-gray-600" />
              </DialogTrigger>
              <DialogContent className="w-[300px] bg-white rounded-2xl p-2 shadow-lg">
                <div className="flex flex-col text-center">
                  <button className="py-3 text-red-500 font-bold border-b">Complain</button>
                  <button className="py-3 border-b">Share</button>
                  <button className="py-3 border-b">Copy Link</button>
                  <button className="py-3" onClick={() => {}}>Cancel</button>
                </div>
              </DialogContent>
            </Dialog>
          </header>

          {/* Post Images */}
          <div className="w-full">
            {e.images && e.images.length > 0 ? (
              e.images.length === 1 ? (
                <img
                  src={`https://instagram-api.softclub.tj/images/${e.images[0]}`}
                  className="w-full aspect-square object-cover rounded-md border"
                  alt="post"
                />
              ) : (
                <Swiper
                  pagination={{ clickable: true }}
                  modules={[Pagination]}
                  className="w-full aspect-square rounded-md border"
                >
                  {e.images.map((img: string, i: number) => (
                    <SwiperSlide key={i}>
                      <img
                        src={`https://instagram-api.softclub.tj/images/${img}`}
                        className="w-full h-full object-cover"
                        alt="post"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )
            ) : (
              <div className="w-full aspect-square bg-gray-100 flex items-center justify-center rounded-md text-gray-400">
                No Photo
              </div>
            )}
          </div>

          {/* Post Actions */}
          <div className="flex justify-between items-center px-1">
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <Heart
                  size={24}
                  onClick={() => dispatch(Postlike(e.postId))}
                  className={`cursor-pointer hover:scale-110 transition ${
                    e.postLike ? "fill-red-500 text-red-500" : "text-black"
                  }`}
                />
                <span className="text-sm font-semibold">{e.postLikeCount}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle
                  size={24}
                  onClick={() => setOpenPostId(e.postId)}
                  className="cursor-pointer hover:scale-110 transition"
                />
                <span className="text-sm font-semibold">{e.commentCount}</span>
              </div>
              <SendHorizontal size={24} className="cursor-pointer hover:scale-110 transition" />
            </div>
            <Bookmark size={24} className="cursor-pointer hover:scale-110 transition" />
          </div>

          {/* Post Content */}
          <div className="flex gap-2 text-sm px-1">
            <span className="font-semibold">{e.userName}</span>
            <span className="text-gray-800">{e.content}</span>
          </div>
          
          <div className="border-b border-gray-100 mt-4"></div>
        </div>
      ))}
    </div>
  );
}