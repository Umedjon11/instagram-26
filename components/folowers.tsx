"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { GetFolowers } from "@/reducers/apiProfile";
import { clearFollowers } from "@/reducers/profile";
import { AppDispatch, RootState } from "@/store/store";
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
        if (open && userId && !followersLoaded) {
            dispatch(GetFolowers(userId));
        }

        if (!open) {
            dispatch(clearFollowers());
        }
    }, [open, userId, followersLoaded, dispatch]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Followers</DialogTitle>
                    <DialogDescription>People who follow you</DialogDescription>
                </DialogHeader>

                {!followersLoaded ? (
                    <div className="py-10 text-center text-sm text-gray-500">
                        Loading followers...
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 mt-4">
                        {folowers.length > 0 ? (
                            folowers.map((item: any) => {
                                const user = item.userShortInfo;

                                return (
                                    <div
                                        key={user.userId}
                                        className="flex items-center gap-3"
                                    >
                                        <img
                                            src={
                                                user.userPhoto
                                                    ? `https://instagram-api.softclub.tj/images/${user.userPhoto}`
                                                    : "/user.png"
                                            }
                                            alt={user.userName}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />

                                        <div className="flex flex-col text-sm">
                                            <span className="font-semibold">{user.userName}</span>
                                            <span className="text-gray-500">
                                                {user.fullname}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center text-sm text-gray-500 py-6">
                                No followers yet
                            </div>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
