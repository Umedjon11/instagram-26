"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";

type PostModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    post: any | null;
};

const API = "https://instagram-api.softclub.tj";

export default function PostModal({
    open,
    onOpenChange,
    post,
}: PostModalProps) {
    if (!post) return null;

    const file = post.images?.[0];
    const isVideo = file?.endsWith(".mp4");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="border-none  h-[90vh]">
                <div className="flex overflow-hidden">
                    <div className="w-[500px] flex items-center justify-center">
                        {isVideo ? (
                            <video
                                src={`${API}/images/${file}`}
                                controls
                                autoPlay
                                playsInline
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <img
                                src={`${API}/images/${file}`}
                                alt="post"
                                className="w-full h-full object-contain"
                            />
                        )}
                    </div>
                    <div className="w-[420px] h-full text-white flex flex-col border-l border-neutral-800">
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-800">
                            <img
                                src={`${API}/images/${post.userImage}`}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <span className="font-semibold text-sm">
                                {post.userName}
                            </span>
                        </div>
                        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 text-sm">
                            <div className="flex gap-2">
                                <span className="font-semibold">
                                    {post.userName}
                                </span>
                                <span className="text-gray-200">
                                    {post.content}
                                </span>
                            </div>

                            {post.comments?.map((c: any) => (
                                <div key={c.postCommentId} className="flex gap-2">
                                    <span className="font-semibold">
                                        {c.userName}
                                    </span>
                                    <span className="text-gray-300">
                                        {c.comment}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="px-4 py-3 border-t border-neutral-800 space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex gap-4">
                                    <Heart className="w-6 h-6 cursor-pointer hover:text-red-500 transition" />
                                    <MessageCircle className="w-6 h-6 cursor-pointer" />
                                    <Send className="w-6 h-6 cursor-pointer" />
                                </div>
                                <Bookmark className="w-6 h-6 cursor-pointer" />
                            </div>

                            <div className="text-sm font-semibold">
                                {post.postLikeCount} likes
                            </div>

                            <div className="text-xs text-gray-400">
                                {new Date(post.datePublished).toLocaleDateString()}
                            </div>
                        </div>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
