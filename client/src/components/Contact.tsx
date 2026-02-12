import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <section id="contact" className="contactSection section">
      <div className="container">
        <div className="contactContent">
          <p className="contactIntro">Have a project in mind?</p>

          <h2 className="contactTitle">
            <span className="contactIcon">✦</span>
            Let's Chat
          </h2>

          <a href="mailto:jpgabarda@up.edu.ph" className="contactEmail">
            <span className="emailText">jpgabarda@up.edu.ph</span>
            <span className="emailArrow">←</span>
          </a>

          <div className="contactFooter">
            <div className="socialLinks">
              <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/jerichogabarda" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>

            <p className="copyright">© Jericho Gabarda 2025</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
