"use client"

import { useState } from "react"

type ResultType = {
  title: string
  thumbnail: string
  video: string
  audio: string
}

export default function Home() {

  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [data, setData] = useState<ResultType | null>(null)

  async function handleDownload() {

    if (!url.trim()) {
      setError("url tiktok kosong")
      return
    }

    try {

      setLoading(true)
      setError("")
      setData(null)

      const response = await fetch(
        `/api/tiktok?url=${encodeURIComponent(url)}`
      )

      const json = await response.json()

      if (!json.status) {
        setError(json.message || "gagal mengambil video")
        return
      }

      setData(json.result)

    } catch (err) {

      console.log(err)

      setError("terjadi kesalahan server")

    } finally {

      setLoading(false)

    }
  }

  return (

    <main className="min-h-screen bg-[#07111f] text-white overflow-x-hidden">

      <div className="w-full px-4 sm:px-6 py-12 md:py-16">

        <div className="w-full max-w-6xl mx-auto">

          {/* hero */}

          <div className="text-center mb-10 md:mb-14">

            <div className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-blue-500/10 border border-blue-400/10 text-sm text-blue-300 mb-6">
              tiktok downloader
            </div>

            <h1 className="max-w-5xl mx-auto text-4xl sm:text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-5">
              download video tiktok tanpa watermark
            </h1>

            <p className="text-white/60 text-base sm:text-lg">
              cepat, ringan, dan tanpa ribet.
            </p>

          </div>

          {/* form */}

          <div className="w-full bg-[#0d1b2a] border border-white/5 rounded-[2rem] p-4 sm:p-6">

            <div className="flex flex-col lg:flex-row gap-4 w-full">

              <input
                type="text"
                placeholder="paste url tiktok..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleDownload()
                  }
                }}
                className="
                  w-full
                  min-w-0
                  flex-1
                  h-16
                  px-6
                  rounded-2xl
                  bg-[#101f33]
                  border
                  border-white/10
                  text-white
                  text-lg
                  placeholder:text-white/40
                  outline-none
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/10
                  transition
                "
              />

              <button
                onClick={handleDownload}
                disabled={loading}
                className="
                  w-full
                  lg:w-[220px]
                  h-16
                  rounded-2xl
                  bg-blue-500
                  hover:bg-blue-400
                  active:scale-[0.98]
                  transition
                  font-semibold
                  text-lg
                  disabled:opacity-50
                  shrink-0
                "
              >
                {
                  loading
                    ? "loading..."
                    : "download"
                }
              </button>

            </div>

          </div>

          {/* error */}

          {error && (

            <div className="mt-5 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300">
              {error}
            </div>

          )}

          {/* result */}

          {data && (

            <div className="mt-8 bg-[#0d1b2a] border border-white/5 rounded-[2rem] overflow-hidden">

              <img
                src={data.thumbnail}
                alt={data.title}
                className="w-full aspect-video object-cover"
              />

              <div className="p-6">

                <h2 className="text-xl font-semibold leading-relaxed break-words mb-6">
                  {data.title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <a
                    href={`/api/download?url=${encodeURIComponent(data.video)}&type=video`}
                    className="
                      h-14
                      rounded-2xl
                      bg-blue-500
                      hover:bg-blue-400
                      active:scale-[0.98]
                      transition
                      flex
                      items-center
                      justify-center
                      font-semibold
                    "
                  >
                    download video
                  </a>

                  <a
                    href={`/api/download?url=${encodeURIComponent(data.audio)}&type=audio`}
                    className="
                      h-14
                      rounded-2xl
                      bg-white/10
                      hover:bg-white/20
                      active:scale-[0.98]
                      transition
                      flex
                      items-center
                      justify-center
                      font-semibold
                    "
                  >
                    download audio
                  </a>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </main>
  )
}