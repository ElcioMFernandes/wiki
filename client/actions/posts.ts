"use server";

import { sendConfirmationEmail } from "@/lib/email";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function listPosts() {
  return await db.post.findMany({
    where: {
      confirmed: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function listAllPosts() {
  return await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function listPendingPosts() {
  return await db.post.findMany({
    where: {
      confirmed: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createPost(data: {
  title: string;
  content: string;
  email: string;
  sender: string;
  authors: string[];
}) {
  const post = await db.post.create({
    data: {
      title: data.title,
      content: data.content,
      email: data.email,
      sender: data.sender,
      authors: data.authors,
      confirmed: false,
    },
  });

  // Envia email de confirmação
  await sendConfirmationEmail(data.email, post.id, data.title);

  revalidatePath("/posts");

  return post;
}

export async function confirmPost(id: number) {
  const post = await db.post.update({
    where: { id },
    data: { confirmed: true },
  });

  revalidatePath("/posts");

  return post;
}

export async function deletePost(id: number) {
  await db.post.delete({
    where: { id },
  });

  revalidatePath("/posts");
}

export async function getPostById(id: number) {
  return await db.post.findUnique({
    where: { id },
  });
}
