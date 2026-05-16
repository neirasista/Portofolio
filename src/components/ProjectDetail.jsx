import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Code2,
  Star,
  ChevronRight,
  Layers,
  Layout,
  Globe,
  Package,
  Cpu,
  Code,
} from "lucide-react";
import Swal from "sweetalert2";
import { supabase } from "../supabase";
import { toSlug } from "../utils/slug";

const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  JavaScript: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS.default;

  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        <span className="text-xs md:text-sm font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }) => {
  return (
    <li className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
      <div className="relative mt-2">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
        {feature}
      </span>
    </li>
  );
};

const ProjectStats = ({ project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#0a0a1a] rounded-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-50 blur-2xl z-0" />

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-blue-500/50">
        <div className="bg-blue-500/20 p-1.5 md:p-2 rounded-full">
          <Code2 className="text-blue-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-blue-200">
            {techStackCount}
          </div>
          <div className="text-[10px] md:text-xs text-gray-400">
            Total Teknologi
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-purple-500/20 transition-all duration-300 hover:scale-105 hover:border-purple-500/50">
        <div className="bg-purple-500/20 p-1.5 md:p-2 rounded-full">
          <Layers className="text-purple-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-purple-200">
            {featuresCount}
          </div>
          <div className="text-[10px] md:text-xs text-gray-400">
            Fitur Utama
          </div>
        </div>
      </div>
    </div>
  );
};

const handleGithubClick = (githubLink) => {
  if (githubLink === "Private") {
    Swal.fire({
      icon: "info",
      title: "Source Code Private",
      text: "Maaf, source code untuk proyek ini bersifat privat.",
      confirmButtonText: "Mengerti",
      confirmButtonColor: "#3085d6",
      background: "#030014",
      color: "#ffffff",
    });
    return false;
  }

  return true;
};

const ProjectDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      window.scrollTo(0, 0);

      const { data, error } = await supabase
        .from("projects")
        .select("*");

      if (error) {
        console.error("Error fetching project:", error);
        navigate("/404");
        return;
      }

      console.log("Slug URL:", slug);
      console.log("Data dari Supabase:", data);

      const selectedProject = (data || []).find(
        (p) => toSlug(p.title || "") === slug
      );

      console.log("Project ditemukan:", selectedProject);

      if (!selectedProject) {
        navigate("/404");
        return;
      }

      const enhancedProject = {
        ...selectedProject,
        Title: selectedProject.title || "",
        Description: selectedProject.description || "",
        Img: selectedProject.img || "",
        Link: selectedProject.link || "",
        Github:
          selectedProject.github || "https://github.com/neirasista",
        Features: Array.isArray(selectedProject.features)
          ? selectedProject.features
          : [],
        TechStack: Array.isArray(selectedProject.tech_stack)
          ? selectedProject.tech_stack
          : [],
      };

      console.log("Enhanced Project:", enhancedProject);

      setProject(enhancedProject);
    };

    fetchProject();
  }, [slug, navigate]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold text-white">
            Loading Project...
          </h2>
        </div>
      </div>
    );
  }

  const projectUrl = `${window.location.origin}/project/${toSlug(
    project.Title
  )}`;

  return (
    <>
      <Helmet>
        <title>{project.Title} — Indira Sistamarien</title>
        <meta
          name="description"
          content={
            project.Description
              ? project.Description.slice(0, 155)
              : `Project ${project.Title} oleh Indira Sistamarien.`
          }
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={projectUrl} />
        <meta
          property="og:title"
          content={`${project.Title} — Indira Sistamarien`}
        />
        <meta
          property="og:description"
          content={project.Description?.slice(0, 155)}
        />
        <meta property="og:url" content={projectUrl} />
        <meta property="og:type" content="website" />
        {project.Img && (
          <meta property="og:image" content={project.Img} />
        )}
      </Helmet>

      <div className="min-h-screen bg-[#030014] px-[2%] sm:px-0 relative overflow-hidden">
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
            <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12">
              <button
                onClick={() => navigate(-1)}
                className="group inline-flex items-center space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
              </button>

              <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-white/50">
                <span>Projects</span>
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-white/90 truncate">
                  {project.Title}
                </span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
              <div className="space-y-6 md:space-y-10">
                <div className="space-y-4 md:space-y-6">
                  <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                    {project.Title}
                  </h1>
                  <div className="h-1 w-16 md:w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                </div>

                <p className="text-base md:text-lg text-gray-300/90 leading-relaxed">
                  {project.Description}
                </p>

                <ProjectStats project={project} />

                <div className="flex flex-wrap gap-3 md:gap-4">
                  {project.Link && (
                    <a
                      href={project.Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-blue-600/10 text-blue-300 rounded-xl border border-blue-500/20"
                    >
                      <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="font-medium">Live Demo</span>
                    </a>
                  )}

                  {project.Github && (
                    <a
                      href={project.Github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) =>
                        !handleGithubClick(project.Github) &&
                        e.preventDefault()
                      }
                      className="inline-flex items-center space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-purple-600/10 text-purple-300 rounded-xl border border-purple-500/20"
                    >
                      <Github className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="font-medium">Github</span>
                    </a>
                  )}
                </div>

                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-lg md:text-xl font-semibold text-white/90 flex items-center gap-3">
                    <Code2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                    Technologies Used
                  </h3>

                  {project.TechStack.length > 0 ? (
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {project.TechStack.map((tech, index) => (
                        <TechBadge key={index} tech={tech} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm md:text-base text-gray-400">
                      No technologies added.
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-6 md:space-y-10">
                {project.Img && (
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <img
                      src={project.Img}
                      alt={project.Title}
                      className="w-full object-cover"
                    />
                  </div>
                )}

                <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6">
                  <h3 className="text-xl font-semibold text-white/90 flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Key Features
                  </h3>

                  {project.Features.length > 0 ? (
                    <ul className="list-none space-y-2">
                      {project.Features.map((feature, index) => (
                        <FeatureItem key={index} feature={feature} />
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400">
                      No features added.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;