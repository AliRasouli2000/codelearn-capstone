import mongoose from "mongoose";

const codeSnippetSchema = new mongoose.Schema({
    code: String
});

const CodeSnippet = mongoose.models.CodeSnippet || mongoose.model("CodeSnippet", codeSnippetSchema);

export default CodeSnippet;