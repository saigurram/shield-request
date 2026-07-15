import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Copy, ExternalLink, FileText } from "lucide-react";
import { humanizePlaceholders } from "@/lib/humanize-placeholders";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface TemplateData {
  subject: string;
  submitLabel: string;
  submitLinks: { label: string; url: string }[];
  identityExemption?: string;
  removalDeadline?: string;
  body: string;
}

const usTemplates: Record<string, TemplateData> = {
  "Meta (Facebook/Instagram)": {
    subject:
      "Urgent NCII Removal Notice — Take It Down Act § 3(a)(3) | Non-Consensual Deepfake Content",
    submitLabel: "Submit your request here:",
    submitLinks: [
      {
        label: "Meta Content Removal",
        url: "https://www.meta.com/help/policies/1352307406415932/",
      },
    ],
    body: `TO: Meta Trust & Safety — Content Policy Team
RE: Mandatory NCII Removal Under the Take It Down Act, Section 3(a)(3)

I am submitting this formal removal notice under the Take It Down Act, Section 3(a)(3), which requires platforms to remove non-consensual intimate imagery (NCII) — including AI-generated deepfake content — within 48 hours of receiving a valid notice. This notice satisfies all four requirements of Section 3(a)(1)(B).

ELEMENT 1 — Identification of Content (URL)
The following URL hosts non-consensual intimate imagery depicting me without my knowledge or consent:

Content URL: [URL PLACEHOLDER]
Date first observed: [DATE PLACEHOLDER]
Platform / Page context: [PROFILE NAME OR PAGE PLACEHOLDER]

ELEMENT 2 — Good-Faith Non-Consent Statement
I affirm in good faith that:
a) I did not consent to the creation, publication, or distribution of this content.
b) The content was published without my knowledge.
c) The imagery is sexually explicit and/or intimate in nature.
d) The content may be AI-generated or digitally manipulated to depict my likeness.

ELEMENT 3 — Complainant Identity & Signature
Full legal name: [NAME PLACEHOLDER]
Signature (typed): /s/ [NAME PLACEHOLDER]
Date of notice: [DATE PLACEHOLDER]

ELEMENT 4 — Contact Information
Email: [CONTACT EMAIL PLACEHOLDER]
Phone (optional): [CONTACT PHONE PLACEHOLDER]
Preferred contact method: [PLACEHOLDER]

CLOSING STATEMENT & DEMAND
Under Section 3(a)(3) of the Take It Down Act, Meta is required to remove the identified content within 48 hours of this valid notice. Failure to act within the statutory window may be reported to the Federal Trade Commission at ftc.gov/complaint. I request written confirmation of removal.

SIGNATURE
________________________________________
Victim Signature
[NAME PLACEHOLDER]
Date: [DATE PLACEHOLDER]
Contact: [CONTACT EMAIL/PHONE PLACEHOLDER]`,
  },

  "Google (Search/YouTube)": {
    subject:
      "Legal NCII Removal Notice — Take It Down Act § 3(a)(3) | Non-Consensual Deepfake / Intimate Imagery",
    submitLabel: "Submit your request here:",
    submitLinks: [
      {
        label: "Google Web Search removal",
        url: "https://support.google.com/websearch/answer/9116649",
      },
      {
        label: "YouTube Report Abuse",
        url: "https://youtube.com/reportabuse",
      },
    ],
    body: `TO: Google Trust & Safety — Legal Removals Team
RE: Mandatory NCII Removal Under the Take It Down Act, Section 3(a)(3)

This notice is submitted pursuant to the Take It Down Act, Section 3(a)(3), requiring covered platforms to remove non-consensual intimate imagery — including AI-generated deepfakes — within 48 hours of a valid notice. All four statutory elements under Section 3(a)(1)(B) are provided below.

ELEMENT 1 — Identification of Content (URL)
The following URL contains non-consensual intimate imagery depicting my likeness:

Content URL: [URL PLACEHOLDER]
Date first observed: [DATE PLACEHOLDER]
Google product / surface: [e.g., Google Search result / YouTube video / Google Drive link]

ELEMENT 2 — Good-Faith Non-Consent Statement
I affirm in good faith that:
a) I did not consent to the capture, creation, or distribution of this content.
b) The content depicts me in a sexually explicit or intimate manner without my authorization.
c) The content may be AI-generated or deepfake imagery.
d) Its publication causes ongoing harm to my privacy, safety, and well-being.

ELEMENT 3 — Complainant Identity & Signature
Full legal name: [NAME PLACEHOLDER]
Signature (typed): /s/ [NAME PLACEHOLDER]
Date of notice: [DATE PLACEHOLDER]

ELEMENT 4 — Contact Information
Email: [CONTACT EMAIL PLACEHOLDER]
Phone (optional): [CONTACT PHONE PLACEHOLDER]

CLOSING STATEMENT & DEMAND
Google is required under Section 3(a)(3) to remove the identified content within 48 hours. If the content appears in Google Search, I additionally request de-indexing of the URL. Non-compliance may be escalated to the FTC at ftc.gov/complaint. Please confirm removal in writing.

SIGNATURE
________________________________________
Victim Signature
[NAME PLACEHOLDER]
Date: [DATE PLACEHOLDER]
Contact: [CONTACT EMAIL/PHONE PLACEHOLDER]`,
  },

  "X (Twitter)": {
    subject:
      "NCII Takedown Notice — Take It Down Act § 3(a)(3) | Non-Consensual Intimate / Deepfake Imagery",
    submitLabel: "Submit your request here:",
    submitLinks: [
      {
        label: "X Intimate Media Policy",
        url: "https://help.x.com/en/rules-and-policies/intimate-media",
      },
    ],
    body: `TO: X (Twitter) Trust & Safety Team
RE: Mandatory NCII Removal Under the Take It Down Act, Section 3(a)(3)

I am filing this formal removal notice under the Take It Down Act, Section 3(a)(3). This statute requires platforms to remove non-consensual intimate imagery, including AI-generated or manipulated content, within 48 hours of a valid notice. The four required statutory elements are provided in full below.

ELEMENT 1 — Identification of Content (URL)
The following post or media URL contains non-consensual intimate imagery of me:

Content URL: [URL PLACEHOLDER]
Post / Tweet ID (if known): [ID PLACEHOLDER]
Date first observed: [DATE PLACEHOLDER]

ELEMENT 2 — Good-Faith Non-Consent Statement
I affirm in good faith that:
a) I did not consent to this content being created, posted, or distributed.
b) The content is sexually explicit and/or intimate and depicts my likeness.
c) The imagery may be AI-generated or digitally altered to resemble me.
d) The content was uploaded without my knowledge and causes me ongoing harm.

ELEMENT 3 — Complainant Identity & Signature
Full legal name: [NAME PLACEHOLDER]
Signature (typed): /s/ [NAME PLACEHOLDER]
Date of notice: [DATE PLACEHOLDER]

ELEMENT 4 — Contact Information
Email: [CONTACT EMAIL PLACEHOLDER]
Phone (optional): [CONTACT PHONE PLACEHOLDER]

CLOSING STATEMENT & DEMAND
Under Section 3(a)(3) of the Take It Down Act, X is required to remove the identified content within 48 hours of this valid notice. Additionally, I request suspension or review of the account responsible for the upload. Failure to comply will be reported to the FTC at ftc.gov/complaint.

SIGNATURE
________________________________________
Victim Signature
[NAME PLACEHOLDER]
Date: [DATE PLACEHOLDER]
Contact: [CONTACT EMAIL/PHONE PLACEHOLDER]`,
  },

  Reddit: {
    subject:
      "Formal NCII Removal Demand — Take It Down Act § 3(a)(3) | Non-Consensual Deepfake Content",
    submitLabel: "Submit your request here:",
    submitLinks: [
      {
        label: "Reddit NCII Help",
        url: "https://support.reddithelp.com/hc/en-us/articles/360043513411",
      },
      { label: "Email: legal@reddit.com", url: "mailto:legal@reddit.com" },
    ],
    body: `TO: Reddit Trust & Safety — Admin Team
RE: Mandatory NCII Removal Under the Take It Down Act, Section 3(a)(3)

This notice is submitted under the Take It Down Act, Section 3(a)(3), which mandates that platforms remove non-consensual intimate imagery — including AI-generated deepfakes — within 48 hours of receiving a valid written notice. This submission satisfies all requirements of Section 3(a)(1)(B).

ELEMENT 1 — Identification of Content (URL)
The following Reddit post, comment, or media link contains NCII depicting my likeness:

Content URL: [URL PLACEHOLDER]
Subreddit: r/[SUBREDDIT PLACEHOLDER]
Post title (if known): [TITLE PLACEHOLDER]
Date first observed: [DATE PLACEHOLDER]

ELEMENT 2 — Good-Faith Non-Consent Statement
I affirm in good faith that:
a) I did not consent to this content being created, shared, or hosted on Reddit.
b) The content depicts me in a sexually explicit or intimate manner.
c) The imagery may be AI-synthesized or digitally manipulated.
d) The content violates Reddit's own policy on non-consensual intimate media.

ELEMENT 3 — Complainant Identity & Signature
Full legal name: [NAME PLACEHOLDER]
Signature (typed): /s/ [NAME PLACEHOLDER]
Date of notice: [DATE PLACEHOLDER]

ELEMENT 4 — Contact Information
Email: [CONTACT EMAIL PLACEHOLDER]
Phone (optional): [CONTACT PHONE PLACEHOLDER]

CLOSING STATEMENT & DEMAND
Reddit is legally required under Section 3(a)(3) to remove this content within 48 hours. I also request removal of any cross-posts, mirror links, or cached versions of this content on the platform. If the content violates subreddit rules, I additionally request that Reddit admins review the hosting community. Escalation to the FTC at ftc.gov/complaint will follow any failure to act within the statutory window.

SIGNATURE
________________________________________
Victim Signature
[NAME PLACEHOLDER]
Date: [DATE PLACEHOLDER]
Contact: [CONTACT EMAIL/PHONE PLACEHOLDER]`,
  },

  Telegram: {
    subject:
      "NCII Removal Notice — Take It Down Act § 3(a)(3) | Non-Consensual Intimate Deepfake Imagery",
    submitLabel: "Submit your request here:",
    submitLinks: [
      { label: "Email: abuse@telegram.org", url: "mailto:abuse@telegram.org" },
      { label: "Telegram Support", url: "https://telegram.org/support" },
    ],
    body: `TO: Telegram Trust & Safety Team
RE: Mandatory NCII Removal Under the Take It Down Act, Section 3(a)(3)

I am filing this formal notice under the Take It Down Act, Section 3(a)(3), which requires covered platforms — including messaging and channel-based platforms accessible to US users — to remove non-consensual intimate imagery, including AI-generated deepfakes, within 48 hours of a valid written notice. All required elements under Section 3(a)(1)(B) are included below.

ELEMENT 1 — Identification of Content (URL / Channel)
The following Telegram channel, group, bot, or message link contains NCII depicting my likeness:

Content link / Channel URL: [URL PLACEHOLDER]
Channel or group name (if known): [NAME PLACEHOLDER]
Message ID or post date: [ID / DATE PLACEHOLDER]
Date first observed: [DATE PLACEHOLDER]

ELEMENT 2 — Good-Faith Non-Consent Statement
I affirm in good faith that:
a) I did not consent to this content being created, distributed, or hosted.
b) The content depicts me in a sexually explicit or intimate context without my authorization.
c) The imagery is or may be AI-generated deepfake content using my likeness.
d) The content is being actively circulated and is causing ongoing harm.

ELEMENT 3 — Complainant Identity & Signature
Full legal name: [NAME PLACEHOLDER]
Signature (typed): /s/ [NAME PLACEHOLDER]
Date of notice: [DATE PLACEHOLDER]

ELEMENT 4 — Contact Information
Email: [CONTACT EMAIL PLACEHOLDER]
Phone (optional): [CONTACT PHONE PLACEHOLDER]

CLOSING STATEMENT & DEMAND
Telegram is required under Section 3(a)(3) to remove the identified content within 48 hours. I request removal of the specific content, deletion of any bots or automated accounts distributing this material, and — where appropriate — termination of the hosting channel or group. Failure to respond within the statutory 48-hour window will result in a complaint filed with the FTC at ftc.gov/complaint.

SIGNATURE
________________________________________
Victim Signature
[NAME PLACEHOLDER]
Date: [DATE PLACEHOLDER]
Contact: [CONTACT EMAIL/PHONE PLACEHOLDER]`,
  },
};

