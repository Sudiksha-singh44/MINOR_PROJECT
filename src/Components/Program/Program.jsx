import React from "react";
import "./Program.css";

export default function Program() {
  return (
    <section className="program-section">
      <h2 className="program-title">Our Programs</h2>

      <div className="program-grid">
        {/* Card 1 */}
        <div className="program-card">
          <img src="./graduate1.jpg" alt="Undergraduate Program" />
          <div className="overlay">
            {/* Graduation cap SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" 
                 width="50" height="50" fill="white" 
                 viewBox="0 0 24 24">
              <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zm0 
                       7.82L3.74 7 12 3.18 20.26 7 12 9.82zM11 
                       12.47L2 8v2l9 4.47V22h2v-7.53L22 10V8l-9 
                       4.47z"/>
            </svg>
            <p>Undergraduate Degree</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="program-card">
          <img src="./graduate2.jpg" alt="Masters Program" />
          <div className="overlay">
            {/* Diploma scroll SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" 
                 width="50" height="50" fill="white" 
                 viewBox="0 0 24 24">
              <path d="M4 4v16h16V4H4zm2 2h12v12H6V6zm6 
                       1c-2.21 0-4 1.79-4 4s1.79 4 
                       4 4 4-1.79 4-4-1.79-4-4-4zm0 
                       6c-1.1 0-2-.9-2-2s.9-2 
                       2-2 2 .9 2 2-.9 2-2 2z"/>
            </svg>
            <p>Masters Degree</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="program-card">
          <img src="./graduate3.jpg" alt="PhD Program" />
          <div className="overlay">
            {/* Award/Medal SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" 
                 width="50" height="50" fill="white" 
                 viewBox="0 0 24 24">
              <path d="M12 2a7 7 0 100 14 7 7 0 
                       000-14zm0 12a5 5 0 110-10 
                       5 5 0 010 10zm-1 2H8l-2 
                       8 6-2 6 2-2-8h-3v2h-2v-2z"/>
            </svg>
            <p>PhD Program</p>
          </div>
        </div>
      </div>
    </section>
  );
}
