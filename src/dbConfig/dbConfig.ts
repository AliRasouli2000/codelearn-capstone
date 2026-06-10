import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        if (connection.listenerCount("connected") === 0) {
            connection.on("connected", () => {
                console.log("MongoDB connected successfully");
            })
        }

        if (connection.listenerCount("error") === 0) {
            connection.on("error", (err) => {
                console.log("MongoDB connection error, Please make sure MongoDB is running. " + err);
                process.exit();
            })
        }

    } catch (err) {
        console.log("Something went wrong!");
        console.log(err);
    }
}

