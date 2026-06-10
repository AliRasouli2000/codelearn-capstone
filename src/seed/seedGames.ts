import { loadEnvConfig } from "@next/env";
import mongoose from "mongoose";
import { connect } from "../dbConfig/dbConfig";
import Game from "../models/gameModel";
import { Games } from "../data/gamesSeed";

loadEnvConfig(process.cwd());

const seedGames = async (): Promise<void> => {
	try {
		await connect();

		await Game.deleteMany({});
		await Game.insertMany(Games);

		console.log(`${Games.length} games inserted successfully.`);

		await mongoose.connection.close();
	} catch (error) {
		console.error(error);
		await mongoose.connection.close();
	}
};

seedGames();
