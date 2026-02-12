import { useEffect, useRef, useState, type MouseEvent } from "react";

interface Project {
  title: string;
  overlayTitle: string;
  tech: string;
  image: string;
  siteLink: string;
  githubLink: string;
}

const Projects = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const projects: Project[] = [
    {
      title: "RunWise",
      overlayTitle: "RunWise",
      tech: "HTML, Javascript, CSS, Node.js, Open Ai",
      image: "/resources/img/RunWise.png",
      siteLink: "https://projectrunwise.netlify.app/",
      githubLink: "https://github.com/MrJcode12/RunWise.git"
    },
    {
      title: "SuitLink",
      overlayTitle: "Full-Stack Job Portal App",
      tech: "Javascript, Node.js, React, MongoDB",
      image: "/resources/img/SuitLink.png",
      siteLink: "https://taskmanager.example.com",
      githubLink: "https://gitlab.com/username/task-manager"
    },
    {
      title: "Social Media Dashboard",
      overlayTitle: "Social Media Dashboard",
      tech: "PHP • Laravel • MySQL • Chart.js",
      image:
        "https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=500&h=300&fit=crop",
      siteLink: "https://socialdashboard.example.com",
      githubLink: "https://gitlab.com/username/social-dashboard"
    },
    {
      title: "Weather Application",
      overlayTitle: "Weather Application",
      tech: "HTML • CSS • JavaScript • Weather API",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop",
      siteLink: "https://weatherapp.example.com",
      githubLink: "https://gitlab.com/username/weather-app"
    },
    {
      title: "Portfolio Builder",
      overlayTitle: "Portfolio Builder",
      tech: "React • Firebase • Tailwind CSS",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop",
      siteLink: "https://portfoliobuilder.example.com",
      githubLink: "https://gitlab.com/username/portfolio-builder"
    }
  ];

  const scrollAmount = 440;

  const handleScrollLeft = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollIndicators = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const isAtStart = el.scrollLeft <= 0;
    const isAtEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 10;
    setShowLeftScroll(!isAtStart);
    setShowRightScroll(!isAtEnd);
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!isDragging || !el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 2;
    el.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-card-index") ?? 0);

          if (entry.isIntersecting) {
            window.setTimeout(() => {
              setVisibleCards((prev) => {
                const next = new Set(prev);
                next.add(idx);
                return next;
              });
            }, idx * 150);
          } else {
            setVisibleCards((prev) => {
              const next = new Set(prev);
              next.delete(idx);
              return next;
            });
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );

    const cards = document.querySelectorAll<HTMLElement>(".projectCard");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollIndicators);
    window.addEventListener("resize", updateScrollIndicators);
    updateScrollIndicators();

    return () => {
      el.removeEventListener("scroll", updateScrollIndicators);
      window.removeEventListener("resize", updateScrollIndicators);
    };
  }, []);

  return (
    <section id="projects" className="projectsSection section">
      <div className="container">
        <h2 className="sectionTitle" id="projectsTitle">
          Featured Projects
        </h2>

        <div className="projectsScrollWrapper">
          {showLeftScroll && (
            <div
              className="scrollIndicator scrollLeft"
              onClick={handleScrollLeft}
              aria-label="scroll left"
              role="button"
              tabIndex={0}
            />
          )}

          {showRightScroll && (
            <div
              className="scrollIndicator scrollRight"
              onClick={handleScrollRight}
              aria-label="scroll right"
              role="button"
              tabIndex={0}
            />
          )}

          <div
            className="projectsScrollContainer"
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            {projects.map((project, idx) => (
              <article
                key={idx}
                className={`projectCard ${visibleCards.has(idx) ? "visible" : ""}`}
                data-card-index={idx}
              >
                <div className="projectImageWrapper">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="projectImage"
                  />

                  <div className="projectOverlay">
                    <h3 className="projectOverlayTitle">{project.overlayTitle}</h3>
                    <p className="projectTech">{project.tech}</p>

                    <div className="projectLinks">
                      <a
                        href={project.siteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projectLink"
                      >
                        View Site
                      </a>

                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projectLink"
                      >
                        View GitHub
                      </a>
                    </div>
                  </div>
                </div>

                <div className="projectContent">
                  <h3 className="projectTitle">{project.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
