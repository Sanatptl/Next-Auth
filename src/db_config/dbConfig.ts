import mongoose from "mongoose";

export default async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Database connected succesfully!");
    });

    connection.on("error", (error) => {
      console.log(error.message);
      process.exit();
    });
  } catch (err: any) {
    console.log(
      "something went wrong in database coonectioin @dbconfig:  " + err.message
    );
  }
}
