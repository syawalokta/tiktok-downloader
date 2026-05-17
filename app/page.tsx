"use client"

import { useState } from "react"

type ResultType = {
  title: string
  thumbnail: string
  video: string
  audio: string
}

// Modern, Minimalist Inline SVG Icons
const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
)

const MusicIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13m-12 0a3 3 0 11-6 0 3 3 0 016 0zm0 0h12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const AlertIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
)

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const LoaderIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="10" strokeWidth={2} opacity="0.2" />
    <path strokeWidth={2} strokeDasharray="15.7" strokeDashoffset="0" d="M12 2a10 10 0 0110 10" strokeLinecap="round" />
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
      setError("Paste valid TikTok URL first.")
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
        setError(json.message || "Failed to fetch video.")
        return
      }

      setData(json.result)
      setSuccess(true)
    } catch (err) {
      console.log(err)
      setError("Server error. Please try again later.")
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
    <main className="min-h-screen bg-sky-950 text-white font-sans antialiased relative overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-400 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-sky-300 blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-60 h-60 rounded-full bg-blue-500 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full px-5 py-12 md:py-24 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header - Compact & Strong */}
        <header className="text-center mb-16 w-full max-w-3xl">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest text-sky-200 uppercase mb-5 backdrop-blur-sm shadow-inner">
            TikTok Video Savior v1.2
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-none mb-4">
            Save
            <span className="bg-gradient-to-r from-cyan-300 via-sky-100 to-white bg-clip-text text-transparent">
              {` TikTok `}
            </span>
            Moments.
          </h1>
          <p className="text-sky-100/70 text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed">
            Instantly download TikTok videos without watermark, with the highest quality possible. Pure bliss.
          </p>
        </header>

        {/* Input Section - The Hero Component */}
        <div className="w-full max-w-4xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl ring-1 ring-white/5 mb-10 transition-all duration-300">
          <div className="flex flex-col sm:flex-row gap-4">
            
            {/* Input - Large & Accessible on Mobile */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Paste the video URL here..."
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
                  px-6
                  rounded-2xl
                  bg-sky-950/70
                  border-2 border-white/10
                  text-white
                  text-lg
                  font-medium
                  placeholder:text-sky-300/50
                  outline-none
                  focus:border-cyan-400
                  focus:ring-4
                  focus:ring-cyan-400/20
                  transition-all
                  duration-200
                  disabled:opacity-50
                "
              />
            </div>

            {/* Button - Bold & Responsive */}
            <button
              onClick={handleDownload}
              disabled={loading || !url.trim()}
              className="
                h-16
                px-10
                rounded-2xl
                bg-gradient-to-br from-white to-sky-100
                hover:from-sky-50 hover:to-white
                active:scale-[0.97]
                transition-all
                duration-200
                font-bold
                text-lg
                text-sky-950
                disabled:opacity-50
                disabled:cursor-not-allowed
                flex
                items-center
                justify-center
                gap-2.5
                shadow-lg shadow-white/10
                whitespace-nowrap
              "
            >
              {loading ? (
                <>
                  <LoaderIcon className="w-6 h-6 animate-spin text-sky-950" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <DownloadIcon className="w-6 h-6 text-sky-950" />
                  <span>Get Video</span>
                </>
              )}
            </button>
          </div>

          {/* Feedback Messages - Clean & Modern */}
          {error && (
            <div className="flex items-center gap-3 p-4 mt-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm font-semibold animate-in fade-in zoom-in-95 duration-200">
              <AlertIcon className="w-6 h-6 text-red-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-3 p-4 mt-6 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-100 text-sm font-semibold animate-in fade-in zoom-in-95 duration-200">
              <CheckIcon className="w-6 h-6 text-green-400 flex-shrink-0" />
              <span>Got it! Video is ready for download.</span>
            </div>
          )}
        </div>

        {/* Result Card - The 'Wow' factor */}
        {data && (
          <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/5 flex flex-col md:flex-row">
              
              {/* Thumbnail Container */}
              <div className="relative w-full md:w-2/5 aspect-[4/3] md:aspect-auto bg-black flex-shrink-0">
                <img
                  src={data.thumbnail}
                  alt={data.title}
                  className="w-full h-full object-cover opacity-90 transition-opacity hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
              </div>

              {/* Info & Actions */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-300 block mb-2">Video Title</span>
                  <h2 className="text-xl md:text-2xl font-bold leading-snug text-white line-clamp-2 md:line-clamp-4 break-words">
                    {data.title || "Untiled Video"}
                  </h2>
                </div>

                {/* Download Actions */}
                <div className="mt-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href={`/api/download?url=${encodeURIComponent(data.video)}&type=video`}
                      className="
                        h-14
                        rounded-xl
                        bg-gradient-to-r from-cyan-400 to-blue-500
                        hover:from-cyan-300 hover:to-blue-400
                        active:scale-[0.97]
                        transition-all
                        duration-200
                        flex
                        items-center
                        justify-center
                        gap-2.5
                        font-extrabold
                        text-sky-950
                        shadow-lg shadow-cyan-400/10
                      "
                    >
                      <DownloadIcon className="w-6 h-6" />
                      Save Video
                    </a>

                    <a
                      href={`/api/download?url=${encodeURIComponent(data.audio)}&type=audio`}
                      className="
                        h-14
                        rounded-xl
                        bg-white/5
                        hover:bg-white/10
                        active:scale-[0.97]
                        transition-all
                        duration-200
                        flex
                        items-center
                        justify-center
                        gap-2.5
                        font-bold
                        text-sky-100
                        border border-white/10
                      "
                    >
                      <MusicIcon className="w-6 h-6 text-cyan-300" />
                      Save Audio
                    </a>
                  </div>

                  <button
                    onClick={handleReset}
                    className="
                      w-full
                      h-11
                      rounded-lg
                      text-sky-300/70
                      hover:text-white
                      font-bold
                      text-xs
                      uppercase
                      tracking-widest
                      transition-colors
                      duration-150
                    "
                  >
                    Reset & Download Another
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Minimal Footer */}
        <footer className="mt-20 text-center w-full max-w-md">
          <p className="text-sky-300/40 text-xs font-semibold">
            By using this tool, you agree to not use it for infringing copyright material. Use responsibly.
          </p>
        </footer>
      </div>
    </main>
  )
}
