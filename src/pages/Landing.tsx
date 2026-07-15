import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, type Variants } from "framer-motion";
import { Shield, FileText, Send, Lock, Eye, Globe, Heart } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col">
      {/* ─── Hero ─── */}
      <section className="relative flex flex-col items-center justify-center px-6 py-20 sm:py-28 text-center overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-[0.08]"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div className="relative z-10 max-w-2xl space-y-6">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <Shield className="mx-auto h-10 w-10 text-primary mb-4" />
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground"
          >
            Take a breath. You are in control.
            <br />
            <span className="text-primary">Let's get this removed.</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-lg text-muted-foreground max-w-lg mx-auto"
          >
            Shield helps victims of non-consensual intimate images and videos
            take legal action — in under 60 seconds. Free. Private. No account needed.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <Button
              size="lg"
              className="mt-2 px-8 py-6 text-base font-semibold"
              onClick={() => navigate("/triage")}
            >
              Start my removal request
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ─── Mission ─── */}
      <section className="bg-secondary/50 px-6 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-foreground"
          >
            Why Shield exists
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground leading-relaxed"
          >
            When intimate images or videos are shared without consent, the legal system
            can feel impossible to navigate — especially when you're in crisis.
            Shield turns complex laws into ready-to-send legal templates so you
            can act immediately, without a lawyer, without an account, and
            without spending a cent.
          </motion.p>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="px-6 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center">
            How it works
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Globe,
                step: "1",
                title: "Tell us where you are",
                desc: "Select your country and the platform where the content appears. We'll match you with the right legal framework.",
              },
              {
                icon: FileText,
                step: "2",
                title: "Get your legal template",
                desc: "We generate a jurisdiction-specific removal notice citing the exact law that protects you — ready to copy and send.",
              },
              {
                icon: Send,
                step: "3",
                title: "Submit and track",
                desc: "Send the notice to the platform. We'll tell you the legal deadline and what to do if they don't respond.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="p-6 h-full border-border bg-card space-y-3 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Step {item.step}
                  </p>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Legal coverage ─── */}
      <section className="bg-secondary/50 px-6 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center">
            Legal frameworks we cover
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                flag: "🇺🇸",
                country: "United States",
                law: "Take It Down Act — 48-hour removal deadline",
              },
              {
                flag: "🇬🇧",
                country: "United Kingdom",
                law: "Online Safety Act 2023 — swift removal obligation",
              },
              {
                flag: "🇪🇺",
                country: "European Union",
                law: "Digital Services Act — timely and diligent processing",
              },
              {
                flag: "🇮🇳",
                country: "India",
                law: "IT Rules 2021 — 2-hour removal deadline",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-4 border-border bg-card flex items-start gap-3">
                  <span className="text-2xl">{item.flag}</span>
                  <div>
                    <p className="font-semibold text-foreground">
                      {item.country}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.law}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Platform not listed? We also provide a DMCA-based fallback template
            that works globally.
          </p>
        </div>
      </section>

      {/* ─── Trust signals ─── */}
      <section className="px-6 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center">
            Built for safety
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Lock,
                title: "No data stored",
                desc: "Nothing you type is saved, tracked, or sent anywhere. Your template is generated in your browser.",
              },
              {
                icon: Eye,
                title: "No account needed",
                desc: "No sign-up, no email, no login. Just open the site and start.",
              },
              {
                icon: Heart,
                title: "100% free",
                desc: "Shield is a public resource. No paywalls, no premium tiers, no ads.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="text-center space-y-2"
              >
                <item.icon className="mx-auto h-6 w-6 text-primary" />
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="px-6 py-16 sm:py-20 text-center">
        <div className="max-w-lg mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            You have legal rights. Let's use them.
          </h2>
          <p className="text-muted-foreground">
            It takes under 60 seconds. No account. No cost.
          </p>
          <Button
            size="lg"
            className="px-8 py-6 text-base font-semibold"
            onClick={() => navigate("/triage")}
          >
            Start my removal request
          </Button>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border px-6 py-8 text-center space-y-3">
        <p className="text-sm text-muted-foreground">
          If you are in crisis:{" "}
          <span className="font-medium text-foreground">
            Cyber Civil Rights Initiative
          </span>
          {" — "}
          <a
            href="https://cybercivilrights.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-primary hover:text-primary/80"
          >
            cybercivilrights.org
          </a>
          {" · "}
          <a
            href="tel:8448782274"
            className="underline text-primary hover:text-primary/80"
          >
            844-878-2274
          </a>
        </p>
        <p className="text-xs text-muted-foreground/70 leading-relaxed">
          This tool provides general guidance only and does not constitute legal
          advice.
          <br />
          All legal frameworks last verified March 2026.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
