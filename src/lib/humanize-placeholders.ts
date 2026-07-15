/**
 * Replaces legal-template placeholders with plain human-readable instructions.
 * Order matters: longer / more-specific patterns must come before shorter ones
 * to avoid partial matches.
 */

function ra(text: string, search: string, replacement: string): string {
  // Global replace without replaceAll — escapes regex special chars in search
  return text.split(search).join(replacement);
}

export function humanizePlaceholders(text: string): string {
  let t = text;

  // ── DMCA-specific (contains nested [NAME PLACEHOLDER] — must be first) ──
  t = ra(t,
    "[e.g. Photograph / image / likeness of [NAME PLACEHOLDER] — PLACEHOLDER]",
    "[Describe the original content — e.g. Photograph of Jane Smith]"
  );
  t = ra(t,
    "[URL or description of original — PLACEHOLDER]",
    "[Link to or description of where your original photo appeared — or leave blank if none]"
  );
  t = ra(t, "[Brief description — PLACEHOLDER]", "[Briefly describe the content]");

  // ── EU-specific (must come before generic NAME PLACEHOLDER) ──
  t = ra(t,
    "[NAME PLACEHOLDER or 'Withheld — NCII Victim Exemption']",
    "[Your name — or type: Withheld — NCII Victim Exemption if you prefer not to share it]"
  );

  // ── Signature line (must come before generic NAME PLACEHOLDER) ──
  t = ra(t, "/s/ [NAME PLACEHOLDER]", "[Type: /s/ then your full name — e.g. /s/ Jane Smith]\n   The /s/ is a legal typed signature. It tells the platform this is a formal, signed notice.");

  // ── Telegram channel name (must come before generic NAME PLACEHOLDER) ──
  t = ra(t,
    "Channel or group name (if known): [NAME PLACEHOLDER]",
    "Channel or group name (if known): [The Telegram channel or group name — or leave blank if unknown]"
  );

  // ── Generic NAME PLACEHOLDER ──
  t = ra(t, "[NAME PLACEHOLDER]", "[Your full legal name — e.g. Jane Smith]");

  // ── India: capacity & authorised representative ──
  t = ra(t,
    "[Self / Authorised representative of affected individual — PLACEHOLDER]",
    "[Type: Self — if you are the person depicted. Or: Authorised representative — if filing on someone else's behalf]"
  );
  t = ra(t,
    "[Self / Authorised representative — PLACEHOLDER]",
    "[Type: Self — if you are the person depicted. Or: Authorised representative — if filing on someone else's behalf]"
  );

  // ── India: time & NCRP ──
  t = ra(t, "[TIME PLACEHOLDER]", "[Time you first saw it — e.g. 10:30 PM IST]");
  t = ra(t,
    "[NCRP REF PLACEHOLDER]",
    "[Your NCRP reference number from cybercrime.gov.in — file there now if you haven't already]"
  );

  // ── Contact details (longer patterns first) ──
  t = ra(t, "[CONTACT EMAIL/PHONE PLACEHOLDER]", "[Your email address or phone number]");
  t = ra(t, "[CONTACT EMAIL / PHONE PLACEHOLDER]", "[Your email address or phone number]");
  t = ra(t, "[CONTACT EMAIL PLACEHOLDER]", "[Email address where you want to receive their reply]");
  t = ra(t, "[CONTACT PHONE PLACEHOLDER]", "[Your phone number — or leave blank]");
  t = ra(t, "[EMAIL / PHONE PLACEHOLDER]", "[Your email address or phone number]");
  t = ra(t, "[EMAIL PLACEHOLDER]", "[Your email address]");
  t = ra(t, "[PHONE PLACEHOLDER]", "[Your phone number — or leave blank]");
  t = ra(t, "[ADDRESS PLACEHOLDER]", "[Your mailing address — required for DMCA notices]");

  // ── Content location ──
  t = ra(t,
    "[URL PLACEHOLDER]",
    "[Paste the full URL of the content — e.g. https://www.facebook.com/...]"
  );
  t = ra(t,
    "[PROFILE NAME OR PAGE PLACEHOLDER]",
    "[Name of the Facebook page or Instagram profile where you found it]"
  );
  t = ra(t, "[ID / DATE PLACEHOLDER]", "[The message ID or the date it was posted — or leave blank]");
  t = ra(t, "[ID PLACEHOLDER]", "[The post or tweet ID if visible in the URL — or leave blank]");
  t = ra(t, "[TITLE PLACEHOLDER]", "[The title of the Reddit post — or leave blank if not visible]");
  t = ra(t, "[SUBREDDIT PLACEHOLDER]", "[The subreddit name — e.g. pics]");
  t = ra(t, "[DATE PLACEHOLDER]", "[Today's date — e.g. 8 March 2026]");

  // ── Platform surfaces ──
  t = ra(t,
    "[e.g. Facebook post / Instagram Reel / Threads post — PLACEHOLDER]",
    "[Describe where you saw it — e.g. Facebook post, Instagram Reel, Threads post]"
  );
  t = ra(t,
    "[e.g., Google Search result / YouTube video / Google Drive link]",
    "[Describe where you saw it — e.g. Google Search result, YouTube video]"
  );
  t = ra(t,
    "[e.g. Google Search result / YouTube video / Google Drive link — PLACEHOLDER]",
    "[Describe where you saw it — e.g. Google Search result, YouTube video]"
  );
  t = ra(t,
    "[e.g. post / video / search result / profile — PLACEHOLDER]",
    "[Describe where you saw it — e.g. post, video, search result]"
  );
  t = ra(t,
    "[e.g. Meta post / reel / channel / search result — PLACEHOLDER]",
    "[Describe where you saw it — e.g. post, reel, channel]"
  );
  t = ra(t,
    "[e.g. Google post / reel / channel / search result — PLACEHOLDER]",
    "[Describe where you saw it — e.g. post, reel, channel]"
  );
  t = ra(t,
    "[e.g. X post / reel / channel / search result — PLACEHOLDER]",
    "[Describe where you saw it — e.g. post, reel, channel]"
  );
  t = ra(t,
    "[e.g. Reddit post / reel / channel / search result — PLACEHOLDER]",
    "[Describe where you saw it — e.g. post, reel, channel]"
  );
  t = ra(t,
    "[e.g. Telegram post / reel / channel / search result — PLACEHOLDER]",
    "[Describe where you saw it — e.g. post, reel, channel]"
  );

  // ── India: content description ──
  t = ra(t,
    "[Briefly describe nature of content without reproducing it — PLACEHOLDER]",
    "[Briefly describe what you see — without reproducing the content itself]"
  );

  // ── Context-dependent bare [PLACEHOLDER] — match by surrounding text ──
  t = ra(t, "Preferred contact method: [PLACEHOLDER]", "Preferred contact method: [Type: Email or Phone]");
  t = ra(t,
    "Applicable category/categories (tick all that apply): [PLACEHOLDER]",
    "Applicable category/categories (tick all that apply): [Type the number(s) that apply — e.g. type: (iv) for a deepfake, or (ii) and (iv) if it shows nudity and is a deepfake]"
  );
  t = ra(t,
    "Applicable category (tick all that apply): [PLACEHOLDER]",
    "Applicable category (tick all that apply): [Type the number(s) that apply — e.g. type: (iv) for a deepfake, or (ii) and (iv) if it shows nudity and is a deepfake]"
  );

  return t;
}
