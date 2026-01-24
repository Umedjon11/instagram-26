"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { getStories, getPostById } from "../../reducers/home";
import StoriesModal from "./StoriesModal";

export default function StoryAvatar() {
  const { data: stories } = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch<AppDispatch>();
  const [openStory, setOpenStory] = useState(false);
  const [storyContent, setStoryContent] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);

  const handleStoryClick = async (id: number) => {
    
    const result: any = await dispatch(getPostById(id)).unwrap();

    const formatted = result.images.map((img: string) => ({
      url: `https://instagram-api.softclub.tj/images/${img}`,
      header: {
        heading: result.userName,
        profileImage: result.userImage
          ? `https://instagram-api.softclub.tj/images/${result.userImage}`
          : "/userImage.png",
      },
    }));

    setStoryContent(formatted);
    setOpenStory(true);
  };

  return (
    <div>

      <div className="flex gap-4 overflow-x-auto p-2">
        {stories?.map((e: any) => (
          <button
            key={e.postId}
            onClick={() => handleStoryClick(e.postId)}
            className="flex flex-col items-center gap-1 cursor-pointer"
          >
            <div className="p-[3px] rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-400">
              <div className="bg-white p-[3px] rounded-full">
                <div className="relative w-14 h-14 rounded-full overflow-hidden">
                  <img
                    src={
                      e.userImage
                        ? `https://instagram-api.softclub.tj/images/${e.userImage}`
                        : "/userImage.png"
                    }
                    alt={e.userName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <h1 className="text-[16px] font-normal text-[#1F2937] truncate w-16 text-center">
              {e.userName}
            </h1>
          </button>
        ))}
      </div>

      {openStory && storyContent.length > 0 && (
        <StoriesModal
          stories={storyContent}
          onClose={() => setOpenStory(false)}
        />
      )}
    </div>
  );
}
