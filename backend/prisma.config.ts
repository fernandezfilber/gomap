import { defineConfig } from 'prisma/config'   // o sin import si usas CommonJS

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
})