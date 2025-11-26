// Intelligent chatbot response generator with ChatGPT-like direct responses

// Enhanced knowledge base with categorized responses
const knowledgeBase = {
  // Resume scoring
  score: {
    keywords: ["score", "rating", "grade", "points", "how good", "how well", "what score"],
    responses: [
      "Your resume score is calculated based on ATS compatibility, content quality, formatting, and keyword optimization. Scores above 80 are considered good, while 90+ indicates excellent optimization.",
      "The scoring system evaluates four key areas: ATS compliance (keyword matching), content quality (achievements and metrics), formatting (clean structure), and keyword density. Aim for 80+ for competitive resumes.",
      "A good resume score typically ranges from 80-100. Scores in this range indicate strong ATS compatibility and professional presentation. Our analyzer provides detailed breakdowns for each category."
    ]
  },
  
  // ATS compliance
  ats: {
    keywords: ["ats", "applicant tracking", "system", "compliance", "readable", "parse", "ats-friendly"],
    responses: [
      "ATS (Applicant Tracking System) compliance ensures your resume can be read by automated systems. Use standard headings, avoid graphics, include relevant keywords, and maintain simple formatting.",
      "To make your resume ATS-friendly: use standard section names (Work Experience, Education), include industry keywords, avoid tables and columns, use simple fonts, and save as PDF or Word format.",
      "ATS systems scan resumes for keywords and structure. Ensure you use job-relevant keywords, standard formatting, and avoid complex layouts. Our analyzer checks all these factors automatically."
    ]
  },
  
  // Keywords
  keywords: {
    keywords: ["keyword", "optimization", "buzzword", "terms", "phrases", "what keywords"],
    responses: [
      "Keywords are essential for ATS optimization. Include industry-specific terms, technical skills, and job-relevant phrases from the job description. Aim for 10-15 relevant keywords naturally integrated.",
      "Effective keyword optimization involves matching terms from job descriptions, using industry-standard terminology, and including both hard skills (technical) and soft skills (leadership, communication).",
      "Keywords should be naturally integrated throughout your resume, especially in skills, experience, and summary sections. Avoid keyword stuffing - quality and relevance matter more than quantity."
    ]
  },
  
  // Formatting
  formatting: {
    keywords: ["format", "layout", "design", "template", "structure", "appearance", "how to format"],
    responses: [
      "Professional resume formatting includes: clear section headers, consistent spacing, readable fonts (11-12pt), 1-inch margins, and logical flow. Avoid graphics, tables, and complex layouts for ATS compatibility.",
      "Best formatting practices: use standard fonts (Arial, Calibri, Times New Roman), maintain consistent date formats, use bullet points for achievements, and keep it to 1-2 pages for most roles.",
      "Formatting should be clean and professional. Use clear section dividers, consistent styling, and ensure proper spacing. Our analyzer checks formatting compliance and provides specific recommendations."
    ]
  },
  
  // Experience section
  experience: {
    keywords: ["experience", "work history", "employment", "job", "career", "background", "work experience"],
    responses: [
      "Your experience section should highlight quantifiable achievements using action verbs. Include metrics (percentages, dollar amounts, timeframes) and focus on impact rather than just responsibilities.",
      "Effective experience entries start with action verbs (Led, Developed, Increased), include specific metrics, and demonstrate results. Use the STAR method (Situation, Task, Action, Result) when possible.",
      "For strong experience sections: quantify achievements, use industry keywords, highlight relevant accomplishments, and tailor descriptions to match job requirements. Our analyzer provides specific feedback on your experience section."
    ]
  },
  
  // Skills
  skills: {
    keywords: ["skill", "competency", "ability", "proficiency", "expertise", "what skills"],
    responses: [
      "Include both hard skills (technical, job-specific) and soft skills (communication, leadership). List 10-15 relevant skills, prioritize those mentioned in job descriptions, and organize by category if helpful.",
      "Effective skills sections include: technical skills relevant to your field, industry-specific tools/software, certifications, and soft skills. Match skills to job requirements for better ATS compatibility.",
      "Skills should be specific and relevant. Include technical proficiencies, software/tools, languages, and certifications. Our analyzer identifies extracted skills and recommends additional ones for your field."
    ]
  },
  
  // Education
  education: {
    keywords: ["education", "degree", "university", "college", "school", "qualification"],
    responses: [
      "Education sections should include: degree name, institution, graduation date (or expected), and relevant coursework or honors if space allows. List in reverse chronological order.",
      "For education: include degree, major/minor, institution name, graduation year, and GPA if above 3.5. Recent graduates can include relevant coursework; experienced professionals can be brief.",
      "Education formatting should be consistent and clear. Include all relevant degrees, certifications, and professional development. Our analyzer checks education section completeness and formatting."
    ]
  },
  
  // Improvement
  improvement: {
    keywords: ["improve", "better", "enhance", "upgrade", "fix", "optimize", "boost", "how to improve"],
    responses: [
      "To improve your resume: add quantifiable metrics to experience, optimize keywords for your target field, ensure ATS-friendly formatting, proofread for errors, and tailor content to job descriptions.",
      "Key improvements include: quantifying achievements with numbers, adding industry-relevant keywords, using action verbs, ensuring proper formatting, and highlighting transferable skills.",
      "Our analyzer provides specific action items prioritized by impact. Focus on high-priority items first: adding metrics, optimizing keywords, and improving content quality. Each recommendation includes detailed guidance."
    ]
  },
  
  // PDF and file format
  pdf: {
    keywords: ["pdf", "file format", "document type", "file type", "can ats read pdf"],
    responses: [
      "PDF is the preferred format for resumes as it preserves formatting across different systems. Most ATS systems can read PDFs effectively. Ensure your PDF is text-based, not scanned images.",
      "PDFs are ATS-compatible and maintain formatting. However, ensure the PDF contains selectable text (not just images) and uses standard fonts for best ATS parsing results.",
      "Yes, PDFs work well with ATS systems. Make sure your PDF has selectable text, uses standard fonts, and maintains clean formatting. Our analyzer accepts PDF files for comprehensive analysis."
    ]
  }
};

