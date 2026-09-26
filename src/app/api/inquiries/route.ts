import { NextResponse } from "next/server";
import { getAllInquiries, createOrderInquiry, updateInquiryStatus } from "@/backend/services/inquiryService";

export async function GET() {
  try {
    const inquiries = getAllInquiries();
    return NextResponse.json({ success: true, data: inquiries });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.customerName || !body.customerPhone) {
      return NextResponse.json({ success: false, error: "Customer name and phone are required" }, { status: 400 });
    }
    const inquiry = createOrderInquiry(body);
    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create inquiry" }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Inquiry ID and status are required" }, { status: 400 });
    }
    const updated = updateInquiryStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Inquiry not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update inquiry" }, { status: 400 });
  }
}
