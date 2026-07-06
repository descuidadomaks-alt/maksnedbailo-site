/**
 * IP-geo lookup for oh4's location-personalized copy. Reads Vercel's
 * request-geo headers (populated automatically on Vercel's edge — empty in
 * local dev / other hosts, which is when the client falls back to ipapi.co).
 */

import { NextRequest, NextResponse } from "next/server";

function titleCase(s: string): string {
  return s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

export async function GET(request: NextRequest) {
  const rawCity = request.headers.get("x-vercel-ip-city");
  const region = request.headers.get("x-vercel-ip-country-region");
  const country = request.headers.get("x-vercel-ip-country");

  const city = rawCity ? titleCase(decodeURIComponent(rawCity)) : null;

  return NextResponse.json({ city, region, country });
}
