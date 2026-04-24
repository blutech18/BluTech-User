import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { submitCommission, commissionSchema } from "@/server/commissions";

interface Props {
  open: boolean;
  onClose: () => void;
}

const PROJECT_TYPES = [
  { value: "web", label: "Web Development" },
  { value: "app", label: "App Development" },
  { value: "uiux", label: "UI / UX Design" },
  { value: "backend", label: "Backend & APIs" },
  { value: "automation", label: "Automation & AI" },
  { value: "other", label: "Other" },
] as const;

type FormState = {
  name: string;
  email: string;
  projectType: (typeof PROJECT_TYPES)[number]["value"];
  budget: string;
  message: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  projectType: "web",
  budget: "",
  message: "",
};

export function ContactModal({ open, onClose }: Props) {
  const submit = useServerFn(submitCommission);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const reset = () => {
    setForm(EMPTY);
    setErrors({});
    setStatus("idle");
    setServerError(null);
  };

  const close = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = commissionSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormState;
        if (k && !fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await submit({ data: parsed.data });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setServerError(res.error ?? "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setServerError("Network error. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            onClick={close}
          />
          <div className="relative flex h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Start a project"
              className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl md:p-9"
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute right-5 top-5 rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>

              {status === "success" ? (
                <div className="py-10 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-700 text-white"
                  >
                    <Check className="h-8 w-8" />
                  </motion.div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">
                    Got it — talk soon.
                  </h3>
                  <p className="mt-3 text-slate-600">
                    Your request landed. I'll get back to you within 1–2 business days.
                  </p>
                  <button
                    onClick={close}
                    className="mt-8 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-sky-600">
                      / Commission
                    </span>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                      Start a project
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      Tell me a little about what you're building.
                    </p>
                  </div>

                  <form onSubmit={onSubmit} className="space-y-4" noValidate>
                    <Field label="Name" error={errors.name}>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        maxLength={100}
                        className="input"
                        placeholder="Jane Doe"
                      />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        maxLength={255}
                        className="input"
                        placeholder="jane@company.com"
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Project type" error={errors.projectType}>
                        <select
                          value={form.projectType}
                          onChange={(e) =>
                            setForm({ ...form, projectType: e.target.value as FormState["projectType"] })
                          }
                          className="input"
                        >
                          {PROJECT_TYPES.map((p) => (
                            <option key={p.value} value={p.value}>
                              {p.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Budget (optional)">
                        <input
                          type="text"
                          value={form.budget}
                          onChange={(e) => setForm({ ...form, budget: e.target.value })}
                          maxLength={50}
                          className="input"
                          placeholder="$10k–$25k"
                        />
                      </Field>
                    </div>
                    <Field label="Project details" error={errors.message}>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={5}
                        maxLength={2000}
                        className="input resize-none"
                        placeholder="What are you building? Any constraints, timelines, or links?"
                      />
                    </Field>

                    {serverError && (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {serverError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-700 px-7 py-3.5 text-base font-medium text-white shadow-[0_10px_40px_-10px_rgba(29,78,216,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_60px_-10px_rgba(29,78,216,0.7)] disabled:opacity-70"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        "Send request"
                      )}
                    </button>
                  </form>
                </>
              )}

              <style>{`
                .input {
                  width: 100%;
                  border-radius: 0.85rem;
                  border: 1px solid rgb(226 232 240);
                  background: rgb(248 250 252);
                  padding: 0.7rem 0.95rem;
                  font-size: 0.95rem;
                  color: rgb(15 23 42);
                  transition: border-color 150ms, background 150ms, box-shadow 150ms;
                  outline: none;
                }
                .input:focus {
                  background: white;
                  border-color: rgb(56 189 248);
                  box-shadow: 0 0 0 4px rgb(186 230 253 / 0.5);
                }
                .input::placeholder { color: rgb(148 163 184); }
              `}</style>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</span>
        {error && <span className="text-xs font-medium text-red-600">{error}</span>}
      </div>
      {children}
    </label>
  );
}
