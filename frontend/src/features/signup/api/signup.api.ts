import axios from "axios";

type SignupTrigger = "POST_SOLVE" | "STREAK_SAVE" | "POSE_GUIDE";

type SignupPayload = {
  name?: string;
  phone?: string;
  email?: string;
  poseId: number;
  cluesUsed: number;
  trigger: SignupTrigger;
};

export const signupApi = {
  submit: (data: SignupPayload): Promise<{ ok: boolean }> =>
    axios.post("http://localhost:3000/api/signup", data).then((r) => r.data),
};
