'use client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReels, Postkomment, Postlike, followUser, unfollowUser, Save } from '@/reducers/reels'
import { RootState, AppDispatch } from '@/store/store'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Music2, X, Smile } from 'lucide-react'
import Link from 'next/link'

interface ReelElement {
  postId: number;
  userId: string;
  images: string[];
  userImage: string | null;
  userName: string;
  title: string;
  postLike: boolean;
  postLikeCount: number;
  commentCount: number;
  comments: any[];
  isFollowing?: boolean;
  postFavorite: boolean;
}

const Reels = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data } = useSelector((state: RootState) => state.reels) as { data: ReelElement[] }
  const [openPostId, setOpenPostId] = useState<number | null>(null)
  const [commentText, setCommentText] = useState<string>("")
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set())

  useEffect(() => {
    dispatch(getReels())
  }, [dispatch])

  const handleToggleFollow = async (userId: string, isFollowing?: boolean) => {
    const isCurrentlyFollowing = isFollowing ?? followedUsers.has(userId);
    if (!userId) {
      return;
    }
    try {
      if (isCurrentlyFollowing) {
        await dispatch(unfollowUser(userId)).unwrap();
        setFollowedUsers(prev => {
          const newSet = new Set(prev);
          newSet.delete(userId);
          return newSet;
        });
      } else {
        await dispatch(followUser(userId)).unwrap();
        setFollowedUsers(prev => new Set(prev).add(userId));
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.errors?.[0] || error?.message || "";
      if (error?.response?.status === 400) {
        if (!isCurrentlyFollowing) {
          setFollowedUsers(prev => new Set(prev).add(userId));
        }
      } else {
        console.error(errorMessage);
      }
    }
  };

  const AddComment = async (): Promise<void> => {
    if (!commentText.trim() || !openPostId) return
    try {
      await dispatch(Postkomment({
        id: openPostId,
        komment: commentText
      })).unwrap()
      setCommentText("")
    } catch (error) {
      console.error(error)
    }
  }

  const handleVideoClick = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    video.paused ? video.play() : video.pause();
  }

  useEffect(() => {
    const videos = document.querySelectorAll('video');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {
              video.muted = true;
              video.play();
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    videos.forEach((video) => observer.observe(video));

    return () => {
      videos.forEach((video) => observer.unobserve(video));
    };
  }, [data]);

  const currentPost = data?.find((p) => Number(p.postId) === Number(openPostId))

  return (
    <div className="flex h-screen  overflow-hidden justify-center">
      <div className="flex-1 overflow-y-scroll snap-y snap-mandatory scrollbar-hide flex flex-col items-center transition-all duration-500 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col items-center gap-6 py-6">
          {data?.map((elem) => (
            <div key={elem.postId} className="relative w-[340px] md:w-[380px] h-[calc(100vh-40px)] bg-zinc-900 rounded-md overflow-hidden snap-center shadow-2xl flex items-center justify-center border border-zinc-800">
              <video
                src={`https://instagram-api.softclub.tj/images/${Array.isArray(elem.images) ? elem.images[0] : elem.images}`}
                preload="metadata"
                playsInline
                controlsList="nodownload"
                className="w-full h-full object-cover cursor-pointer"
                loop
                onClick={handleVideoClick}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-12 text-white z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Link
                    href={`/profile/info/${elem.userId}`}
                    className="flex items-center gap-2 hover:opacity-80 transition"
                    aria-label={`View ${elem.userName}'s profile`}
                  >
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-zinc-500">
                      <img
                        src={elem.userImage
                          ? `https://instagram-api.softclub.tj/images/${elem.userImage}`
                          : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                        className="w-full h-full object-cover"
                        alt={`${elem.userName}'s profile picture`}
                      />
                    </div>
                    <span className="font-semibold text-xs">{elem.userName}</span>
                  </Link>


                  <button
                    type="button"
                    onClick={() => handleToggleFollow(elem.userId, elem.isFollowing)}
                    className={`text-[11px] font-bold px-3 py-0.5 rounded active:scale-95 transition border ${(elem.isFollowing ?? followedUsers.has(elem.userId))
                      ? "bg-transparent border-white/40 text-white"
                      : "bg-white text-black border-white hover:bg-zinc-200"
                      }`}
                  >
                    {(elem.isFollowing ?? followedUsers.has(elem.userId)) ? "Following" : "Follow"}
                  </button>
                </div>

                <p className="text-[12px] mb-2 line-clamp-1 opacity-90">{elem.title || "Amazing content"}</p>
                <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm w-fit p-1 px-2 rounded text-[10px]">
                  <Music2 size={10} />
                  <span className="truncate max-w-[80px]">{elem.userName} • Audio</span>
                </div>
              </div>


              <div className="absolute right-2 bottom-6 flex flex-col items-center gap-4 text-white z-10">
                <div className="flex flex-col items-center">
                  <button type="button" aria-label="Like post" onClick={() => dispatch(Postlike(elem.postId))} className="p-1.5 hover:scale-110 transition active:opacity-50">
                    <Heart size={24} className={elem.postLike ? "fill-red-500 text-red-500" : "text-white"} />
                  </button>
                  <span className="text-[10px] font-bold">{elem.postLikeCount}</span>
                </div>

                <div className="flex flex-col items-center">
                  <button type="button" aria-label="Like post" onClick={() => setOpenPostId(elem.postId)} className="p-1.5 hover:scale-110 transition">
                    <MessageCircle size={24} />
                  </button>
                  <span className="text-[10px] font-bold">{elem.commentCount}</span>
                </div>

                <button type="button" aria-label="Like post" className="p-1.5 hover:scale-110 transition"><Send size={22} /></button>
                <button
                  type="button" aria-label='save'
                  onClick={() => dispatch(Save(elem.postId))}
                  className="p-1.5 hover:scale-110 transition"
                >
                  <Bookmark
                    size={22}
                    className={elem.postFavorite ? "fill-white text-white" : "text-white"}
                  />
                </button>
                <button type="button" aria-label="Like post" className="p-1.5 opacity-80"><MoreHorizontal size={22} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`h-full bg-black border-l border-zinc-800 flex flex-col transition-all duration-300 ease-in-out ${openPostId ? 'w-[350px] translate-x-0' : 'w-0 translate-x-full overflow-hidden invisible'}`}>
        <div className="p-3 border-b border-zinc-800 flex justify-between items-center text-white">
          <span className="font-bold text-sm">Comments</span>
          <button type="button" aria-label="Like post" onClick={() => setOpenPostId(null)} className="text-zinc-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-5 scrollbar-hide">
          {currentPost?.comments?.map((c, i) => (
            <div key={i} className="flex gap-2.5 items-start">
              <img
                src={c.userImage ? `https://instagram-api.softclub.tj/images/${c.userImage}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-0.5"
                alt="user"
              />
              <div className="flex-1">
                <p className="text-[12.5px] text-white leading-4">
                  <span className="font-bold mr-1.5 cursor-pointer">{c.userName || "User"}</span>
                  {c.comment}
                </p>
                <div className="flex gap-3 mt-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">
                  <span>{new Date(c.dateCommented).toLocaleDateString()}</span>
                  <button type="button" className="hover:text-zinc-300">Reply</button>
                </div>
              </div>
              <button type="button" aria-label="Like post" className="mt-1 text-zinc-600 hover:text-red-500"><Heart size={10} /></button>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-zinc-800 bg-black">
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1.5">
            <Smile size={18} className="text-zinc-400" />
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && AddComment()}
              placeholder="Add a comment..."
              className="flex-1 bg-transparent text-white text-[12px] outline-none"
            />
            <button onClick={AddComment} disabled={!commentText.trim()} className={`text-[12px] font-bold ${commentText.trim() ? 'text-blue-500' : 'text-blue-900 cursor-default'}`}>Post</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reels