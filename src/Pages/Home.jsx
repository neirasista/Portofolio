import React, { useState, useEffect, useCallback, memo } from "react";
import { Helmet } from "react-helmet-async";
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

/* ================= CONFIG ================= */
const PROFILE = {
  name: "Indira",
  site: "https://indira.com",
  jobTitle: "Frontend Web Developer",
};

const WORDS = ["Frontend Developer", "Tech Enthusiast"];

const TECH_STACK = ["React", "JavaScript", "Node.js", "Tailwind"];

const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/neirasista", label: "GitHub" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/indirasistamarien/", label: "LinkedIn" },
  { icon: Instagram, link: "https://www.instagram.com/indirastmrn_", label: "Instagram" },
];

/* ================= COMPONENTS ================= */

const StatusBadge = memo(() => (
  <div className="inline-block animate-float" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-400 to-fuchsia-500 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-pink-200">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-fuchsia-500 text-sm font-medium flex items-center">
          <Sparkles className="w-4 h-4 mr-2 text-pink-400" />
          Ready to Build
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <h1 className="text-5xl md:text-7xl font-bold" data-aos="fade-up" data-aos-delay="600">
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
  <div className="px-4 py-2 rounded-full bg-white border border-pink-200 text-sm text-gray-700 shadow-sm">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="relative group w-[160px]">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-fuchsia-500 blur opacity-40 group-hover:opacity-80 transition" />
      <div className="relative h-11 bg-white border border-pink-200 rounded-lg flex items-center justify-center gap-2 text-gray-900">
        <span>{text}</span>
        <Icon className="w-4 h-4 group-hover:translate-x-1 transition" />
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link, label }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" aria-label={label}>
    <div className="p-3 rounded-xl bg-white border border-pink-200 hover:shadow-md transition">
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

  useEffect(() => {
    AOS.init({ once: true, offset: 10 });
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), 1500);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(handleTyping, isTyping ? 100 : 50);
    return () => clearTimeout(timeout);
  }, [handleTyping, isTyping]);

  return (
    <>
      <Helmet>
        <title>{PROFILE.name} — {PROFILE.jobTitle}</title>
        <meta name="description" content="Portfolio Frontend Developer modern dan interaktif." />
      </Helmet>

      {/* PAGE */}
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200 px-[5%] text-gray-900">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen gap-10">

          {/* LEFT */}
          <div className="space-y-6">
            <StatusBadge />
            <MainTitle />

            <div className="text-xl text-gray-700">
              {text}
              <span className="ml-1 animate-pulse">|</span>
            </div>

            <p className="text-gray-600 max-w-md">
              Creating modern, interactive, and user-friendly web experiences.
            </p>

            {/* TECH STACK */}
            <div className="flex gap-3 flex-wrap">
              {TECH_STACK.map((t, i) => (
                <TechBadge key={i} tech={t} />
              ))}
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <CTAButton href="#projects" text="Projects" icon={ExternalLink} />
              <CTAButton href="#contact" text="Contact" icon={Mail} />
            </div>

            {/* SOCIAL */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((s, i) => (
                <SocialLink key={i} {...s} />
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full max-w-md">
            <img
              src="Animation1.gif"
              alt="Developer"
              className="w-full"
            />
          </div>

        </div>
      </div>
    </>
  );
};

export default memo(Home);