const defaultTemplate: TemplateData = {
  subject: "Non-Consensual Intimate Image Removal Request",
  submitLabel: "Submit your request here:",
  submitLinks: [],
  body: `Dear Trust & Safety Team,

I am writing to request the immediate removal of intimate content that was shared without my consent.

The content in question is located at the following URL(s):
[INSERT URL(s)]

I did not consent to the distribution of this material. Its continued availability causes ongoing harm and violates my legal rights under applicable law.

I respectfully request that you:
1. Remove the identified content immediately
2. Prevent re-upload of the same material
3. Preserve relevant records for potential legal proceedings

I am prepared to verify my identity as required by your process.

Thank you for your prompt attention to this matter.

Sincerely,
[YOUR NAME]
[YOUR EMAIL]
[DATE]`,
};

const ukTemplates: Record<string, TemplateData> = {
  "Meta (Facebook/Instagram)": {
    subject: "Formal NCII Removal Notice — Online Safety Act 2023 | Non-Consensual Intimate / Deepfake Content",
    submitLabel: "Submit your request here:",
    submitLinks: [
      { label: "Meta Content Removal", url: "https://www.meta.com/help/policies/1352307406415932/" },
    ],
    body: `TO: Meta Trust & Safety — Content Policy Team
RE: Mandatory Removal of Illegal NCII Under the Online Safety Act 2023

I am submitting this formal notice pursuant to the Online Safety Act 2023, under which Meta, as a regulated provider of a user-to-user service, is required to act swiftly upon becoming aware of content that gives reasonable grounds to infer it constitutes illegal non-consensual intimate imagery (Section 192). I am the affected person within the meaning of Section 20 of the Act. The four required elements of a valid notice are set out below.

ELEMENT 1 — URL of Content
The following URL hosts non-consensual intimate imagery subject to this notice:

Content URL: [URL PLACEHOLDER]
Date first observed: [DATE PLACEHOLDER]
Platform surface: [e.g. Facebook post / Instagram Reel / Threads post — PLACEHOLDER]

ELEMENT 2 — Complainant Is the Subject of the Content
I confirm that I am the individual depicted in the content identified above.
I am the affected person for the purposes of Section 20 of the Online Safety Act 2023.
I am not required to be a registered user of Meta's services to invoke these rights.
Full name: [NAME PLACEHOLDER]

ELEMENT 3 — Absence of Consent
I state unequivocally that:
a) I did not consent to the creation, publication, or distribution of this content.
b) The content was shared or published without my knowledge or agreement.
c) No consent, explicit or implied, was ever given for this material to appear on Meta's platforms.

ELEMENT 4 — Nature of the Content
The content is sexually explicit and/or intimate in nature.
It depicts or purports to depict my body in a sexual context.
The content may be AI-generated or digitally manipulated (deepfake) to show my likeness.
Its continued presence causes ongoing harm to my privacy, safety, and dignity.

CLOSING STATEMENT & DEMAND
Meta is required under the Online Safety Act 2023 to act swiftly upon receipt of this notice. The Section 192 threshold — reasonable grounds to infer the content is illegal NCII — is met by the information provided above. I request written confirmation of the action taken and the timeline for removal. If this notice does not receive a satisfactory response, I will invoke Meta's formal complaints procedure and, thereafter, escalate to Ofcom at ofcom.org.uk.

SIGNATURE OF AFFECTED PERSON
________________________________________
Signature of Affected Person
[NAME PLACEHOLDER]
Date: [DATE PLACEHOLDER]
Contact: [CONTACT EMAIL / PHONE PLACEHOLDER]`,
  },

  "Google (Search/YouTube)": {
    subject: "Legal NCII Removal Notice — Online Safety Act 2023 | Non-Consensual Intimate / Deepfake Imagery",
    submitLabel: "Submit your request here:",
    submitLinks: [
      { label: "Google Web Search removal", url: "https://support.google.com/websearch/answer/9116649" },
      { label: "YouTube Report Abuse", url: "https://youtube.com/reportabuse" },
    ],
    body: `TO: Google Trust & Safety — Legal Removals Team
RE: Mandatory Removal of Illegal NCII Under the Online Safety Act 2023

This notice is submitted under the Online Safety Act 2023. Google, as a regulated provider of search and user-to-user services accessible to UK users, is required to act swiftly upon becoming aware of content giving reasonable grounds to infer it constitutes illegal non-consensual intimate imagery (Section 192). I am the affected person within the meaning of Section 20 and set out the four required elements below.

ELEMENT 1 — URL of Content
The following URL contains non-consensual intimate imagery subject to this notice:

Content URL: [URL PLACEHOLDER]
Date first observed: [DATE PLACEHOLDER]
Google product / surface: [e.g. Google Search result / YouTube video / Google Drive link — PLACEHOLDER]

ELEMENT 2 — Complainant Is the Subject of the Content
I confirm that I am the individual depicted in the content at the URL above.
I qualify as an affected person under Section 20 of the Online Safety Act 2023.
I do not need to hold a Google account to bring this notice.
Full name: [NAME PLACEHOLDER]

ELEMENT 3 — Absence of Consent
I state unequivocally that:
a) I did not consent to the creation, indexing, hosting, or distribution of this content.
b) The content was made available without my knowledge.
c) No consent, express or implied, was given for this material to be published or indexed.

ELEMENT 4 — Nature of the Content
The content is sexually explicit and/or intimate in nature.
It depicts or purports to depict my body in a sexual context.
The content may be AI-generated or a digitally manipulated deepfake of my likeness.
Where indexed in Search, its continued visibility amplifies harm to my privacy and safety.

CLOSING STATEMENT & DEMAND
Google is required under the Online Safety Act 2023 to act swiftly upon receipt of this notice. The Section 192 threshold is met by the information above. For Search results, I additionally request de-indexing of the URL. I request written confirmation of all actions taken. If this notice does not receive a satisfactory response, I will invoke Google's complaints procedure and, if unresolved, escalate to Ofcom at ofcom.org.uk.

SIGNATURE OF AFFECTED PERSON
________________________________________
Signature of Affected Person
[NAME PLACEHOLDER]
Date: [DATE PLACEHOLDER]
Contact: [CONTACT EMAIL / PHONE PLACEHOLDER]`,
  },

  "X (Twitter)": {
    subject: "NCII Removal Notice — Online Safety Act 2023 | Non-Consensual Intimate / Deepfake Content",
    submitLabel: "Submit your request here:",
    submitLinks: [
      { label: "X Intimate Media Policy", url: "https://help.x.com/en/rules-and-policies/intimate-media" },
    ],
    body: `TO: X (formerly Twitter) Trust & Safety Team
RE: Mandatory Removal of Illegal NCII Under the Online Safety Act 2023

I am filing this formal written notice under the Online Safety Act 2023. X, as a regulated user-to-user platform accessible to UK users, is required to act swiftly upon becoming aware of content giving reasonable grounds to infer it constitutes illegal non-consensual intimate imagery (Section 192). I am the affected person within the meaning of Section 20. The four required elements are set out below.

ELEMENT 1 — URL of Content
The following post or media URL contains non-consensual intimate imagery subject to this notice:

Content URL: [URL PLACEHOLDER]
Post / Tweet ID (if known): [ID PLACEHOLDER]
Date first observed: [DATE PLACEHOLDER]

ELEMENT 2 — Complainant Is the Subject of the Content
I confirm that I am the individual depicted in the content at the URL above.
I qualify as an affected person under Section 20 of the Online Safety Act 2023.
I am not required to hold an X account to invoke these rights.
Full name: [NAME PLACEHOLDER]

ELEMENT 3 — Absence of Consent
I state unequivocally that:
a) I did not consent to this content being created, posted, or distributed on X.
b) The content was uploaded without my knowledge or authorisation.
c) No consent, express or implied, was ever given for this material to be shared.

ELEMENT 4 — Nature of the Content
The content is sexually explicit and/or intimate in nature.
It depicts or purports to depict my body in a sexual context.
The content may be AI-generated or a digitally manipulated deepfake of my likeness.
Its continued availability on X causes direct and ongoing harm to my wellbeing and safety.

CLOSING STATEMENT & DEMAND
X is required under the Online Safety Act 2023 to act swiftly upon receipt of this notice. The Section 192 threshold — reasonable grounds to infer the content is illegal NCII — is met. I additionally request review of the account responsible for uploading this material. Please confirm in writing the action taken and the timeline. If this notice does not receive a satisfactory response, I will invoke X's complaints procedure and escalate to Ofcom at ofcom.org.uk.

SIGNATURE OF AFFECTED PERSON
________________________________________
Signature of Affected Person
[NAME PLACEHOLDER]
Date: [DATE PLACEHOLDER]
Contact: [CONTACT EMAIL / PHONE PLACEHOLDER]`,
  },

  Reddit: {
    subject: "Formal NCII Removal Notice — Online Safety Act 2023 | Non-Consensual Intimate / Deepfake Content",
    submitLabel: "Submit your request here:",
    submitLinks: [
      { label: "Reddit NCII Help", url: "https://support.reddithelp.com/hc/en-us/articles/360043513411" },
      { label: "Email: legal@reddit.com", url: "mailto:legal@reddit.com" },
    ],
    body: `TO: Reddit Trust & Safety — Admin Team
RE: Mandatory Removal of Illegal NCII Under the Online Safety Act 2023

I submit this formal notice under the Online Safety Act 2023. Reddit, as a regulated user-to-user platform accessible to UK users, is required to act swiftly upon becoming aware of content giving reasonable grounds to infer it constitutes illegal non-consensual intimate imagery (Section 192). I am the affected person within the meaning of Section 20 and set out all four required elements below.

ELEMENT 1 — URL of Content
The following Reddit post, comment, or media link contains NCII subject to this notice:

Content URL: [URL PLACEHOLDER]
Subreddit: r/[SUBREDDIT PLACEHOLDER]
Post title (if known): [TITLE PLACEHOLDER]
Date first observed: [DATE PLACEHOLDER]

ELEMENT 2 — Complainant Is the Subject of the Content
I confirm that I am the individual depicted in the content at the URL above.
I qualify as an affected person under Section 20 of the Online Safety Act 2023.
I am not required to hold a Reddit account to make this complaint.
Full name: [NAME PLACEHOLDER]

ELEMENT 3 — Absence of Consent
I state unequivocally that:
a) I did not consent to this content being created, posted, or hosted on Reddit.
b) The content was submitted to Reddit without my knowledge or permission.
c) No consent was ever given for this material to be shared on any platform.

ELEMENT 4 — Nature of the Content
The content is sexually explicit and/or intimate in nature.
It depicts or purports to depict my body in a sexual context.
The content may be AI-generated or a digitally manipulated deepfake of my likeness.
Its hosting on Reddit — including potential cross-posts — causes ongoing, compounding harm.

CLOSING STATEMENT & DEMAND
Reddit is required under the Online Safety Act 2023 to act swiftly upon receipt of this notice. The Section 192 threshold is met by the information above. I additionally request removal of any cross-posts, mirrors, or cached versions of this content on Reddit's platform, and review of the hosting community where applicable. Please confirm in writing all actions taken. If this notice does not receive a satisfactory response, I will invoke Reddit's complaints procedure and escalate to Ofcom at ofcom.org.uk.

SIGNATURE OF AFFECTED PERSON
________________________________________
Signature of Affected Person
[NAME PLACEHOLDER]
Date: [DATE PLACEHOLDER]
Contact: [CONTACT EMAIL / PHONE PLACEHOLDER]`,
  },

  Telegram: {
    subject: "NCII Removal Notice — Online Safety Act 2023 | Non-Consensual Intimate / Deepfake Imagery",
    submitLabel: "Submit your request here:",
    submitLinks: [
      { label: "Email: abuse@telegram.org", url: "mailto:abuse@telegram.org" },
      { label: "Telegram Support", url: "https://telegram.org/support" },
    ],
    body: `TO: Telegram Trust & Safety Team
RE: Mandatory Removal of Illegal NCII Under the Online Safety Act 2023

I am submitting this formal notice under the Online Safety Act 2023. Telegram, as a platform accessible to UK users and regulated as a user-to-user service under the Act, is required to act swiftly upon becoming aware of content giving reasonable grounds to infer it constitutes illegal non-consensual intimate imagery (Section 192). I am the affected person within the meaning of Section 20 and am not required to be a Telegram user to invoke these rights. The four required elements are set out below.

ELEMENT 1 — URL of Content
The following Telegram channel, group, bot, or message link contains NCII subject to this notice:

Content link / Channel URL: [URL PLACEHOLDER]
Channel or group name (if known): [NAME PLACEHOLDER]
Message ID or post date: [ID / DATE PLACEHOLDER]
Date first observed: [DATE PLACEHOLDER]

ELEMENT 2 — Complainant Is the Subject of the Content
I confirm that I am the individual depicted in the content at the link above.
I qualify as an affected person under Section 20 of the Online Safety Act 2023.
I am not required to hold a Telegram account to bring this notice.
Full name: [NAME PLACEHOLDER]

ELEMENT 3 — Absence of Consent
I state unequivocally that:
a) I did not consent to this content being created, shared, or hosted on Telegram.
b) The content was distributed without my knowledge or authorisation.
c) No consent, express or implied, was ever given for this material to be circulated.

ELEMENT 4 — Nature of the Content
The content is sexually explicit and/or intimate in nature.
It depicts or purports to depict my body in a sexual context.
The content may be AI-generated or a digitally manipulated deepfake of my likeness.
The distributed nature of Telegram channels amplifies harm; swift action is essential.

CLOSING STATEMENT & DEMAND
Telegram is required under the Online Safety Act 2023 to act swiftly upon receipt of this notice. The Section 192 threshold is met. I request removal of the specific content, deletion of any bots or automated accounts distributing this material, and — where appropriate — termination of the hosting channel or group. Please confirm in writing all actions taken. If this notice does not receive a satisfactory response, I will invoke Telegram's complaints procedure and escalate to Ofcom at ofcom.org.uk.

SIGNATURE OF AFFECTED PERSON
________________________________________
Signature of Affected Person
[NAME PLACEHOLDER]
Date: [DATE PLACEHOLDER]
Contact: [CONTACT EMAIL / PHONE PLACEHOLDER]`,
  },
};

