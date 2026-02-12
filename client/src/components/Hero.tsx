import { useEffect, useRef, useState } from "react";
import { Linkedin, Github, Download } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const [animatedText, setAnimatedText] = useState("");
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const timerRef = useRef<number | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  const phrases = ["Full Stack Web Developer", "Problem Solver"];

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => setIsLoaded(true));
        } else {
          setIsLoaded(false);
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typingSpeed = 50;
    const deletingSpeed = 50;
    const pauseDelay = 1500;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];
      const fullText = `${currentPhrase}/>`;
      const next = isDeleting ? charIndex - 1 : charIndex + 1;

      charIndex = Math.max(0, Math.min(fullText.length, next));
      setAnimatedText(charIndex > 0 ? `<${fullText.slice(0, charIndex)}` : "<");

      if (!isDeleting && charIndex === fullText.length) {
        isDeleting = true;
        timerRef.current = window.setTimeout(type, pauseDelay);
        return;
      }

      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timerRef.current = window.setTimeout(type, typingSpeed);
        return;
      }

      timerRef.current = window.setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    };

    type();

    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsSection = document.querySelector("#projects");
    if (!projectsSection) return;

    const navBar = document.querySelector(".navBar") as HTMLElement | null;
    const navHeight = navBar ? navBar.offsetHeight : 0;
    const targetPosition = (projectsSection as HTMLElement).offsetTop - navHeight;

    window.scrollTo({ top: targetPosition, behavior: "smooth" });
  };

  const socialBtnBase: React.CSSProperties = {
    width: "44px",
    height: "44px",
    border: "1px solid #d1d5db",
    borderRadius: "9999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease"
  };

  const onEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = "#000";
    e.currentTarget.style.color = "#fff";
    e.currentTarget.style.borderColor = "#000";
  };

  const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.color = "#000";
    e.currentTarget.style.borderColor = "#d1d5db";
  };

  const reveal = {
    hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" }
  };

  return (
    <section
      ref={(node) => {
        heroRef.current = node;
      }}
      id="about"
      className={`heroSection ${isLoaded ? "heroLoaded" : ""}`}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "24px" : "64px",
            alignItems: "center",
            width: "100%"
          }}
        >
          {/* IMAGE (mobile first) */}
          <motion.div
            className="heroLoadItem"
            initial={{ opacity: 0, x: isMobile ? 0 : 100 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: isMobile ? 0 : 100 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{
              display: "flex",
              justifyContent: isMobile ? "center" : "flex-end",
              alignSelf: isMobile ? "start" : "end",
              order: isMobile ? 0 : 1,
              paddingBottom: isMobile ? "0px" : "72px",
              position: "relative"
            }}
          >
            <motion.div
              animate={isLoaded ? { y: [0, -10, 0] } : { y: 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "relative" }}
            >
              <motion.div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top right, rgba(239,237,237,1), rgba(255,255,255,0))",
                  borderRadius: "20px",
                  zIndex: -1
                }}
                animate={
                  isLoaded
                    ? { x: [12, 16, 12], y: [12, 16, 12], rotate: [0, 2, 0] }
                    : { x: 12, y: 12, rotate: 0 }
                }
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.div
                className="profileContainer"
                style={{
                  width: isMobile ? "260px" : undefined,
                  height: isMobile ? "360px" : undefined
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setIsHoveringProfile(true)}
                onMouseLeave={() => setIsHoveringProfile(false)}
              >
                <img
                  src={isHoveringProfile ? "/resources/img/shy.png" : "/resources/img/Jericho-Gabarda.png"}
                  alt="Jericho Gabarda"
                  className="profileImage"
                />
              </motion.div>

              {!isMobile ? (
                <>
                  <motion.div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: -20,
                      right: -20,
                      width: 48,
                      height: 48,
                      border: "2px solid #000",
                      borderRadius: 9999
                    }}
                    animate={isLoaded ? { y: [0, -14, 0], rotate: [0, 180, 360] } : { y: 0, rotate: 0 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      bottom: -26,
                      left: -26,
                      width: 56,
                      height: 56,
                      background: "#000",
                      borderRadius: 9999
                    }}
                    animate={isLoaded ? { y: [0, 14, 0], scale: [1, 1.08, 1] } : { y: 0, scale: 1 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </>
              ) : null}
            </motion.div>
          </motion.div>

          {/* TEXT */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "18px" : "22px",
              textAlign: isMobile ? "center" : "left",
              alignItems: isMobile ? "center" : "stretch",
              order: isMobile ? 1 : 0
            }}
          >
            <motion.div
              variants={reveal}
              initial="hidden"
              animate={isLoaded ? "show" : "hidden"}
              transition={{ duration: 0.7 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? "12px" : "16px",
                alignItems: isMobile ? "center" : "flex-start"
              }}
            >
              <p className="heroGreeting">Hello, I&apos;m</p>
              <h1 className="heroTitle">Jericho Gabarda</h1>
              <h2
                className="heroSubtitle"
                id="animatedTitle"
                style={{
                  width: "fit-content",
                  alignSelf: isMobile ? "center" : "flex-start"
                }}
              >
                {animatedText}
              </h2>
            </motion.div>

            <motion.p
              className="heroDescription"
              variants={reveal}
              initial="hidden"
              animate={isLoaded ? "show" : "hidden"}
              transition={{ duration: 0.7, delay: 0.08 }}
              style={{
                maxWidth: isMobile ? "520px" : "560px",
                marginTop: isMobile ? "2px" : "-4px",
                lineHeight: "1.65"
              }}
            >
              I build <strong>full-stack web apps</strong> that scale, stay readable, and don’t fall apart when you add
              new features. I work with React and Node.js, delivering <strong>end-to-end functionality</strong>—auth,
              protected routes, role-based access, APIs, validation, and file uploads—backed by{" "}
              <strong>clean architecture</strong>. With an Electrical Engineering background, I bring{" "}
              <strong>structured problem-solving</strong> and reliable system thinking.
            </motion.p>

            <motion.div
              variants={reveal}
              initial="hidden"
              animate={isLoaded ? "show" : "hidden"}
              transition={{ duration: 0.7, delay: 0.16 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: isMobile ? "center" : "flex-start",
                gap: "16px",
                flexWrap: "nowrap",
                paddingTop: isMobile ? "6px" : "0px"
              }}
            >
              <a href="#projects" className="btn btnPrimary" onClick={scrollToProjects}>
                View My Work
              </a>
              <a href="mailto:jpgabarda@up.edu.ph" className="btn btnSecondary">
                Say Hi
              </a>
            </motion.div>

            {!isMobile ? (
              <motion.div
                variants={reveal}
                initial="hidden"
                animate={isLoaded ? "show" : "hidden"}
                transition={{ duration: 0.7, delay: 0.22 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginTop: "-8px"
                }}
              >
                <a
                  href="https://www.linkedin.com/in/jericho-gabarda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={socialBtnBase}
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                >
                  <Linkedin size={20} />
                </a>

                <a
                  href="https://github.com/MrJcode12"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={socialBtnBase}
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                >
                  <Github size={20} />
                </a>

                <a
                  href="/Resume_Gabarda_Jericho.pdf"
                  download
                  style={socialBtnBase}
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                >
                  <Download size={20} />
                </a>
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
