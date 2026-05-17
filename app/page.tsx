"use client"

import { useState } from "react"

type ResultType = {
  title: string
  thumbnail: string
  video: string
  audio: string
}

// Inline SVG Icon Components
const Download = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
)

const Music = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19V6l12-3v13m-12 0a3 3 0 11-6 0 3 3 0 016 0zm0 0h12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const AlertCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth={2} />
    <line x1="12" y1="8" x2="12" y2="12" strokeWidth={2} strokeLinecap="round" />
    <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth={2} strokeLinecap="round" />
  </svg>
)

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const Loader = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth={2} opacity="0.25" />
    <path strokeWidth={3} strokeDasharray="15.7" strokeDashoffset="0" d="M12 2a10 10 0 0110 10" strokeLinecap="round" />
  </svg>
)

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
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-900 relative overflow-x-hidden">
      {/* Background decoration - Lebih hidup dan kontras */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-60 left-1/3 w-[300px] h-[300px] bg-rose-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 py-10 md:py-20 max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-6 backdrop-blur-md shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            v2.0 Premium Downloader
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight leading-none">
            <span className="bg-gradient-to-r from-cyan-400 via-teal-200 to-rose-400 bg-clip-text text-transparent">
              TikTok Downloader
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto font-medium">
            Simpan video favoritmu tanpa watermark. Cepat, gratis, dan kualitas HD terbaik.
          </p>
        </div>

        {/* Main Input Box */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl mb-8 ring-1 ring-white/5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Tempel tautan video TikTok di sini..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading) {
                    handleDownload()
                  }
                }}
                disabled={loading}
                className="
                  w-full
                  h-16
                  pl-5
                  pr-5
                  rounded-2xl
                  bg-slate-950/80
                  border-2 border-slate-800
                  text-white
                  text-lg
                  placeholder:text-slate-600
                  outline-none
                  focus:border-cyan-500/50
                  focus:ring-4
                  focus:ring-cyan-500/10
                  transition-all
                  duration-200
                  disabled:opacity-50
                  font-medium
                "
              />
            </div>

            <button
              onClick={handleDownload}
              disabled={loading || !url.trim()}
              className="
                h-16
                sm:px-8
                w-full sm:w-auto
                rounded-2xl
                bg-gradient-to-r from-cyan-500 to-blue-600
                hover:from-cyan-400 hover:to-blue-500
                disabled:from-slate-800 disabled:to-slate-800
                active:scale-[0.98]
                transition-all
                duration-200
                font-bold
                text-base
                text-slate-950
                disabled:text-slate-600
                disabled:cursor-not-allowed
                flex
                items-center
                justify-center
                gap-2
                whitespace-nowrap
                shadow-lg shadow-cyan-500/10
              "
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Ambil Video</span>
                </>
              )}
            </button>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="flex items-center gap-3 p-4 mt-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm font-medium animate-in fade-in zoom-in-95 duration-200">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-3 p-4 mt-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium animate-in fade-in zoom-in-95 duration-200">
              <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-400" />
              <span>Tautan berhasil dianalisis!</span>
            </div>
          )}
        </div>

        {/* Result Card */}
        {data && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-300">
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/5">
              <div className="flex flex-col md:flex-row">
                
                {/* Thumbnail Side */}
                <div className="relative w-full md:w-48 aspect-[4/3] md:aspect-square bg-slate-950 flex-shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-slate-800">
                  <img
                    src={data.thumbnail}
                    alt={data.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent md:hidden" />
                </div>

                {/* Info & Buttons Side */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 min-w-0">
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block mb-1">Siap Diunduh</span>
                    <h2 className="text-lg font-bold leading-snug text-slate-100 line-clamp-2 sm:line-clamp-3 break-words">
                      {data.title || "Video TikTok Tanpa Judul"}
                    </h2>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href={`/api/download?url=${encodeURIComponent(data.video)}&type=video`}
                        className="
                          h-14
                          rounded-xl
                          bg-gradient-to-r from-rose-500 to-pink-600
                          hover:from-rose-400 hover:to-pink-500
                          active:scale-[0.98]
                          transition-all
                          duration-200
                          flex
                          items-center
                          justify-center
                          gap-2
                          font-bold
                          text-white
                          shadow-lg shadow-rose-500/10
                        "
                      >
                        <Download className="w-5 h-5" />
                        Download Video
                      </a>

                      <a
                        href={`/api/download?url=${encodeURIComponent(data.audio)}&type=audio`}
                        className="
                          h-14
                          rounded-xl
                          bg-slate-800
                          hover:bg-slate-700
                          active:scale-[0.98]
                          transition-all
                          duration-200
                          flex
                          items-center
                          justify-center
                          gap-2
                          font-semibold
                          text-slate-200
                          border border-slate-700
                        "
                      >
                        <Music className="w-5 h-5 text-cyan-400" />
                        Download Audio
                      </a>
                    </div>

                    <button
                      onClick={handleReset}
                      className="
                        w-full
                        h-11
                        rounded-xl
                        bg-slate-950
                        hover:bg-slate-900
                        active:scale-[0.98]
                        transition-all
                        duration-200
                        text-slate-400
                        hover:text-white
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        border border-slate-800
                      "
                    >
                      Mulai Ulang / Cari Lagi
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-slate-600 text-xs font-medium">
            Pastikan tautan yang dimasukkan bersifat publik dan valid.
          </p>
        </div>

      </div>
    </main>
  )
}

