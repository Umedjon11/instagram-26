"use client";

import { useState } from "react";
import StoryAvatar from "./StoryAvatar";
import StoriesModal from "./StoriesModal";


export default function InstaStoriesCard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-[620px]">
      <StoryAvatar onClick={() => setOpen(true)} />
      {open && <StoriesModal onClose={() => setOpen(false)} />}
    </div>
  );
}
