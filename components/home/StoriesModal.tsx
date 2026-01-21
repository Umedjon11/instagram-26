"use client";

import Stories from "react-insta-stories";
import { stories } from "../../app/data/stories";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
};

export default function StoriesModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white z-50"
      >
        <X size={28} />
      </button>

      <Stories
        stories={stories}
        defaultInterval={3000}
        width={360}
        height={640}
        onAllStoriesEnd={onClose}
      />
    </div>
  );
}
