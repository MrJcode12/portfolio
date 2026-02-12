import { useEffect, useMemo, useRef, useState } from "react";

type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string;
  siteLink: string;
  githubLink: string;
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const isHoveringRef = useRef(false);
  const isPointerDownRef = useRef(false);
  const autoPlayRef = useRef<number | null>(null);

  const segmentWidthRef = useRef(0);
  const isProgrammaticScrollRef = useRef(false);
  const programmaticTimerRef = useRef<number | null>(null);

  const [isProjectsVisible, setIsProjectsVisible] = useState(false);

  const projects: Project[] = [
    {
      title: "RunWise",
      description:
        "A client-side running planner built in vanilla JavaScript that combines hyper-local weather data with AI-generated motivation and condition-specific guidance to help runners adapt pace, hydration, and timing in real time.",
      tech: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript", "Weather API", "Google Gemini API"],
      image: "/resources/img/RunWise.png",
      siteLink: "https://projectrunwise.netlify.app/",
      githubLink: "https://github.com/MrJcode12/RunWise",
    },
    {
      title: "SuitLink",
      description:
        "A modern full-stack job portal that supports job seeker profiles, job discovery, and application tracking, alongside employer workflows for posting roles, reviewing applicants, and managing hiring with secure authentication and notification features.",
      tech: [
        "React 19",
        "React Router DOM 7",
        "Tailwind CSS 4",
        "Vite",
        "Axios",
        "Zod",
        "Node.js",
        "Express 5",
        "MongoDB",
        "Mongoose",
        "JWT",
        "Bcrypt",
        "Multer",
        "Cloudinary",
        "OpenAI",
        "Nodemailer",
        "Helmet",
        "Morgan",
      ],
      image: "/resources/img/SuitLink.png",
      siteLink: "https://suitlink.vercel.app/",
      githubLink: "https://github.com/russellfrrr/suitlink-job-portal",
    },
    {
      title: "Portfolio",
      description:
        "A clean and responsive personal portfolio website built with React, TypeScript, and CSS to present projects, skills, and experience in a professional, user-focused layout.",
      tech: ["React", "TypeScript", "CSS"],
      image: "/resources/img/portfolio.png",
      siteLink: "https://jpgabarda.netlify.app/",
      githubLink: "https://github.com/MrJcode12/portfolio",
    },
    {
      title: "Portfolio v1",
      description:
        "A clean, professional personal portfolio website built with vanilla HTML, CSS, and JavaScript to showcase projects, skills, and background in a responsive, user-focused layout.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "/resources/img/portfoliov1.png",
      siteLink: "https://jgabarda.netlify.app/",
      githubLink: "https://github.com/MrJcode12/portfolio_v1",
    }
  ];

  const loopedProjects = useMemo(
    () => [...projects, ...projects, ...projects],
    [projects]
  );

  const computeSegmentWidth = () => {
    const el = containerRef.current;
    if (!el) return 0;
    return el.scrollWidth / 3;
  };

  const ensureInMiddleSegment = () => {
    const el = containerRef.current;
    const s = segmentWidthRef.current;
    if (!el || !s) return;

    const leftThreshold = s * 0.2;
    const rightThreshold = s * 1.8;

    if (el.scrollLeft < leftThreshold) {
      el.scrollLeft += s;
    } else if (el.scrollLeft > rightThreshold) {
      el.scrollLeft -= s;
    }
  };

  const handleScroll = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (isProgrammaticScrollRef.current) return;
      ensureInMiddleSegment();
    });
  };

  const startAutoPlay = () => {
    const el = containerRef.current;
    if (!el) return;

    const step = () => {
      const node = containerRef.current;
      if (!node) return;

      if (
        !isHoveringRef.current &&
        !isPointerDownRef.current &&
        !isProgrammaticScrollRef.current
      ) {
        node.scrollLeft += 0.25;
        ensureInMiddleSegment();
      }

      autoPlayRef.current = requestAnimationFrame(step);
    };

    if (autoPlayRef.current) cancelAnimationFrame(autoPlayRef.current);
    autoPlayRef.current = requestAnimationFrame(step);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) cancelAnimationFrame(autoPlayRef.current);
    autoPlayRef.current = null;
  };

  const markProgrammaticScroll = () => {
    isProgrammaticScrollRef.current = true;

    if (programmaticTimerRef.current) {
      window.clearTimeout(programmaticTimerRef.current);
    }

    programmaticTimerRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
      ensureInMiddleSegment();
    }, 500);
  };

  const scrollByAmount = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;

    markProgrammaticScroll();

    const amount =
      direction === "left" ? -el.clientWidth / 1.2 : el.clientWidth / 1.2;

    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsProjectsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const init = () => {
      segmentWidthRef.current = computeSegmentWidth();
      if (!segmentWidthRef.current) return;

      el.scrollLeft = segmentWidthRef.current;
      ensureInMiddleSegment();
    };

    const id = window.setTimeout(init, 0);
    window.addEventListener("resize", init);

    startAutoPlay();

    return () => {
      window.clearTimeout(id);
      window.removeEventListener("resize", init);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      stopAutoPlay();
      if (programmaticTimerRef.current) window.clearTimeout(programmaticTimerRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`projectsSection section ${isProjectsVisible ? "projectsIn" : "projectsOut"}`}
    >
      <div className="container">
        <div className="projectsHeader">
          <div className="headerContent">
            <h2 className="sectionTitle">Featured Projects</h2>
            <p className="sectionSubtitle">
              A selection of digital experiences I&apos;ve built, ranging from AI
              applications to complex web platforms.
            </p>
          </div>

          <div className="scrollButtons">
            <button
              onClick={() => scrollByAmount("left")}
              className="scrollBtn active"
              aria-label="Scroll left"
              type="button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={() => scrollByAmount("right")}
              className="scrollBtn active"
              aria-label="Scroll right"
              type="button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="projectsWrapper">
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="projectsScrollContainer projectsCarousel"
            onMouseEnter={() => {
              isHoveringRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveringRef.current = false;
            }}
            onPointerDown={() => {
              isPointerDownRef.current = true;
            }}
            onPointerUp={() => {
              isPointerDownRef.current = false;
            }}
            onPointerCancel={() => {
              isPointerDownRef.current = false;
            }}
          >
            <div className="scrollSpacer" />

            {loopedProjects.map((project, index) => (
              <ProjectCard key={`${project.title}-${index}`} project={project} />
            ))}

            <div className="scrollSpacer" />
          </div>
        </div>
      </div>
    </section>
  );
};

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article className="projectCard">
      <div className="cardContainer">
        <div className="imageContainer">
          <img src={project.image} alt={project.title} className="projectImage" />
          <div className="imageOverlay" />

          <div className="overlayButtons">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="iconBtn"
              aria-label="View repository"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            <a
              href={project.siteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="iconBtn"
              aria-label="View live site"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>

        <div className="cardContent">
          <div className="techTags">
            {project.tech.slice(0, 3).map((tag) => (
              <span key={`${project.title}-${tag}`} className="techTag">
                {tag}
              </span>
            ))}
          </div>

          <h3 className="projectTitle">{project.title}</h3>
          <p className="projectDescription">{project.description}</p>

          <div className="cardFooter">
            <a
              href={project.siteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="viewProjectLink"
            >
              View Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Projects;
