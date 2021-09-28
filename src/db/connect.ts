import mongoose from "mongoose";
import dotenv from 'dotenv';
import log from '../logger';

dotenv.config()


const connect = () => {
  const DB_URI = process.env.DB_URI as string;

	return mongoose
	.connect(DB_URI)
	.then(() => log.info("Connected to MongoDB!"))
	.catch(err => {
		log.error("Couldn't connect to MongoDB!", err);
		process.exit(1);
	});

}

export default connect;
