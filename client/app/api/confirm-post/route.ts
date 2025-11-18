import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  if (!id || !token) {
    return NextResponse.redirect(new URL("/posts?error=invalid", request.url));
  }

  try {
    // Valida o token (implementar validação real)
    const postId = parseInt(id);

    await db.post.update({
      where: { id: postId },
      data: { confirmed: true },
    });

    return NextResponse.redirect(
      new URL("/posts?success=confirmed", request.url)
    );
  } catch (error) {
    return NextResponse.redirect(new URL("/posts?error=failed", request.url));
  }
}
