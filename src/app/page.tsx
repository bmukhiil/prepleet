"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Check,
  Users,
  MessageSquare,
  Book,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Instagram,
  Menu,
  X,
  Star,
  Mic,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ThemeToggle from "@/components/ui/themeToggle";
import styles from "./page.module.css";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const fullCode = `def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1  # Target not found`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const featureData = [
    {
      icon: MessageSquare,
      title: "Technical Interview Practice",
      description:
        "Practice coding questions, system design, and technical concepts with realistic AI-generated questions tailored to your experience level.",
    },
    {
      icon: Users,
      title: "Behavioral Interview Simulation",
      description:
        "Prepare for behavioral questions with our AI interviewer that evaluates your responses and provides constructive feedback.",
    },
    {
      icon: Book,
      title: "Industry-Specific Questions",
      description:
        "Access question banks tailored to specific roles, companies, and industries to customize your practice sessions.",
    },
    {
      icon: Check,
      title: "Real-time Feedback",
      description:
        "Receive immediate analysis on your answers, including content, delivery, and suggestions for improvement.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="light-orb w-[1000px] h-[900px] opacity-80 top-[85%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"></div>


      {/* Hero Section - Updated with code typing animation */}
      <section
        id="home"
        className="relative min-h-screen flex items-center light-grid-bg pt-16 bg-background text-foreground overflow-hidden"
      >
        {/* Light orbs for glow effects */}
        <div className="light-orb w-[600px] h-[600px] top-[5%] left-[30%] opacity-40"></div>
        <div className="light-orb w-[700px] h-[700px] bottom-[-10%] left-[20%] opacity-30"></div>
        <div className="light-orb w-[500px] h-[500px] bottom-[30%] right-[20%] opacity-25"></div>

        <div className="container mx-auto px-4 py-16 z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-block mb-4 px-4 py-1 glass glow rounded-full">
              <span className="text-forest text-sm font-medium">
                PRACTICE INTERVIEWS WITH AI
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text glow-text">
              One tool to ace technical and behavioral interviews
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Prepleet helps job seekers practice more effectively, deliver
              better responses, and gain confidence through realistic AI-powered
              interview simulations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button className="bg-primary text-primary-foreground px-8 py-6 text-lg rounded-md font-medium transition-colors duration-200 ring-1 ring-inset ring-primary/20 glass hover:bg-primary/60 hover:brightness-150 active:brightness-80">
                Get Started
              </Button>
            </div>

            <div className="w-full max-w-5xl mx-auto relative">
              {/* Enhanced light effect behind the card */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-muted/20 to-primary/30 blur-3xl opacity-50 transform -translate-y-12 rounded-full"></div>

              <div className="overflow-hidden rounded-2xl shadow-lg glass-card glow-border relative z-10">
                <div className="flex flex-col md:flex-row w-full h-full">
                  {/* Code editor side - enhanced glassmorphism that works in both light and dark modes */}
                  <div className="flex-1 p-4 border-r h-full flex flex-col justify-between overflow-hidden bg-gradient-to-br from-background/80 to-muted/30 border-sidebar-border">
                    <div className="overflow-y-auto pr-1">
                      <div className="flex items-center justify-between mb-4 border-b pb-2 border-border">
                        <div className="flex items-center gap-2">
                          <Code size={20} className="text-primary" />
                          <span className="text-sm font-mono">
                            Technical Interview - Binary Search
                          </span>
                        </div>
                      </div>

                      <div className="font-mono text-sm text-left">
                        <p className="text-muted-foreground mb-2">
                          # Implement binary search to find a target value in a
                          sorted array
                        </p>
                        <pre className="p-4 rounded-md overflow-x-auto border bg-card border-muted">
                          {fullCode}
                          <span
                            className="inline-block w-2 h-4 animate-blink"
                            style={{ backgroundColor: "var(--primary)" }}
                          ></span>
                        </pre>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="mb-2 font-semibold text-secondary">
                        Question:
                      </p>
                      <p className="p-4 rounded-md border bg-card border-muted">
                        What is the time complexity of this binary search
                        implementation and why?
                      </p>
                    </div>
                  </div>

                  {/* AI Assistant side - enhanced glassmorphism */}
                  <div className="w-full md:w-2/5 p-4 border-l bg-gradient-to-br from-accent/20 to-background/60 border-sidebar-border backdrop-blur-3xl">
                    <div className="flex items-center gap-2 mb-4 border-b pb-2 border-border">
                      <MessageSquare size={20} className="text-primary" />
                      <span className="font-medium text-primary">
                        Prepleet Assistant
                      </span>
                    </div>

                    <div className="space-y-4 h-full overflow-y-auto scrollbar-none">
                      <div className="p-3 rounded-lg border shadow-sm bg-background/60 border-border">
                        <p className="text-sm">
                          Alright, let's discuss binary search. What can you
                          tell me about the time complexity of this
                          implementation?
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-2 border-t flex items-center justify-between border-border">
                      <div className="text-xs text-muted-foreground"></div>
                      <div className="text-xs text-muted-foreground">
                        01:30 remaining
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Practice with real-time feedback from our AI interviewer
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section
        id="features"
        className="py-24"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <div
              className="inline-block mb-4 px-4 py-1 backdrop-blur-sm rounded-full"
              style={{ backgroundColor: "var(--muted)" }}
            >
              <span
                className="text-sm font-medium"
                style={{ color: "var(--primary)" }}
              >
                FEATURES
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Latest AI technology to ensure interview success
            </h2>
            <p
              className="max-w-2xl mx-auto"
              style={{ color: "var(--muted-foreground)" }}
            >
              Maximize your interview performance with our affordable,
              user-friendly AI interview practice platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {featureData.map((feature, index) => (
              <Card
                key={index}
                className="rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-on-scroll overflow-hidden"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--sidebar-border)",
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <CardContent className="p-6 md:p-8">
                  <div
                    className="rounded-full w-12 h-12 flex items-center justify-center mb-4"
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "var(--primary-foreground)",
                    }}
                  >
                    <feature.icon size={24} />
                  </div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: "var(--primary)" }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ color: "var(--muted-foreground)" }}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-20">
            <div
              className="rounded-2xl p-8 md:p-12 shadow-sm"
              style={{
                backgroundColor: "var(--muted)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="animate-on-scroll">
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-4"
                    style={{ color: "var(--primary)" }}
                  >
                    Dynamic Interview Simulator
                  </h3>
                  <p
                    className="mb-6"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Our AI-powered platform adapts to your responses, providing
                    a realistic interview experience that helps identify your
                    strengths and areas for improvement.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Real-time feedback on your answers",
                      "Customizable interview scenarios for any job role",
                      "Detailed performance analytics and improvement suggestions",
                      "Practice as many times as you need before the real interview",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check
                          className="text-forest shrink-0 mt-1 mr-2"
                          size={18}
                        />
                        <span style={{ color: "var(--foreground)" }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="rounded-xl shadow-lg p-4 animate-on-scroll"
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--sidebar-border)",
                  }}
                >
                  <div
                    className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden"
                    style={{
                      backgroundImage:
                        "linear-gradient(to bottom right, var(--muted), var(--background))",
                    }}
                  >
                    <div className="p-4 flex items-center justify-center">
                      <div className="w-full max-w-md">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-full text-sm flex items-center justify-center"
                              style={{
                                backgroundColor: "var(--primary)",
                                color: "var(--primary-foreground)",
                              }}
                            >
                              AI
                            </div>
                            <span className="font-medium">
                              Technical Interview
                            </span>
                          </div>
                          <div
                            className="text-sm px-2 py-1 rounded-full"
                            style={{
                              backgroundColor: "var(--muted)",
                              color: "var(--primary)",
                            }}
                          >
                            Live
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div
                            className="p-3 rounded-lg shadow-sm"
                            style={{ backgroundColor: "var(--card)" }}
                          >
                            <p
                              className="text-sm"
                              style={{ color: "var(--muted-foreground)" }}
                            >
                              Explain how you would handle a situation where
                              your team is falling behind on a project deadline.
                            </p>
                          </div>
                          <div
                            className="p-3 rounded-lg"
                            style={{ backgroundColor: "var(--muted)" }}
                          >
                            <p
                              className="text-sm"
                              style={{ color: "var(--foreground)" }}
                            >
                              I would first assess what's causing the delay and
                              communicate transparently with stakeholders...
                            </p>
                          </div>
                          <div
                            className="p-3 rounded-lg border"
                            style={{
                              backgroundColor: "var(--background)",
                              borderColor: "var(--border)",
                            }}
                          >
                            <p
                              className="text-sm font-medium mb-1"
                              style={{ color: "var(--primary)" }}
                            >
                              Feedback:
                            </p>
                            <p
                              className="text-sm"
                              style={{ color: "var(--muted-foreground)" }}
                            >
                              Good start! Consider addressing how you would
                              reallocate resources or adjust the scope.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="py-20 light-grid-bg"
        style={{ backgroundColor: "var(--muted)" }} // previously oklch(95% 0.04 140)
      >
        <div className="container mx-auto px-4">
          <div
            className="rounded-2xl shadow-xl p-8 md:p-12 max-w-5xl mx-auto animate-on-scroll"
            style={{
              backgroundColor: "var(--card)", // previously white
              border: "1px solid var(--sidebar-border)", // previously olive/10
            }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                  Ready to Ace Your Next Interview?
                </h2>
                <p className="text-gray-600 mb-6">
                  Join thousands of job seekers who have improved their
                  interview skills and landed their dream jobs with Prepleet.
                </p>
                <Button
                  className="text-white px-8 py-6 text-lg group"
                  style={{
                    backgroundColor: "var(--primary)",
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
