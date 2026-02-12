import { useEffect, useState } from "react";

interface NavbarProps {
  onMenuToggle?: (isOpen: boolean) => void;
}

const Navbar = ({ onMenuToggle }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    if (onMenuToggle) onMenuToggle(newState);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (!section) return;

    const navBar = document.querySelector(".navBar") as HTMLElement | null;
    const navHeight = navBar ? navBar.offsetHeight : 0;
    const targetPosition = (section as HTMLElement).offsetTop - navHeight;

    window.scrollTo({ top: targetPosition, behavior: "smooth" });
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
        if (onMenuToggle) onMenuToggle(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen, onMenuToggle]);

  return (
    <nav className="navBar">
      <div className="navContainer">
        <a
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#about");
          }}
          className="navLogo"
        >
          JG
        </a>

        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          aria-label="menu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className="navLinks">
          <li>
            <a
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#about");
              }}
            >
              Info
            </a>
          </li>
          <li>
            <a
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#skills");
              }}
            >
              Skills
            </a>
          </li>
          <li>
            <a
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#projects");
              }}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
              className="navContact"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
