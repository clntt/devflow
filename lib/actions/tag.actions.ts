"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "@/database/tag.model";

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

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const tags = await Tag.find({});

    return { tags };
  } catch (error) {
    console.log(error);
    throw new Error("Error occured while fetching tags");
  }
}

// export async function getAllTags() {
//   try {
//     connectToDatabase();
//   } catch (error) {
//     console.log(error);
//     throw new Error("Error occured while fetching tags");

//   }
// }
