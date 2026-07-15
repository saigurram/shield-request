import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MapPin, Monitor } from "lucide-react";

const locations = [
  "United States",
  "United Kingdom",
  "European Union",
  "India",
  "Other",
];

const platforms = [
  "Meta (Facebook/Instagram)",
  "Google (Search/YouTube)",
  "X (Twitter)",
  "Reddit",
  "Telegram",
  "Adult Platforms (Pornhub/Aylo)",
  "Not Listed",
];

const Triage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [platform, setPlatform] = useState("");

  const bothSelected = location !== "" && platform !== "";

  const handleContinue = () => {
    if (location === "Other" || platform === "Not Listed") {
      navigate("/fallback", { state: { location, platform } });
    } else {
      navigate("/evidence", { state: { location, platform } });
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* Header section */}
      <section className="bg-secondary/50 px-6 py-12 sm:py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-lg mx-auto space-y-3"
        >
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Two quick questions. That's all we need.
          </h1>
          <p className="text-muted-foreground">
            We'll match you with the right legal template based on your answers.
          </p>
        </motion.div>
      </section>

      {/* Form section */}
      <section className="flex-1 flex items-start justify-center px-6 py-10 sm:py-14">
        <div className="w-full max-w-md space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <Card className="p-6 space-y-5 border-border bg-card">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  Where are you located?
                </label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Monitor className="h-4 w-4 text-primary" />
                  Where is the content hosted?
                </label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </motion.div>

          {bothSelected && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <Button
                size="lg"
                onClick={handleContinue}
                className="px-8 py-6 text-base font-semibold w-full sm:w-auto"
              >
                Show me the legal template →
              </Button>
            </motion.div>
          )}
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

export default Triage;
