"use client";

import Image from "next/image";
import { Grid3x3, Contact } from "lucide-react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { FollowUser, GetFolowings, GetInfoById, GetPosts, UnFollow } from "@/reducers/apiProfile";
import { useEffect, useState } from "react";
import Link from "next/link";
import FollowersDialog from "@/components/folowers";
import FollowingDialog from "@/components/folowing";
import PostModal from "@/components/posts";

export default function Page() {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();

    const [postOpen, setPostOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<any>(null);
    const [followersOpen, setFollowersOpen] = useState(false);
    const [followingsOpen, setFollowingsOpen] = useState(false);
    const [activeTab, setActiveTab] =
        useState<"Posts" | "Saved" | "Tagged">("Posts");

    const { dataById, posts, mySubscriptions, followLoading } = useSelector(
        (state: RootState) => state.counter
    );

    const isFollowing = mySubscriptions.some(
        (user: any) => String(user.id) === String(id)
    );

    const handleFollow = () => {
        if (!id) return;

        if (isFollowing) {
            dispatch(UnFollow(id as string)).then(() => {
                dispatch(GetFolowings(id as string));
            });
        } else {
            dispatch(FollowUser(id as string)).then(() => {
                dispatch(GetFolowings(id as string));
            });
        }
    };

    const api = "https://instagram-api.softclub.tj";

    useEffect(() => {
        if (!id) return;

        dispatch(GetInfoById(id as string));
        dispatch(GetPosts(id as string));
        dispatch(GetFolowings(id as string));
    }, [dispatch, id]);


    if (!dataById) return <div className="p-10">Loading...</div>;

    return (
        <div className="w-[82%] ml-auto min-h-screen px-10 py-8">
            <div className="flex gap-24">
                <div className="flex-shrink-0">
                    {dataById.image ? (
                        <img
                            src={`${api}/images/${dataById.image}`}
                            className="w-[160px] h-[160px] rounded-full object-cover"
                            alt="avatar"
                        />
                    ) : (
                        <Image
                            src="/user.png"
                            width={160}
                            height={160}
                            alt="avatar"
                            className="rounded-full"
                        />
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-6">
                        <span className="text-xl">{dataById.userName}</span>
                        <button
                            onClick={handleFollow}
                            disabled={followLoading}
                            className={`px-4 py-1.5 rounded-lg text-sm transition
                            ${isFollowing ? "border bg-gray-200 text-black"
                                    : "bg-blue-500 text-white"} 
                            ${followLoading ? "opacity-50 cursor-not-allowed" : ""}`}>
                            {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                        <button className="px-4 py-1.5 rounded-lg border text-sm">
                            Message
                        </button>
                    </div>

                    <div className="flex gap-10 text-sm">
                        <span>
                            <strong>{dataById.postCount}</strong> posts
                        </span>
                        <span
                            className="cursor-pointer"
                            onClick={() => setFollowersOpen(true)}
                        >
                            <strong>{dataById.subscribersCount}</strong> followers
                        </span>
                        <span
                            className="cursor-pointer"
                            onClick={() => setFollowingsOpen(true)}
                        >
                            <strong>{dataById.subscriptionsCount}</strong> following
                        </span>
                    </div>

                    <div className="text-sm">
                        <strong>
                            {dataById.firstName} {dataById.lastName}
                        </strong>
                        {dataById.about && <div>{dataById.about}</div>}
                    </div>
                </div>
            </div>
            <div className="mt-16">
                <div className="flex justify-center gap-12 border-t">
                    {[
                        { key: "Posts", icon: <Grid3x3 />, label: "Posts" },
                        { key: "Tagged", icon: <Contact />, label: "Tagged" },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            className={`flex items-center gap-1 pt-2 cursor-pointer ${activeTab === tab.key
                                ? "text-blue-500 border-t border-blue-500 font-semibold"
                                : "text-gray-800"
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="mt-10">
                    {activeTab === "Posts" && (
                        <div className="grid grid-cols-3 gap-1">
                            {posts.length ? (
                                posts.map((post: any) => (
                                    <div key={post.postId} className="cursor-pointer aspect-square overflow-hidden"
                                        onClick={() => {
                                            setSelectedPost(post);
                                            setPostOpen(true);
                                        }}
                                    >
                                        {post.images[0].endsWith(".mp4") ? (
                                            <video
                                                src={`${api}/images/${post.images[0]}`}
                                                className="w-full h-full object-cover"
                                                muted
                                                loop
                                                playsInline
                                                controls

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
                                <EmptyState
                                    img="/image 77.png"
                                    title="Share Photos"
                                    desc="When you share photos, they will appear on your profile."
                                    link="/add-post"
                                    linkText="Share your first photo"
                                />
                            )}
                        </div>
                    )}

                    {activeTab === "Tagged" && (
                        <EmptyState
                            img="/image 79.png"
                            title="No tagged posts"
                            desc="Photos and videos you're tagged in will appear here."
                        />
                    )}
                </div>
            </div>

            <FollowersDialog
                open={followersOpen}
                onOpenChange={setFollowersOpen}
                userId={id}
            />
            <FollowingDialog
                open={followingsOpen}
                onOpenChange={setFollowingsOpen}
                userId={id}
            />
            <PostModal
                open={postOpen}
                onOpenChange={setPostOpen}
                post={selectedPost}
            />
        </div>
    );
}
function EmptyState({
    img,
    title,
    desc,
    link,
    linkText,
}: {
    img: string;
    title: string;
    desc: string;
    link?: string;
    linkText?: string;
}) {
    return (
        <div className="col-span-3 h-96 flex flex-col items-center justify-center gap-4">
            <Image src={img} width={100} height={100} alt="empty" />
            <span className="text-lg font-semibold">{title}</span>
            <span className="text-sm opacity-70 text-center max-w-sm">{desc}</span>
            {link && linkText && (
                <Link href={link} className="text-blue-500 font-semibold">
                    {linkText}
                </Link>
            )}
        </div>
    );
}
