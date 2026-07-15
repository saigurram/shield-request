import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Copy, ExternalLink, AlertCircle } from "lucide-react";
import { humanizePlaceholders } from "@/lib/humanize-placeholders";
import { motion } from "framer-motion";

interface FallbackTemplate {
  subject: string;
  whereToSubmit: string;
  deadline?: string;
  whenToUse?: string;
  body: string;
}

/* ───────────────────── US — Not Listed Platform ───────────────────── */

const usNotListedTemplate: FallbackTemplate = {
  subject: `URGENT: Non-Consensual Intimate Image (NCII) Removal Notice — Take It Down Act Section 3(a)(3) — 48-Hour Removal Required — [PLATFORM NAME PLACEHOLDER]`,
  whereToSubmit: `Look for a "Report abuse", "Legal notice", or "Content removal" form on the platform.
If there's no form, email: abuse@[platform domain] or legal@[platform domain]
Address it to the Trust & Safety or Content Policy team.`,
  deadline: `The platform has 48 hours to remove this content under federal law (Take It Down Act, Section 3(a)(3)). This is a legal requirement — not a suggestion.`,
  body: `TO: Trust & Safety / Content Policy Team, [PLATFORM NAME PLACEHOLDER]
RE: NCII Removal Notice — Take It Down Act Section 3(a)(3) — Non-Consensual Intimate / Deepfake Content

I am submitting this formal removal notice to [PLATFORM NAME PLACEHOLDER] pursuant to the Take It Down Act, Section 3(a)(3), which requires platforms to remove non-consensual intimate imagery — including AI-generated deepfake content — within 48 hours of receiving a valid notice. This notice satisfies all four requirements of Section 3(a)(1)(B).

ELEMENT 1 — Victim Signature
Signature (typed): /s/ [NAME PLACEHOLDER]
Full legal name: [NAME PLACEHOLDER]
Date of notice: [DATE PLACEHOLDER]

ELEMENT 2 — URL of Content
The following URL on [PLATFORM NAME PLACEHOLDER] hosts non-consensual intimate imagery:

Content URL: [URL PLACEHOLDER]
Date first observed: [DATE PLACEHOLDER]

ELEMENT 3 — Good-Faith Statement of Non-Consent
I affirm in good faith that:
a) I did not consent to the creation, publication, or distribution of this content.
b) The content was published without my knowledge.
c) The imagery is sexually explicit and/or intimate in nature.
d) The content may be AI-generated or digitally manipulated (deepfake).

ELEMENT 4 — Contact Information
Email: [CONTACT EMAIL PLACEHOLDER]
Phone (optional): [CONTACT PHONE PLACEHOLDER]

CLOSING STATEMENT & ESCALATION
[PLATFORM NAME PLACEHOLDER] is required under Section 3(a)(3) of the Take It Down Act to remove the identified content within 48 hours of this valid notice. Failure to act within the statutory window will be reported to the Federal Trade Commission at ftc.gov/complaint. I request written confirmation of removal.

SIGNATURE
________________________________________
Signature of Complainant
[NAME PLACEHOLDER]
Date: [DATE PLACEHOLDER]
Contact: [EMAIL / PHONE PLACEHOLDER]`,
};

/* ───────────────────── UK — Not Listed Platform ───────────────────── */

