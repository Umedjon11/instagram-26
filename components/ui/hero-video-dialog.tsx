"use client"

import { useRef, useState } from "react"
import { Image as ImageIcon, Video, MoveLeft } from "lucide-react"
import Image from "next/image"
import imgFilter1 from "../../public/photo_2021-02-15_21-18-40.jpg"
import { Switch } from "./switch"
import { axiosRequest } from "@/utils/axios"
import { useRouter } from "next/navigation"

const FILTERS = {
  none: "",
  clarendon: "contrast(1.2) saturate(1.35)",
  lark: "brightness(1.05) saturate(1.25)",
  moon: "grayscale(1) contrast(1.1)",
}

export default function UploadPostModal() {
  const router = useRouter()
  const [step, setStep] = useState<number>(0)
  const [file, setFile] = useState<any>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [tab, setTab] = useState<1 | 2>(1)
  const [preset, setPreset] = useState(FILTERS.none)
  const [caption, setCaption] = useState("")
  const [caption2, setCaption2] = useState("")
  const [caption3, setCaption3] = useState("")
  const [adjust, setAdjust] = useState({
    brightness: 1,
    contrast: 1,
    saturation: 1,
    temperature: 0,
    fade: 0,
    vignette: 0,
  })

  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => {
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setStep(1)
  }

  const computedFilter = `
    brightness(${adjust.brightness})
    contrast(${adjust.contrast})
    saturate(${adjust.saturation})
    hue-rotate(${adjust.temperature}deg)
    ${preset}
  `

  const AddReels = async () => {
    if (!file) {
      alert("Please select a file first")
      return
    }
    const formData: any = new FormData()
    formData.append("Title", caption)
    formData.append("Content", caption2)
    formData.append("Images", file)

    try {
      await axiosRequest.post("/Post/add-post", formData)
      router.push("/profile")
      console.log("Post added successfully")
    } catch (error) {
      console.error("Error adding post:", error)
      alert("Failed to upload post")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-auto rounded-xl bg-[#262626] text-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          {step > 0 ? (
            <button onClick={() => setStep((s) => (s > 0 ? s - 1 : s))}>
              <MoveLeft />
            </button>
          ) : (
            <div />
          )}
          <div className="font-semibold">
            {step === 0 && <p>Create new post</p>}
            {step === 1 && <p>Edit</p>}
            {step === 2 && <p>Share</p>}
          </div>
          {step < 2 ? (
            <button
              disabled={!file}
              onClick={() => setStep((s) => s + 1)}
              className="font-semibold text-blue-500 disabled:text-blue-500/40"
            >
              Next
            </button>
          ) : (
            <button
              onClick={AddReels}
              className="font-semibold text-blue-500"
            >
              Share
            </button>
          )}
        </div>

        {/* Body */}
        <div className="flex">
          {/* Image Upload / Preview */}
          <div
            onClick={() => step === 0 && inputRef.current?.click()}
            className="relative h-125 w-125 cursor-pointer overflow-hidden"
          >
            {preview ? (
              <>
                <img
                  src={preview}
                  className="h-full w-full object-cover"
                  style={{
                    filter: computedFilter,
                    opacity: 1 - adjust.fade * 0.15,
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    boxShadow: `inset 0 0 ${adjust.vignette * 40}px rgba(0,0,0,0.6)`,
                  }}
                />
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4">
                <div className="flex gap-4">
                  <ImageIcon size={56} />
                  <Video size={56} />
                </div>
                <p className="text-lg">Drag photos and videos here</p>
                <button className="rounded-md bg-[#0095f6] px-4 py-2 text-sm font-semibold">
                  Select from computer
                </button>
              </div>
            )}
            <input
              ref={inputRef}
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => e.target.files && handleFile(e.target.files[0])}
            />
          </div>

          {/* Step 1: Edit */}
          {step === 1 && (
            <div className="w-65 border-l border-white/10 p-3 space-y-3">
              {/* Tabs */}
              <div className="flex">
                <button
                  onClick={() => setTab(1)}
                  className={`w-1/2 pb-2 ${tab === 1 ? "border-b-2 border-white" : "border-b border-white/30"
                    }`}
                >
                  Filters
                </button>
                <button
                  onClick={() => setTab(2)}
                  className={`w-1/2 pb-2 ${tab === 2 ? "border-b-2 border-white" : "border-b border-white/30"
                    }`}
                >
                  Adjust
                </button>
              </div>

              {/* Filters */}
              {tab === 1 && (
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(FILTERS).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setPreset(value)}
                      className="rounded hover:bg-white/10 p-1"
                    >
                      <Image src={imgFilter1} alt="" />
                      <p className="text-center text-sm capitalize">{key}</p>
                    </button>
                  ))}
                </div>
              )}

              {/* Adjust */}
              {tab === 2 && (
                <div>
                  {[
                    ["brightness", 0.8, 1.3, 0.01],
                    ["contrast", 0.8, 1.4, 0.01],
                    ["saturation", 0.7, 1.5, 0.01],
                    ["temperature", -20, 20, 1],
                    ["fade", 0, 1, 0.01],
                    ["vignette", 0, 1, 0.01],
                  ].map(([key, min, max, step]) => (
                    <div key={key as string} className="mb-2">
                      <p className="text-sm capitalize">{key}</p>
                      <input
                        type="range"
                        min={min as number}
                        max={max as number}
                        step={step as number}
                        value={adjust[key as keyof typeof adjust]}
                        onChange={(e) =>
                          setAdjust({ ...adjust, [key]: Number(e.target.value) })
                        }
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Share */}
          {step === 2 && (
            <div className="w-85 border-l border-white/10 bg-black p-4 text-white">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gray-500" />
                <span className="text-sm font-semibold">your username</span>
              </div>

              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
                className="h-40 w-full resize-none bg-transparent text-sm outline-none placeholder:text-gray-500"
                maxLength={2200}
              />
              <div className="mt-2 text-right text-xs text-gray-500">
                {caption.length}/2,200
              </div>

              <div className="mt-4 space-y-3 text-sm text-gray-300">
                <textarea
                  value={caption2}
                  onChange={(e) => setCaption2(e.target.value)}
                  placeholder="Add location"
                  className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-gray-500"
                />
                <textarea
                  value={caption3}
                  onChange={(e) => setCaption3(e.target.value)}
                  placeholder="Add collaborators"
                  className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-gray-500"
                />

                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image width={40} height={40} className="rounded-full" src={imgFilter1} alt="" />
                    <div>
                      <p className="text-xl">nazarovvv.tm</p>
                      <p>Threads · Private</p>
                    </div>
                  </div>
                  <Switch />
                </div>

                <button className="flex w-full items-center justify-between">
                  <span>Accessibility</span>
                  <span>›</span>
                </button>

                <button className="flex w-full items-center justify-between">
                  <span>Advanced settings</span>
                  <span>›</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
