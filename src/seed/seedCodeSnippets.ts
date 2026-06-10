import { loadEnvConfig } from "@next/env";
import mongoose from "mongoose";
import { connect } from "../dbConfig/dbConfig";
import CodeSnippet from "../models/codeSnippetModel";
import { codeSnippets } from "../data/codeSnippetsSeed";

loadEnvConfig(process.cwd());

const seedCodeSnippets = async (): Promise<void> => {
	try {
		await connect();

		await CodeSnippet.deleteMany({});
		await CodeSnippet.insertMany(codeSnippets);

		console.log(`${codeSnippets.length} code snippets inserted successfully.`);

		await mongoose.connection.close();
	} catch (error) {
		console.error(error);
		await mongoose.connection.close();
	}
};

seedCodeSnippets();
