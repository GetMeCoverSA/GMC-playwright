import dotenv from 'dotenv';
import path from 'path';
import { logger } from './utils/logger';

export default async function globalSetup() {
  const envFile = `.env.${process.env.TEST_ENV || 'test'}`;
  dotenv.config({ path: path.resolve(__dirname, envFile) });
  logger.info(`Loaded environment variables from ${envFile}`);
}