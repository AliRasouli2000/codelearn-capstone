import { loadEnvConfig } from "@next/env";
import mongoose from "mongoose";
import { connect } from "../dbConfig/dbConfig";
import Flashcard from "../models/flashcardModel";
import { flashcards } from "../data/flashcardsSeed";

loadEnvConfig(process.cwd());

const seedFlashcards = async (): Promise<void> => {
  try {
    await connect();

    await Flashcard.deleteMany({});
    await Flashcard.insertMany(flashcards);

    console.log(`${flashcards.length} flashcards inserted successfully.`);

    await mongoose.connection.close();
  } catch (error) {
    console.error(error);
    await mongoose.connection.close();
  }
};

seedFlashcards();