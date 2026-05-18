import React, { useState, useEffect, useCallback, memo } from "react";
import { Helmet } from "react-helmet-async";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
} from "lucide-react";

/* ================= CONFIG ================= */

const PROFILE = {
  name: "Indira",
  site: "https://indira.com",
  jobTitle: "Frontend Web Developer",
};

const WORDS = ["Frontend Developer", "Tech Enthusiast"];

const TECH_STACK = ["React", "JavaScript", "Node.js", "Tailwind"];

const SOCIAL_LINKS = [
  {
    icon: Github,
    link: "https://github.com/neirasista",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    link: "https://www.linkedin.com/in/indirasistamarien/",
    label: "LinkedIn",
  },
  {
    icon: Instagram,
    link: "https://www.instagram.com/indirastmrn_",
    label: "Instagram",
  },
];

/* ================= COMPONENTS ================= */

const StatusBadge = memo(() => (
  <div className="inline-block">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-400 to-fuchsia-500 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-500"></div>

      <div className="relative px-4 py-2 rounded-full bg-white border border-pink-200">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-fuchsia-500 text-sm font-medium flex items-center">
          <Sparkles className="w-4 h-4 mr-2 text-pink-400" />
          Ready to Build
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <h1 className="text-5xl md:text-7xl font-bold leading-tight">
    <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
      Frontend
    </span>

    <br />

    <span className="bg-gradient-to-r from-pink-400 to-fuchsia-500 bg-clip-text text-transparent">
      Developer
    </span>
  </h1>
));

const TechBadge = memo(({ tech }) => (
  <div className="px-4 py-2 rounded-full bg-white border border-pink-200 text-sm text-gray-700 shadow-sm hover:shadow-md transition">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="relative group w-[160px]">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-fuchsia-500 blur opacity-30 group-hover:opacity-60 transition duration-300 rounded-lg" />

      <div className="relative h-11 bg-white border border-pink-200 rounded-lg flex items-center justify-center gap-2 text-gray-900 hover:scale-[1.02] transition">
        <span>{text}</span>

        <Icon className="w-4 h-4 group-hover:translate-x-1 transition" />
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link, label }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" aria-label={label}>
    <div className="p-3 rounded-xl bg-white border border-pink-200 hover:shadow-md hover:-translate-y-1 transition duration-300">
      <Icon className="w-5 h-5 text-pink-500 hover:text-fuchsia-500" />
    </div>
  </a>
));

/* ================= MAIN COMPONENT ================= */

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // VIDEO DELAY FIX
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  /* ================= TYPEWRITER ================= */

  const handleTyping = useCallback(() => {
    const currentWord = WORDS[wordIndex];

    if (isTyping) {
      if (charIndex < currentWord.length) {
        setText(currentWord.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), 1200);
      }
    } else {
      if (charIndex > 0) {
        setText(currentWord.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(handleTyping, isTyping ? 90 : 50);

    return () => clearTimeout(timeout);
  }, [handleTyping, isTyping]);

  /* ================= RENDER ================= */

  return (
    <>
      <Helmet>
        <title>
          {PROFILE.name} — {PROFILE.jobTitle}
        </title>

        <meta
          name="description"
          content="Portfolio Frontend Developer modern dan interaktif."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200 px-[5%] text-gray-900 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen gap-12 py-10">
          
          {/* LEFT */}

          <div className="space-y-6 w-full lg:w-1/2">
            <StatusBadge />

            <MainTitle />

            {/* TYPEWRITER */}

            <div className="text-xl text-gray-700 font-medium h-[32px]">
              {text}
              <span className="ml-1 animate-pulse">|</span>
            </div>

            {/* DESC */}

            <p className="text-gray-600 max-w-md leading-relaxed">
              Creating modern, interactive, and user-friendly web experiences.
            </p>

            {/* TECH */}

            <div className="flex gap-3 flex-wrap">
              {TECH_STACK.map((tech, index) => (
                <TechBadge key={index} tech={tech} />
              ))}
            </div>

            {/* BUTTON */}

            <div className="flex flex-wrap gap-3 pt-2">
              <CTAButton
                href="#projects"
                text="Projects"
                icon={ExternalLink}
              />

              <CTAButton
                href="#contact"
                text="Contact"
                icon={Mail}
              />
            </div>

            {/* SOCIAL */}

            <div className="flex gap-3 pt-2">
              {SOCIAL_LINKS.map((social, index) => (
                <SocialLink key={index} {...social} />
              ))}
            </div>
          </div>

          {/* RIGHT */}

          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-md">
              
              {!showVideo ? (
                <div className="h-[320px] w-full rounded-2xl bg-pink-200 animate-pulse" />
              ) : (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  className="w-full rounded-2xl shadow-xl"
                >
                  <source src="/Animation1.mp4" type="video/mp4" />
                </video>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Home);