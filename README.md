# Prepleet

## What This Is

Prepleet is an interview-practice frontend built around simulated technical, behavioral, and systems interview flows. The repo includes a marketing landing page, a practice-mode selector, a problem list, and a full mock-interview screen with code, chat, and resizable panels.

## What Works

- Landing page with interview-prep messaging and a split-screen product mock
- Practice-mode menu for coding, behavioral, systems, and full mock flows
- Full mock interview screen with:
  - Monaco code editor
  - problem statement panel
  - assistant chat panel
  - resizable horizontal and vertical splits
  - microphone / TTS-oriented UI controls
- Problem list view with interview-question metadata

## How It's Built

- Next.js app-router frontend under `src/app`
- Reusable UI primitives under `src/components/ui`
- Framer Motion and custom layout behavior inside the full mock screen
- Monaco Editor integration for coding-interview practice
- Theme support and shared utilities under `src/lib`

## Technical Notes

- The strongest implemented surface is the full mock screen, which combines a problem panel, code editor, and interviewer chat into one workspace instead of treating practice as a plain chat app.
- The repo is frontend-heavy by design. The interview UI and interaction model are the main artifact here, with backend integration represented by a local interview API call from the full mock screen.
- The landing page is not the whole project; the app includes multiple navigable practice surfaces inside `src/app`.

## Proof of Work

- Landing page in [src/app/page.tsx](./src/app/page.tsx)
- Practice menu in [src/app/practice/page.tsx](./src/app/practice/page.tsx)
- Full mock interview workspace in [src/app/practice/full/page.tsx](./src/app/practice/full/page.tsx)
- Problem list in [src/app/problems/page.tsx](./src/app/problems/page.tsx)

## Run Locally

```bash
npm install
npm run dev
```
