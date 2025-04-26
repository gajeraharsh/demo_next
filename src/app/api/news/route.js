import { NextResponse } from 'next/server';
import { parseStringPromise } from 'xml2js';

export async function GET() {
  try {
    const rssUrl = 'https://www.justice.gov/news/rss?f[0]=facet_topics:25356';

    // Fetch the RSS feed
    const response = await fetch(rssUrl);
    const xml = await response.text();

    // Parse XML to JSON
    const json = await parseStringPromise(xml, { explicitArray: false });

    return NextResponse.json({ success: true, data: json });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error parsing RSS feed', error: error.message }, { status: 500 });
  }
}
