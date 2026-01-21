'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReels } from '@/reducers/reels'
import { RootState, AppDispatch } from '@/store/store'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react' 

const Reels = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data } = useSelector((state: RootState) => state.reels)

  useEffect(() => {
    dispatch(getReels())
  }, [dispatch])

  return (
    <div className="bg-black min-h-screen flex flex-col items-center overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      <div className="flex flex-col gap-5 py-5 ml-[70px]"> 
        {data?.map((reel: any) => (
          <div
            key={reel.postId}
            className="relative w-[400px] h-[750px] bg-zinc-900 rounded-lg flex items-center snap-center shadow-2xl"
          >
            <video
              src={`https://instagram-api.softclub.tj/images/${reel.images}`}
              className="w-full h-full object-cover rounded-md"
              loop
              muted
              autoPlay
              onClick={(e) => (e.currentTarget.paused ? e.currentTarget.play() : e.currentTarget.pause())}
            />
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-zinc-500">
                  <img 
                    src={reel.userImage ? `https://instagram-api.softclub.tj/images/${reel.userImage}` : "https://via.placeholder.com/150"} 
                    alt="user" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-sm">{reel.userName}</span>
                <button className="border border-white px-3 py-1 rounded-md text-xs font-bold hover:bg-white/20 transition">
                  Подписаться
                </button>
              </div>
              <p className="text-sm line-clamp-2">Текст барои пост ё тавсифи видео... #reels #trending</p>
            </div>
            <div className="absolute right-[-50px] bottom-10 flex flex-col items-center gap-6 text-white">
              <div className="flex flex-col items-center gap-1 cursor-pointer group">
                <Heart className="w-7 h-7 group-hover:text-zinc-400" />
                <span className="text-[12px]">15.9K</span>
              </div>
              <div className="flex flex-col items-center gap-1 cursor-pointer group">
                <MessageCircle className="w-7 h-7 group-hover:text-zinc-400" />
                <span className="text-[12px]">350</span>
              </div>
              <div className="flex flex-col items-center gap-1 cursor-pointer">
                <Send className="w-7 h-7" />
              </div>
              <div className="flex flex-col items-center gap-1 cursor-pointer">
                <Bookmark className="w-7 h-7" />
              </div>
              <div className="cursor-pointer mt-2">
                <MoreHorizontal className="w-7 h-7" />
              </div>
              <div className="w-6 h-6 rounded-md border-2 border-white overflow-hidden mt-4">
                 <img src="https://via.placeholder.com/50" alt="audio-thumb" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reels