const euIdentityExemption = `IDENTITY EXEMPTION — Article 16(2)(c), Digital Services Act
NCII victims are explicitly exempt from the requirement to provide their name and postal address under Article 16(2)(c). This notice therefore omits full identity details in accordance with that exemption.
Contact email is provided below solely to receive platform acknowledgement and to enable the platform to fulfil its obligation under Article 16(5) (notification of action taken). No further personal data is required.`;

const euTemplates: Record<string, TemplateData> = {
  "Meta (Facebook/Instagram)": {
    subject: "Formal DSA Notice — Article 16(2) | Illegal NCII / Non-Consensual Deepfake Content — Immediate Removal Required",
    submitLabel: "Submit your request here:",
    submitLinks: [
      { label: "Meta DSA Notice Form", url: "https://www.meta.com/help/policies/1352307406415932/" },
      { label: "Meta DSA Transparency", url: "https://transparency.meta.com" },
    ],
    identityExemption: euIdentityExemption,
    body: `TO: Meta Trust & Safety — DSA Compliance Team
RE: Notice of Illegal Content Under Article 16(2), Digital Services Act — Non-Consensual Intimate Imagery

I am submitting this notice pursuant to Article 16(2) of the Digital Services Act (Regulation (EU) 2022/2065). Meta, as a Very Large Online Platform designated under Article 33, is subject to the DSA's notice-and-action obligations. Upon receipt of this valid notice, Meta is required under Article 16(6) to process it in a timely, diligent, non-arbitrary and objective manner and to notify me of the decision taken under Article 16(5). The four required elements of a valid Article 16(2) notice are set out below.

ELEMENT 1 — Why the Content Is Illegal
The content at the URL below constitutes illegal non-consensual intimate imagery (NCII).
It is illegal on the following grounds:
a) It depicts or purports to depict a real individual in a sexually explicit or intimate manner without that individual's consent.
b) Its creation and/or distribution without consent constitutes a criminal offence under the law of the EU member state(s) in which harm is suffered, as well as under applicable EU-level instruments protecting dignity and privacy.
c) The content may be AI-generated or digitally manipulated (deepfake) to depict the complainant's likeness, compounding the illegality.
d) Continued hosting constitutes ongoing facilitation of that illegal activity.

ELEMENT 2 — Exact URL of Content
The following URL on Meta's platform hosts the illegal content subject to this notice:

Content URL: [URL PLACEHOLDER]
Date first observed: [DATE PLACEHOLDER]
Platform surface: [e.g. Facebook post / Instagram Reel / Threads post — PLACEHOLDER]
Provide the exact, complete URL. If content appears on multiple URLs, list each separately.

ELEMENT 3 — Submitter Identity (Article 16(2)(c) Exemption Applies)
The complainant is the individual depicted in the content identified above.
Pursuant to Article 16(2)(c), NCII victims are explicitly exempt from the requirement to provide their name and postal address. Full identity is therefore withheld.

Contact email: [CONTACT EMAIL PLACEHOLDER]
Date of notice: [DATE PLACEHOLDER]
Article 16(2)(c) exemption invoked. Name and postal address withheld. Email provided solely for Article 16(5) notification of decision.

ELEMENT 4 — Bona Fide Belief Statement
I state, in good faith, that the information in this notice is accurate and complete to the best of my knowledge, and that I have a bona fide belief that the content identified above is illegal and was published without the consent of the person depicted. I understand that submitting a knowingly false notice may carry legal consequences.

CLOSING STATEMENT, DEMAND & ESCALATION PATH
Meta is required under Article 16(6) of the DSA to process this notice in a timely, diligent, non-arbitrary and objective manner and to notify me of the decision and any available redress under Article 16(5). If this notice does not receive a satisfactory response, I will invoke Meta's internal complaint mechanism under Article 20, pursue out-of-court settlement under Article 21, and refer the matter to the competent Digital Services Coordinator under Article 53. As a VLOP, Meta faces fines of up to 6% of global annual worldwide turnover for systemic non-compliance under Article 52(3).

NON-COMPLIANCE WARNING — Article 52, Digital Services Act
Failure to process this notice in a timely, diligent, non-arbitrary and objective manner (Article 16(6)) may result in enforcement action by the competent Digital Services Coordinator. Platforms designated as Very Large Online Platforms (VLOPs) face fines of up to 6% of global annual worldwide turnover under Article 52(3).

SIGNATURE OF COMPLAINANT
________________________________________
Signature of Complainant
Name (optional — see Article 16(2)(c) exemption above): [NAME PLACEHOLDER or 'Withheld — NCII Victim Exemption']
Contact email: [CONTACT EMAIL PLACEHOLDER]
Date: [DATE PLACEHOLDER]`,
  },

  "Google (Search/YouTube)": {
    subject: "Formal DSA Notice — Article 16(2) | Illegal NCII / Non-Consensual Deepfake Content — Immediate Removal Required",
    submitLabel: "Submit your request here:",
    submitLinks: [
      { label: "Google Legal Removals", url: "https://support.google.com/websearch/answer/9116649" },
      { label: "YouTube Report Abuse", url: "https://youtube.com/reportabuse" },
      { label: "Google DSA Legal Contact", url: "https://support.google.com/legal/contact/lr_legalother" },
    ],
    identityExemption: euIdentityExemption,
    body: `TO: Google Trust & Safety — DSA Compliance Team
RE: Notice of Illegal Content Under Article 16(2), Digital Services Act — Non-Consensual Intimate Imagery

I am submitting this notice pursuant to Article 16(2) of the Digital Services Act (Regulation (EU) 2022/2065). Google, as a Very Large Online Platform and Very Large Online Search Engine designated under Article 33, is subject to the DSA's notice-and-action obligations. Upon receipt of this valid notice, Google is required under Article 16(6) to process it in a timely, diligent, non-arbitrary and objective manner and to notify me of the decision under Article 16(5). The four required elements are set out below.

ELEMENT 1 — Why the Content Is Illegal
The content at the URL below constitutes illegal non-consensual intimate imagery (NCII).
It is illegal on the following grounds:
a) It depicts or purports to depict a real individual in a sexually explicit or intimate manner without that individual's knowledge or consent.
b) Its creation, hosting, and/or indexing constitutes a criminal offence under applicable EU member state law and EU-level data protection and privacy instruments.
c) The content may be AI-generated or a digitally manipulated deepfake, compounding the illegality and the harm caused.
d) Where indexed in Google Search, each impression constitutes ongoing facilitation of illegal distribution.

ELEMENT 2 — Exact URL of Content
The following URL hosts or indexes the illegal content subject to this notice:

Content URL: [URL PLACEHOLDER]
Date first observed: [DATE PLACEHOLDER]
Google product / surface: [e.g. Google Search result / YouTube video / Google Drive link — PLACEHOLDER]
For Search results, removal of the URL from Google's index is also requested. For YouTube, removal of the video and associated media is requested.

ELEMENT 3 — Submitter Identity (Article 16(2)(c) Exemption Applies)
The complainant is the individual depicted in the content identified above.
Pursuant to Article 16(2)(c), NCII victims are explicitly exempt from the requirement to provide their name and postal address. Full identity is therefore withheld.

Contact email: [CONTACT EMAIL PLACEHOLDER]
Date of notice: [DATE PLACEHOLDER]
Article 16(2)(c) exemption invoked. Name and postal address withheld. Email provided solely for Article 16(5) notification of decision.

ELEMENT 4 — Bona Fide Belief Statement
I state, in good faith, that the information in this notice is accurate and complete to the best of my knowledge, and that I have a bona fide belief that the content identified is illegal and was published without the consent of the person depicted. I understand that submitting a knowingly false notice may carry legal consequences.

CLOSING STATEMENT, DEMAND & ESCALATION PATH
Google is required under Article 16(6) to process this notice in a timely, diligent, non-arbitrary and objective manner and to notify me of the decision under Article 16(5). For content indexed in Search, I additionally request de-indexing of the URL. If this notice does not receive a satisfactory response, I will invoke Google's internal complaint mechanism under Article 20, pursue out-of-court settlement under Article 21, and refer the matter to the competent Digital Services Coordinator under Article 53. As a designated VLOP and VLOSE, Google faces fines of up to 6% of global annual worldwide turnover for systemic non-compliance under Article 52(3).

NON-COMPLIANCE WARNING — Article 52, Digital Services Act
Failure to process this notice in a timely, diligent, non-arbitrary and objective manner (Article 16(6)) may result in enforcement action by the competent Digital Services Coordinator. Platforms designated as Very Large Online Platforms (VLOPs) face fines of up to 6% of global annual worldwide turnover under Article 52(3).

SIGNATURE OF COMPLAINANT
________________________________________
Signature of Complainant
Name (optional — see Article 16(2)(c) exemption above): [NAME PLACEHOLDER or 'Withheld — NCII Victim Exemption']
Contact email: [CONTACT EMAIL PLACEHOLDER]
Date: [DATE PLACEHOLDER]`,
  },

  "X (Twitter)": {
    subject: "Formal DSA Notice — Article 16(2) | Illegal NCII / Non-Consensual Deepfake Content — Immediate Removal Required",
    submitLabel: "Submit your request here:",
    submitLinks: [
      { label: "X Intimate Media Policy", url: "https://help.x.com/en/rules-and-policies/intimate-media" },
      { label: "X DSA Transparency", url: "https://transparency.x.com" },
    ],
    identityExemption: euIdentityExemption,
    body: `TO: X Trust & Safety — DSA Compliance Team
RE: Notice of Illegal Content Under Article 16(2), Digital Services Act — Non-Consensual Intimate Imagery

I am submitting this notice pursuant to Article 16(2) of the Digital Services Act (Regulation (EU) 2022/2065). X, as a Very Large Online Platform designated under Article 33, is subject to the DSA's notice-and-action obligations. Upon receipt of this valid notice, X is required under Article 16(6) to process it in a timely, diligent, non-arbitrary and objective manner and to notify me of the decision under Article 16(5). The four required elements are set out below.

ELEMENT 1 — Why the Content Is Illegal
The content at the URL below constitutes illegal non-consensual intimate imagery (NCII).
It is illegal on the following grounds:
a) It depicts or purports to depict a real individual in a sexually explicit or intimate context without that individual's consent.
b) Its publication on X constitutes a criminal offence under applicable EU member state law and violates EU-level privacy and dignity protections.
c) The content may be AI-generated or a digitally manipulated deepfake, materially compounding the illegality.
d) The virality mechanics of X accelerate harm; swift action is essential.

ELEMENT 2 — Exact URL of Content
The following URL on X's platform hosts the illegal content subject to this notice:

Content URL: [URL PLACEHOLDER]
Post / Tweet ID (if known): [ID PLACEHOLDER]
Date first observed: [DATE PLACEHOLDER]
Provide the full post URL. If the content has been reposted, list each repost URL separately.

ELEMENT 3 — Submitter Identity (Article 16(2)(c) Exemption Applies)
The complainant is the individual depicted in the content identified above.
Pursuant to Article 16(2)(c), NCII victims are explicitly exempt from the requirement to provide their name and postal address. Full identity is therefore withheld.

Contact email: [CONTACT EMAIL PLACEHOLDER]
Date of notice: [DATE PLACEHOLDER]
Article 16(2)(c) exemption invoked. Name and postal address withheld. Email provided solely for Article 16(5) notification of decision.

ELEMENT 4 — Bona Fide Belief Statement
I state, in good faith, that the information in this notice is accurate and complete to the best of my knowledge, and that I have a bona fide belief that the content identified is illegal and was posted without the consent of the person depicted. I understand that submitting a knowingly false notice may carry legal consequences.

CLOSING STATEMENT, DEMAND & ESCALATION PATH
X is required under Article 16(6) to process this notice in a timely, diligent, non-arbitrary and objective manner and to notify me of the decision under Article 16(5). I additionally request review of the account responsible for uploading this content. If this notice does not receive a satisfactory response, I will invoke X's internal complaint mechanism under Article 20, pursue out-of-court settlement under Article 21, and refer the matter to the competent Digital Services Coordinator under Article 53. As a designated VLOP, X faces fines of up to 6% of global annual worldwide turnover for systemic non-compliance under Article 52(3).

NON-COMPLIANCE WARNING — Article 52, Digital Services Act
Failure to process this notice in a timely, diligent, non-arbitrary and objective manner (Article 16(6)) may result in enforcement action by the competent Digital Services Coordinator. Platforms designated as Very Large Online Platforms (VLOPs) face fines of up to 6% of global annual worldwide turnover under Article 52(3).

SIGNATURE OF COMPLAINANT
________________________________________
Signature of Complainant
Name (optional — see Article 16(2)(c) exemption above): [NAME PLACEHOLDER or 'Withheld — NCII Victim Exemption']
Contact email: [CONTACT EMAIL PLACEHOLDER]
Date: [DATE PLACEHOLDER]`,
  },

  Reddit: {
    subject: "Formal DSA Notice — Article 16(2) | Illegal NCII / Non-Consensual Deepfake Content — Immediate Removal Required",
    submitLabel: "Submit your request here:",
    submitLinks: [
      { label: "Reddit NCII Help", url: "https://support.reddithelp.com/hc/en-us/articles/360043513411" },
      { label: "Email: legal@reddit.com", url: "mailto:legal@reddit.com" },
    ],
    identityExemption: euIdentityExemption,
    body: `TO: Reddit Trust & Safety — DSA Compliance Team
RE: Notice of Illegal Content Under Article 16(2), Digital Services Act — Non-Consensual Intimate Imagery

I am submitting this notice pursuant to Article 16(2) of the Digital Services Act (Regulation (EU) 2022/2065). Reddit, as a provider of an intermediary service accessible to EU users, is subject to the DSA's notice-and-action obligations. Upon receipt of this valid notice, Reddit is required under Article 16(6) to process it in a timely, diligent, non-arbitrary and objective manner and to notify me of the decision under Article 16(5). The four required elements are set out below.

ELEMENT 1 — Why the Content Is Illegal
The content at the URL below constitutes illegal non-consensual intimate imagery (NCII).
It is illegal on the following grounds:
a) It depicts or purports to depict a real individual in a sexually explicit or intimate manner without that individual's knowledge or consent.
b) Its posting on Reddit constitutes a criminal offence under applicable EU member state law and violates EU-level data protection and privacy instruments.
c) The content may be AI-generated or a digitally manipulated deepfake.
d) Reddit's community architecture — including cross-posting and archiving — means removal of the original post alone may be insufficient; all mirrors must be removed.

ELEMENT 2 — Exact URL of Content
The following Reddit URL hosts the illegal content subject to this notice:

Content URL: [URL PLACEHOLDER]
Subreddit: r/[SUBREDDIT PLACEHOLDER]
Post title (if known): [TITLE PLACEHOLDER]
Date first observed: [DATE PLACEHOLDER]
If the content has been cross-posted, list each cross-post URL separately.

ELEMENT 3 — Submitter Identity (Article 16(2)(c) Exemption Applies)
The complainant is the individual depicted in the content identified above.
Pursuant to Article 16(2)(c), NCII victims are explicitly exempt from the requirement to provide their name and postal address. Full identity is therefore withheld.

Contact email: [CONTACT EMAIL PLACEHOLDER]
Date of notice: [DATE PLACEHOLDER]
Article 16(2)(c) exemption invoked. Name and postal address withheld. Email provided solely for Article 16(5) notification of decision.

ELEMENT 4 — Bona Fide Belief Statement
I state, in good faith, that the information in this notice is accurate and complete to the best of my knowledge, and that I have a bona fide belief that the content identified is illegal and was submitted without the consent of the person depicted. I understand that submitting a knowingly false notice may carry legal consequences.

CLOSING STATEMENT, DEMAND & ESCALATION PATH
Reddit is required under Article 16(6) to process this notice in a timely, diligent, non-arbitrary and objective manner and to notify me of the decision under Article 16(5). I additionally request removal of all cross-posts, mirrors, and cached versions of this content on Reddit's platform, and review of the hosting community where appropriate. If this notice does not receive a satisfactory response, I will invoke Reddit's internal complaint mechanism under Article 20, pursue out-of-court settlement under Article 21, and refer the matter to the competent Digital Services Coordinator under Article 53.

NON-COMPLIANCE WARNING — Article 52, Digital Services Act
Failure to process this notice in a timely, diligent, non-arbitrary and objective manner (Article 16(6)) may result in enforcement action by the competent Digital Services Coordinator. Platforms designated as Very Large Online Platforms (VLOPs) face fines of up to 6% of global annual worldwide turnover under Article 52(3).

SIGNATURE OF COMPLAINANT
________________________________________
Signature of Complainant
Name (optional — see Article 16(2)(c) exemption above): [NAME PLACEHOLDER or 'Withheld — NCII Victim Exemption']
Contact email: [CONTACT EMAIL PLACEHOLDER]
Date: [DATE PLACEHOLDER]`,
  },

  Telegram: {
    subject: "Formal DSA Notice — Article 16(2) | Illegal NCII / Non-Consensual Deepfake Content — Immediate Removal Required",
    submitLabel: "Submit your request here:",
    submitLinks: [
      { label: "Email: abuse@telegram.org", url: "mailto:abuse@telegram.org" },
      { label: "Telegram Support", url: "https://telegram.org/support" },
    ],
    identityExemption: euIdentityExemption,
    body: `TO: Telegram Trust & Safety Team
RE: Notice of Illegal Content Under Article 16(2), Digital Services Act — Non-Consensual Intimate Imagery

I am submitting this notice pursuant to Article 16(2) of the Digital Services Act (Regulation (EU) 2022/2065). Telegram, as a provider of an intermediary service accessible to EU users, is subject to the DSA's notice-and-action obligations. Upon receipt of this valid notice, Telegram is required under Article 16(6) to process it in a timely, diligent, non-arbitrary and objective manner and to notify me of the decision under Article 16(5). The four required elements are set out below.

ELEMENT 1 — Why the Content Is Illegal
The content at the link below constitutes illegal non-consensual intimate imagery (NCII).
It is illegal on the following grounds:
a) It depicts or purports to depict a real individual in a sexually explicit or intimate context without that individual's knowledge or consent.
b) Its distribution on Telegram constitutes a criminal offence under applicable EU member state law and violates EU-level privacy and dignity protections.
c) The content may be AI-generated or a digitally manipulated deepfake.
d) Telegram's channel and forwarding architecture enables rapid, large-scale distribution; each forward constitutes fresh facilitation of the illegal act.

ELEMENT 2 — Exact URL of Content
The following Telegram channel, group, or message link hosts the illegal content:

Content link / Channel URL: [URL PLACEHOLDER]
Channel or group name (if known): [NAME PLACEHOLDER]
Message ID or post date: [ID / DATE PLACEHOLDER]
Date first observed: [DATE PLACEHOLDER]
If the content has been forwarded or reposted, list each link separately.

ELEMENT 3 — Submitter Identity (Article 16(2)(c) Exemption Applies)
The complainant is the individual depicted in the content identified above.
Pursuant to Article 16(2)(c), NCII victims are explicitly exempt from the requirement to provide their name and postal address. Full identity is therefore withheld.

Contact email: [CONTACT EMAIL PLACEHOLDER]
Date of notice: [DATE PLACEHOLDER]
Article 16(2)(c) exemption invoked. Name and postal address withheld. Email provided solely for Article 16(5) notification of decision.

ELEMENT 4 — Bona Fide Belief Statement
I state, in good faith, that the information in this notice is accurate and complete to the best of my knowledge, and that I have a bona fide belief that the content identified is illegal and was shared without the consent of the person depicted. I understand that submitting a knowingly false notice may carry legal consequences.

CLOSING STATEMENT, DEMAND & ESCALATION PATH
Telegram is required under Article 16(6) to process this notice in a timely, diligent, non-arbitrary and objective manner and to notify me of the decision under Article 16(5). I additionally request deletion of any bots or automated accounts distributing this content, and — where appropriate — termination of the hosting channel or group. If this notice does not receive a satisfactory response, I will invoke Telegram's internal complaint mechanism under Article 20, pursue out-of-court settlement under Article 21, and refer the matter to the competent Digital Services Coordinator under Article 53.

NON-COMPLIANCE WARNING — Article 52, Digital Services Act
Failure to process this notice in a timely, diligent, non-arbitrary and objective manner (Article 16(6)) may result in enforcement action by the competent Digital Services Coordinator. Platforms designated as Very Large Online Platforms (VLOPs) face fines of up to 6% of global annual worldwide turnover under Article 52(3).

SIGNATURE OF COMPLAINANT
________________________________________
Signature of Complainant
Name (optional — see Article 16(2)(c) exemption above): [NAME PLACEHOLDER or 'Withheld — NCII Victim Exemption']
Contact email: [CONTACT EMAIL PLACEHOLDER]
Date: [DATE PLACEHOLDER]`,
  },
};

