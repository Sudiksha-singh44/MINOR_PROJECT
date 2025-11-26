// Application constants
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
export const ALLOWED_FILE_TYPES = ["application/pdf"];

// Chatbot Q&A data
export const CHATBOT_QUESTIONS = [
  {
    q: "How do I check my resume score?",
    a: "Upload your resume to our Resume Analyzer. Once we run the check you will be redirected to another page where you can see your report with a score on the left side of the screen..."
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
    a: "Our Resume Checker score is made by 16 checks. If your resume scores higher than 80 you can count that it's mostly good. But still ensure contact info and experience are perfect..."
  },
  {
    q: "Can an ATS read PDFs?",
    a: "Yes. Tests with top applicant tracking systems show ATS can read PDFs, and in fact PDFs often score higher as they're static files that preserve formatting..."
  },
  {
    q: "How do I review my resume for errors?",
    a: "Do a complete resume review, not just sections. Review accomplishments, skills, and ensure formatting is clean so achievements aren't hidden..."
  }
];

// Navigation links
export const NAV_LINKS = [
  { label: "Analyzer", href: "#analyzer" },
  { label: "Help", href: "#help" },
  { label: "Chat Bot", href: "#chatbot" },
  { label: "Contact-Us", href: "#contact" }
];

// Footer links
export const FOOTER_LINKS = [
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" }
];

