import { NextResponse } from "next/server";
import { getStoreBusinessInfo, updateStoreBusinessInfo } from "@/backend/services/storeService";

export async function GET() {
  try {
    const business = getStoreBusinessInfo();
    return NextResponse.json({ success: true, data: business });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch store info" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = updateStoreBusinessInfo(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update store info" }, { status: 400 });
  }
}
