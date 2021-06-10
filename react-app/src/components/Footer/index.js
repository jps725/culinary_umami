import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__name">
        Created By - Josh Steinberg
        <div className="footer__icons">
          <a href="https://github/jps725">
            <i className="fab fa-github" />
          </a>
          <a href="https://www.linkedin.com/in/josh-steinberg-21618846">
            <i className="fab fa-linkedin" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
