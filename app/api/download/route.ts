import { NextResponse } from "next/server"

export async function GET(req: Request) {

  try {

    const { searchParams } = new URL(req.url)

    const file = searchParams.get("url")

    const type = searchParams.get("type") || "video"

    if (!file) {
      return NextResponse.json({
        status: false
      })
    }

    const response = await fetch(file)

    const buffer = await response.arrayBuffer()

    return new Response(buffer, {
      headers: {
        "Content-Type": type === "audio"
          ? "audio/mpeg"
          : "video/mp4",

        "Content-Disposition":
          `attachment; filename="tiktok.${type === "audio" ? "mp3" : "mp4"}"`
      }
    })

  } catch (err) {

    console.error(err)

    return NextResponse.json({
      status: false
    })
  }
}