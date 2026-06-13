"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/themeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "py-2 glass glow-border" : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-foreground glow-text">
            Prep<span className="text-olive dark:text-olive-light">leet</span>
          </Link>
        </div>

        {/* --- Desktop Navigation --- */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="/problems"
            className="text-foreground hover:text-primary transition-colors"
          >
            Problems
          </a>
          <a
            href="/practice"
            className="text-foreground hover:text-primary transition-colors"
          >
            Practice
          </a>
          <Button
            variant="outline"
            className="border-forest/70 dark:border-sage/70 text-forest dark:text-sage-light hover:bg-forest/5 dark:hover:bg-sage/5 glass"
          >
            Log In
          </Button>
          <ThemeToggle />
        </div>

        {/* --- Mobile Menu Button --- */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="text-forest dark:text-sage-light"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* --- Mobile Navigation --- */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 py-4 px-6 flex flex-col space-y-4 animate-fade-in glass glow-border backdrop-blur-2xl bg-white/30 dark:bg-black/30">
          <ThemeToggle />
          <a
            href="/problems-list"
            className="text-foreground hover:text-primary transition-colors"
            onClick={toggleMenu}
          >
            Problems
          </a>
          <Button
            variant="outline"
            className="border-forest/70 dark:border-sage/70 text-forest dark:text-sage-light hover:bg-forest/5 dark:hover:bg-sage/5 w-full glass"
            onClick={toggleMenu}
          >
            Log In
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
