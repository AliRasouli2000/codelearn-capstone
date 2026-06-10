import mongoose from "mongoose";

const bugSchema = new mongoose.Schema({
    code: String,
    missing: String
});

const Bug = mongoose.models.Bug || mongoose.model("Bug", bugSchema);

export default Bug;