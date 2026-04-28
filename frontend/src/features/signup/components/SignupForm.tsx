import { useState } from "react";
import { signupApi } from "../api/signup.api";
import { Button } from "../../../shared/components/Button";

type SignupTrigger = "POST_SOLVE" | "STREAK_SAVE" | "POSE_GUIDE";

type Props = {
  poseId: number;
  poseName: string;
  cluesUsed: number;
  trigger: SignupTrigger;
};

const NAME_RE = /^[\p{L}][\p{L}\s.'-]*$/u;
const PHONE_DIGITS_RE = /^(91)?[6-9]\d{9}$/;

function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) return "Name is required.";
  if (trimmed.length < 2) return "Name must be at least 2 characters.";
  if (!NAME_RE.test(trimmed))
    return "Use letters, spaces, hyphens, or apostrophes only.";
  return null;
}

function validatePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "Phone number is required.";
  if (!PHONE_DIGITS_RE.test(digits)) {
    return "Enter a 10-digit Indian mobile number (starts with 6–9).";
  }
  return null;
}

export function SignupForm({ poseId, poseName, cluesUsed, trigger }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState({ name: false, phone: false });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(
    () => !!localStorage.getItem("yogal_signed_up"),
  );

  if (done) {
    return (
      <p className="text-center text-sm font-medium text-green-700">
        🙏 You're in! We'll reach out soon.
      </p>
    );
  }

  const nameError = validateName(name);
  const phoneError = validatePhone(phone);
  const showNameError = touched.name && nameError;
  const showPhoneError = touched.phone && phoneError;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, phone: true });
    if (nameError || phoneError) return;

    setLoading(true);
    try {
      await signupApi.submit({
        name: name.trim(),
        phone: phone.replace(/\D/g, ""),
        poseId,
        cluesUsed,
        trigger,
      });
      localStorage.setItem("yogal_signed_up", "1");
      setDone(true);
    } catch {
      // silent — don't block user
      localStorage.setItem("yogal_signed_up", "1");
      setDone(true);
    }
  }

  const inputBase =
    "w-full rounded-lg border bg-white px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-none";
  const okBorder = "border-stone-200 focus:border-green-400";
  const errBorder = "border-red-400 focus:border-red-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-2" noValidate>
      <div>
        <input
          type="text"
          placeholder="Your name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          required
          aria-invalid={!!showNameError}
          className={`${inputBase} ${showNameError ? errBorder : okBorder}`}
        />
        {showNameError && (
          <p className="mt-1 text-xs text-red-600">{nameError}</p>
        )}
      </div>
      <div>
        <input
          type="tel"
          inputMode="tel"
          placeholder="Phone number *"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
          required
          aria-invalid={!!showPhoneError}
          className={`${inputBase} ${showPhoneError ? errBorder : okBorder}`}
        />
        {showPhoneError && (
          <p className="mt-1 text-xs text-red-600">{phoneError}</p>
        )}
      </div>
      <Button
        type="submit"
        disabled={loading || !!nameError || !!phoneError}
        className="w-full justify-center"
      >
        {loading ? "Saving…" : `Practice ${poseName} with Habuild →`}
      </Button>
    </form>
  );
}
