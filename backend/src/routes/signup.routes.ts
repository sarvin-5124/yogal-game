import { Router } from "express";
import { createSignup } from "../controllers/signup.controller.ts";

const router = Router();

router.post("/", createSignup);

export default router;
