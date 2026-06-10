import { loadEnvConfig } from "@next/env";
import mongoose from "mongoose";
import { connect } from "../dbConfig/dbConfig";
import Course from "../models/courseModel";
import { courses } from "../data/coursesSeed";

loadEnvConfig(process.cwd());

const seedCourses = async (): Promise<void> => {
  try {
    await connect();

    await Course.deleteMany({});
    await Course.insertMany(courses);

    console.log(`${courses.length} courses inserted successfully.`);

    await mongoose.connection.close();
  } catch (error) {
    console.error(error);
    await mongoose.connection.close();
  }
};

seedCourses();