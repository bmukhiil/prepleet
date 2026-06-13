# Prepleet

Prepleet is an AI interview-practice product for job seekers preparing for technical, behavioral, systems-design, and full mock interviews.

The app is structured around a realistic interview workflow:
- browse a question bank
- choose a practice mode
- work through a mock interview surface with a problem statement, code editor, AI interviewer, text input, voice controls, and text-to-speech feedback

## Preview

### Full mock interview workspace

![Prepleet full mock interview workspace](docs/assets/prepleet-full-mock.png)

### Landing page

![Prepleet landing page](docs/assets/prepleet-hero.png)

### Practice modes

![Prepleet practice modes](docs/assets/prepleet-practice-modes.png)

### Question bank

![Prepleet interview question bank](docs/assets/prepleet-problems.png)

## Tech stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Monaco Editor
- Radix UI-style component primitives
- `next-themes` for light/dark mode

## Product flow

1. A user lands on the marketing page and sees the core value proposition: AI-powered practice for technical and behavioral interviews.
2. The user can open the practice menu and choose between coding, behavioral, systems-design, and full mock interview modes.
3. The question bank gives a structured list of interview-style problems with difficulty and success-rate metadata.
4. The full mock interview workspace combines:
   - a problem statement panel
   - a Monaco-powered code editor
   - an assistant conversation panel
   - typed responses
   - microphone controls
   - text-to-speech controls for interviewer feedback

## What I built

- A polished interview-prep landing page with a code/interviewer product preview
- A practice-mode navigation surface for different interview formats
- A structured interview question bank
- A full mock interview workspace with resizable panels
- Monaco editor integration for coding practice
- Assistant chat state, message rendering, and backend handoff logic
- Browser text-to-speech controls and microphone UI states
- Light/dark theme support and reusable UI primitives

## Project files

- `src/app/page.tsx`: landing page and product preview
- `src/app/practice/page.tsx`: practice-mode selection
- `src/app/problems/page.tsx`: interview question bank
- `src/app/practice/full/page.tsx`: full mock interview workspace
- `src/components/ui/`: reusable UI components
- `src/app/globals.css`: theme tokens and global styling
- `docs/assets/`: README screenshots

## Run locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Build

Run the production build:

```bash
npm run build
```

Current build status:
- The app compiles and builds successfully.
- There are two non-blocking React hook dependency warnings in the full mock interview page.

## Backend note

The full mock interview page includes a client call to a local interview API:

```text
POST http://localhost:5000/interview
```

That call is isolated to the assistant response flow. The UI surfaces, question bank, editor, layout, and local build can be reviewed without running the backend.

## Notes for reviewers

- The strongest product surface is `src/app/practice/full/page.tsx`.
- The repo demonstrates AI-product UX through a guided mock interview workflow.
- The mock interview workspace is the main proof point: it combines problem context, code editing, assistant interaction, and voice/TTS controls in one interface.
- The public version is best read as a product prototype and frontend implementation, with backend AI response handling represented by a local API boundary.
