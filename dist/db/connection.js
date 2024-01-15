import { connect, disconnect } from "mongoose";
async function connecttoDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error("can not connect to database!!");
    }
}
async function disconnectFromDatabase() {
    try {
        await disconnect();
    }
    catch (error) {
        console.log(error);
        throw new Error("can not connect to database!!");
    }
}
export { connecttoDatabase, disconnectFromDatabase };
//# sourceMappingURL=connection.js.map