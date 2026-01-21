"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { GetFolowings } from "@/reducers/apiProfile";
import { clearFollowings } from "@/reducers/profile";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type FollowingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
};

export default function FollowingDialog({ open, onOpenChange, userId }: FollowingDialogProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { folowings, isLoading, followingsLoaded } = useSelector((state: RootState) => state.counter);

  useEffect(() => {
    if (open && userId && !followingsLoaded) {
      dispatch(GetFolowings(userId));
    }

    if (!open) {
      dispatch(clearFollowings());
    }
  }, [open, userId, followingsLoaded, dispatch]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Followings</DialogTitle>
          <DialogDescription>
            People you follow
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="py-10 text-center text-sm text-gray-500">
            Loading followings...
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex flex-col gap-3 mt-4">
              {folowings.length > 0 ? (
                folowings.map((item: any) => {
                  const user = item.userShortInfo;

                  return (
                    <div
                      key={user.userId}
                      className="flex items-center gap-3 border-b-1 pb-3"
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
                        <span className="text-gray-500">{user.fullname}</span>
                      </div>
                    </div>
                  );
                })) : (
                <div className="text-center text-sm text-gray-500 py-6">
                  No followings yet
                </div>
              )}
            </div>

          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
