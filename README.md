# SHIELD

Legal aid tool for victims of non-consensual intimate images. Generates platform specific takedown notices citing the correct law for your jurisdiction. Free, no account, no data stored.

## The problem

When someone finds their intimate images shared without consent, they have legal rights to get them removed. The Take It Down Act (US), Online Safety Act (UK), Digital Services Act (EU), and IT Rules 2021 (India) all provide mechanisms. But no one in crisis can navigate 4 legal frameworks, 6+ platform specific processes, and produce a properly cited removal notice while under extreme distress.

Existing options: pay a lawyer ($500+), use scattered nonprofit resources that don't produce actionable documents, or file a standard platform report (which platforms routinely ignore because it doesn't cite legal standing).

## What SHIELD does

Three question triage identifies your jurisdiction and the platform. Dynamic evidence checklist tells you exactly what to document and why. Template engine generates a legally valid takedown notice with the correct statutory citations, formatted for the target platform's compliance team. Post report guidance covers response timelines and escalation paths.

Covers Meta, Google, X, Reddit, Telegram, and adult platforms across US, UK, EU, and Indian law.

## Design constraints

No accounts. No server storage. No cookies. Everything processes client side. This isn't a feature choice, it's the core product decision. The target user fears re-identification. Any auth barrier creates abandonment. And if I don't store their data, it can't be breached, subpoenaed, or leaked.

Mobile first because 73% of NCII discovery happens on phones. Every screen is designed for someone with shaking hands and a short attention span. Maximum 3 decisions per screen. No branching paths visible.

## Tech

React 18, TypeScript, Vite, Tailwind, shadcn/ui, Framer Motion, React Router, Zod validation. Minimal Supabase (broken link reporting only).

## What I'd change

I designed from research, not from direct observation of victims using the tool. Partnership with an advocacy org (NCMEC, Cyber Civil Rights Initiative) would validate whether the flows actually work under real distress. Also: the core hypothesis (properly cited legal notice gets actioned faster than a standard report) is unvalidated. That's the most important metric and I don't have it yet.
