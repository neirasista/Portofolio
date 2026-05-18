import React, { useState, useEffect, memo } from "react";
import { Helmet } from "react-helmet-async";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
  Brain,
  BarChart3,
  Code2,
} from "lucide-react";

/* ================= CONFIG ================= */

const PROFILE = {
  name: "Indira Sistamarien",
  site: "https://indirasistamarienportofolio.vercel.app",
  jobTitle: "AI Engineer • Data Analyst • Frontend Developer",
};

const WORDS = [
  "AI Engineer",
  "Data Analyst",
  "Frontend Developer",
  "Computer Vision Enthusiast",
];

const TECH_STACK = [
  "Python",
  "YOLOv8",
  "OpenCV",
  "React.js",
  "Tailwind CSS",
  "Power BI",
  "JavaScript",
];

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
  <div className="inline-block mt-3">
    <div className="relative group">

      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>

      <div className="relative glass px-4 py-2 rounded-full flex items-center">

        <span className="gradient-text text-sm font-medium flex items-center leading-none">
          <Sparkles className="w-4 h-4 mr-2 text-pink-400" />
          Open for Internship & Collaboration
        </span>

      </div>
    </div>
  </div>
));
const FeatureCard = memo(({ icon: Icon, title, desc }) => (
  <div className="glass rounded-2xl p-6 card-hover h-full">
    <div className="w-14 h-14 rounded-xl bg-pink-500/10 flex items-center justify-center mb-5">
      <Icon className="w-7 h-7 text-pink-400" />
    </div>

    <h3 className="text-xl font-semibold text-white mb-3">
      {title}
    </h3>

    <p className="text-slate-400 leading-relaxed text-sm">
      {desc}
    </p>
  </div>
));

/* ================= MAIN ================= */

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const [showVideo, setShowVideo] = useState(false);

  /* ================= VIDEO ================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  /* ================= TYPEWRITER ================= */

  useEffect(() => {
    const currentWord = WORDS[wordIndex];

    let timeout;

    if (isTyping) {
      if (charIndex < currentWord.length) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, 80);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 1400);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        }, 40);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isTyping, wordIndex]);

  /* ================= RENDER ================= */

  return (
    <>
      <Helmet>
        <title>
          {PROFILE.name} — {PROFILE.jobTitle}
        </title>

        <meta
          name="description"
          content="Portfolio of Indira Sistamarien — AI Engineer, Data Analyst, and Frontend Developer specializing in Machine Learning and Computer Vision."
        />
      </Helmet>

      <div className="min-h-screen px-[6%] overflow-hidden relative">

        {/* BACKGROUND GLOW */}

        <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-blob"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl animate-blob"></div>

        {/* HERO */}

        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen gap-14 py-10 relative z-10">

          {/* LEFT */}

          <div className="space-y-7 w-full lg:w-1/2">

            <StatusBadge />

            {/* TITLE */}

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">

              <span className="gradient-text">
                AI & Data
              </span>

              <br />

              <span className="gradient-text">
                Developer
              </span>

            </h1>

            {/* TYPEWRITER */}

            <div className="text-2xl text-slate-300 font-medium h-[36px]">
              {text}
              <span className="ml-1 animate-pulse">|</span>
            </div>

            {/* DESCRIPTION */}

            <p className="text-slate-400 max-w-xl leading-relaxed text-lg">
              6th-semester Software Engineering student at IPB University with a focused on Artificial Intelligence,
              Machine Learning, Data Analysis, and Frontend Development.
              Passionate about building intelligent systems, real-time computer
              vision applications, and modern interactive web experiences.
            </p>

            {/* TECH STACK */}

            <div className="flex gap-3 flex-wrap">
              {TECH_STACK.map((tech, index) => (
                <div
                  key={index}
                  className="glass px-4 py-2 rounded-full text-sm text-slate-200 card-hover"
                >
                  {tech}
                </div>
              ))}
            </div>

            {/* BUTTONS */}

            <div className="flex flex-wrap gap-4 pt-2">

              <a href="#projects">
                <button className="btn-primary px-6 h-12 rounded-xl font-medium flex items-center gap-2 glow-pink">
                  View Projects
                  <ExternalLink className="w-4 h-4" />
                </button>
              </a>

              <a href="#contact">
                <button className="glass px-6 h-12 rounded-xl font-medium flex items-center gap-2 card-hover">
                  Contact Me
                  <Mail className="w-4 h-4" />
                </button>
              </a>

            </div>

            {/* SOCIAL */}

            <div className="flex gap-4 pt-2">

              {SOCIAL_LINKS.map((social, index) => {
                const Icon = social.icon;

                return (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <div className="glass p-3 rounded-2xl card-hover">
                      <Icon className="w-5 h-5 text-pink-300" />
                    </div>
                  </a>
                );
              })}

            </div>
          </div>

          {/* RIGHT */}

          <div className="w-full lg:w-1/2 flex justify-center">

            <div className="relative w-full max-w-lg">

              <div className="absolute -top-6 -left-6 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl"></div>

              <div className="absolute -bottom-8 -right-6 w-40 h-40 bg-fuchsia-500/10 rounded-full blur-3xl"></div>

              {!showVideo ? (
                <div className="h-[380px] w-full rounded-3xl glass animate-pulse"></div>
              ) : (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="relative w-full rounded-3xl border border-white/10 glow-pink"
                >
                  <source src="/Animation1.mp4" type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        </div>

        {/* FEATURES */}

        <div className="grid md:grid-cols-3 gap-6 pb-20 relative z-10">

          <FeatureCard
            icon={Brain}
            title="Artificial Intelligence"
            desc="Developing AI-powered systems using Machine Learning, Deep Learning, and Computer Vision technologies."
          />

          <FeatureCard
            icon={BarChart3}
            title="Data Analysis"
            desc="Analyzing structured datasets through preprocessing, visualization, and predictive modeling techniques."
          />

          <FeatureCard
            icon={Code2}
            title="Frontend Development"
            desc="Building responsive and modern user interfaces using React.js, Tailwind CSS, and interactive web technologies."
          />

        </div>
      </div>
    </>
  );
};

export default memo(Home);
``