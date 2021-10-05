import { connect } from "mongoose";
import dotenv from 'dotenv';
import log from '../logger';

dotenv.config();

const connectDB = async () => {
  const DB_URI: string = process.env.DB_URI as string;
	try {
		await connect(DB_URI);
		log.info("Connected to MongoDB!");
	} catch (e: any) {
		log.error("Couldn't connect to MongoDB!", e.message);
		process.exit(1);
	}
}

export default connectDB;
