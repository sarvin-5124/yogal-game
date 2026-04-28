import express from "express";
import cors from "cors";
import gameRoutes from "./routes/game.routes.ts";
import signupRoutes from "./routes/signup.routes.ts";
import statsRoutes from "./routes/stats.routes.ts";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/game", gameRoutes);
app.use("/api/signup", signupRoutes);
app.use("/data", statsRoutes);

app.get("/health", (_req, res) => res.json({ ok: true }));

export default app;
