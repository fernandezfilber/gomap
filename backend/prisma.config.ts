import { defineConfig } from '@prisma/config';
import dotenv from 'dotenv';

dotenv.config(); // Carga tu archivo .env manualmente para estar seguros

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});