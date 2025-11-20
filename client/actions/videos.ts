"use server";

import { sendConfirmationEmail } from "@/lib/email";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function listVideos() {
  return await db.video.findMany({
    where: {
      confirmed: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function listAllVideos() {
  return await db.video.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function listPendingVideos() {
  return await db.video.findMany({
    where: {
      confirmed: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createVideo(data: {
  title: string;
  url: string;
  email: string;
  sender: string;
  authors: string[];
}) {
  const video = await db.video.create({
    data: {
      title: data.title,
      url: data.url,
      email: data.email,
      sender: data.sender,
      authors: data.authors,
      confirmed: false,
    },
  });

  // Envia email de confirmação
  await sendConfirmationEmail(data.email, video.id, data.title);

  revalidatePath("/videos");

  return video;
}

export async function confirmVideo(id: number) {
  const video = await db.video.update({
    where: { id },
    data: { confirmed: true },
  });

  revalidatePath("/videos");

  return video;
}

export async function deleteVideo(id: number) {
  await db.video.delete({
    where: { id },
  });

  revalidatePath("/posts");
}

export async function getVideoById(id: number) {
  return await db.video.findUnique({
    where: { id },
  });
}
