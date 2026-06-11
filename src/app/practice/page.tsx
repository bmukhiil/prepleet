"use client";

import Link from "next/link";
import { BrainCircuit, MessageSquare, Code, Users } from "lucide-react";

const modes = [
  {
    title: "Practice Coding Interviews",
    description:
      "Pick coding problems to solve or talk through your solution with AI.",
    icon: <Code className="w-6 h-6 text-primary" />,
    href: "/interview/coding",
  },
  {
    title: "Practice Behavioral Interviews",
    description: "Work through common behavioral questions with feedback.",
    icon: <MessageSquare className="w-6 h-6 text-primary" />,
    href: "/interview/behavioural",
  },
  {
    title: "Practice Systems Design",
    description:
      "Tackle system design questions by explaining your thought process.",
    icon: <BrainCircuit className="w-6 h-6 text-primary" />,
    href: "/interview/systems",
  },
  {
    title: "Full Mock Interview",
    description:
      "Select your level and begin a full technical, behavioral, and systems mock.",
    icon: <Users className="w-6 h-6 text-primary" />,
    href: "/practice/full",
  },
];

export default function MenuInterviewPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 px-4 light-grid-bg">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 gradient-text">
          Interview Practice Modes
        </h1>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {modes.map((mode) => (
            <Link
              key={mode.title}
              href={mode.href}
              className="block glass-card p-6 rounded-2xl border transition-all hover:shadow-xl hover:scale-[1.015] hover:border-accent/60 group"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-muted text-muted-foreground group-hover:bg-accent/20 transition">
                  {mode.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-1 group-hover:text-primary transition">
                    {mode.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {mode.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
