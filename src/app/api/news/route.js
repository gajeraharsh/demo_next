import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

export async function GET() {
  const rssUrl = "https://www.justice.gov/news/rss?f[0]=facet_topics:25356";

  try {
    const response = await fetch(rssUrl);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Fetch failed",
          url: rssUrl,
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
          headers: Object.fromEntries(response.headers.entries()),
        },
        { status: response.status }
      );
    }

    const xml = await response.text();
    const json = await parseStringPromise(xml, { explicitArray: false });

    return NextResponse.json({ success: true, data: json });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Fetch or XML parse error",
        url: rssUrl,
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      },
      { status: 500 }
    );
  }
}
