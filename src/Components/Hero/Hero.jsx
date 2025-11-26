import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";

export default function Hero() {
  const scrollToAnalyzer = () => {
    document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./src/assets/hero.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Resume Analysis
            </span>
          </motion.div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
        >
          <span className="block">IS YOUR RESUME</span>
          <motion.span
            className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            GOOD ENOUGH?
          </motion.span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Transform your resume with AI-powered analysis. Get instant feedback,
          skill recommendations, and ATS optimization tips to land your dream job.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={scrollToAnalyzer}
            size="lg"
            className="text-lg px-8 py-6 rounded-full shadow-2xl hover:shadow-primary/50 transition-all"
            aria-label="Explore resume analyzer"
          >
            Get Started
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-lg px-8 py-6 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
          >
            Learn More
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/70"
          >
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
