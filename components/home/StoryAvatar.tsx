"use client";


type Props = {
  onClick: () => void;
};

export default function StoryAvatar({ onClick }: Props) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 pl-0.75 pr-0.75 cursor-pointer">
      <div className="p-[3px] rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-400">
        <div className="bg-white p-[3px] rounded-full">
          <div className="relative w-14 h-14 rounded-full overflow-hidden">
            <img
              src="/women.jpg"
              alt="story"
              className="object-cover"
            />
          </div>
        </div>
      </div>

        <span className="text-[14px] font-normal text-[#1F2937]">your story</span>
    </button>
  );
}
