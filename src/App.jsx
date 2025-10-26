import React from "react";

// ✅ Import all major components
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Program from "./Components/Program/Program";
import Chatbot from "./Components/Chatbot/Chatbot";
import Analyzer from "./Components/Analyzer/Analyzer";
import Build from "./Components/Build/Build";
import Footer from "./Components/Footer/Footer";

const App = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* 🧭 Navbar Section */}
      <Navbar />

      {/* 🦸 Hero Section */}
      <section id="hero" className="scroll-mt-20">
        <Hero />
      </section>

      {/* 🎓 Program Section */}
      <section id="programs" className="scroll-mt-20">
        <Program />
      </section>

      {/* 💬 Chatbot Section */}
      <section id="chatbot" className="scroll-mt-20 bg-gradient-to-b from-white to-gray-100">
        <Chatbot />
      </section>

      {/* 🧠 Resume Analyzer Section */}
      <section id="analyzer" className="scroll-mt-20 bg-gradient-to-b from-gray-100 to-gray-200">
        <Analyzer />
      </section>

      {/* 🏗️ Build Section */}
      <section id="build" className="scroll-mt-20">
        <Build />
      </section>

      {/* 🦶 Footer Section */}
      <Footer />
    </div>
  );
};

export default App;
