import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Website Info */}
        <div className="footer-about">
          <h3>Resume Analyzer</h3>
          <p>
            A smart platform that helps you analyze, improve, and optimize your
            resume to match job descriptions. Powered by AI to give you an edge
            in your job applications.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email: support@resumeanalyzer.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Location: Remote, Worldwide</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Resume Analyzer. All rights reserved.</p>
      </div>
    </footer>
  );
}