const ukNotListedTemplate: FallbackTemplate = {
  subject: `Formal NCII Removal Notice — Online Safety Act 2023 — Non-Consensual Intimate / Deepfake Content — [PLATFORM NAME PLACEHOLDER]`,
  whereToSubmit: `Look for a "Report abuse", "Legal notice", or "Privacy violation" form on the platform.
If there's no form, email: abuse@[platform domain] or legal@[platform domain]
Address it to the Trust & Safety or Content Policy team.`,
  deadline: `The platform must act swiftly once it is aware of this content. There is no fixed hour deadline — but "swiftly" is a legal obligation under the Online Safety Act 2023, not a courtesy.`,
  body: `TO: Trust & Safety / Content Policy Team, [PLATFORM NAME PLACEHOLDER]
RE: NCII Removal Notice — Online Safety Act 2023 — Non-Consensual Intimate / Deepfake Content

I am submitting this formal written notice to [PLATFORM NAME PLACEHOLDER] under the Online Safety Act 2023. [PLATFORM NAME PLACEHOLDER], as a provider of a user-to-user or search service accessible to UK users, is required to act swiftly upon becoming aware of content giving reasonable grounds to infer it constitutes illegal non-consensual intimate imagery (Section 192). I am the affected person within the meaning of Section 20. The four required elements are set out below.

ELEMENT 1 — URL of Content
The following URL hosts non-consensual intimate imagery subject to this notice:

Content URL: [URL PLACEHOLDER]
Date first observed: [DATE PLACEHOLDER]

ELEMENT 2 — Complainant Is the Subject of the Content
I confirm that I am the individual depicted in the content at the URL above.
I am the affected person for the purposes of Section 20 of the Online Safety Act 2023.
I am not required to be a registered user of [PLATFORM NAME PLACEHOLDER] to invoke these rights.
Full name: [NAME PLACEHOLDER]

ELEMENT 3 — Absence of Consent
I state unequivocally that:
a) I did not consent to the creation, publication, or distribution of this content.
b) The content was published without my knowledge or authorisation.
c) The content may be AI-generated or digitally manipulated (deepfake).

ELEMENT 4 — Nature of the Content
The content is sexually explicit and/or intimate in nature.
It depicts or purports to depict my body in a sexual context without my consent.
Its continued presence causes ongoing harm to my privacy, safety, and dignity.

CLOSING STATEMENT & ESCALATION
[PLATFORM NAME PLACEHOLDER] is required under the Online Safety Act 2023 to act swiftly upon receipt of this notice. I request written confirmation of the action taken. If this notice does not receive a satisfactory response, I will invoke [PLATFORM NAME PLACEHOLDER]'s formal complaints procedure and, thereafter, escalate to Ofcom at ofcom.org.uk.

SIGNATURE OF AFFECTED PERSON
________________________________________
Signature of Complainant
[NAME PLACEHOLDER]
Date: [DATE PLACEHOLDER]
Contact: [EMAIL / PHONE PLACEHOLDER]`,
};

/* ───────────────────── EU — Not Listed Platform ───────────────────── */

