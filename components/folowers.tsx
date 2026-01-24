"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { GetFolowers } from "@/reducers/apiProfile";
import { clearFollowers } from "@/reducers/profile";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type FollowersDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    userId?: string;
};

export default function FollowersDialog({
    open,
    onOpenChange,
    userId,
}: FollowersDialogProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { folowers, followersLoaded } = useSelector(
        (state: RootState) => state.counter
    );

    useEffect(() => {
        if (open && userId) {
            dispatch(GetFolowers(userId));
        }

        if (!open) {
            dispatch(clearFollowers());
        }
    }, [open, userId, dispatch]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="p-0 max-w-[420px]">
                <DialogHeader className="px-4 py-3 border-b">
                    <DialogTitle className="text-center text-base font-semibold">
                        Followers
                    </DialogTitle>
                </DialogHeader>
                {!followersLoaded ? (
                    <div className="h-[420px] flex items-center justify-center text-sm text-muted-foreground">
                        Loading...
                    </div>
                ) : (
                    <div className="h-[420px] overflow-y-auto">
                        {folowers.length > 0 ? (
                            folowers.map((item: any) => {
                                const user = item.userShortInfo;
                                return (
                                    <Link href={`/profile/info/${user.userId}`} key={user.userId}>
                                        <div
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition cursor-pointer"
                                        >
                                            <img
                                                src={
                                                    user.userPhoto
                                                        ? `https://instagram-api.softclub.tj/images/${user.userPhoto}`
                                                        : "/user.png"
                                                }
                                                alt={user.userName}
                                                className="w-11 h-11 rounded-full object-cover"
                                            />

                                            <div className="flex flex-col text-sm leading-tight">
                                                <span className="font-semibold">
                                                    {user.userName}
                                                </span>
                                                <span className="text-muted-foreground">
                                                    {user.fullname}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })
                        ) : (
                            <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                                No followers yet
                            </div>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}