"use client"

import { useRef, useState } from "react"
import { X, Image as ImageIcon, Video } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

export default function UploadPostModal() {
  const [open, setOpen] = useState(true)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFile = (f: File) => {
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0])
    }
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const isVideo = file?.type.startsWith("video")

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-105 overflow-hidden rounded-xl bg-[#262626] text-white"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="font-semibold">Create new post</p>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              className="flex h-105 cursor-pointer flex-col items-center justify-center gap-4"
            >
              {preview ? (
                isVideo ? (
                  <video
                    src={preview}
                    controls
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={preview}
                    alt="preview"
                    className="h-full w-full object-cover"
                  />
                )
              ) : (
                <>
                  <div className="flex gap-3">
                    <ImageIcon size={48} />
                    <Video size={48} />
                  </div>
                  <p className="text-lg">Drag photos and videos here</p>
                  <button
                    type="button"
                    className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold"
                  >
                    Select from computer
                  </button>
                </>
              )}

              <input
                ref={inputRef}
                type="file"
                hidden
                accept="image/*,video/*"
                onChange={onChange}
              />
            </div>

            {file && (
              <div className="flex justify-end border-t border-white/10 px-4 py-3">
                <button className="font-semibold text-blue-500">
                  Next
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
