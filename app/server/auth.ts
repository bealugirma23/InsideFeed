import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createAuthMiddleware } from "better-auth/plugins";
import { sendVerificationEmail } from "better-auth/api";
import * as Prisma from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg"

const connectionString = process.env.DATABASE_URL || "postgresql://news_admin:adminpass@localhost:5432/news_db?schema=public"

if (!connectionString) {
  throw new Error('DATABASE_URL must be set');
}

// Create shared database connection pool
const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);

// Initialize Prisma Client
const prisma = new (Prisma as any).PrismaClient({ adapter });

// Get secret from environmentvariables
const secret = process.env.BETTER_AUTH_SECRET || "vSrgdAUWFBbnbsp3MZyOilkHFtoEVtg9";

if (!secret) {
  console.warn(
    "⚠️  WARNING: BETTER_AUTH_SECRET or JWT_SECRET not set. Sessions may not work correctly!",
  );
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  
  // Secret is REQUIRED for session cookie signing/verification
  // Without this, get-session will return null
  secret: secret || "fallback-secret-change-in-production",
  // Base path where Better Auth routes are mounted
  basePath: "/api/auth",
  // Base URL of your application (used for cookie domain/path)
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.BASE_URL ||
    "http://localhost:3000",
  advanced: {
    database: {
      generateId: "uuid",
    },
  },
  trustedOrigins: [
    "http://localhost:3001",
    "http://localhost:5173/#",
    "http://localhost:8888",
    "http://localhost:5173",

    "http://127.0.0.1:8888",
    "http://127.0.0.1:8080",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000",
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
