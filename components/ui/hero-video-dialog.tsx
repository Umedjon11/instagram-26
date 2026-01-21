"use client"
import imgFilter1 from '../../public/photo_2021-02-15_21-18-40.jpg'

import { useRef, useState } from "react"
import { X, Image as ImageIcon, Video, MoveLeft } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import Image from 'next/image'

export default function UploadPostModal() {
  const [open, setOpen] = useState(true)
  const [file, setFile] = useState<File | null>(null)
  const [nextt, setNextt] = useState(0)
  const [filter, setFilter] = useState("none")
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
            className="w-auto overflow-hidden rounded-xl bg-[#262626] text-white"
          >
            {!file && (
              <>
                <div className="flex items-center justify-center border-b border-white/10 px-4 py-3">
                  <p className="font-semibold">Create new post</p>
                </div>
              </>
            )}
            {file && (
              <>
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <button><MoveLeft /></button>
                  <p className="font-semibold">Crop</p>
                  <div className="flex justify-end px-4">
                    <button onClick={() => setNextt(1)} className="font-semibold text-blue-500">
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
            <div className="flex">
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
                      style={{ filter }}
                    />

                  )
                ) : (
                  <>
                    <div className="w-104 flex flex-col items-center gap-3">
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
                    </div>
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
              {nextt === 1 && (
                <div className="w-64 border-l border-white/10 p-3 space-y-2">
                  <p className="mb-2 font-semibold">Filters</p>

                  <div
                    onClick={() => setFilter("none")}
                    className="w-full rounded px-2 py-1 hover:bg-white/10"
                  >
                    <Image src={imgFilter1} alt='original image'/>
                    <button>
                      Original
                    </button>
                  </div>

                  <div
                    onClick={() =>
                      setFilter(
                        "brightness(1.1) contrast(1.2) saturate(1.1)"
                      )
                    }
                    className="w-full rounded px-2 py-1 hover:bg-white/10"
                  >
                    <button>
                      Clarendon
                    </button>
                  </div>
                  <div
                    onClick={() =>
                      setFilter(
                        "brightness(1.1) contrast(1.15) saturate(1.15) hue-rotate(-5deg)"
                      )
                    }
                    className="w-full rounded px-2 py-1 hover:bg-white/10"
                  >
                    <button>
                      Lark
                    </button>
                  </div>

                  <div
                    onClick={() =>
                      setFilter(
                        "contrast(1.3) saturate(0.8) grayscale(1)"
                      )
                    }
                    className="w-full rounded px-2 py-1 hover:bg-white/10"
                  >
                    <button>
                      Moon
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end border-t border-white/10 px-4 py-3">
              <Link href={'/profile'}><button className="font-semibold text-blue-500">
                close
              </button></Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}