import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;

export async function connectToMongoDB() {
    if (cachedConnection) {
        console.log("Using cached db connection");
        return cachedConnection;
    }
    try {
        const cnx = await mongoose.connect('mongodb://localhost:27017/course-app');
        cachedConnection = cnx.connection;
        console.log("New mongodb connection established");
        return cachedConnection;
    } catch (error) {
        console.log(error);
        throw error;
    }
}