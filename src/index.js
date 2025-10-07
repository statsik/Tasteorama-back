import { startServer } from './server.js';
import { initMongoConnection } from './db/initMongoConection.js';

const bootstrap = async () => {
  await initMongoConnection();
  startServer();
};

bootstrap();

