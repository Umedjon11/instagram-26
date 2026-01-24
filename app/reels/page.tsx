'use client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReels, Postkomment, Postlike } from '@/reducers/reels'
import { RootState, AppDispatch } from '@/store/store'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Music2 } from 'lucide-react'

interface Comment {
  postCommentId: number;
  userId: string;
  userName: string | null;
  userImage: string | null;
  comment: string;
  dateCommented: string;
}

const Reels = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data } = useSelector((state: RootState) => state.reels)
  const [ openPostId, setOpenPostId] = useState<number | null>(null)
  const [commentText, setCommentText] = useState("")

  useEffect(() => {
    dispatch(getReels())
  }, [dispatch])

  const AddComment = async () => {
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

  return (
    <div className="bg-black min-h-screen flex flex-col items-center overflow-y-scroll snap-y snap-mandatory h-screen scrollbar-hide">
      {openPostId && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 w-full max-w-[400px] h-[500px] rounded-xl flex flex-col">
            <div className="p-3 border-b border-zinc-700 flex justify-between items-center text-white">
              <span className="font-semibold">Comments</span>
              <button onClick={() => setOpenPostId(null)}>✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-4 text-white">
              {data?.find((p: any) => Number(p.postId) === Number(openPostId))
                ?.comments?.map((c: any, i: number) => (
                  <div key={i} className="flex gap-3">
                    <img
                      key={i}
                      src={c.userImage
                        ? `https://instagram-api.softclub.tj/images/${c.userImage}`
                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                      className="w-8 h-8 rounded-full object-cover bg-zinc-800 flex-shrink-0"
                      alt="user"
                    />
                    <div>
                      <p className="text-sm font-semibold">{c.userName || "User"}</p>
                      <p className="text-sm text-gray-300">{c.comment}</p>
                    </div>
                  </div>
                ))}
            </div>

            <div className="p-3 border-t border-zinc-700 flex gap-2">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm outline-none"
              />
              <button onClick={AddComment} className="text-blue-500 font-semibold text-sm">
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 py-2">
        {data?.map((elem: any) => (
          <div key={elem.postId} className="relative w-[400px] h-[calc(100vh-40px)] bg-zinc-900 rounded-xl overflow-hidden snap-center shadow-2xl flex items-center justify-center border border-zinc-800">
            <video
              src={`https://instagram-api.softclub.tj/images/${elem.images[0]}`}
              className="w-full h-full object-cover"
              loop muted autoPlay
              onClick={(e) => (e.currentTarget.paused ? e.currentTarget.play() : e.currentTarget.pause())} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70 pointer-events-none" />

            <div className="absolute bottom-5 left-4 right-14 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white">
                  <img
                    src={elem.userImage
                      ? `https://instagram-api.softclub.tj/images/${elem.userImage}`
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt={elem.userName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-bold text-sm">{elem.userName}</span>
                <button className="border border-white/60 px-3 py-1 rounded-lg text-[12px] font-bold hover:bg-white/10">Follow</button>
              </div>
              <p className="text-sm mb-3 line-clamp-1 font-light">{elem.title || "Amazing content"}</p>
              <div className="flex items-center gap-2 bg-black/40 w-fit p-1.5 rounded-full text-[11px]">
                <Music2 size={12} />
                <span>{elem.userName} • Original Audio</span>
              </div>
            </div>

            <div className="absolute right-2 bottom-6 flex flex-col items-center gap-6 text-white">
              <button onClick={() => dispatch(Postlike(elem.postId))} className="flex flex-col items-center gap-1">
                <Heart className={`w-7 h-7 ${elem.postLike ? "fill-red-500 text-red-500" : "text-white"}`} />
                <span className="text-[12px] font-semibold">{elem.postLikeCount}</span>
              </button>

              <button onClick={() => setOpenPostId(elem.postId)} className="flex flex-col items-center gap-1">
                <MessageCircle className="w-7 h-7" />
                <span className="text-[12px] font-semibold">{elem.commentCount}</span>
              </button>

              <Send className="w-7 h-7" />
              <Bookmark className="w-6 h-6" />
              <MoreHorizontal className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reels