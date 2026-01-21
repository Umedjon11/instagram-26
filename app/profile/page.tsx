"use client";

import { GetPosts, GetProfile } from "@/reducers/apiProfile";
import { AppDispatch, RootState } from "@/store/store";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, posts } = useSelector((state: RootState) => state.counter);
  const api = 'https://instagram-api.softclub.tj'
  const postsRef = useRef<HTMLDivElement | null>(null);

  const scrollToPosts = () => {
    postsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI4YjllOWY0Mi1iMTE3LTQxY2ItOWY2Ny1jMzBjNTBhNmExM2MiLCJuYW1lIjoidW1lZGpvbjI3IiwiZW1haWwiOiJuYXphcm92dW1lZDg4QGdtYWlsLmNvbSIsInN1YiI6IiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE3Njg5OTYyMDMsImlzcyI6Imluc3RhZ3JhbS1ncm91cCIsImF1ZCI6Imluc3RhZ3JhbS1hcGkifQ.JQq9XYDic8Q-iRS_zxJEgyBOJnyu0KadqVr0IJ6J-4s";
  const decoded: any = jwtDecode(token);
  const userId = decoded.sid;

  useEffect(() => {
    dispatch(GetProfile());

    if (userId) {
      dispatch(GetPosts(userId));
    }
  }, [dispatch, userId]);


  if (isLoading) {
    return (
      <div className="w-[82%] ml-auto min-h-screen px-10 py-8">
        Loading....
      </div>
    );
  }

  return (
    <div className="w-[82%] ml-auto min-h-screen px-10 py-8">
      <div className="flex gap-24">
        <div className="flex-shrink-0">
          {data.image ? (
            <img
              src={`${api}/images/${data.image}`}
              alt="avatar"
              className="rounded-full object-cover w-[160px] h-[160px]"
            />
          ) : (
            <div>
              <Image src="/user.png" alt="default avatar" width={160} height={160} className="rounded-full object-cover" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-6">
            <span className="text-xl">
              {data.userName}
            </span>
            <button className="px-4 py-1.5 rounded-lg border text-sm">
              Edit profile
            </button>
            <button className="px-4 py-1.5 rounded-lg border text-sm">
              View archive
            </button>
          </div>

          <div className="flex gap-10 text-sm">
            <span onClick={scrollToPosts} className="cursor-pointer">
              <strong>{data.postCount}</strong> posts
            </span>
            <span>
              <strong>{data.subscribersCount}</strong> followers
            </span>
            <span>
              <strong>{data.subscriptionsCount}</strong> following
            </span>
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <span className="font-semibold">
              {data.firstName} {data.lastName}
            </span>
            {data.occupation && <span>{data.occupation}</span>}
            {data.about && <span>{data.about}</span>}
          </div>
        </div>
      </div>

      <div className="mt-16" ref={postsRef}>
        <div className="flex gap-12 border-t justify-center text-xs uppercase tracking-widest">
          <div
            className="py-4 border-t -mt-px cursor-pointer"
            onClick={scrollToPosts}
          >
            Posts
          </div>
          <div className="py-4">Reels</div>
          <div className="py-4">Saved</div>
          <div className="py-4">Tagged</div>
        </div>

        <div className="grid grid-cols-3 gap-1 mt-1">
          {posts.length > 0 ? (
            posts.map((post: any) => (
              <div key={post.postId} className="aspect-square overflow-hidden">
                <img
                  src={`${api}/images/${post.images[0]}`}
                  alt="post"
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <div className="col-span-3 flex flex-col items-center justify-center h-96 gap-4">
              <Image src="/image 77.png" alt="camera" width={100} height={100} />
              <span className="text-lg font-semibold">Share Photos</span>
              <span className="text-sm opacity-70">
                When you share photos, they will appear on your profile.
              </span>
              <Link href="/add-post" className="text-[#3B82F6] font-semibold">
                Share your first photo
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
