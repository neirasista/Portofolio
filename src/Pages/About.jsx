import AOS from "aos";
import "aos/dist/aos.css";
import {
  ArrowUpRight,
  Award,
  Brain,
  Code,
  Database,
  FileText,
  Globe,
  Sparkles,
} from "lucide-react";
import { memo, useEffect, useMemo } from "react";

/* ================= COMPONENTS ================= */

const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-fuchsia-500"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>

    <p
      className="mt-3 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-pink-400" />
      Building intelligent systems & modern web experiences
      <Sparkles className="w-5 h-5 text-pink-400" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div
      className="relative group"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* Glow */}

      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 rounded-full blur-2xl animate-spin-slower" />

        <div className="absolute inset-0 bg-gradient-to-l from-pink-400 via-rose-400 to-fuchsia-500 rounded-full blur-2xl animate-pulse-slow opacity-50" />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(236,72,153,0.25)] transform transition-all duration-700 group-hover:scale-105">

          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />

          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />

          <img
            src="/arien.jpeg"
            alt="Indira Sistamarien"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(
  ({ icon: Icon, color, value, label, description, animation }) => (
    <div data-aos={animation} data-aos-duration={1300}>
      <div className="relative z-10 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between group">

        <div
          className={`absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${color}`}
        ></div>

        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10">
            <Icon className="w-8 h-8 text-white" />
          </div>

          <span className="text-4xl font-bold text-white">
            {value}
          </span>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wider text-gray-300 mb-2">
            {label}
          </p>

          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">
              {description}
            </p>

            <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  )
);

/* ================= MAIN ================= */

const AboutPage = () => {

  /* ================= COUNTERS ================= */

  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(
      localStorage.getItem("projects") || "[]"
    );

    const storedCertificates = JSON.parse(
      localStorage.getItem("certificates") || "[]"
    );

    const startDate = new Date("2021-11-06");

    const today = new Date();

    const experience =
      today.getFullYear() -
      startDate.getFullYear() -
      (today <
      new Date(
        today.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      )
        ? 1
        : 0);

    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
      YearExperience: experience,
    };
  }, []);

  /* ================= AOS ================= */

  useEffect(() => {
    AOS.init({
      once: false,
    });

    let resizeTimer;

    const handleResize = () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        AOS.refresh();
      }, 250);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  /* ================= STATS ================= */

  const statsData = useMemo(
    () => [
      {
        icon: Code,
        color: "from-pink-500 to-fuchsia-500",
        value: totalProjects,
        label: "Projects",
        description: "AI, Data Analysis,frontend projects",
        animation: "fade-right",
      },
      {
        icon: Award,
        color: "from-fuchsia-500 to-purple-500",
        value: totalCertificates,
        label: "Certificates",
        description: "Continuous learning & development",
        animation: "fade-up",
      },
      {
        icon: Globe,
        color: "from-pink-400 to-fuchsia-500",
        value: YearExperience,
        label: "Years Learning",
        description: "Technology & software development",
        animation: "fade-left",
      },
    ],
    [totalProjects, totalCertificates, YearExperience]
  );

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] lg:px-[10%] mt-10"
      id="About"
      itemScope
      itemType="https://schema.org/Person"
    >

      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">

        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT */}

          <div className="space-y-6 text-center lg:text-left">

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-fuchsia-500">
                Hello, I'm
              </span>

              <span
                className="block mt-2 text-gray-200"
                data-aos="fade-right"
                data-aos-duration="1300"
                itemProp="name"
              >
                Indira Sistamarien
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p
              className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify pb-4 sm:pb-0"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
            6th-semester Software Engineering student at IPB University with a strong interest in Front-End Development, Machine Learning, Data Analysis, and Artificial Intelligence. Experienced in data preprocessing, exploratory data analysis (EDA), data visualization, predictive modeling, and developing machine learning solutions to extract actionable insights from complex datasets. Skilled in building end-to-end AI systems, real-time computer vision applications, and modern web-based solutions. Passionate about leveraging data and technology to develop innovative solutions that solve real-world challenges and create meaningful impact.
            </p>

            {/* SKILLS HIGHLIGHT */}

            <div
              className="grid sm:grid-cols-3 gap-4"
              data-aos="fade-up"
              data-aos-duration="1600"
            >

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                <Brain className="w-7 h-7 text-pink-400 mb-3" />

                <h3 className="font-semibold text-white mb-1">
                  AI & ML
                </h3>

                <p className="text-sm text-gray-400">
                  Computer Vision, YOLOv8, Deep Learning
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                <Database className="w-7 h-7 text-fuchsia-400 mb-3" />

                <h3 className="font-semibold text-white mb-1">
                  Data Analysis
                </h3>

                <p className="text-sm text-gray-400">
                  Pandas, Scikit-learn, Power BI
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                <Code className="w-7 h-7 text-purple-400 mb-3" />

                <h3 className="font-semibold text-white mb-1">
                  Frontend
                </h3>

                <p className="text-sm text-gray-400">
                  React.js, Tailwind CSS, JavaScript
                </p>
              </div>
            </div>

            {/* QUOTE */}

            <div
              className="relative bg-gradient-to-br from-pink-500/5 via-transparent to-fuchsia-500/5 border border-pink-400/20 rounded-2xl p-4 my-6 backdrop-blur-md overflow-hidden"
              data-aos="fade-up"
              data-aos-duration="1700"
            >

              <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 rounded-full blur-xl"></div>

              <blockquote className="text-gray-300 text-center lg:text-left italic font-medium text-sm relative z-10">
                "Leveraging AI as a professional tool, not a replacement."
              </blockquote>
            </div>

            {/* BUTTONS */}

            <div className="flex flex-col lg:flex-row items-center gap-4">

              <a
                href="https://drive.google.com/file/d/1uUHYr4XjaJ76MOMTZlybmZbw-BxVz9ex/view?usp=sharing"
                className="w-full lg:w-auto"
              >
                <button
                  data-aos="fade-up"
                  data-aos-duration="800"
                  className="w-full lg:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                >
                  <FileText className="w-5 h-5" />
                  Download CV
                </button>
              </a>

              <a href="#Portofolio" className="w-full lg:w-auto">
                <button
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="w-full lg:w-auto px-6 py-3 rounded-xl border border-fuchsia-400/40 text-fuchsia-300 font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 hover:bg-fuchsia-500/10"
                >
                  <Code className="w-5 h-5" />
                  View Projects
                </button>
              </a>
            </div>
          </div>

          {/* RIGHT */}

          <ProfileImage />
        </div>

        {/* STATS */}

        <a href="#Portofolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>

      <style>{`
        @keyframes spin-slower {
          to {
            transform: rotate(360deg);
          }
        }

        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }

        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);