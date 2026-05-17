"use client"

import { useState } from "react"
import { Download, Music, AlertCircle, CheckCircle, Loader } from "lucide-react"

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
  const [success, setSuccess] = useState(false)
  const [data, setData] = useState<ResultType | null>(null)

  async function handleDownload() {
    if (!url.trim()) {
      setError("Masukkan URL TikTok terlebih dahulu")
      return
    }

    try {
      setLoading(true)
      setError("")
      setSuccess(false)
      setData(null)

      const response = await fetch(
        `/api/tiktok?url=${encodeURIComponent(url)}`
      )

      const json = await response.json()

      if (!json.status) {
        setError(json.message || "Gagal mengambil video")
        return
      }

      setData(json.result)
      setSuccess(true)
    } catch (err) {
      console.log(err)
      setError("Terjadi kesalahan server. Coba lagi nanti")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setUrl("")
    setData(null)
    setError("")
    setSuccess(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 py-12 md:py-20">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-sm font-medium text-blue-300 mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              TikTok Downloader
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                Download Video TikTok
              </span>
              <span className="block text-slate-300 text-3xl sm:text-4xl mt-2 font-normal">
                Tanpa Watermark
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-400 text-base sm:text-lg max-w-md mx-auto">
              Cepat, ringan, dan mudah digunakan. Unduh video TikTok favorit Anda dengan kualitas terbaik.
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl mb-6">
            {/* Input Section */}
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Paste link TikTok di sini..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !loading) {
                      handleDownload()
                    }
                  }}
                  disabled={loading}
                  className="
                    flex-1
                    h-14
                    px-6
                    rounded-xl
                    bg-slate-700/50
                    border border-slate-600/50
                    text-white
                    text-base
                    placeholder:text-slate-500
                    outline-none
                    focus:border-blue-500/50
                    focus:bg-slate-700/70
                    focus:ring-2
                    focus:ring-blue-500/20
                    transition-all
                    duration-200
                    disabled:opacity-50
                  "
                />

                <button
                  onClick={handleDownload}
                  disabled={loading || !url.trim()}
                  className="
                    h-14
                    px-8
                    rounded-xl
                    bg-gradient-to-r from-blue-500 to-blue-600
                    hover:from-blue-600 hover:to-blue-700
                    active:scale-95
                    transition-all
                    duration-200
                    font-semibold
                    text-base
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    flex
                    items-center
                    justify-center
                    gap-2
                    whitespace-nowrap
                    shadow-lg
                    hover:shadow-blue-500/50
                  "
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Proses...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </>
                  )}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-sm animate-in fade-in slide-in-from-top">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-200 text-sm animate-in fade-in slide-in-from-top">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Video berhasil diunduh!</span>
                </div>
              )}
            </div>
          </div>

          {/* Result Card */}
          {data && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={data.thumbnail}
                    alt={data.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                </div>

                {/* Info */}
                <div className="p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-semibold leading-relaxed break-words mb-8">
                    {data.title}
                  </h2>

                  {/* Download Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                      href={`/api/download?url=${encodeURIComponent(data.video)}&type=video`}
                      className="
                        h-12
                        rounded-xl
                        bg-gradient-to-r from-blue-500 to-blue-600
                        hover:from-blue-600 hover:to-blue-700
                        active:scale-95
                        transition-all
                        duration-200
                        flex
                        items-center
                        justify-center
                        gap-2
                        font-semibold
                        text-base
                        shadow-lg
                        hover:shadow-blue-500/50
                      "
                    >
                      <Download className="w-4 h-4" />
                      Download Video
                    </a>

                    <a
                      href={`/api/download?url=${encodeURIComponent(data.audio)}&type=audio`}
                      className="
                        h-12
                        rounded-xl
                        bg-slate-700/50
                        hover:bg-slate-700/70
                        active:scale-95
                        transition-all
                        duration-200
                        flex
                        items-center
                        justify-center
                        gap-2
                        font-semibold
                        text-base
                        border border-slate-600/50
                      "
                    >
                      <Music className="w-4 h-4" />
                      Download Audio
                    </a>
                  </div>

                  {/* Reset Button */}
                  <button
                    onClick={handleReset}
                    className="
                      w-full
                      mt-4
                      h-10
                      rounded-xl
                      bg-slate-700/30
                      hover:bg-slate-700/50
                      active:scale-95
                      transition-all
                      duration-200
                      text-slate-300
                      hover:text-white
                      text-sm
                      font-medium
                      border border-slate-600/30
                    "
                  >
                    Unduh Video Lain
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Footer Info */}
          <div className="mt-12 text-center text-slate-500 text-sm">
            <p>
              💡 Tip: Copy link dari TikTok dan paste di atas untuk mulai mengunduh
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
