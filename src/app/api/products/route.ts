import { NextResponse } from "next/server";
import { getAllProducts, createProduct } from "@/backend/services/productService";

export async function GET() {
  try {
    const products = getAllProducts();
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = createProduct(body);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 400 });
  }
}
