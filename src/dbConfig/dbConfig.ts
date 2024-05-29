import mongoose from "mongoose";
import { env, exit } from "process";

export async function connect() {
  try {
    mongoose.connect(env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected succesfuly!");
    });
    connection.on("error", (err) => {
      console.log("Failed to connect to database: " + err);
      exit();
    });
  } catch (error: any) {
    console.log("Something went wrong!");
    console.log(error);
  }
}
