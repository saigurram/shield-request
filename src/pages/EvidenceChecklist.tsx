import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ShieldCheck, Camera, Clock, Lock, UserCheck } from "lucide-react";

const steps = [
  {
    icon: Camera,
    text: "Screenshot the full browser URL bar — not just the image",
  },
  {
    icon: Clock,
    text: "Screenshot the page showing the content with a visible timestamp",
  },
  {
    icon: ShieldCheck,
    text: "Record the URL, date, and time in a separate document",
  },
  {
    icon: Lock,
    text: "Do not share, interact with, or report via your personal accounts — this prevents the platform from associating your account with the report",
  },
  {
    icon: UserCheck,
    text: "Temporarily lock your personal social media accounts — this prevents the person who posted the content from finding or contacting you",
  },
];

const EvidenceChecklist = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [checked, setChecked] = useState<boolean[]>(Array(5).fill(false));
  const allChecked = checked.every(Boolean);

  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <section className="bg-secondary/50 px-6 py-12 sm:py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-xl mx-auto space-y-3"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Before you send — 5 quick steps
          </h1>
          <p className="text-muted-foreground">
            These protect your case. They take about 3 minutes.
          </p>
        </motion.div>
      </section>

      {/* Checklist */}
      <section className="flex-1 flex items-start justify-center px-6 py-10 sm:py-14">
        <div className="w-full max-w-xl space-y-6">
          <Card className="p-6 border-border bg-card">
            <ol className="space-y-5">
              {steps.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.35 }}
                  className="flex items-start gap-3"
                >
                  <Checkbox
                    id={`step-${i}`}
                    checked={checked[i]}
                    onCheckedChange={() => toggle(i)}
                    className="mt-0.5"
                  />
                  <div className="flex items-start gap-2.5 flex-1">
                    <step.icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <label
                      htmlFor={`step-${i}`}
                      className="text-sm text-foreground leading-snug cursor-pointer select-none"
                    >
                      {step.text}
                    </label>
                  </div>
                </motion.li>
              ))}
            </ol>
          </Card>

          <div className="space-y-3 text-center">
            {allChecked && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  size="lg"
                  className="px-8 py-6 text-base font-semibold w-full sm:w-auto"
                  onClick={() => navigate("/template", { state })}
                >
                  I've documented the evidence. Show me the template →
                </Button>
              </motion.div>
            )}
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => navigate("/template", { state })}
            >
              Skip checklist — go straight to the template →
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 text-center space-y-3">
        <p className="text-sm text-muted-foreground">
          If you are in crisis:{" "}
          <span className="font-medium text-foreground">Cyber Civil Rights Initiative</span>
          {" — "}
          <a href="https://cybercivilrights.org" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary/80">
            cybercivilrights.org
          </a>
          {" · "}
          <a href="tel:8448782274" className="underline text-primary hover:text-primary/80">844-878-2274</a>
        </p>
        <p className="text-xs text-muted-foreground/70">General guidance only. Not legal advice. Last verified March 2026.</p>
      </footer>
    </div>
  );
};

export default EvidenceChecklist;
