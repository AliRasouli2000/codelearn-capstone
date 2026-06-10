import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String
});

const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);

export default Game;