const euNotListedTemplate: FallbackTemplate = {
  subject: `Formal DSA Notice — Article 16(2) — Illegal NCII / Non-Consensual Deepfake Content — Immediate Removal Required — [PLATFORM NAME PLACEHOLDER]`,
  whereToSubmit: `Look for a "DSA notice form", "Legal notice", or "Report illegal content" option on the platform.
If there's no form, email: dsa@[platform domain], legal@[platform domain], or abuse@[platform domain]
Include "Article 16(2) DSA notice" in the subject line.`,
  deadline: `The platform must process your notice in a timely, diligent, non-arbitrary and objective manner (Digital Services Act, Article 16(6)). Very Large Online Platforms face fines of up to 6% of global turnover for non-compliance.

Note: As an NCII victim, you do not have to provide your full name or address. This is protected under Article 16(2)(c). Your contact email is enough.`,
  body: `TO: Trust & Safety / DSA Compliance Team, [PLATFORM NAME PLACEHOLDER]
RE: Notice of Illegal Content Under Article 16(2), Digital Services Act — Non-Consensual Intimate Imagery

I am submitting this notice pursuant to Article 16(2) of the Digital Services Act (Regulation (EU) 2022/2065). [PLATFORM NAME PLACEHOLDER], as a provider of an intermediary service accessible to EU users, is subject to the DSA's notice-and-action obligations and is required under Article 16(6) to process this notice in a timely, diligent, non-arbitrary and objective manner. The four required elements of a valid Article 16(2) notice are set out below.

ELEMENT 1 — Why the Content Is Illegal
The content at the URL below constitutes illegal non-consensual intimate imagery (NCII).
a) It depicts a real individual in a sexually explicit or intimate manner without consent.
b) Its creation and/or distribution constitutes a criminal offence under applicable EU member state law and EU-level privacy and dignity instruments.
c) The content may be AI-generated or digitally manipulated (deepfake).
d) Continued hosting constitutes ongoing facilitation of illegal activity.

ELEMENT 2 — Exact URL of Content
Content URL: [URL PLACEHOLDER]
Date first observed: [DATE PLACEHOLDER]
Platform surface: [e.g. post / video / search result / profile — PLACEHOLDER]

Provide the exact, complete URL. List each URL separately if content appears at multiple locations.

ELEMENT 3 — Submitter Identity (Art. 16(2)(c) Exemption)
The complainant is the individual depicted in the content above.
Pursuant to Article 16(2)(c), NCII victims are exempt from providing name and postal address.
Full identity is therefore withheld.
Contact email: [CONTACT EMAIL PLACEHOLDER]
Date of notice: [DATE PLACEHOLDER]

ELEMENT 4 — Bona Fide Belief Statement
I state in good faith that the information in this notice is accurate and complete to the best of my knowledge, and that I have a bona fide belief that the content identified is illegal and was published without the consent of the person depicted.

CLOSING STATEMENT & ESCALATION
[PLATFORM NAME PLACEHOLDER] is required under Article 16(6) to process this notice in a timely, diligent, non-arbitrary and objective manner and to notify me of the decision under Article 16(5). If this notice does not receive a satisfactory response, I will invoke [PLATFORM NAME PLACEHOLDER]'s internal complaint mechanism under Article 20, pursue out-of-court settlement under Article 21, and refer the matter to the competent Digital Services Coordinator in my EU member state under Article 53.

SIGNATURE OF COMPLAINANT
________________________________________
Signature of Complainant
[NAME PLACEHOLDER]
Date: [DATE PLACEHOLDER]
Contact: [EMAIL / PHONE PLACEHOLDER]
Name (optional — Article 16(2)(c) exemption): [NAME PLACEHOLDER or 'Withheld — NCII Victim Exemption']`,
};

/* ───────────────────── India — Not Listed Platform ───────────────────── */

const indiaNotListedTemplate: FallbackTemplate = {
  subject: `URGENT Grievance under IT Rules 2021 Rule 3(2)(b) [G.S.R. 120(E)] — NCII / Deepfake Content — 2-Hour Removal Required — [PLATFORM NAME PLACEHOLDER]`,
  whereToSubmit: `Every major platform in India must have a Grievance Officer. Find them in the platform's Terms of Service or Help Centre.
If you can't find it, email: grievance@[platform domain] or legal@[platform domain]

Important: File simultaneously at cybercrime.gov.in or call 1930. Don't wait for the platform to respond. Filing there converts your complaint into a government notification — which means the platform loses its legal protection if it doesn't act.`,
  deadline: `The platform has 2 hours to remove this content (IT Rules 2021, Rule 3(2)(b), effective 20 February 2026). The clock starts from when they receive your complaint. You have not run out of time.`,
  body: `TO: The Grievance Officer, [PLATFORM NAME PLACEHOLDER] India
RE: Formal Complaint under IT Rules 2021, Rule 3(2)(b) [G.S.R. 120(E)] — NCII / Deepfake Content — 2-Hour Removal Mandatory

I am filing this formal grievance with the designated Grievance Officer of [PLATFORM NAME PLACEHOLDER] pursuant to Rule 3(2)(b) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, as amended by G.S.R. 120(E) (effective 20 February 2026). [PLATFORM NAME PLACEHOLDER] is an intermediary providing services to users in India and is required to remove or disable access to the content identified below within 2 hours of receipt of this valid complaint. The prima facie standard applies.

ELEMENT 1 — URL of Content
Content URL: [URL PLACEHOLDER]
Date and time first observed: [DATE PLACEHOLDER] [TIME PLACEHOLDER] IST
Platform surface: [e.g. post / reel / channel / search result — PLACEHOLDER]

ELEMENT 2 — Complainant Is the Subject / Authorised Representative
Full name: [NAME PLACEHOLDER]
Capacity: [Self / Authorised representative — PLACEHOLDER]
I confirm that the affected individual did not consent to this content.

ELEMENT 3 — Content Category under Rule 3(2)(b)
[ ] (i) Exposes private areas of the body
[ ] (ii) Full or partial nudity
[ ] (iii) Sexual act or conduct
[ ] (iv) Impersonation / artificially morphed images (deepfake category)
Applicable category (tick all that apply): [PLACEHOLDER]

ELEMENT 4 — Good-Faith Belief Statement
I state in good faith that the information in this complaint is accurate and complete. I have a bona fide belief, on a prima facie basis, that the content is illegal NCII within the meaning of Rule 3(2)(b) of the IT Rules 2021 as amended by G.S.R. 120(E). This complaint triggers the Grievance Officer's obligation to act within 2 hours.

CLOSING STATEMENT & ESCALATION
The Grievance Officer of [PLATFORM NAME PLACEHOLDER] is required under Rule 3(2)(b) to remove or disable access within 2 hours. I request written acknowledgement and confirmation of removal including the time of action.

This notice, together with simultaneous filing at cybercrime.gov.in, constitutes government notification under IT Act Section 79(3)(b). Failure to act expeditiously will result in [PLATFORM NAME PLACEHOLDER] forfeiting safe harbour protection under Section 79.

If the platform does not act:
1. Appeal to the Grievance Appellate Committee at gac.gov.in within 30 days
2. File at cybercrime.gov.in or call 1930 if you haven't already

SIGNATURE OF COMPLAINANT
________________________________________
Signature of Complainant
[NAME PLACEHOLDER]
Date: [DATE PLACEHOLDER]
Contact: [EMAIL / PHONE PLACEHOLDER]
NCRP acknowledgement number (if filed): [NCRP REF PLACEHOLDER]
Time of complaint (IST): [TIME PLACEHOLDER]`,
};

