"use client";

export default function InstagramLoading() {
  return (
    <div className="w-[82%] ml-auto min-h-screen px-10 py-8 animate-pulse">
      <div className="flex gap-24">
        <div className="w-[160px] h-[160px] rounded-full bg-gray-300" />

        <div className="flex flex-col gap-5 flex-1">
          <div className="flex items-center gap-6">
            <div className="h-5 w-40 bg-gray-300 rounded" />
            <div className="h-9 w-28 bg-gray-200 rounded-lg" />
            <div className="h-9 w-32 bg-gray-200 rounded-lg" />
          </div>

          <div className="flex gap-10">
            <div className="h-4 w-20 bg-gray-300 rounded" />
            <div className="h-4 w-24 bg-gray-300 rounded" />
            <div className="h-4 w-24 bg-gray-300 rounded" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-4 w-48 bg-gray-300 rounded" />
            <div className="h-4 w-64 bg-gray-200 rounded" />
            <div className="h-4 w-56 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      <div className="mt-16 flex justify-center gap-12 border-t pt-4">
        <div className="h-4 w-20 bg-gray-300 rounded" />
        <div className="h-4 w-20 bg-gray-300 rounded" />
        <div className="h-4 w-20 bg-gray-300 rounded" />
      </div>

      <div className="mt-10 grid grid-cols-3 gap-1">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-gray-300"
          />
        ))}
      </div>
    </div>
  );
}