const indiaRemovalDeadline = `2-HOUR REMOVAL DEADLINE — IT Rules 2021, Rule 3(2)(b) as amended by G.S.R. 120(E)
Effective 20 February 2026, Rule 3(2)(b) mandates that intermediaries remove or disable access to content falling within the notified NCII categories within 2 hours of receiving a valid complaint. The prima facie standard applies: the Grievance Officer is not required to conduct exhaustive verification before acting. A complaint filed by the individual affected or their authorised representative satisfies this rule.`;

const indiaTemplates: Record<string, TemplateData> = {
  "Meta (Facebook/Instagram)": {
    subject: "URGENT Grievance under IT Rules 2021 Rule 3(2)(b) [G.S.R. 120(E)] — NCII / Deepfake Content — 2-Hour Removal Required",
    submitLabel: "Submit your request here:",
    submitLinks: [
      { label: "Meta NCII Reporting", url: "https://www.meta.com/help/policies/1352307406415932/" },
      { label: "Meta India Grievance Officer", url: "https://grievance.meta.com/india" },
    ],
    removalDeadline: indiaRemovalDeadline,
    body: `TO: The Grievance Officer, Meta Platforms India
RE: Formal Complaint under IT Rules 2021, Rule 3(2)(b) as amended by G.S.R. 120(E) — Non-Consensual Intimate / Deepfake Content — 2-Hour Removal Mandatory

I am filing this formal grievance with the designated Grievance Officer of Meta Platforms India pursuant to Rule 3(2)(b) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, as amended by G.S.R. 120(E) (effective 20 February 2026). Meta is a significant social media intermediary under the IT Rules and is required to remove or disable access to the content identified below within 2 hours of receipt of this valid complaint. The prima facie standard applies. The four required elements are set out below.

ELEMENT 1 — URL of Content
The following URL hosts non-consensual intimate imagery subject to this complaint:

Content URL: [URL PLACEHOLDER]
Date and time first observed: [DATE PLACEHOLDER] [TIME PLACEHOLDER] IST
Platform surface: [e.g. Meta post / reel / channel / search result — PLACEHOLDER]
Provide the exact, complete URL. List each URL separately if content appears at multiple locations.

ELEMENT 2 — Complainant Is the Subject of the Content
The complainant is the individual depicted in the content at the URL above, or the authorised representative of that individual.

Full name: [NAME PLACEHOLDER]
Capacity: [Self / Authorised representative — PLACEHOLDER]
If authorised representative: name of affected individual: [NAME PLACEHOLDER]
I confirm that the affected individual did not authorise this content and has not consented to its creation, upload, or distribution.

ELEMENT 3 — Content Category under Rule 3(2)(b) and Nature of Content
The content falls within one or more of the following categories under Rule 3(2)(b):
[ ] (i) Exposes private areas of the body
[ ] (ii) Full or partial nudity
[ ] (iii) Sexual act or conduct
[ ] (iv) Impersonation / artificially morphed images (deepfake category)

Applicable category/categories (tick all that apply): [PLACEHOLDER]
Additional description of content (optional but recommended): [Briefly describe nature of content without reproducing it — PLACEHOLDER]
The content may be AI-generated or digitally manipulated to depict the complainant's likeness (deepfake). If so, this falls under category (iv) above.
Ticking category (iv) explicitly invokes the deepfake / morphed image provision introduced by G.S.R. 120(E).

ELEMENT 4 — Good-Faith Belief Statement (Prima Facie Standard)
I state in good faith that the information provided in this complaint is accurate and complete to the best of my knowledge.
I have a bona fide belief, on a prima facie basis, that the content identified above constitutes illegal non-consensual intimate imagery within the meaning of Rule 3(2)(b) of the IT Rules 2021 as amended by G.S.R. 120(E).
I understand that this complaint triggers the Grievance Officer's obligation to remove or disable access to the content within 2 hours of receipt.
I am aware that filing a knowingly false complaint may attract legal consequences.

CLOSING STATEMENT, DEMAND & ESCALATION PATH
The Grievance Officer of Meta is required under Rule 3(2)(b) of the IT Rules 2021 (as amended by G.S.R. 120(E), effective 20 February 2026) to remove or disable access to the content identified above within 2 hours of receipt of this complaint. The prima facie standard is met by the information provided herein.

I request written acknowledgement of this complaint and written confirmation of the action taken, including the time of removal, as required by the IT Rules.

Escalation path:
Step 1 — This complaint to the Grievance Officer of Meta
Step 2 — Grievance Appellate Committee (gac.gov.in) within 30 days of Meta's decision or non-response
Step 3 — NCRP at cybercrime.gov.in or call 1930 (file simultaneously — do not wait for Meta's response)

SAFE HARBOUR WARNING — IT Act Section 79 & Section 79(3)(b)
This notice, together with simultaneous filing at cybercrime.gov.in, constitutes government notification under IT Act Section 79(3)(b). Meta is put on notice that failure to remove or disable the identified content expeditiously will result in the forfeiture of intermediary safe harbour protection under Section 79 of the Information Technology Act, 2000. Meta will thereafter bear direct legal liability for the continued hosting of this content. Escalation to the Grievance Appellate Committee (gac.gov.in) will follow any failure to act within the 2-hour window mandated by Rule 3(2)(b).

SIGNATURE OF COMPLAINANT
________________________________________
Signature of Complainant / Authorised Representative
Full name: [NAME PLACEHOLDER]
Capacity: [Self / Authorised representative of affected individual — PLACEHOLDER]
Contact email: [CONTACT EMAIL PLACEHOLDER]
Contact phone: [CONTACT PHONE PLACEHOLDER]
Date and time of complaint: [DATE PLACEHOLDER] [TIME PLACEHOLDER] IST
NCRP acknowledgement number (if filed): [NCRP REF PLACEHOLDER]`,
  },

  "Google (Search/YouTube)": {
    subject: "URGENT Grievance under IT Rules 2021 Rule 3(2)(b) [G.S.R. 120(E)] — NCII / Deepfake Content — 2-Hour Removal Required",
    submitLabel: "Submit your request here:",
    submitLinks: [
      { label: "Google NCII Removals", url: "https://support.google.com/websearch/answer/9116649" },
      { label: "YouTube Report Abuse", url: "https://youtube.com/reportabuse" },
      { label: "Google India Grievance Officer", url: "https://support.google.com/legal/contact/lr_legalother" },
    ],
    removalDeadline: indiaRemovalDeadline,
    body: `TO: The Grievance Officer, Google India Pvt. Ltd.
RE: Formal Complaint under IT Rules 2021, Rule 3(2)(b) as amended by G.S.R. 120(E) — Non-Consensual Intimate / Deepfake Content — 2-Hour Removal Mandatory

I am filing this formal grievance with the designated Grievance Officer of Google India Pvt. Ltd. pursuant to Rule 3(2)(b) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, as amended by G.S.R. 120(E) (effective 20 February 2026). Google is a significant social media intermediary and search engine under the IT Rules and is required to remove or disable access to the content identified below within 2 hours of receipt of this valid complaint. The prima facie standard applies. The four required elements are set out below.

ELEMENT 1 — URL of Content
The following URL hosts non-consensual intimate imagery subject to this complaint:

Content URL: [URL PLACEHOLDER]
Date and time first observed: [DATE PLACEHOLDER] [TIME PLACEHOLDER] IST
Platform surface: [e.g. Google post / reel / channel / search result — PLACEHOLDER]
Provide the exact, complete URL. List each URL separately if content appears at multiple locations.

ELEMENT 2 — Complainant Is the Subject of the Content
The complainant is the individual depicted in the content at the URL above, or the authorised representative of that individual.

Full name: [NAME PLACEHOLDER]
Capacity: [Self / Authorised representative — PLACEHOLDER]
If authorised representative: name of affected individual: [NAME PLACEHOLDER]
I confirm that the affected individual did not authorise this content and has not consented to its creation, upload, or distribution.

ELEMENT 3 — Content Category under Rule 3(2)(b) and Nature of Content
The content falls within one or more of the following categories under Rule 3(2)(b):
[ ] (i) Exposes private areas of the body
[ ] (ii) Full or partial nudity
[ ] (iii) Sexual act or conduct
[ ] (iv) Impersonation / artificially morphed images (deepfake category)

Applicable category/categories (tick all that apply): [PLACEHOLDER]
Additional description of content (optional but recommended): [Briefly describe nature of content without reproducing it — PLACEHOLDER]
The content may be AI-generated or digitally manipulated to depict the complainant's likeness (deepfake). If so, this falls under category (iv) above.
Ticking category (iv) explicitly invokes the deepfake / morphed image provision introduced by G.S.R. 120(E).

ELEMENT 4 — Good-Faith Belief Statement (Prima Facie Standard)
I state in good faith that the information provided in this complaint is accurate and complete to the best of my knowledge.
I have a bona fide belief, on a prima facie basis, that the content identified above constitutes illegal non-consensual intimate imagery within the meaning of Rule 3(2)(b) of the IT Rules 2021 as amended by G.S.R. 120(E).
I understand that this complaint triggers the Grievance Officer's obligation to remove or disable access to the content within 2 hours of receipt.
I am aware that filing a knowingly false complaint may attract legal consequences.

CLOSING STATEMENT, DEMAND & ESCALATION PATH
The Grievance Officer of Google is required under Rule 3(2)(b) of the IT Rules 2021 (as amended by G.S.R. 120(E), effective 20 February 2026) to remove or disable access to the content identified above within 2 hours of receipt of this complaint. The prima facie standard is met by the information provided herein.

I request written acknowledgement of this complaint and written confirmation of the action taken, including the time of removal, as required by the IT Rules.

Escalation path:
Step 1 — This complaint to the Grievance Officer of Google
Step 2 — Grievance Appellate Committee (gac.gov.in) within 30 days of Google's decision or non-response
Step 3 — NCRP at cybercrime.gov.in or call 1930 (file simultaneously — do not wait for Google's response)

SAFE HARBOUR WARNING — IT Act Section 79 & Section 79(3)(b)
This notice, together with simultaneous filing at cybercrime.gov.in, constitutes government notification under IT Act Section 79(3)(b). Google is put on notice that failure to remove or disable the identified content expeditiously will result in the forfeiture of intermediary safe harbour protection under Section 79 of the Information Technology Act, 2000. Google will thereafter bear direct legal liability for the continued hosting of this content. Escalation to the Grievance Appellate Committee (gac.gov.in) will follow any failure to act within the 2-hour window mandated by Rule 3(2)(b).

SIGNATURE OF COMPLAINANT
________________________________________
Signature of Complainant / Authorised Representative
Full name: [NAME PLACEHOLDER]
Capacity: [Self / Authorised representative of affected individual — PLACEHOLDER]
Contact email: [CONTACT EMAIL PLACEHOLDER]
Contact phone: [CONTACT PHONE PLACEHOLDER]
Date and time of complaint: [DATE PLACEHOLDER] [TIME PLACEHOLDER] IST
NCRP acknowledgement number (if filed): [NCRP REF PLACEHOLDER]`,
  },

  "X (Twitter)": {
    subject: "URGENT Grievance under IT Rules 2021 Rule 3(2)(b) [G.S.R. 120(E)] — NCII / Deepfake Content — 2-Hour Removal Required",
    submitLabel: "Submit your request here:",
    submitLinks: [
      { label: "X Intimate Media Policy", url: "https://help.x.com/en/rules-and-policies/intimate-media" },
      { label: "X India Grievance Officer", url: "https://grievanceofficer.x.com" },
    ],
    removalDeadline: indiaRemovalDeadline,
    body: `TO: The Grievance Officer, Twitter Communications India Pvt. Ltd.
RE: Formal Complaint under IT Rules 2021, Rule 3(2)(b) as amended by G.S.R. 120(E) — Non-Consensual Intimate / Deepfake Content — 2-Hour Removal Mandatory

I am filing this formal grievance with the designated Grievance Officer of X (formerly Twitter) / Twitter Communications India Pvt. Ltd. pursuant to Rule 3(2)(b) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, as amended by G.S.R. 120(E) (effective 20 February 2026). X is a significant social media intermediary under the IT Rules and is required to remove or disable access to the content identified below within 2 hours of receipt of this valid complaint. The prima facie standard applies. The four required elements are set out below.

ELEMENT 1 — URL of Content
The following URL hosts non-consensual intimate imagery subject to this complaint:

Content URL: [URL PLACEHOLDER]
Date and time first observed: [DATE PLACEHOLDER] [TIME PLACEHOLDER] IST
Platform surface: [e.g. X post / reel / channel / search result — PLACEHOLDER]
Provide the exact, complete URL. List each URL separately if content appears at multiple locations.

ELEMENT 2 — Complainant Is the Subject of the Content
The complainant is the individual depicted in the content at the URL above, or the authorised representative of that individual.

Full name: [NAME PLACEHOLDER]
Capacity: [Self / Authorised representative — PLACEHOLDER]
If authorised representative: name of affected individual: [NAME PLACEHOLDER]
I confirm that the affected individual did not authorise this content and has not consented to its creation, upload, or distribution.

ELEMENT 3 — Content Category under Rule 3(2)(b) and Nature of Content
The content falls within one or more of the following categories under Rule 3(2)(b):
[ ] (i) Exposes private areas of the body
[ ] (ii) Full or partial nudity
[ ] (iii) Sexual act or conduct
[ ] (iv) Impersonation / artificially morphed images (deepfake category)

Applicable category/categories (tick all that apply): [PLACEHOLDER]
Additional description of content (optional but recommended): [Briefly describe nature of content without reproducing it — PLACEHOLDER]
The content may be AI-generated or digitally manipulated to depict the complainant's likeness (deepfake). If so, this falls under category (iv) above.
Ticking category (iv) explicitly invokes the deepfake / morphed image provision introduced by G.S.R. 120(E).

ELEMENT 4 — Good-Faith Belief Statement (Prima Facie Standard)
I state in good faith that the information provided in this complaint is accurate and complete to the best of my knowledge.
I have a bona fide belief, on a prima facie basis, that the content identified above constitutes illegal non-consensual intimate imagery within the meaning of Rule 3(2)(b) of the IT Rules 2021 as amended by G.S.R. 120(E).
I understand that this complaint triggers the Grievance Officer's obligation to remove or disable access to the content within 2 hours of receipt.
I am aware that filing a knowingly false complaint may attract legal consequences.

CLOSING STATEMENT, DEMAND & ESCALATION PATH
The Grievance Officer of X is required under Rule 3(2)(b) of the IT Rules 2021 (as amended by G.S.R. 120(E), effective 20 February 2026) to remove or disable access to the content identified above within 2 hours of receipt of this complaint. The prima facie standard is met by the information provided herein.

I request written acknowledgement of this complaint and written confirmation of the action taken, including the time of removal, as required by the IT Rules.

Escalation path:
Step 1 — This complaint to the Grievance Officer of X
Step 2 — Grievance Appellate Committee (gac.gov.in) within 30 days of X's decision or non-response
Step 3 — NCRP at cybercrime.gov.in or call 1930 (file simultaneously — do not wait for X's response)

SAFE HARBOUR WARNING — IT Act Section 79 & Section 79(3)(b)
This notice, together with simultaneous filing at cybercrime.gov.in, constitutes government notification under IT Act Section 79(3)(b). X is put on notice that failure to remove or disable the identified content expeditiously will result in the forfeiture of intermediary safe harbour protection under Section 79 of the Information Technology Act, 2000. X will thereafter bear direct legal liability for the continued hosting of this content. Escalation to the Grievance Appellate Committee (gac.gov.in) will follow any failure to act within the 2-hour window mandated by Rule 3(2)(b).

SIGNATURE OF COMPLAINANT
________________________________________
Signature of Complainant / Authorised Representative
Full name: [NAME PLACEHOLDER]
Capacity: [Self / Authorised representative of affected individual — PLACEHOLDER]
Contact email: [CONTACT EMAIL PLACEHOLDER]
Contact phone: [CONTACT PHONE PLACEHOLDER]
Date and time of complaint: [DATE PLACEHOLDER] [TIME PLACEHOLDER] IST
NCRP acknowledgement number (if filed): [NCRP REF PLACEHOLDER]`,
  },

  Reddit: {
    subject: "URGENT Grievance under IT Rules 2021 Rule 3(2)(b) [G.S.R. 120(E)] — NCII / Deepfake Content — 2-Hour Removal Required",
    submitLabel: "Submit your request here:",
    submitLinks: [
      { label: "Reddit NCII Help", url: "https://support.reddithelp.com/hc/en-us/articles/360043513411" },
      { label: "Email: legal@reddit.com", url: "mailto:legal@reddit.com" },
    ],
    removalDeadline: indiaRemovalDeadline,
    body: `TO: The Grievance Officer, Reddit India
RE: Formal Complaint under IT Rules 2021, Rule 3(2)(b) as amended by G.S.R. 120(E) — Non-Consensual Intimate / Deepfake Content — 2-Hour Removal Mandatory

I am filing this formal grievance with the designated Grievance Officer of Reddit Inc. / Reddit India pursuant to Rule 3(2)(b) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, as amended by G.S.R. 120(E) (effective 20 February 2026). Reddit is an intermediary under the IT Rules and, where it meets the threshold of a significant social media intermediary, is required to remove or disable access to the content identified below within 2 hours of receipt of this valid complaint. The prima facie standard applies. The four required elements are set out below.

ELEMENT 1 — URL of Content
The following URL hosts non-consensual intimate imagery subject to this complaint:

Content URL: [URL PLACEHOLDER]
Date and time first observed: [DATE PLACEHOLDER] [TIME PLACEHOLDER] IST
Platform surface: [e.g. Reddit post / reel / channel / search result — PLACEHOLDER]
Provide the exact, complete URL. List each URL separately if content appears at multiple locations.

ELEMENT 2 — Complainant Is the Subject of the Content
The complainant is the individual depicted in the content at the URL above, or the authorised representative of that individual.

Full name: [NAME PLACEHOLDER]
Capacity: [Self / Authorised representative — PLACEHOLDER]
If authorised representative: name of affected individual: [NAME PLACEHOLDER]
I confirm that the affected individual did not authorise this content and has not consented to its creation, upload, or distribution.

ELEMENT 3 — Content Category under Rule 3(2)(b) and Nature of Content
The content falls within one or more of the following categories under Rule 3(2)(b):
[ ] (i) Exposes private areas of the body
[ ] (ii) Full or partial nudity
[ ] (iii) Sexual act or conduct
[ ] (iv) Impersonation / artificially morphed images (deepfake category)

Applicable category/categories (tick all that apply): [PLACEHOLDER]
Additional description of content (optional but recommended): [Briefly describe nature of content without reproducing it — PLACEHOLDER]
The content may be AI-generated or digitally manipulated to depict the complainant's likeness (deepfake). If so, this falls under category (iv) above.
Ticking category (iv) explicitly invokes the deepfake / morphed image provision introduced by G.S.R. 120(E).

ELEMENT 4 — Good-Faith Belief Statement (Prima Facie Standard)
I state in good faith that the information provided in this complaint is accurate and complete to the best of my knowledge.
I have a bona fide belief, on a prima facie basis, that the content identified above constitutes illegal non-consensual intimate imagery within the meaning of Rule 3(2)(b) of the IT Rules 2021 as amended by G.S.R. 120(E).
I understand that this complaint triggers the Grievance Officer's obligation to remove or disable access to the content within 2 hours of receipt.
I am aware that filing a knowingly false complaint may attract legal consequences.

CLOSING STATEMENT, DEMAND & ESCALATION PATH
The Grievance Officer of Reddit is required under Rule 3(2)(b) of the IT Rules 2021 (as amended by G.S.R. 120(E), effective 20 February 2026) to remove or disable access to the content identified above within 2 hours of receipt of this complaint. The prima facie standard is met by the information provided herein.

I request written acknowledgement of this complaint and written confirmation of the action taken, including the time of removal, as required by the IT Rules.

Escalation path:
Step 1 — This complaint to the Grievance Officer of Reddit
Step 2 — Grievance Appellate Committee (gac.gov.in) within 30 days of Reddit's decision or non-response
Step 3 — NCRP at cybercrime.gov.in or call 1930 (file simultaneously — do not wait for Reddit's response)

SAFE HARBOUR WARNING — IT Act Section 79 & Section 79(3)(b)
This notice, together with simultaneous filing at cybercrime.gov.in, constitutes government notification under IT Act Section 79(3)(b). Reddit is put on notice that failure to remove or disable the identified content expeditiously will result in the forfeiture of intermediary safe harbour protection under Section 79 of the Information Technology Act, 2000. Reddit will thereafter bear direct legal liability for the continued hosting of this content. Escalation to the Grievance Appellate Committee (gac.gov.in) will follow any failure to act within the 2-hour window mandated by Rule 3(2)(b).

SIGNATURE OF COMPLAINANT
________________________________________
Signature of Complainant / Authorised Representative
Full name: [NAME PLACEHOLDER]
Capacity: [Self / Authorised representative of affected individual — PLACEHOLDER]
Contact email: [CONTACT EMAIL PLACEHOLDER]
Contact phone: [CONTACT PHONE PLACEHOLDER]
Date and time of complaint: [DATE PLACEHOLDER] [TIME PLACEHOLDER] IST
NCRP acknowledgement number (if filed): [NCRP REF PLACEHOLDER]`,
  },

  Telegram: {
    subject: "URGENT Grievance under IT Rules 2021 Rule 3(2)(b) [G.S.R. 120(E)] — NCII / Deepfake Content — 2-Hour Removal Required",
    submitLabel: "Submit your request here:",
    submitLinks: [
      { label: "Email: abuse@telegram.org", url: "mailto:abuse@telegram.org" },
      { label: "Telegram Support", url: "https://telegram.org/support" },
    ],
    removalDeadline: indiaRemovalDeadline,
    body: `TO: The Grievance Officer, Telegram Messenger (India Operations)
RE: Formal Complaint under IT Rules 2021, Rule 3(2)(b) as amended by G.S.R. 120(E) — Non-Consensual Intimate / Deepfake Content — 2-Hour Removal Mandatory

I am filing this formal grievance with the designated Grievance Officer of Telegram Messenger pursuant to Rule 3(2)(b) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, as amended by G.S.R. 120(E) (effective 20 February 2026). Telegram is an intermediary providing services to users in India and is required to remove or disable access to the content identified below within 2 hours of receipt of this valid complaint. The prima facie standard applies. The four required elements are set out below.

ELEMENT 1 — URL of Content
The following URL hosts non-consensual intimate imagery subject to this complaint:

Content URL: [URL PLACEHOLDER]
Date and time first observed: [DATE PLACEHOLDER] [TIME PLACEHOLDER] IST
Platform surface: [e.g. Telegram post / reel / channel / search result — PLACEHOLDER]
Provide the exact, complete URL. List each URL separately if content appears at multiple locations.

ELEMENT 2 — Complainant Is the Subject of the Content
The complainant is the individual depicted in the content at the URL above, or the authorised representative of that individual.

Full name: [NAME PLACEHOLDER]
Capacity: [Self / Authorised representative — PLACEHOLDER]
If authorised representative: name of affected individual: [NAME PLACEHOLDER]
I confirm that the affected individual did not authorise this content and has not consented to its creation, upload, or distribution.

ELEMENT 3 — Content Category under Rule 3(2)(b) and Nature of Content
The content falls within one or more of the following categories under Rule 3(2)(b):
[ ] (i) Exposes private areas of the body
[ ] (ii) Full or partial nudity
[ ] (iii) Sexual act or conduct
[ ] (iv) Impersonation / artificially morphed images (deepfake category)

Applicable category/categories (tick all that apply): [PLACEHOLDER]
Additional description of content (optional but recommended): [Briefly describe nature of content without reproducing it — PLACEHOLDER]
The content may be AI-generated or digitally manipulated to depict the complainant's likeness (deepfake). If so, this falls under category (iv) above.
Ticking category (iv) explicitly invokes the deepfake / morphed image provision introduced by G.S.R. 120(E).

ELEMENT 4 — Good-Faith Belief Statement (Prima Facie Standard)
I state in good faith that the information provided in this complaint is accurate and complete to the best of my knowledge.
I have a bona fide belief, on a prima facie basis, that the content identified above constitutes illegal non-consensual intimate imagery within the meaning of Rule 3(2)(b) of the IT Rules 2021 as amended by G.S.R. 120(E).
I understand that this complaint triggers the Grievance Officer's obligation to remove or disable access to the content within 2 hours of receipt.
I am aware that filing a knowingly false complaint may attract legal consequences.

CLOSING STATEMENT, DEMAND & ESCALATION PATH
The Grievance Officer of Telegram is required under Rule 3(2)(b) of the IT Rules 2021 (as amended by G.S.R. 120(E), effective 20 February 2026) to remove or disable access to the content identified above within 2 hours of receipt of this complaint. The prima facie standard is met by the information provided herein.

I request written acknowledgement of this complaint and written confirmation of the action taken, including the time of removal, as required by the IT Rules.

Escalation path:
Step 1 — This complaint to the Grievance Officer of Telegram
Step 2 — Grievance Appellate Committee (gac.gov.in) within 30 days of Telegram's decision or non-response
Step 3 — NCRP at cybercrime.gov.in or call 1930 (file simultaneously — do not wait for Telegram's response)

SAFE HARBOUR WARNING — IT Act Section 79 & Section 79(3)(b)
This notice, together with simultaneous filing at cybercrime.gov.in, constitutes government notification under IT Act Section 79(3)(b). Telegram is put on notice that failure to remove or disable the identified content expeditiously will result in the forfeiture of intermediary safe harbour protection under Section 79 of the Information Technology Act, 2000. Telegram will thereafter bear direct legal liability for the continued hosting of this content. Escalation to the Grievance Appellate Committee (gac.gov.in) will follow any failure to act within the 2-hour window mandated by Rule 3(2)(b).

SIGNATURE OF COMPLAINANT
________________________________________
Signature of Complainant / Authorised Representative
Full name: [NAME PLACEHOLDER]
Capacity: [Self / Authorised representative of affected individual — PLACEHOLDER]
Contact email: [CONTACT EMAIL PLACEHOLDER]
Contact phone: [CONTACT PHONE PLACEHOLDER]
Date and time of complaint: [DATE PLACEHOLDER] [TIME PLACEHOLDER] IST
NCRP acknowledgement number (if filed): [NCRP REF PLACEHOLDER]`,
  },
};

