"use client";

import FollowersDialog from "@/components/folowers";
import FollowingDialog from "@/components/folowing";
import { GetPosts, GetProfile } from "@/reducers/apiProfile";
import { AppDispatch, RootState } from "@/store/store";
import { jwtDecode } from "jwt-decode";
import { Bookmark, Contact, Grid3x3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "@/utils/axios";
import InstagramLoading from "@/components/InstagramLoading";
import PostModal from "@/components/posts";

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, posts } = useSelector((state: RootState) => state.counter);
  const api = 'https://instagram-api.softclub.tj'
  const postsRef = useRef<HTMLDivElement | null>(null);
  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingsOpen, setFollowingsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [postOpen, setPostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);


  const scrollToPosts = () => {
    postsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const [activeTab, setActiveTab] = useState<
    "Posts" | "Saved" | "Tagged"
  >("Posts");


  const token = getToken()
  const decoded: string = jwtDecode(token);
  const userId = decoded.sid;
  console.log(userId);


  useEffect(() => {
    dispatch(GetProfile());

    if (userId) {
      dispatch(GetPosts(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (data && posts) {
      setLoading(false);
    }
  }, [data, posts]);

  const isVideo = (file: string) => {
    return /\.(mp4|webm|ogg|mov)$/i.test(file);
  };

  if (loading) {
    return <InstagramLoading />;
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
            <Link href={`/profile/${userId}`}>
              <button className="cursor-pointer px-4 py-1.5 rounded-lg border text-sm">
                Edit profile
              </button>
            </Link>
            <button className="px-4 py-1.5 rounded-lg border text-sm">
              View archive
            </button>
          </div>

          <div className="flex gap-10 text-sm">
            <span onClick={scrollToPosts} className="cursor-pointer">
              <strong>{data.postCount}</strong> posts
            </span>
            <span
              className="cursor-pointer"
              onClick={() => setFollowersOpen(true)}
            >
              <strong>{data.subscribersCount}</strong> followers
            </span>
            <span
              className="cursor-pointer"
              onClick={() => setFollowingsOpen(true)}
            >
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
        <div className="flex gap-12 border-t justify-center">
          <button
            className={`cursor-pointer flex items-center gap-1 pt-2 ${activeTab === "Posts"
              ? "text-blue-500 font-semibold border-t border-blue-500"
              : "text-gray-800"
              }`}
            onClick={() => {
              setActiveTab("Posts");
              scrollToPosts()
            }}
          >
            <Grid3x3 />
            Posts
          </button>
          <button onClick={() => {
            setActiveTab("Saved");
          }} className={`cursor-pointer flex items-center gap-1 pt-2 ${activeTab === "Saved"
            ? "text-blue-500 font-semibold border-t border-blue-500"
            : "text-gray-800"
            }`}>
            <Bookmark />
            Saved
          </button>
          <button onClick={() => {
            setActiveTab("Tagged");
          }} className={`cursor-pointer flex items-center gap-1 pt-2 ${activeTab === "Tagged"
            ? "text-blue-500 font-semibold border-t border-blue-500"
            : "text-gray-800"
            }`}>
            <Contact />
            Tagged
          </button>
        </div>

        <div className="mt-10">
          {activeTab === "Posts" && (
            <div className="grid grid-cols-3 gap-1">
              {posts.length > 0 ? (
                posts.map((post: any) => (
                  <div key={post.postId} className="cursor-pointer aspect-square overflow-hidden bg-black"
                    onClick={() => {
                      setSelectedPost(post);
                      setPostOpen(true);
                    }}
                  >
                    {post.images[0].endsWith(".mp4") ? (
                      <video
                        src={`${api}/images/${post.images[0]}`}
                        className="absolute inset-0 w-full h-full object-cover"
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={`${api}/images/${post.images[0]}`}
                        alt="post"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-3 flex flex-col items-center justify-center h-96 gap-4">
                  <Image src="/image 77.png" alt="camera" width={100} height={100} />
                  <span className="text-lg font-semibold">Share Photos</span>
                  <span className="text-sm opacity-70"> When you share photos, they will appear on your profile. </span>
                  <Link href="/add-post" className="text-[#3B82F6] font-semibold">
                    Share your first photo
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === "Saved" && (
            <div className="col-span-3 flex flex-col items-center justify-center h-96 gap-4">
              <Image src="/image 78.png" alt="camera" width={100} height={100} />
              <span className="text-lg font-semibold">You saves</span>
              <span className="text-sm opacity-70">Only you can see what youve saved</span>
              <Link href="/reels" className="text-[#3B82F6] font-semibold">
                + New collection
              </Link>
            </div>
          )}

          {activeTab === "Tagged" && (
            <div className="col-span-3 flex flex-col items-center justify-center h-96 gap-4">
              <Image src="/image 79.png" alt="camera" width={100} height={100} />
              <span className="text-lg font-semibold">You have not tagged</span>
              <span className="text-sm opacity-70">Here show the photos and videos in which you have been tagged</span>
            </div>
          )}
        </div>

      </div>
      <FollowersDialog
        open={followersOpen}
        onOpenChange={setFollowersOpen}
        userId={userId}
      />
      <FollowingDialog
        open={followingsOpen}
        onOpenChange={setFollowingsOpen}
        userId={userId}
      />
      <PostModal
        open={postOpen}
        onOpenChange={setPostOpen}
        post={selectedPost}
      />
    </div>
  );
}
