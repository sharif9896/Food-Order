import mongoose from "mongoose";

const mongodb = async () => {
  mongoose.connection.on('connected', () => {
    console.log("DB Connected..");
  });
  await mongoose.connect(`${process.env.MONGO_DB}/foods`)
};
export default mongodb;
