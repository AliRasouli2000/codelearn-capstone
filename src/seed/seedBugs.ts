import { loadEnvConfig } from "@next/env";
import mongoose from "mongoose";
import { connect } from "../dbConfig/dbConfig";
import Bug from "../models/bugModel";
import { bugs } from "../data/bugsSeed";

loadEnvConfig(process.cwd());

const seedBugs = async (): Promise<void> => {
  try {
    await connect();

    await Bug.deleteMany({});
    await Bug.insertMany(bugs);

    console.log(`${bugs.length} bugs inserted successfully.`);

    await mongoose.connection.close();
  } catch (error) {
    console.error(error);
    await mongoose.connection.close();
  }
};

seedBugs();