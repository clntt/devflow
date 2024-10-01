import mongoose from "mongoose";
// 1orRK1UZ0fZclz7L

// mongodb+srv://cconnery14:<db_password>@cluster0.ci6yt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strict", true);

  if (!process.env.MONGODB_URI) {
    return console.log("missing MONGODB_URI");
  }

  if (isConnected) {
    return console.log("MongodDB is already connected");
  }

  try {
    mongoose.connect(process.env.MONGODB_URI, {
      dbName: "dev-overflow",
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
