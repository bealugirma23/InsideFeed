import { toNodeHandler } from "better-auth/node";
import express, { Request, Response } from "express";
import { auth } from "./auth";
import cors from "cors";


const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
app.use("/api/auth", toNodeHandler(auth));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
