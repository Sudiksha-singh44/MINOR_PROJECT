// Chatbot.jsx
import React, { useState } from "react";
import "./Chatbot.css";

const qaList = [
  {
    q: "How do I check my resume score?",
    a: "Upload your resume to Enhancv’s Resume Checker. Once we run the check you will be redirected to another page where you can see your report with a score on the left side of the screen..."
  },
  {
    q: "How do I improve my resume score?",
    a: "A higher resume score can be achieved by improving key sections on your resume. Rewrite your experience section to include quantifiable achievements, add skills, accomplishments, fix spelling errors, and use a professional template..."
  },
  {
    q: "How do I know my resume is ATS compliant?",
    a: "To ensure ATS compliance, use relevant keywords, keep formatting simple, stick to conventional headings like 'Work Experience' and 'Education', avoid columns, and proofread carefully..."
  },
  {
    q: "What is a good ATS score?",
    a: "Enhancv’s Resume Checker score is made by 16 checks. If your resume scores higher than 80 you can count that it’s mostly good. But still ensure contact info and experience are perfect..."
  },
  {
    q: "Can an ATS read PDFs?",
    a: "Yes. Tests with top applicant tracking systems show ATS can read PDFs, and in fact PDFs often score higher as they’re static files that preserve formatting..."
  },
  {
    q: "How do I review my resume for errors?",
    a: "Do a complete resume review, not just sections. Review accomplishments, skills, and ensure formatting is clean so achievements aren’t hidden..."
  }
];

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! 👋 Select a question to get started." }
  ]);

  const handleQuestionClick = (q, a) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: q },
      { sender: "bot", text: a }
    ]);
  };

  return (
    <div className="chatbot-container">
      {/* Left side chatbot */}
      <div className="chatbot">
        <div className="chatbot-header">Resume Analyzer Bot</div>
        <div className="chatbot-messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chatbot-message ${
                msg.sender === "bot" ? "bot" : "user"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>

      {/* Right side Q&A options */}
      <div className="chatbot-questions">
        <h3>Frequently Asked Questions</h3>
        <ul>
          {qaList.map((item, index) => (
            <li key={index} onClick={() => handleQuestionClick(item.q, item.a)}>
              {item.q}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chatbot;
