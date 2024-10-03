// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import { WebhookEvent } from "@clerk/nextjs/server";
// import { createUser, deleteUser, updateUser } from "@/lib/actions/user.action";

// export async function POST(req: Request) {
//   const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;

//   if (!WEBHOOK_SECRET) {
//     throw new Error(
//       "Please add webhook_secrete from clerk dashboard to .env.local"
//     );
//   }

//   const headerPayload = headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response("Error occured -- no svix headers", {
//       status: 400,
//     });
//   }
//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   const wh = new Webhook(WEBHOOK_SECRET);

//   let evt: WebhookEvent;

//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     }) as WebhookEvent;
//   } catch (error) {
//     console.error("Error verifying webhook: ", error);
//     return new Response("Error occured", {
//       status: 400,
//     });
//   }

//   const { id } = evt.data;
//   const eventType = evt.type;

//   if (eventType === "user.created") {
//     const { id, email_addresses, image_url, username, first_name, last_name } =
//       evt.data;

//     const mongoUser = await createUser({
//       clerkId: id,
//       name: `${first_name} ${last_name ? ` ${last_name}` : ""}`,
//       username: username!,
//       email: email_addresses[0].email_address,
//       picture: image_url,
//     });

//     return Response.json({ message: "OK", user: mongoUser });
//   }

//   if (eventType === "user.updated") {
//     const { id, email_addresses, image_url, username, first_name, last_name } =
//       evt.data;

//     const mongoUser = await updateUser({
//       clerkId: id,
//       updateData: {
//         name: `${first_name} ${last_name ? ` ${last_name}` : ""}`,
//         username: username!,
//         email: email_addresses[0].email_address,
//         picture: image_url,
//       },
//       path: `/profile/${id}`,
//     });

//     return Response.json({ message: "OK", user: mongoUser });
//   }

//   if (eventType === "user.deleted") {
//     const { id } = evt.data;
//     // delete user from database

//     const deletedUser = await deleteUser({ clerkId: id! });

//     return Response.json({ message: "OK", user: deletedUser });
//   }

//   return new Response("", { status: 201 });
// }

// /* eslint-disable camelcase */
// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import { WebhookEvent } from "@clerk/nextjs/server";
// import { createUser, deleteUser, updateUser } from "@/lib/actions/user.action";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
//   const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;

//   if (!WEBHOOK_SECRET) {
//     throw new Error(
//       "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
//     );
//   }

//   // Get the headers
//   const headerPayload = headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response("Error occured -- no svix headers", {
//       status: 400,
//     });
//   }

//   // Get the body
//   // Get the body
//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   // Create a new SVIX instance with your secret.
//   const wh = new Webhook(WEBHOOK_SECRET);

//   let evt: WebhookEvent;

//   // Verify the payload with the headers
//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     }) as WebhookEvent;
//   } catch (err) {
//     console.error("Error verifying webhook:", err);
//     return new Response("Error occured", {
//       status: 400,
//     });
//   }

//   const eventType = evt.type;

//   if (eventType === "user.created") {
//     const { id, email_addresses, image_url, username, first_name, last_name } =
//       evt.data;

//     // Create a new user in your database
//     const mongoUser = await createUser({
//       clerkId: id,
//       name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
//       username: username!,
//       email: email_addresses[0].email_address,
//       picture: image_url,
//     });

//     return NextResponse.json({ message: "OK", user: mongoUser });
//   }

//   if (eventType === "user.updated") {
//     const { id, email_addresses, image_url, username, first_name, last_name } =
//       evt.data;

//     // Create a new user in your database
//     const mongoUser = await updateUser({
//       clerkId: id,
//       updateData: {
//         name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
//         username: username!,
//         email: email_addresses[0].email_address,
//         picture: image_url,
//       },
//       path: `/profile/${id}`,
//     });

//     return NextResponse.json({ message: "OK", user: mongoUser });
//   }

//   if (eventType === "user.deleted") {
//     const { id } = evt.data;

//     const deletedUser = await deleteUser({
//       clerkId: id!,
//     });

//     return NextResponse.json({ message: "OK", user: deletedUser });
//   }

//   return NextResponse.json({ message: "OK" });
// }

import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("Loading environment variables...");

    // Log all environment variables to check if they are loaded
    console.log("All Environment Variables:", process.env);

    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    console.log("Webhook Secret:", WEBHOOK_SECRET);

    if (!WEBHOOK_SECRET) {
      throw new Error(
        "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
      );
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    console.log("SVIX Headers:", {
      svix_id,
      svix_timestamp,
      svix_signature,
    });

    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error("Missing SVIX headers");
      return new Response("Error occurred -- no svix headers", { status: 400 });
    }

    const payload = await req.json();
    console.log("Payload:", payload);

    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
      console.log("Webhook verified successfully:", evt);
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occurred while verifying webhook", {
        status: 400,
      });
    }

    const eventType = evt?.type;
    console.log("Event Type:", eventType);

    if (eventType === "user.created") {
      try {
        const {
          id,
          email_addresses,
          image_url,
          username,
          first_name,
          last_name,
        } = evt.data;
        const mongoUser = await createUser({
          clerkId: id,
          name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
          username: username!,
          email: email_addresses[0].email_address,
          picture: image_url,
        });
        console.log("User created successfully:", mongoUser);
        return NextResponse.json({ message: "OK", user: mongoUser });
      } catch (error) {
        console.error("Error creating user:", error);
        return new Response("Error occurred while creating user", {
          status: 500,
        });
      }
    }

    if (eventType === "user.updated") {
      try {
        const {
          id,
          email_addresses,
          image_url,
          username,
          first_name,
          last_name,
        } = evt.data;
        const mongoUser = await updateUser({
          clerkId: id,
          updateData: {
            name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
            username: username!,
            email: email_addresses[0].email_address,
            picture: image_url,
          },
          path: `/profile/${id}`,
        });
        console.log("User updated successfully:", mongoUser);
        return NextResponse.json({ message: "OK", user: mongoUser });
      } catch (error) {
        console.error("Error updating user:", error);
        return new Response("Error occurred while updating user", {
          status: 500,
        });
      }
    }

    if (eventType === "user.deleted") {
      try {
        const { id } = evt.data;
        const deletedUser = await deleteUser({ clerkId: id! });
        console.log("User deleted successfully:", deletedUser);
        return NextResponse.json({ message: "OK", user: deletedUser });
      } catch (error) {
        console.error("Error deleting user:", error);
        return new Response("Error occurred while deleting user", {
          status: 500,
        });
      }
    }

    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.error("Function crashed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
