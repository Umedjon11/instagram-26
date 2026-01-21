"use client";

import React from "react";
import { Heart, MessageCircle, SendHorizontal, Bookmark, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function PostCard() {
  return (
    <div className="w-[630px] flex flex-col gap-2 mx-auto mt-8">
      
      <header className="flex items-center justify-between h-[56px]">
        <div className="flex items-center gap-3">
          <img src="/homePage.jpg" className="w-8 h-8 rounded-full object-cover" />
          <span className="text-[17px] font-semibold cursor-pointer">terrylucas</span>
        </div>

        <Dialog>
      <DialogTrigger asChild>
        <Ellipsis size={24} className="cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="w-[300px] bg-gray-800 text-white rounded-2xl p-2 shadow-lg">
        <div className="flex flex-col gap-1">
          <button className="w-full py-3 px-4 text-left  font-semibold rounded-lg hover:bg-gray-700 transition cursor-pointer">
            Complain
          </button>
          <button className="w-full py-3 px-4 text-left rounded-lg hover:bg-gray-700 transition cursor-pointer">
            Share
          </button>
          <button className="w-full py-3 px-4 text-left rounded-lg hover:bg-gray-700 transition cursor-pointer">
            Copy Link
          </button>
          <button className="w-full py-3 px-4 text-left rounded-lg hover:bg-gray-700 transition cursor-pointer">
            Save
          </button>
        </div>
      </DialogContent>
    </Dialog>
      </header>

      <img
        src="/homePage.jpg"
        className="w-full aspect-square object-cover rounded-md"
      />

      <div className="flex justify-between pt-2">
        <div className="flex gap-4">
          <Heart className="cursor-pointer hover:scale-110 transition" />
          <MessageCircle className="cursor-pointer hover:scale-110 transition" />
          <SendHorizontal className="cursor-pointer hover:scale-110 transition" />
        </div>
        <Bookmark className="cursor-pointer hover:scale-110 transition" />
      </div>

      <div className="flex gap-2 text-[14px]">
        <span className="font-semibold">terrylucas</span>
        <span>Very Amazing Experiences</span>
      </div>

      <div className="border-b border-gray-200 mt-4"></div>

    </div>
  );
}
