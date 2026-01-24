"use client";

import AllStories from "@/components/home/AllStories";
import InstaStoriesCard from "../components/home/InstaStoriesCard";
import PostCard from "../components/home/PostCard";

export default function Home() {
  return (
    <main className="w-[80%] ml-auto flex gap-16 pt-8">

      <div className="flex flex-col gap-8">

        <div className="flex gap-4 overflow-x-auto pb-4 border-b border-gray-200">
          <InstaStoriesCard />
        </div>

        <PostCard />
      </div>
      
      <aside className="w-[320px] sticky top-8 h-fit">
        <div className="flex items-center gap-3">
          <img
            src="/homePage.jpg"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold">terrylucas</p>
            <p className="text-xs text-gray-500">Terry Lucas</p>
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-500 mt-6">
          <span>Suggested for you</span>
          <span className="font-semibold cursor-pointer">See all</span>
        </div>
      </aside>
    </main>
  );
}