// Quick action suggestions
export const QUICK_ACTIONS = [
  "How do I improve my ATS score?",
  "What keywords should I include?",
  "How to format my resume?",
  "What makes a strong experience section?",
  "How many skills should I list?",
  "Should I use a PDF format?"
];

// Direct question-answer mappings for common questions
const directAnswers = {
  // Analyzer quality questions
  "is this good to analyze": "Yes! Our Resume Analyzer works with any resume. Simply upload your PDF and our AI will analyze it for ATS compatibility, content quality, formatting, and keywords. You'll get detailed feedback regardless of your current resume quality.",
  "is it good to analyze": "Yes! Our Resume Analyzer works with any resume. Simply upload your PDF and our AI will analyze it for ATS compatibility, content quality, formatting, and keywords. You'll get detailed feedback regardless of your current resume quality.",
  "is this good": "Yes! Our Resume Analyzer is designed to work with any resume. Upload your PDF and get comprehensive analysis on ATS compliance, content quality, formatting, and keyword optimization.",
  
  // Consequences questions
  "what will happen if i don't improve": "If you don't improve your resume, you may face: 1) **Lower ATS scores** - Your resume might not pass through applicant tracking systems, so recruiters may never see it. 2) **Missed opportunities** - You may not match job requirements due to missing keywords or poor formatting. 3) **Reduced interview chances** - Poorly optimized resumes often get filtered out before human review. 4) **Competitive disadvantage** - Other candidates with optimized resumes will have better chances. Our analyzer helps you identify and fix these issues!",
  "what happens if i don't improve": "If you don't improve your resume, you may face: 1) **Lower ATS scores** - Your resume might not pass through applicant tracking systems, so recruiters may never see it. 2) **Missed opportunities** - You may not match job requirements due to missing keywords or poor formatting. 3) **Reduced interview chances** - Poorly optimized resumes often get filtered out before human review. 4) **Competitive disadvantage** - Other candidates with optimized resumes will have better chances. Our analyzer helps you identify and fix these issues!",
  "what if i don't improve": "If you don't improve your resume, you risk: lower ATS pass rates, missed job opportunities, fewer interview invitations, and being less competitive than other candidates. Our analyzer shows you exactly what to fix to avoid these problems.",
  
  // Analyzer effectiveness
  "is the analyzer good": "Yes, our Resume Analyzer is highly effective! It uses advanced AI to evaluate your resume across four key dimensions: ATS compliance, content quality, formatting, and keyword optimization. It provides detailed, actionable feedback with specific recommendations prioritized by impact.",
  "how good is the analyzer": "Our Resume Analyzer is highly effective! It uses advanced AI to evaluate your resume across ATS compliance, content quality, formatting, and keyword optimization. It provides detailed, actionable feedback with specific recommendations to help you improve your resume.",
  "does the analyzer work": "Yes, our Resume Analyzer works excellently! It uses AI to analyze your resume across multiple dimensions and provides detailed feedback on ATS compliance, content quality, formatting, and keywords. Simply upload your PDF resume to get started.",
  
  // Resume quality questions
  "is my resume good": "To determine if your resume is good, upload it to our analyzer! It evaluates your resume across ATS compatibility, content quality, formatting, and keyword optimization. A score of 80+ is considered good, while 90+ indicates excellent optimization.",
  "is this resume good": "To determine if your resume is good, upload it to our analyzer! It evaluates your resume across ATS compatibility, content quality, formatting, and keyword optimization. A score of 80+ is considered good, while 90+ indicates excellent optimization.",
  
  // Should I questions
  "should i improve my resume": "Yes, you should improve your resume! Even small improvements can significantly increase your chances of getting noticed. Our analyzer identifies specific areas where improvements will have the most impact. Focus on high-priority recommendations first.",
  "should i use the analyzer": "Absolutely! Analyzing your resume is the first step to improving it. Our analyzer shows you exactly what's working well and what needs improvement, with specific, actionable recommendations. It only takes a few minutes and can make a huge difference.",
  "do i need to improve": "Yes, improving your resume is essential for job search success. Our analyzer helps you identify exactly what needs improvement and provides prioritized recommendations. Even small changes can significantly increase your chances of getting noticed by employers.",
};

