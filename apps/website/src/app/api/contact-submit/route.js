import { NextResponse } from "next/server";

const ENQUIRY_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request) {
  if (!ENQUIRY_API_URL) {
    return NextResponse.json(
      { message: "Contact service is unavailable right now." },
      { status: 500 }
    );
  }

  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  let enquiryResponse;

  try {
    enquiryResponse = await fetch(`${ENQUIRY_API_URL}/api/enquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to submit your enquiry right now." },
      { status: 502 }
    );
  }

  let enquiryData = null;

  try {
    enquiryData = await enquiryResponse.json();
  } catch {
    enquiryData = null;
  }

  if (!enquiryResponse.ok) {
    return NextResponse.json(
      { message: enquiryData?.message || "Something went wrong" },
      { status: enquiryResponse.status }
    );
  }

  try {
    const token = crypto.randomUUID();
    const response = NextResponse.json({
      message: enquiryData?.message || "Enquiry submitted successfully.",
      redirectUrl: `/thank-you-contact?token=${token}`,
      enquirySubmitted: true,
      thankYouAccessGranted: true,
    });

    response.cookies.set("contact_thank_you_token", token, {
      httpOnly: true,
      maxAge: 120,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        message:
          enquiryData?.message ||
          "Enquiry submitted successfully. We could not open confirmation page, but your message was received.",
        redirectUrl: null,
        enquirySubmitted: true,
        thankYouAccessGranted: false,
      },
      { status: 201 }
    );
  }
}
