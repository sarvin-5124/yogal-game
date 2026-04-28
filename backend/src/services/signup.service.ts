import prisma from "../prisma/client.ts";
import { SignupTrigger } from "@prisma/client";

type CreateSignupInput = {
  name?: string;
  phone?: string;
  email?: string;
  poseId: number;
  cluesUsed: number;
  trigger: SignupTrigger;
};

export const signupService = {
  async createSignup(input: CreateSignupInput) {
    if (!input.phone && !input.email) {
      throw new Error("At least one of phone or email is required.");
    }
    await prisma.signup.create({ data: input });
    return { ok: true };
  },
};
