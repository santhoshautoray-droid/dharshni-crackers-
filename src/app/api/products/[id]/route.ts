import { NextResponse } from "next/server";
import { getProductById, updateProduct, deleteProduct, toggleProductStock } from "@/backend/services/productService";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) {
    return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: product });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  try {
    const body = await request.json();
    if (body.toggleStock) {
      const updated = toggleProductStock(id);
      return NextResponse.json({ success: true, data: updated });
    }
    const updated = updateProduct(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const deleted = deleteProduct(id);
  if (!deleted) {
    return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: "Product deleted" });
}
