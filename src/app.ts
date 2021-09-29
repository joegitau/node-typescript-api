import express from 'express';
import config from 'config';
import log from './logger';

import connectDB from './db/connect';
import authRoutes from './routes/auth';

const app = express();

const PORT = config.get('PORT') as number;
const HOST = config.get('HOST') as string;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', authRoutes);

app.listen(PORT, HOST, () => {
  log.info(`Listening at http://${HOST}:${PORT}`);

	connectDB();
});
