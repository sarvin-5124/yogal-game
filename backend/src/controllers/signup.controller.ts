import type { Request, Response } from "express";
import { signupService } from "../services/signup.service.ts";
import { SignupTrigger } from "@prisma/client";

export async function createSignup(req: Request, res: Response) {
  const { name, phone, email, poseId, cluesUsed, trigger } = req.body as {
    name?: string;
    phone?: string;
    email?: string;
    poseId: number;
    cluesUsed: number;
    trigger: SignupTrigger;
  };

  if (!poseId || cluesUsed === undefined || !trigger) {
    res
      .status(400)
      .json({ error: "poseId, cluesUsed, and trigger are required." });
    return;
  }

  if (!name || !name.trim()) {
    res.status(400).json({ error: "Name is required." });
    return;
  }

  if (!phone && !email) {
    res
      .status(400)
      .json({ error: "At least one of phone or email is required." });
    return;
  }

  if (phone && !/^(91)?[6-9]\d{9}$/.test(phone.replace(/\D/g, ""))) {
    res
      .status(400)
      .json({ error: "Phone must be a valid 10-digit Indian mobile number." });
    return;
  }

  try {
    const result = await signupService.createSignup({
      name,
      phone,
      email,
      poseId,
      cluesUsed,
      trigger,
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
