
export default function page() {
  return (
    <div className="w-[82%] ml-auto min-h-screen px-10 py-8">
      <div className="flex gap-24">
        <div className="flex-shrink-0">
          <div className="w-40 h-40 rounded-full bg-neutral-300" />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-6">
            <span className="text-xl font-light">username</span>
            <button className="px-4 py-1.5 rounded-lg border text-sm">
              Edit profile
            </button>
            <button className="px-4 py-1.5 rounded-lg border text-sm">
              View archive
            </button>
          </div>

          <div className="flex gap-10 text-sm">
            <span>
              <strong>128</strong> posts
            </span>
            <span>
              <strong>2,341</strong> followers
            </span>
            <span>
              <strong>512</strong> following
            </span>
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <span className="font-semibold">Display Name</span>
            <span>Digital creator</span>
            <span>Bio text goes here with line breaks and emojis</span>
            <span>linkin.bio/username</span>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex gap-12 border-t justify-center text-xs uppercase tracking-widest">
          <div className="py-4 border-t -mt-px">
            Posts
          </div>
          <div className="py-4">Reels</div>
          <div className="py-4">Saved</div>
          <div className="py-4">Tagged</div>
        </div>

        <div className="grid grid-cols-3 gap-1 mt-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-neutral-200"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
