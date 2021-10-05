import express from 'express';
import config from 'config';

import log from './utils/logger';
import connectDB from './utils/db/connect';
import routes from './routes';

const app = express();

const PORT = config.get<number>('PORT');
const HOST = config.get<string>('HOST');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, HOST, async () => {
  log.info(`Listening at http://${HOST}:${PORT}`);

	// connect to MongoDB
  await connectDB();
  // call routes
  routes(app);
});
