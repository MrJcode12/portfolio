import { useEffect, useRef, useState } from 'react';

interface SkillItem {
  name: string;
  icon: string;
}

interface SkillCategoryData {
  title: string;
  skills: SkillItem[];
}

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  const skillCategories: SkillCategoryData[] = [
    {
      title: 'Frontend',
      skills: [
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'Ruby', icon: '/resources/img/ruby-original.svg' },
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      ]
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Rails', icon: '/resources/img/rails.svg' },
      ]
    },
    {
      title: 'Database & Tools',
      skills: [
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      ]
    }
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('data-observe-id');
        if (id) {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set(prev).add(id));
          } else {
            setVisibleElements(prev => {
              const newSet = new Set(prev);
              newSet.delete(id);
              return newSet;
            });
          }
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      const elementsToObserve = sectionRef.current.querySelectorAll('[data-observe-id]');
      elementsToObserve.forEach(el => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skillsSection section" ref={sectionRef}>
      <div className="container">
        <div className="skillsHeader">
          <h2
            className={`sectionTitle ${visibleElements.has('skills-title') ? 'visible' : ''}`}
            data-observe-id="skills-title"
          >
            Skills & Technologies
          </h2>
          <p
            className={`sectionSubtitle ${visibleElements.has('skills-subtitle') ? 'visible' : ''}`}
            data-observe-id="skills-subtitle"
          >
            Technologies and tools I use to build exceptional digital experiences
          </p>
        </div>

        <div className="skillsGrid">
          {skillCategories.map((category, idx) => (
            <div
              key={category.title}
              className={`skillCategory ${visibleElements.has(`skill-cat-${idx}`) ? 'visible' : ''}`}
              data-observe-id={`skill-cat-${idx}`}
            >
              <h3 className="categoryTitle">{category.title}</h3>
              <div className="techGrid">
                {category.skills.map(skill => (
                  <div key={skill.name} className="techItem">
                    <img src={skill.icon} alt={skill.name} className="techIcon" />
                    <span className="techName">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="resumeSection">
          <a href="/Resume_Gabarda_Jericho.pdf" download className="btn btnResume">
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Skills;