// Extract key intent from user input
const extractIntent = (input) => {
  // Remove common filler words and normalize
  const normalized = input
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  return normalized;
};

// Check for direct answer matches
const findDirectAnswer = (input) => {
  const normalized = extractIntent(input);
  
  // Check exact or close matches
  for (const [key, answer] of Object.entries(directAnswers)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return answer;
    }
  }
  
  // Check partial matches with higher confidence
  for (const [key, answer] of Object.entries(directAnswers)) {
    const keyWords = key.split(' ');
    const matchCount = keyWords.filter(word => normalized.includes(word)).length;
    if (matchCount >= keyWords.length * 0.7) { // 70% match threshold
      return answer;
    }
  }
  
  return null;
};

// Generate intelligent response based on user input
export const generateResponse = (userInput, conversationHistory = []) => {
  if (!userInput || userInput.trim().length === 0) {
    return "I'd be happy to help! Please ask me a question about resume optimization, or select one of the questions below.";
  }

  const input = userInput.toLowerCase().trim();
  const normalizedInput = extractIntent(input);
  
  // Check for greetings
  if (input.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
    return "Hello! 👋 I'm your Resume Analyzer assistant. I can help you with ATS optimization, formatting, keywords, scoring, and more. What would you like to know?";
  }
  
  // Check for thanks
  if (input.match(/(thank|thanks|appreciate|grateful)/)) {
    return "You're welcome! 😊 I'm here whenever you need help with your resume. Feel free to ask more questions or use the analyzer to get detailed feedback on your resume!";
  }
  
  // Check for goodbye
  if (input.match(/(bye|goodbye|see you|farewell|exit|quit)/)) {
    return "Goodbye! 👋 Best of luck with your resume optimization. Remember to use our analyzer for detailed feedback and scoring. Come back anytime!";
  }
  
  // Try direct answer first (most specific)
  const directAnswer = findDirectAnswer(input);
  if (directAnswer) {
    return directAnswer;
  }
  
  // Handle specific question patterns with direct answers
  
  // "Is this/that/it good" questions
  if (input.match(/(is this|is it|is that|are these|are those).*(good|bad|okay|fine|suitable|appropriate|ready)/)) {
    if (input.includes("analyze") || input.includes("analyzer") || input.includes("tool")) {
      return "Yes! Our Resume Analyzer is designed to work with any resume. Simply upload your PDF resume and our AI-powered system will analyze it for ATS compatibility, content quality, formatting, and keyword optimization. The analyzer provides detailed feedback regardless of your current resume quality.";
    }
    if (input.includes("resume") || input.includes("cv")) {
      return "To determine if your resume is good, upload it to our analyzer! It evaluates your resume across ATS compatibility, content quality, formatting, and keyword optimization. A score of 80+ is considered good, while 90+ indicates excellent optimization.";
    }
    return "Yes! Our Resume Analyzer works with any resume. Upload your PDF and get comprehensive analysis on ATS compliance, content quality, formatting, and keyword optimization.";
  }
  
  // "What will happen if" questions
  if (input.match(/(what|what's|what will).*(happen|occur|result|consequence|outcome|effect)/)) {
    if (input.match(/(if|when).*(don't|do not|fail|not improve|don't improve|not fix)/)) {
      return "If you don't improve your resume, you may face several challenges: 1) **Lower ATS scores** - Your resume might not pass through applicant tracking systems, meaning recruiters may never see it. 2) **Missed opportunities** - You may not match job requirements due to missing keywords or poor formatting. 3) **Reduced interview chances** - A poorly optimized resume often gets filtered out before human review. 4) **Competitive disadvantage** - Other candidates with optimized resumes will have better chances. Our analyzer helps you identify and fix these issues before applying!";
    }
  }
  
  // "How" questions
  if (input.match(/^how/)) {
    if (input.match(/(do i|can i|should i).*(improve|better|enhance|fix|optimize)/)) {
      return "To improve your resume: add quantifiable metrics to experience, optimize keywords for your target field, ensure ATS-friendly formatting, proofread for errors, and tailor content to job descriptions. Our analyzer provides specific, prioritized recommendations for your resume.";
    }
    if (input.match(/(do i|can i).*(check|see|view|get).*(score|rating|analysis)/)) {
      return "To check your resume score, simply upload your PDF resume using our Resume Analyzer tool. The system will analyze your resume and provide a comprehensive score breakdown with detailed feedback on ATS compliance, content quality, formatting, and keywords.";
    }
    if (input.match(/(many|much|long|often)/)) {
      if (input.includes("skill")) {
        return "Include 10-15 relevant skills on your resume. Prioritize skills mentioned in job descriptions and organize them by category (technical skills, soft skills, etc.) if helpful.";
      }
      if (input.includes("page") || input.includes("length")) {
        return "Most resumes should be 1-2 pages. Recent graduates can use 1 page, while experienced professionals may need 2 pages. Keep it concise and focused on relevant information.";
      }
    }
  }
  
  // "What" questions
  if (input.match(/^what/)) {
    if (input.match(/(is|are).*ats/)) {
      return "ATS (Applicant Tracking System) is software used by employers to filter and rank resumes. It scans resumes for keywords, structure, and formatting. To be ATS-compliant, use standard headings, include relevant keywords, avoid graphics/tables, and maintain simple formatting.";
    }
    if (input.match(/(is|are).*keyword/)) {
      return "Keywords are specific terms and phrases that match job descriptions. They include technical skills, industry terms, job titles, and qualifications. Including relevant keywords helps your resume pass ATS systems and match job requirements.";
    }
    if (input.includes("keywords should i include") || input.includes("keywords to include")) {
      return "Include keywords from the job description: technical skills, industry terms, software/tools, certifications, and job-relevant phrases. Our analyzer identifies missing keywords and recommends ones specific to your field.";
    }
    if (input.includes("makes a good resume") || input.includes("makes a strong resume")) {
      return "A good resume has: 1) Quantifiable achievements with metrics, 2) Relevant keywords matching job descriptions, 3) ATS-friendly formatting, 4) Clear structure with standard sections, 5) Action verbs in experience descriptions, and 6) Professional appearance. Our analyzer evaluates all these factors.";
    }
  }
  
  // "Should I" questions
  if (input.match(/(should i|should|do i need|do i have to)/)) {
    if (input.match(/(improve|update|change|fix)/)) {
      return "Yes, you should improve your resume! Even small improvements can significantly increase your chances of getting noticed. Our analyzer identifies specific areas where improvements will have the most impact. Focus on high-priority recommendations first, such as adding quantifiable metrics, optimizing keywords, and ensuring ATS-friendly formatting.";
    }
    if (input.match(/(analyze|check|use|upload)/)) {
      return "Absolutely! Analyzing your resume is the first step to improving it. Our analyzer will show you exactly what's working well and what needs improvement, with specific, actionable recommendations. It only takes a few minutes and can make a huge difference in your job search success.";
    }
    if (input.includes("pdf") || input.includes("format")) {
      return "Yes, PDF is the preferred format for resumes. It preserves formatting across different systems and most ATS systems can read PDFs effectively. Ensure your PDF contains selectable text (not just images) and uses standard fonts.";
    }
  }
  
  // "Can" questions
  if (input.match(/^can/)) {
    if (input.match(/(ats|system).*read.*pdf/)) {
      return "Yes, ATS systems can read PDFs! Most modern ATS systems can parse PDF files effectively. However, ensure your PDF contains selectable text (not scanned images) and uses standard fonts for best results.";
    }
    if (input.includes("improve my score") || input.includes("increase my score")) {
      return "Yes! You can improve your resume score by: adding quantifiable metrics, optimizing keywords, ensuring ATS-friendly formatting, proofreading for errors, and tailoring content to job descriptions. Our analyzer provides specific recommendations to help you improve.";
    }
  }
  
  // Find matching category based on keywords
  let bestMatch = null;
  let maxMatches = 0;
  
  for (const [category, data] of Object.entries(knowledgeBase)) {
    const matches = data.keywords.filter(keyword => normalizedInput.includes(keyword)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = category;
    }
  }
  
  // If we found a match, return a relevant response
  if (bestMatch && maxMatches > 0) {
    const responses = knowledgeBase[bestMatch].responses;
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Context-aware fallback responses
  if (input.includes("analyzer") || input.includes("tool") || input.includes("system")) {
    return "Our Resume Analyzer is a powerful AI-powered tool that evaluates your resume across multiple dimensions: ATS compatibility, content quality, formatting, and keyword optimization. It provides detailed, actionable feedback with specific recommendations. Simply upload your PDF resume to get started!";
  }
  
  if (input.includes("resume") || input.includes("cv")) {
    return "I'd be happy to help with your resume! Our analyzer can evaluate your resume and provide specific feedback. You can ask me about: improving your score, ATS compliance, keyword optimization, formatting, or any other resume-related topic. What specific aspect would you like to know more about?";
  }
  
  // Default intelligent response
  const defaultResponses = [
    "I can help you with resume optimization, ATS compliance, formatting, keywords, and scoring. Could you be more specific about what you'd like to know? For example, you could ask about improving your resume score, making your resume ATS-friendly, or what keywords to include.",
    "I specialize in resume optimization and can help with ATS compliance, keyword optimization, formatting, and improving your overall resume score. What specific area would you like help with? You can also upload your resume to our analyzer for detailed, personalized feedback.",
    "That's a great question! I can help with various aspects of resume optimization. Our analyzer provides comprehensive feedback on ATS compliance, content quality, formatting, and keywords. What specific topic would you like to explore? You can ask about scoring, keywords, formatting, or upload your resume for personalized analysis."
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

// Simulate typing delay for realistic conversation
export const simulateTyping = (callback, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, delay);
  });
};
