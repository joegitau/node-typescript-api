import express from 'express';
import config from 'config';
import log from './logger';
import connect from './db/connect';

const app = express();

const PORT = config.get('PORT') as number;
const HOST = config.get('HOST') as string;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, HOST, () => {
  log.info(`Listening at http://${HOST}:${PORT}`);

	connect();
});
