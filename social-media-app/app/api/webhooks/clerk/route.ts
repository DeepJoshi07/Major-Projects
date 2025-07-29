import prisma from "@/library/client";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const { id } = evt.data;
    const eventType = evt.type;
    if (eventType === "user.created") {
      try {
        await prisma.user.create({
          data: {
            id:id as string,
            username: evt.data.username!,
            avatar: evt.data.image_url || "/noAvatar.png",
            cover: "/noAvatar.png",
          },
        });
        return new Response("User has been created!", { status: 200 });
      } catch (error) {
        console.log(error);
        return new Response("Failed to create the user!", { status: 500 });
      }
    }
    if (eventType === "user.updated") {
      try {
        await prisma.user.update({
          where:{
            id
          },
          data:{
            username: evt.data.username!,
            avatar: evt.data.image_url || "/noAvatar.png"
          }
        });
        return new Response("User has been created!", { status: 200 });
      } catch (error) {
        console.log(error);
        return new Response("Failed to create the user!", { status: 500 });
      }
    }
    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
