"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { AppDispatch, RootState } from "@/store/store";
import { fetchPosts } from "@/reducers/interesting";

export default function InterestingPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading)
    return <div className="text-center mt-20 text-white">Loading...</div>;

  if (error)
    return (
      <div className="text-center mt-20 text-red-500">
        Ошибка: {error}
      </div>
    );

  return (
    <div className="min-h-screen px-3 py-4 w-[82%] ml-auto">
      <div className="grid grid-cols-3 gap-[5px] m-[40px]">
        {posts.map((item, index) => {
          const imageSrc = item.thumbnailUrl || item.image || item.mediaUrl;

          return (
            <div
              key={`reel-${item._id ?? index}`}
              className="relative aspect-[3/4] rounded-[10px] overflow-hidden group bg-neutral-900"
            >
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt="reel"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-neutral-800" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute top-2 right-2 bg-black/60 rounded-full p-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              {/* Caption */}
              <div className="absolute bottom-2 left-2 right-2 text-white text-sm truncate">
                {item.caption ?? ""}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
