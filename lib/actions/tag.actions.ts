"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // find interactions for user and group by tags
    return [
      {
        _id: "1",
        name: "React",
      },
      {
        _id: "2",
        name: "Node.js",
      },
    ];
  } catch (error) {
    console.log(error);
    throw new Error("Error occured while fetching tags");
  }
}
