import mongoose from "mongoose";
import config from "./index.js";

const CONNECTION_URL = `mongodb://0.0.0.0:27017/chatdb`;

console.log("CONNECTION_URL : ", CONNECTION_URL);
mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("connected", () => {
  console.log("Mongo has connected succesfully");
});
db.on("reconnected", () => {
  console.log("Mongo has reconnected");
});
db.on("error", (error) => {
  console.log("Mongo connection has an error", error);
  mongoose.disconnect();
});
db.on("disconnected", () => {
  console.log("Mongo connection is disconnected");
});
