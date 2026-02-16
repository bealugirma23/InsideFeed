import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import express, { Request, Response } from "express";
import { auth } from "./auth";
import cors from "cors";
import morgan from "morgan";

const app = express();
const port = 3000;

// 1. Logging
app.use(morgan("dev"));

// 2. CORS - MUST be before routes
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["set-auth-token"],
    credentials: true,
  }),
);

app.use((req, res, next) => {
  if (req.url.startsWith("/api/auth")) {
    console.log(`[Auth Request] ${req.method} ${req.url}`);
  }
  next();
});

// 3. Auth handler (Root mount)
// Place BEFORE express.json() so better-auth can parse the raw stream itself
app.use(toNodeHandler(auth));

// 4. Body parser - for non-auth routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});
// Start server
app.listen(port, () => {
  console.log(`--------------------------------`);
  console.log(`\x1b[32m🚀 Server: running \x1b[0m`);
  console.log(`\x1b[32m🚀 Port: ${port} \x1b[0m`);
  console.log(`--------------------------------`);
});
