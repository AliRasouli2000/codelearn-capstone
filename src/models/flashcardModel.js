import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
    front: String,
    back: String
});

const Flashcard = mongoose.models.Flashcard || mongoose.model("Flashcard", flashcardSchema);

export default Flashcard;