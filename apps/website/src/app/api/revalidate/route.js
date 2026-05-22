import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(request) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get("authorization") || "";

    if (!WEBHOOK_SECRET) {
      return NextResponse.json({ message: "Server misconfigured" }, { status: 500 });
    }

    if (authHeader !== `Bearer ${WEBHOOK_SECRET}`) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const docType = body?._type;

    if (docType === "faq" || docType === "faqCategory") {
      revalidateTag("faqs");
    }

    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
