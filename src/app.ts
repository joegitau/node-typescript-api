import config from 'config';
import express from 'express';

import routes from './routes';
import log from './utils/logger';
import connectDB from './utils/db/connect';
import deserializeUser from './middleware/deserializeUser';


const app = express();

const PORT = config.get<number>('PORT');
const HOST = config.get<string>('HOST');

app.use(express.json());
app.use(deserializeUser);

app.listen(PORT, HOST, async () => {
  log.info(`Listening at http://${HOST}:${PORT}`);

  // connect to MongoDB
  await connectDB();
  // call routes
  routes(app);
});
