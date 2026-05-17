import { NextResponse } from "next/server"

export async function GET(req: Request) {

  try {

    const { searchParams } = new URL(req.url)

    const url = searchParams.get("url")

    if (!url) {
      return NextResponse.json({
        status: false,
        message: "url kosong"
      }, { status: 400 })
    }

    const isTikTokUrl =
      url.includes("tiktok.com") ||
      url.includes("vt.tiktok.com")

    if (!isTikTokUrl) {
      return NextResponse.json({
        status: false,
        message: "url tiktok tidak valid"
      }, { status: 400 })
    }

    const controller = new AbortController()

    const timeout = setTimeout(() => {
      controller.abort()
    }, 15000)

    const response = await fetch(
      `https://api.betabotz.eu.org/api/download/tiktok?apikey=${process.env.BETABOTZ_APIKEY}&url=${encodeURIComponent(url)}`,
      {
        signal: controller.signal
      }
    )

    clearTimeout(timeout)

    const data = await response.json()

    if (!data.status || !data.result?.video?.[0]) {
      return NextResponse.json({
        status: false,
        message: "video tidak ditemukan"
      }, { status: 404 })
    }

    return NextResponse.json({
      status: true,
      result: {
        title: data.result.title,
        thumbnail: data.result.thumbnail,
        video: data.result.video?.[0],
        audio: data.result.audio?.[0]
      }
    })

  } catch (err: any) {

    console.error(err)

    if (err.name === "AbortError") {
      return NextResponse.json({
        status: false,
        message: "request timeout"
      }, { status: 408 })
    }

    return NextResponse.json({
      status: false,
      message: "internal server error"
    }, { status: 500 })
  }
}