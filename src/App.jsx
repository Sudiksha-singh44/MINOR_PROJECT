import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ScrollProgress } from "./components/scroll-progress";
import { Skeleton } from "./components/ui/skeleton";

// ✅ Lazy load components for better performance
const Navbar = lazy(() => import("./Components/Navbar/Navbar"));
const Hero = lazy(() => import("./Components/Hero/Hero"));
const Program = lazy(() => import("./Components/Program/Program"));
const Chatbot = lazy(() => import("./Components/Chatbot/Chatbot"));
const Analyzer = lazy(() => import("./Components/Analyzer/Analyzer"));
const Build = lazy(() => import("./Components/Build/Build"));
const Footer = lazy(() => import("./Components/Footer/Footer"));

// Loading fallback component
const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="space-y-4 w-full max-w-md px-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  </div>
);

const App = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Suspense fallback={<SectionLoader />}>
        {/* 🧭 Navbar Section */}
        <Navbar />

        {/* 🦸 Hero Section */}
        <section id="hero" className="scroll-mt-20">
          <Suspense fallback={<SectionLoader />}>
            <Hero />
          </Suspense>
        </section>

        {/* 🎓 Program Section */}
        <section id="programs" className="scroll-mt-20">
          <Suspense fallback={<div className="h-96" />}>
            <Program />
          </Suspense>
        </section>

        {/* 💬 Chatbot Section */}
        <section id="chatbot" className="scroll-mt-20">
          <Suspense fallback={<div className="h-96" />}>
            <Chatbot />
          </Suspense>
        </section>

        {/* 🧠 Resume Analyzer Section */}
        <section id="analyzer" className="scroll-mt-20">
          <Suspense fallback={<div className="h-96" />}>
            <Analyzer />
          </Suspense>
        </section>

        {/* 🏗️ Build Section */}
        <section id="build" className="scroll-mt-20">
          <Suspense fallback={<div className="h-96" />}>
            <Build />
          </Suspense>
        </section>

        {/* 🦶 Footer Section */}
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