/* ───────────────────── DMCA Fallback (Other / Unknown) ───────────────────── */

const dmcaFallbackTemplate: FallbackTemplate = {
  subject: `DMCA Section 512(c)(3) Takedown Notice — Non-Consensual Intimate / Deepfake Imagery — [PLATFORM NAME PLACEHOLDER]`,
  whereToSubmit: `Every US-hosted platform must have a DMCA Designated Agent registered with the US Copyright Office.

How to find them:
1. Go to copyright.gov/dmca-directory and search for the platform name
2. Or look for "DMCA" or "Copyright" in the platform's Terms of Service or Help Centre

Email the completed notice as a PDF to the agent's listed address.`,
  whenToUse: `Use this template when you don't know which country's law applies, or the platform isn't covered by a specific template above. You can also send this alongside a country-specific notice for extra protection. It works best when the content uses your original photo or likeness — for AI-generated deepfakes, a country-specific template may be stronger as your primary notice.`,
  body: `TO: DMCA Designated Agent, [PLATFORM NAME PLACEHOLDER]
RE: DMCA Section 512(c)(3) Takedown Notice — Non-Consensual Intimate / Deepfake Imagery

I am submitting this formal takedown notice pursuant to Section 512(c)(3) of the Digital Millennium Copyright Act (17 U.S.C. § 512(c)(3)). [PLATFORM NAME PLACEHOLDER] is required, upon receipt of a notice containing all six statutory elements, to expeditiously remove or disable access to the identified material in order to maintain its safe harbour protection under Section 512(c). All six required elements are set out below.

DMCA ELEMENT 1 — Identification of the Copyrighted Work
The copyrighted work that has been infringed is:
Description of work: [e.g. Photograph / image / likeness of [NAME PLACEHOLDER] — PLACEHOLDER]
Original work location (if available): [URL or description of original — PLACEHOLDER]
Nature of copyright: The complainant holds copyright in the original image or, where the content is a deepfake or morphed image, the original photograph(s) from which it was derived.
↳ For deepfakes: assert copyright in the original source photograph(s) of your likeness. Deepfakes that incorporate or are derived from your original images may infringe that copyright.

DMCA ELEMENT 2 — Identification of the Infringing Material (URL)
The following URL on [PLATFORM NAME PLACEHOLDER] contains the infringing / NCII content:
Content URL: [URL PLACEHOLDER]
Date first observed: [DATE PLACEHOLDER]
Description of infringing material: [Brief description — PLACEHOLDER]
↳ Provide the exact URL. If material appears at multiple URLs, list each separately.

DMCA ELEMENT 3 — Contact Information of the Complainant
Full legal name: [NAME PLACEHOLDER]
Mailing address: [ADDRESS PLACEHOLDER]
↳ Your address is required by US copyright law (17 U.S.C. § 512). It is submitted to the platform's legal team only — not published or shared publicly.
Email address: [EMAIL PLACEHOLDER]
Phone number: [PHONE PLACEHOLDER]

DMCA ELEMENT 4 — Good-Faith Belief Statement
I have a good-faith belief that use of the material in the manner complained of is not authorised by the copyright owner, its agent, or the law.

DMCA ELEMENT 5 — Accuracy and Authority Statement
I state, under penalty of perjury, that the information in this notice is accurate and that I am the copyright owner or am authorised to act on behalf of the copyright owner.
↳ This is standard legal language. It simply means you are confirming everything you have written is true.
↳ The 'under penalty of perjury' statement is required for a valid DMCA notice under 17 U.S.C. § 512(c)(3)(A)(vi). It must remain in your submitted notice.

DMCA ELEMENT 6 — Physical or Electronic Signature
Electronic signature: /s/ [NAME PLACEHOLDER]
Date: [DATE PLACEHOLDER]
↳ A typed /s/ signature satisfies the electronic signature requirement.

CLOSING STATEMENT & ESCALATION
[PLATFORM NAME PLACEHOLDER] is required to expeditiously remove or disable access to the identified material upon receipt of this valid DMCA notice in order to maintain safe harbour protection under Section 512(c). Failure to act may result in the loss of that protection.

If they don't act:
1. Re-send the notice with a read receipt or delivery confirmation
2. Send the same notice to the platform's hosting provider (find them using a whois lookup)
3. File a complaint with the domain registrar or CDN provider
4. Consult a lawyer about direct copyright infringement action

SIGNATURE
________________________________________
Signature of Complainant
[NAME PLACEHOLDER]
Date: [DATE PLACEHOLDER]
Contact: [EMAIL / PHONE PLACEHOLDER]`,
};