function getTemplate(location: string, platform: string): TemplateData {
  if (location === "United States" && usTemplates[platform]) {
    return usTemplates[platform];
  }
  if (location === "United Kingdom" && ukTemplates[platform]) {
    return ukTemplates[platform];
  }
  if (location === "European Union" && euTemplates[platform]) {
    return euTemplates[platform];
  }
  if (location === "India" && indiaTemplates[platform]) {
    return indiaTemplates[platform];
  }
  return defaultTemplate;
}

const LegalTemplate = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const location = (state as any)?.location ?? "Your jurisdiction";
  const platform = (state as any)?.platform ?? "Selected platform";

  const tpl = getTemplate(location, platform);
  const [brokenLinkOpen, setBrokenLinkOpen] = useState(false);
  const [brokenLinkValue, setBrokenLinkValue] = useState("");
  const [brokenLinkSent, setBrokenLinkSent] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(humanizePlaceholders(tpl.body));
      toast({ title: "Copied!", description: "Template copied to clipboard." });
    } catch {
      toast({
        title: "Copy failed",
        description: "Please select and copy manually.",
        variant: "destructive",
      });
    }
  };

  const sectionHeaderPattern = /^(ELEMENT \d+|CLOSING|SIGNATURE|SAFE HARBOUR|NON-COMPLIANCE|ESCALATE|DMCA ELEMENT \d+|WHEN TO USE)/m;

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

      // Split line by bracket placeholders and highlight them inline
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
        <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground font-sans overflow-x-hidden">
          {section.split("\n").map((line, li) => renderLineWithPlaceholders(line, li))}
        </pre>
      </div>
    ));
  };


  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      {/* Header */}
      <section className="bg-secondary/50 px-6 py-12 sm:py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-xl mx-auto space-y-3"
        >
          <FileText className="mx-auto h-10 w-10 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Your removal request — {location} · {platform}
          </h1>
          <p className="text-muted-foreground text-sm">
            Fill in the fields marked below, copy the template, and submit it.
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            You can submit this at any time — platforms process reports 24/7.
          </p>
        </motion.div>
      </section>

      <section className="flex-1 px-3 sm:px-4 py-10 sm:py-14 overflow-x-hidden">
      <div className="w-full max-w-2xl mx-auto space-y-6 overflow-x-hidden">

        {/* Instruction banner */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}>
        <Card className="border-primary/30 bg-card p-4 space-y-2">
          <p className="text-sm text-foreground leading-relaxed">
            <span className="font-semibold">How to use this template:</span>{" "}
            Step 1 — Fill in every field marked [like this] with your information.{" "}
            Step 2 — Press Copy when done.{" "}
            Step 3 — Go to the reporting link above and paste it there.
          </p>
          <p className="text-xs text-muted-foreground">
            ✏️ Most templates only have <span className="font-semibold text-foreground">4–6 fields</span> to fill in — it takes about 2 minutes.
          </p>
        </Card>
        </motion.div>

        {/* EU identity protection callout */}
        {location === "European Union" && (
          <Card className="border-primary/20 bg-card p-4">
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-semibold">🛡 Your identity is protected.</span>{" "}
              Under EU law (DSA Article 16(2)(c)), you do not have to give your name. You only need to provide an email address.
            </p>
          </Card>
        )}

        {/* India category guidance callout */}
        {location === "India" && (
          <Card className="border-primary/20 bg-card p-4">
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-semibold">📋 Which category to pick:</span>{" "}
              For most deepfakes: select category (iv) — artificially morphed images. If the content also shows nudity, also select (ii).
            </p>
          </Card>
        )}

        {/* Subject line */}
        <Card className="border-muted bg-muted/30 p-4 space-y-1">
          <p className="text-xs font-medium text-muted-foreground">
            Use this as your email/message subject:
          </p>
          <p className="text-sm font-semibold text-foreground select-all break-words">
            {humanizePlaceholders(tpl.subject)}
          </p>
        </Card>

        {/* Reporting links — sticky on desktop */}
        {tpl.submitLinks.length > 0 && (
          <Card className="hidden sm:block border-primary/30 bg-background p-4 text-center space-y-2 sticky top-4 z-20">
            <p className="text-sm font-medium text-foreground">
              {tpl.submitLabel}
            </p>
            <div className="flex flex-col items-center gap-1">
              {tpl.submitLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary underline text-sm font-medium"
                >
                  {link.label} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </Card>
        )}

        {/* Mobile fixed bottom reporting button */}
        {tpl.submitLinks.length > 0 && (
          <div className="fixed bottom-4 left-4 right-4 z-50 sm:hidden">
            <a
              href={tpl.submitLinks[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-md bg-primary text-primary-foreground py-3 text-sm font-medium shadow-lg"
            >
              Open reporting form → <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}

        {/* Identity exemption (EU DSA) */}
        {tpl.identityExemption && (
          <Card className="border-amber-500/30 bg-amber-500/5 p-4 space-y-1">
            <pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-foreground font-sans overflow-x-hidden">
              {humanizePlaceholders(tpl.identityExemption)}
            </pre>
          </Card>
        )}

        {/* 2-hour removal deadline (India) */}
        {tpl.removalDeadline && (
          <Card className="border-destructive/30 bg-destructive/5 p-4 space-y-1">
            <pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-foreground font-sans overflow-x-hidden">
              {humanizePlaceholders(tpl.removalDeadline)}
            </pre>
          </Card>
        )}

        {/* Template block */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">
              Your legal template
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-1.5"
            >
              <Copy className="h-3.5 w-3.5" /> Copy template
            </Button>
          </div>

          <div className="rounded-md border bg-muted/40 p-3 sm:p-6 space-y-0 overflow-x-hidden">
            {renderAnnotatedTemplate(humanizePlaceholders(tpl.body))}
          </div>

          <p className="text-xs text-muted-foreground text-right">
            Last verified: March 2026
          </p>
        </div>

        {/* CTA */}
        <div className="text-center pt-2">
          <Button
            size="lg"
            onClick={() => navigate("/tracker", { state: { location, platform } })}
            className="px-8 py-6 text-base font-semibold"
          >
            I've submitted my report. What happens next? →
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

        {/* Broken link report */}
        <div className="pt-2">
          {!brokenLinkOpen && !brokenLinkSent && (
            <button
              onClick={() => setBrokenLinkOpen(true)}
              className="text-xs text-muted-foreground underline hover:text-foreground transition-colors"
            >
              Did the reporting link not work? Let us know →
            </button>
          )}

          {brokenLinkOpen && !brokenLinkSent && (
            <div className="mt-3 inline-flex flex-col items-center gap-2 w-full max-w-sm mx-auto">
              <input
                type="text"
                value={brokenLinkValue}
                onChange={(e) => setBrokenLinkValue(e.target.value)}
                placeholder="Which link was broken? (optional)"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button
                size="sm"
                onClick={async () => {
                  try {
                    await supabase.from("broken_link_reports").insert({
                      broken_link: brokenLinkValue || null,
                      jurisdiction: location,
                      platform,
                    });
                  } catch {
                    // fire-and-forget
                  }
                  setBrokenLinkSent(true);
                  setBrokenLinkOpen(false);
                }}
              >
                Report broken link
              </Button>
            </div>
          )}

          {brokenLinkSent && (
            <p className="text-xs text-muted-foreground mt-2">
              Thank you. We'll fix it within 48 hours.
            </p>
          )}
        </div>
      </footer>
    </div>
  );
};


export default LegalTemplate;
