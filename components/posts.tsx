"use client";

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";

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

    const file = post.images[0];
    const isVideo = file.endsWith(".mp4");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="p-0 max-w-10/12 h-[80vh] flex">

                {/* LEFT — MEDIA */}
                <div className="w-[60%] bg-black flex items-center justify-center relative">
                    {isVideo ? (
                        <video
                            src={`${API}/images/${file}`}
                            controls
                            autoPlay
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

                {/* RIGHT — INFO */}
                <div className="w-[40%] flex flex-col border-l">
                    <div className="p-4 border-b flex items-center gap-3">
                        <img
                            src={`${API}/images/${post.userImage}`}
                            className="w-9 h-9 rounded-full object-cover"
                        />
                        <span className="font-semibold text-sm">
                            {post.userName}
                        </span>
                    </div>

                    <div className="p-4 text-sm">
                        <span className="font-semibold mr-2">
                            {post.userName}
                        </span>
                        {post.content}
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
}