/* ───────────────────── Template Selection ───────────────────── */

function getFallbackTemplate(
  location: string,
  _platform: string
): FallbackTemplate | null {
  if (location === "United States") return usNotListedTemplate;
  if (location === "United Kingdom") return ukNotListedTemplate;
  if (location === "European Union") return euNotListedTemplate;
  if (location === "India") return indiaNotListedTemplate;
  return dmcaFallbackTemplate;
}

/* ───────────────────── Component ───────────────────── */

const Fallback = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const location = (state as any)?.location ?? "";
  const platform = (state as any)?.platform ?? "";

  const tpl = getFallbackTemplate(location, platform);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied!", description: "Template copied to clipboard." });
    } catch {
      toast({
        title: "Copy failed",
        description: "Please select and copy manually.",
        variant: "destructive",
      });
    }
  };

  const sectionHeaderPattern =
    /^(ELEMENT \d+|CLOSING|SIGNATURE|DMCA ELEMENT \d+)/m;

  const renderAnnotatedTemplate = (text: string) => {
    const parts: string[] = [];
    const lines = text.split("\n");
    let current: string[] = [];

    for (const line of lines) {
      if (sectionHeaderPattern.test(line) && current.length > 0) {
        parts.push(current.join("\n"));
        current = [line];
      } else {
        current.push(line);
      }
    }
    if (current.length > 0) parts.push(current.join("\n"));

    const renderLineWithPlaceholders = (line: string, key: number) => {
      if (line.startsWith("↳")) {
        return (
          <span key={key} className="block text-xs text-muted-foreground italic mt-0.5 mb-1">
            {line.replace("↳ ", "")}
            {"\n"}
          </span>
        );
      }

      const bracketPattern = /(\[[^\]]+\])/g;
      const segments = line.split(bracketPattern);

      if (segments.length === 1) {
        return <span key={key}>{line}{"\n"}</span>;
      }

      return (
        <span key={key}>
          {segments.map((seg, si) =>
            bracketPattern.test(seg) ? (
              <span
                key={si}
                className="bg-primary/10 text-primary font-medium rounded px-0.5"
              >
                ✏️ {seg}
              </span>
            ) : (
              <span key={si}>{seg}</span>
            )
          )}
          {"\n"}
        </span>
      );
    };

    return parts.map((section, i) => (
      <div key={i} className={i > 0 ? "mt-4 pt-3 border-t border-border/40" : ""}>
        <pre className="whitespace-pre-wrap text-sm leading-relaxed text-foreground font-sans">
          {section.split("\n").map((line, li) => renderLineWithPlaceholders(line, li))}
        </pre>
      </div>
    ));
  };

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
          <AlertCircle className="mx-auto h-10 w-10 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Your platform isn't listed — but you still have options.
          </h1>
          <p className="text-muted-foreground">
            We've prepared a legal template you can adapt for any platform.
            Replace every <span className="font-semibold text-foreground">[Platform Name]</span> with the name of the site or app where the content appears.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="flex-1 px-4 py-10 sm:py-14">
        <div className="w-full max-w-2xl mx-auto space-y-6">
          {tpl && (
            <>
              {/* Deadline */}
              {tpl.deadline && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}>
                  <Card className="border-destructive/30 bg-card p-4 space-y-1">
                    <p className="text-sm font-semibold text-foreground">⏱ Your legal deadline</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tpl.deadline}</p>
                  </Card>
                </motion.div>
              )}

              {/* When to use */}
              {tpl.whenToUse && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }}>
                  <Card className="border-border bg-card p-4 space-y-1">
                    <p className="text-sm font-semibold text-foreground">When to use this template</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tpl.whenToUse}</p>
                  </Card>
                </motion.div>
              )}

              {/* Where to submit */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}>
                <Card className="border-primary/30 bg-card p-4 space-y-2">
                  <p className="text-sm font-semibold text-foreground">📩 Where to submit</p>
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground font-sans">
                    {humanizePlaceholders(tpl.whereToSubmit)}
                  </pre>
                </Card>
              </motion.div>

              {/* Subject line */}
              <Card className="border-muted bg-muted/30 p-4 space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Use this as your email / message subject:</p>
                <p className="text-sm font-semibold text-foreground select-all">{humanizePlaceholders(tpl.subject)}</p>
              </Card>

              {/* Template block */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">Your legal template</p>
                  <Button variant="outline" size="sm" onClick={() => handleCopy(humanizePlaceholders(tpl.body))} className="gap-1.5">
                    <Copy className="h-3.5 w-3.5" /> Copy template
                  </Button>
                </div>
                <div className="rounded-md border bg-muted/40 p-4 sm:p-6 space-y-0">
                  {renderAnnotatedTemplate(humanizePlaceholders(tpl.body))}
                </div>
              </div>
            </>
          )}

          {/* Support links */}
          <Card className="border-border bg-card p-6 space-y-3 text-center">
            <h2 className="text-lg font-semibold text-foreground">Get support</h2>
            <div className="flex flex-col items-center gap-1">
              <a href="https://cybercivilrights.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary underline text-sm">
                Cyber Civil Rights Initiative <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <span className="text-xs text-muted-foreground">cybercivilrights.org · 844-878-2274</span>
              <a href="https://stopncii.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary underline text-sm mt-1">
                StopNCII.org <ExternalLink className="h-3.5 w-3.5" />
              </a>
              {location === "India" && (
                <>
                  <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary underline text-sm mt-1">
                    cybercrime.gov.in <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <span className="text-xs text-muted-foreground">Helpline 1930</span>
                  <a href="https://gac.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary underline text-sm mt-1">
                    Grievance Appellate Committee (gac.gov.in) <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </>
              )}
            </div>
          </Card>

          {/* Back link */}
          <div className="text-center">
            <Button variant="ghost" onClick={() => navigate("/triage")} className="text-primary underline">
              ← Go back and try a different platform
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

export default Fallback;
