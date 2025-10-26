import React from "react";
import "./Build.css";

export default function Build() {
  const handleBuildClick = () => {
    window.open("https://www.canva.com/resumes/templates/", "_blank");
  };

  return (
    <div className="build-section">
      <div className="build-card">
        <h1>
          Your resume is an <br />
          extension of yourself – <br />
          make one that’s truly you
        </h1>

        {/* Button */}
        <button className="build-btn" onClick={handleBuildClick}>
          Build Your Resume
        </button>

        {/* Review Section */}
        <div className="review-section">
          <span className="review-text">Excellent</span>

          {/* 5 SVG Stars */}
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#30d38c"
                width="20"
                height="20"
              >
                <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.401 8.166L12 18.896l-7.335 3.862 1.401-8.166L.132 9.21l8.2-1.192z" />
              </svg>
            ))}
          </div>

          <span className="review-count">4,871 Reviews</span>
        </div>
      </div>
    </div>
  );
}
