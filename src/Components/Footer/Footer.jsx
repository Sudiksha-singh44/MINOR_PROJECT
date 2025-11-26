import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";
import { FOOTER_LINKS } from "../../utils/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-gradient-to-b from-background to-secondary/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
        >
          {/* About Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Resume Analyzer
            </h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              A smart platform that helps you analyze, improve, and optimize your
              resume to match job descriptions. Powered by AI to give you an edge
              in your job applications.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <motion.li
                className="flex items-center gap-3 text-sm text-muted-foreground"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:support@resumeanalyzer.com" className="hover:text-primary transition-colors">
                  support@resumeanalyzer.com
                </a>
              </motion.li>
              <motion.li
                className="flex items-center gap-3 text-sm text-muted-foreground"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+15551234567" className="hover:text-primary transition-colors">
                  +1 (555) 123-4567
                </a>
              </motion.li>
              <motion.li
                className="flex items-center gap-3 text-sm text-muted-foreground"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-4 h-4 text-primary" />
                <span>Remote, Worldwide</span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest tips and updates on resume optimization.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="sm">Subscribe</Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t text-center text-sm text-muted-foreground"
        >
          <p>
            © {currentYear} Resume Analyzer. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
