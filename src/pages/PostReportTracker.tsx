import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ExternalLink, CheckCircle, Clock, AlertTriangle, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface JurisdictionContent {
  heading: string;
  body: string;
  escalationLabel: string;
  escalationUrl?: string;
  escalationLinkText?: string;
  escalationSuffix?: string;
}

const jurisdictionContent: Record<string, JurisdictionContent> = {
  "United States": {
    heading: "The platform has 48 hours from now.",
    body: "Under the Take It Down Act, Section 3(a)(3), the platform is legally required to remove this content within 48 hours of your report. This is a federal law — not a guideline.",
    escalationLabel: "If they don't act within 48 hours: File a complaint at",
    escalationUrl: "https://www.ftc.gov/complaint",
    escalationLinkText: "ftc.gov/complaint",
    escalationSuffix: " — select \"Report Fraud\" and reference the Take It Down Act, Section 3(a)(3).",
  },
  "United Kingdom": {
    heading: "The platform must act swiftly.",
    body: "Under the Online Safety Act 2023, the platform is legally required to act swiftly now that it has been made aware of this content. There is no fixed hour deadline — but \"swiftly\" is a legal obligation, not a suggestion.",
    escalationLabel: "If they don't act: Use the platform's internal complaints procedure first. If that fails, report to Ofcom at",
    escalationUrl: "https://www.ofcom.org.uk",
    escalationLinkText: "ofcom.org.uk",
  },
  "European Union": {
    heading: "The platform must act in a timely and diligent manner.",
    body: "Under the Digital Services Act, Article 16(6), the platform must process your notice in a timely, diligent, non-arbitrary and objective manner and notify you of the decision. Very Large Online Platforms like Meta, Google and X face fines of up to 6% of global turnover for non-compliance.",
    escalationLabel: "If they don't act: File an internal complaint with the platform under Article 20. If unresolved, contact your country's Digital Services Coordinator under Article 53.",
  },
  India: {
    heading: "The platform has 2 hours from now.",
    body: "Under IT Rules 2021, Rule 3(2)(b) as amended February 2026, the platform is legally required to remove this content within 2 hours. The clock starts from when you submitted — not from when you found the content. You have not run out of time.\n\nIMPORTANT: If you have not yet filed at cybercrime.gov.in — do it now. Filing there simultaneously converts your complaint into a government notification and strengthens your legal position significantly. Call 1930 if you need help.",
    escalationLabel: "If they don't act within 2 hours: Appeal to the Grievance Appellate Committee at",
    escalationUrl: "https://gac.gov.in",
    escalationLinkText: "gac.gov.in within 30 days",
    escalationSuffix: ". File at cybercrime.gov.in now if you haven't already.",
  },
};

const defaultContent: JurisdictionContent = {
  heading: "You've taken action.",
  body: "Your report has been submitted. Response times vary by platform. Keep your evidence saved and check back within 48 hours.",
  escalationLabel: "If they don't act: Contact the Cyber Civil Rights Initiative at",
  escalationUrl: "https://cybercivilrights.org",
  escalationLinkText: "cybercivilrights.org",
  escalationSuffix: " for guidance on next steps.",
};

const waitingSteps = [
  "Screenshot this confirmation and save it somewhere private.",
  "Don't delete any posts you've seen — they're evidence.",
  "Tell one person you trust what's happening, even in a text.",
  "You've already done the hardest part.",
  "The request is in motion. You don't have to watch the clock.",
];

const PostReportTracker = () => {
  const { state } = useLocation();
  const location = (state as any)?.location ?? "";
  const content = jurisdictionContent[location] ?? defaultContent;

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
          <CheckCircle className="mx-auto h-10 w-10 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            You've taken action. Here's what happens next.
          </h1>
        </motion.div>
      </section>

      {/* Content */}
      <section className="flex-1 px-6 py-10 sm:py-14">
        <div className="w-full max-w-2xl mx-auto space-y-6">
          {/* Jurisdiction card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Card className="border-primary/30 bg-card p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-foreground">{content.heading}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                    {content.body}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Escalation card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Card className="border-destructive/30 bg-card p-5 space-y-2">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-destructive uppercase tracking-wide mb-1">
                    If they don't respond
                  </p>
                  <p className="text-sm leading-relaxed text-foreground">
                    {content.escalationLabel}{" "}
                    {content.escalationUrl && (
                      <a
                        href={content.escalationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary underline font-medium"
                      >
                        {content.escalationLinkText} <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {content.escalationSuffix}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* What to do while you wait */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Card className="border-border bg-card p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                <h3 className="text-base font-semibold text-foreground">
                  What to do while you wait
                </h3>
              </div>
              <ul className="space-y-2.5">
                {waitingSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
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

export default PostReportTracker;
