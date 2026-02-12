interface MobileOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileOverlay = ({ isOpen, onClose }: MobileOverlayProps) => {
  const scrollToSection = (sectionId: string) => {
    onClose();
    
    setTimeout(() => {
      const section = document.querySelector(sectionId);
      if (section) {
        const navBar = document.querySelector('.navBar') as HTMLElement;
        const navHeight = navBar ? navBar.offsetHeight : 0;
        const targetPosition = (section as HTMLElement).offsetTop - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    }, 300);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={`mobileOverlay ${isOpen ? 'show' : ''}`}
      onClick={handleOverlayClick}
    >
      <nav className="overlayNav">
        <a onClick={() => scrollToSection('#about')}>Info</a>
        <a onClick={() => scrollToSection('#skills')}>Skills</a>
        <a onClick={() => scrollToSection('#projects')}>Projects</a>
        <a onClick={() => scrollToSection('#contact')}>Contact</a>
      </nav>
      <div className="overlayFooter">
        <p>Email: <a href="mailto:jpgabarda@up.edu.ph">jpgabarda@up.edu.ph</a></p>
        <p>
          Socials: <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer">LinkedIn</a> | <a href="https://github.com/jerichogabarda" target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </div>
    </div>
  );
};

export default MobileOverlay;
