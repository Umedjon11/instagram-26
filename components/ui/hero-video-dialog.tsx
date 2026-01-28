"use client"

import { useRef, useState, useEffect } from "react"
import { Image as ImageIcon, Video, MoveLeft } from "lucide-react"
import { Switch } from "./switch"
import { axiosRequest } from "@/utils/axios"
import { useRouter } from "next/navigation"
import Image from "next/image"
import imgFilter1 from "../../public/photo_2021-02-15_21-18-40.jpg"

const FILTERS = {
  none: "",
  clarendon: "contrast(1.2) saturate(1.35)",
  lark: "brightness(1.05) saturate(1.25)",
  moon: "grayscale(1) contrast(1.1)",
}

export default function UploadPostModal() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [step, setStep] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isVideo, setIsVideo] = useState(false)
  const [filter, setFilter] = useState(false)
  const [caption, setCaption] = useState("")
  const [caption2, setCaption2] = useState("")
  const [caption3, setCaption3] = useState("")
  const [sound, setSound] = useState(true)

  const [duration, setDuration] = useState(0)
  const [trimEnd, setTrimEnd] = useState(0)
  const [coverTime, setCoverTime] = useState(0)

  const [preset, setPreset] = useState(FILTERS.none)
  const [adjust, setAdjust] = useState({
    brightness: 1,
    contrast: 1,
    saturation: 1,
    temperature: 0,
    fade: 0,
    vignette: 0,
  })

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  const handleFile = (f: File) => {
    setFile(f)
    setIsVideo(f.type.startsWith("video"))
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

  const onLoadedMetadata = () => {
    if (!videoRef.current) return
    setDuration(videoRef.current.duration)
    setTrimEnd(videoRef.current.duration)
  }

  useEffect(() => {
    if (!videoRef.current) return
    if (videoRef.current.currentTime > trimEnd) {
      videoRef.current.currentTime = 0
    }
  }, [trimEnd])

  const submit = async () => {
    if (!file) return
    const fd = new FormData()
    fd.append("Images", file)
    fd.append("Title", caption)
    fd.append("Content", caption2)
    try {
      await axiosRequest.post("/Post/add-post", fd)
      window.location.reload
      router.push("/profile")
    } catch (error) {
      console.error(error);
    }
  }

  const generateThumbnails = (count: number) => {
    if (!preview) return []
    return Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="h-16 w-16 shrink-0 bg-cover bg-center rounded-sm opacity-70"
        style={{ backgroundImage: `url(${preview})`, filter: computedFilter }}
      />
    ))
  }

  return (
    <div className="fixed inset-0 z-1000000000 flex items-center justify-center bg-black/70">
      <div className="overflow-hidden rounded-xl bg-[#262626] text-white">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          {step > 0 ? (
            <button onClick={() => setStep(s => s - 1)}>
              <MoveLeft />
            </button>
          ) : (
            <div />
          )}
          <p className="font-semibold">
            {step === 0 ? "Create" : step === 1 ? "Edit" : "Share"}
          </p>
          {step < 2 ? (
            <button
              disabled={!file}
              onClick={() => setStep(s => s + 1)}
              className="text-blue-500 disabled:opacity-40"
            >
              Next
            </button>
          ) : (
            <button onClick={submit} className="text-blue-500">
              Share
            </button>
          )}
        </div>

        <div className="flex">
          <div
            onClick={() => step === 0 && inputRef.current?.click()}
            className="relative h-125 w-125 cursor-pointer overflow-hidden bg-black"
          >
            {!preview && (
              <div className="flex h-full flex-col items-center justify-center gap-4">
                <div className="flex gap-4">
                  <ImageIcon size={56} />
                  <Video size={56} />
                </div>
                <p className="text-xl font-black">Drag photos and videos here</p>
                <button className="rounded bg-[#0095f6] px-4 py-2 font-semibold">
                  Select from computer
                </button>
              </div>
            )}

            {preview && !isVideo && (
              <img
                src={preview}
                className="h-full w-full object-cover"
                style={{
                  filter: computedFilter,
                  opacity: 1 - adjust.fade * 0.15,
                }}
              />
            )}
            {preview && isVideo && (
              <video
                ref={videoRef}
                src={preview}
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted={!sound}
                onLoadedMetadata={onLoadedMetadata}
                onTimeUpdate={() => {
                  if (
                    videoRef.current &&
                    videoRef.current.currentTime > trimEnd
                  ) {
                    videoRef.current.currentTime = 0
                  }
                }}
              />
            )}

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                boxShadow: `inset 0 0 ${adjust.vignette * 40}px rgba(0,0,0,0.6)`,
              }}
            />

            <input
              ref={inputRef}
              type="file"
              multiple
              hidden
              accept="image/*,video/*"
              onChange={e =>
                e.target.files && handleFile(e.target.files[0])
              }
            />
          </div>
          {step === 1 && (
            <div className="w-85 border-l border-white/10 p-4 space-y-4">
              {!isVideo ? (
                <div>
                  <div className="flex pb-3 border-b-2 mb-1">
                    <p onClick={() => setFilter(false)} className="w-[50%]">Filters</p>
                    <p onClick={() => setFilter(true)} className="w-[50%]">Adjustments</p>
                  </div>
                  {!filter && (
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(FILTERS).map(([k, v]) => (
                        <div key={k} onClick={() => setPreset(v)}>
                          <Image src={imgFilter1} alt="filter img" />
                          <button
                            key={k}
                            onClick={() => setPreset(v)}
                            className="border p-1 text-sm w-full"
                          >
                            {k}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {filter && (
                    <div className="flex flex-col gap-3">
                      {(
                        [
                          "brightness",
                          "contrast",
                          "saturation",
                          "temperature",
                          "fade",
                          "vignette",
                        ] as const
                      ).map(k => (
                        <div className="flex flex-col gap-2">
                          <p>Fade</p>
                          <input
                            className="w-full"
                            key={k}
                            type="range"
                            min={k === "temperature" ? -20 : 0}
                            max={k === "temperature" ? 20 : 1}
                            step={k === "temperature" ? 1 : 0.01}
                            value={adjust[k]}
                            onChange={e =>
                              setAdjust({ ...adjust, [k]: +e.target.value })
                            }
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="w-70 flex">
                    <Image src={imgFilter1} alt="foto" className="h-15" />
                    <Image src={imgFilter1} alt="foto" className="h-15" />
                    <Image src={imgFilter1} alt="foto" className="h-15" />
                    <Image src={imgFilter1} alt="foto" className="h-15" />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    step={0.1}
                    value={coverTime}
                    onChange={e => {
                      const t = +e.target.value
                      setCoverTime(t)
                      if (videoRef.current)
                        videoRef.current.currentTime = t
                    }}
                    className="h-1 w-70 appearance-none rounded-full bg-[#3a3a3a]
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:h-3
                    [&::-webkit-slider-thumb]:w-3
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-white"
                  />
                  <div className="w-70 flex">
                    <Image src={imgFilter1} alt="foto" className="h-15" />
                    <Image src={imgFilter1} alt="foto" className="h-15" />
                    <Image src={imgFilter1} alt="foto" className="h-15" />
                    <Image src={imgFilter1} alt="foto" className="h-15" />
                  </div>
                  <input
                    type="range"
                    min={0.1}
                    max={duration}
                    step={0.1}
                    value={trimEnd}
                    onChange={e => setTrimEnd(+e.target.value)}
                    style={{
                      background: `linear-gradient(
                        to right,
                        #ffffff ${(trimEnd / duration) * 100}%,
                        #3a3a3a ${(trimEnd / duration) * 100}%
                      )`,
                    }}
                    className="h-1 w-70 appearance-none rounded-full
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:h-3
                    [&::-webkit-slider-thumb]:w-3
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:border
                    [&::-webkit-slider-thumb]:border-black"
                  />

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm">Sound</span>
                    <Switch checked={sound} onCheckedChange={setSound} />
                  </div>
                </>
              )}
            </div>
          )}
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
