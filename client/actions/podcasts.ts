"use server";

import { sendConfirmationEmail } from "@/lib/email";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function listAllPodcasst() {
  return await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createPodcast(data: {
  title: string;
  pathFile: string;
  email: string;
  sender: string;
  authors: string[];
}) {
  const post = await db.post.create({
    data: {
      title: data.title,
      content: data.pathFile,
      email: data.email,
      sender: data.sender,
      authors: data.authors,
      confirmed: false,
    },
  });

  // Envia email de confirmação
  await sendConfirmationEmail(data.email, post.id, data.title);

  revalidatePath("/podcasts");

  return post;
}


