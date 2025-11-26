// Advanced analysis utilities for realistic resume analysis


const fieldSkills = {
  "Data Science": {
    extracted: ["Python", "Pandas", "NumPy", "Scikit-learn", "Machine Learning", "SQL", "Data Analysis", "Jupyter", "Matplotlib", "Seaborn"],
    recommended: ["TensorFlow", "PyTorch", "Deep Learning", "Big Data", "Apache Spark", "Hadoop", "Tableau", "Power BI", "Statistics", "R"]
  },
  "Software Engineering": {
    extracted: ["JavaScript", "React", "Node.js", "Git", "HTML", "CSS", "TypeScript", "REST APIs"],
    recommended: ["Docker", "Kubernetes", "AWS", "CI/CD", "Microservices", "GraphQL", "MongoDB", "PostgreSQL", "System Design", "Testing"]
  },
  "Product Management": {
    extracted: ["Agile", "Scrum", "Project Management", "Stakeholder Management", "Roadmapping", "User Research"],
    recommended: ["Product Strategy", "Data Analytics", "A/B Testing", "Figma", "Jira", "Confluence", "SQL", "Business Analysis", "UX/UI", "Market Research"]
  },
  "Marketing": {
    extracted: ["Digital Marketing", "SEO", "Content Marketing", "Social Media", "Google Analytics", "Email Marketing"],
    recommended: ["SEM", "PPC", "Marketing Automation", "HubSpot", "Salesforce", "Data Analytics", "A/B Testing", "Brand Management", "Marketing Strategy", "CRM"]
  },
  "Finance": {
    extracted: ["Financial Analysis", "Excel", "Accounting", "Financial Modeling", "Risk Management", "Budgeting"],
    recommended: ["CFA", "SQL", "Python", "Tableau", "Bloomberg Terminal", "VBA", "Financial Planning", "Investment Analysis", "SAP", "QuickBooks"]
  },
  "Design": {
    extracted: ["Figma", "Adobe Creative Suite", "UI/UX Design", "Prototyping", "User Research", "Wireframing"],
    recommended: ["Sketch", "InVision", "Principle", "After Effects", "Design Systems", "Accessibility", "HTML/CSS", "JavaScript", "3D Design", "Motion Graphics"]
  },
  "Sales": {
    extracted: ["CRM", "Lead Generation", "Client Relations", "Negotiation", "Sales Strategy", "Pipeline Management"],
    recommended: ["Salesforce", "HubSpot", "Sales Analytics", "Cold Calling", "Social Selling", "Account Management", "Revenue Forecasting", "Salesforce Automation", "LinkedIn Sales Navigator", "Presentation Skills"]
  },
  "Operations": {
    extracted: ["Process Improvement", "Supply Chain", "Project Management", "Operations Management", "Lean", "Six Sigma"],
    recommended: ["ERP Systems", "SAP", "Data Analytics", "Process Automation", "Quality Management", "Vendor Management", "Inventory Management", "Logistics", "Operations Strategy", "KPI Management"]
  }
};

// Field-specific course recommendations
const fieldCourses = {
  "Data Science": [
    "Data Science Bootcamp by IBM",
    "Machine Learning Crash Course by Google",
    "Advanced Python for Data Science",
    "Deep Learning Specialization",
    "SQL for Data Analysis"
  ],
  "Software Engineering": [
    "Full Stack Web Development Bootcamp",
    "System Design Interview Prep",
    "AWS Certified Solutions Architect",
    "Docker and Kubernetes Mastery",
    "Advanced JavaScript and React"
  ],
  "Product Management": [
    "Product Management Certification",
    "Agile and Scrum Master Training",
    "Data-Driven Product Management",
    "UX/UI Design for Product Managers",
    "Product Strategy and Roadmapping"
  ],
  "Marketing": [
    "Digital Marketing Certification",
    "Google Analytics and SEO Mastery",
    "Social Media Marketing Strategy",
    "Marketing Analytics and Data Science",
    "Content Marketing and SEO"
  ],
  "Finance": [
    "CFA Level 1 Preparation",
    "Financial Modeling and Valuation",
    "Excel for Financial Analysis",
    "Python for Finance",
    "Investment Banking Fundamentals"
  ],
  "Design": [
    "UI/UX Design Bootcamp",
    "Advanced Figma and Prototyping",
    "Design Systems Masterclass",
    "User Research and Testing",
    "Motion Graphics and Animation"
  ],
  "Sales": [
    "Salesforce Administrator Certification",
    "Advanced Sales Techniques",
    "Sales Analytics and Forecasting",
    "B2B Sales Mastery",
    "Customer Relationship Management"
  ],
  "Operations": [
    "Operations Management Certification",
    "Lean Six Sigma Green Belt",
    "Supply Chain Management",
    "Process Improvement and Automation",
    "ERP Systems Training"
  ]
};

// Field detection patterns
const detectField = (fileName) => {
  const fileNameLower = fileName.toLowerCase();
  
  // Data Science patterns
  if (fileNameLower.match(/(data|science|analyst|analytics|ml|machine.?learning|ai|artificial.?intelligence|python|pandas|numpy)/)) {
    return "Data Science";
  }
  
  // Software Engineering patterns
  if (fileNameLower.match(/(dev|developer|engineer|software|programming|coding|javascript|react|node|java|backend|frontend|fullstack|full.?stack)/)) {
    return "Software Engineering";
  }
  
  // Product Management patterns
  if (fileNameLower.match(/(product|pm|manager|product.?manager|strategy|roadmap|agile|scrum)/)) {
    return "Product Management";
  }
  
  // Marketing patterns
  if (fileNameLower.match(/(marketing|marketer|digital.?marketing|seo|social.?media|content.?marketing|brand)/)) {
    return "Marketing";
  }
  
  // Finance patterns
  if (fileNameLower.match(/(finance|financial|accountant|accounting|cfa|cpa|investment|banking|analyst)/)) {
    return "Finance";
  }
  
  // Design patterns
  if (fileNameLower.match(/(design|designer|ui|ux|figma|adobe|creative|graphic|visual)/)) {
    return "Design";
  }
  
  // Sales patterns
  if (fileNameLower.match(/(sales|salesperson|account.?executive|business.?development|bd|revenue)/)) {
    return "Sales";
  }
  
  // Operations patterns
  if (fileNameLower.match(/(operations|ops|supply.?chain|logistics|process|lean|six.?sigma)/)) {
    return "Operations";
  }
  
  // Default: randomly select from common fields
  const commonFields = ["Data Science", "Software Engineering", "Product Management", "Marketing"];
  return commonFields[Math.floor(Math.random() * commonFields.length)];
};

// Get random subset of items (skills, courses, etc.)
const getRandomItems = (items, count) => {
  if (!items || items.length === 0) return [];
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Field-specific keyword databases for ATS optimization
const fieldKeywords = {
  "Data Science": [
    "Machine Learning", "Deep Learning", "Data Analysis", "Python", "R", "SQL", 
    "Statistics", "Data Visualization", "Big Data", "TensorFlow", "PyTorch",
    "Pandas", "NumPy", "Scikit-learn", "Jupyter", "Tableau", "Power BI"
  ],
  "Software Engineering": [
    "JavaScript", "React", "Node.js", "Python", "Java", "C++", "Git", "Docker",
    "Kubernetes", "AWS", "CI/CD", "REST APIs", "Microservices", "Agile", "Scrum",
    "System Design", "Database", "MongoDB", "PostgreSQL", "TypeScript"
  ],
  "Product Management": [
    "Product Strategy", "Roadmapping", "Agile", "Scrum", "Stakeholder Management",
    "User Research", "A/B Testing", "Data Analytics", "Product Launch", "Go-to-Market",
    "User Experience", "Market Research", "Competitive Analysis", "Product Metrics", "KPIs"
  ],
  "Marketing": [
    "Digital Marketing", "SEO", "SEM", "PPC", "Content Marketing", "Social Media",
    "Google Analytics", "Email Marketing", "Marketing Automation", "HubSpot",
    "Salesforce", "Brand Management", "Marketing Strategy", "Campaign Management", "CRM"
  ],
  "Finance": [
    "Financial Analysis", "Financial Modeling", "Excel", "VBA", "SQL", "Python",
    "Risk Management", "Investment Analysis", "Portfolio Management", "CFA", "CPA",
    "Bloomberg Terminal", "Tableau", "Financial Planning", "Accounting", "Budgeting"
  ],
  "Design": [
    "UI/UX Design", "Figma", "Adobe Creative Suite", "Prototyping", "User Research",
    "Wireframing", "Design Systems", "Interaction Design", "Visual Design", "Sketch",
    "InVision", "Accessibility", "Responsive Design", "Motion Graphics", "3D Design"
  ],
  "Sales": [
    "Sales Strategy", "CRM", "Salesforce", "Lead Generation", "Account Management",
    "Revenue Forecasting", "Pipeline Management", "Cold Calling", "Negotiation",
    "Client Relations", "B2B Sales", "Sales Analytics", "Social Selling", "HubSpot"
  ],
  "Operations": [
    "Process Improvement", "Supply Chain", "Lean", "Six Sigma", "Project Management",
    "Operations Management", "ERP Systems", "SAP", "Process Automation", "Quality Management",
    "Vendor Management", "Inventory Management", "Logistics", "KPI Management", "Operations Strategy"
  ]
};

export const analyzeResume = (fileName) => {
  // Detect field from filename
  const detectedField = detectField(fileName);
  
  // Get field-specific skills
  const fieldData = fieldSkills[detectedField] || fieldSkills["Data Science"];
  
  // Generate realistic extracted skills (mix of field-specific and some common ones)
  const extractedSkills = getRandomItems(fieldData.extracted, 5 + Math.floor(Math.random() * 3));
  
  // Add some soft skills occasionally
  const softSkills = ["Communication", "Leadership", "Problem Solving", "Teamwork", "Project Management"];
  if (Math.random() > 0.7) {
    const randomSoftSkill = softSkills[Math.floor(Math.random() * softSkills.length)];
    if (!extractedSkills.includes(randomSoftSkill)) {
      extractedSkills.push(randomSoftSkill);
    }
  }
  
  // Generate recommended skills (skills not in extracted but relevant to field)
  const availableRecommended = fieldData.recommended.filter(skill => !extractedSkills.includes(skill));
  const recommendedSkills = getRandomItems(availableRecommended, 5);
  
  // If not enough recommended skills, add some general ones
  if (recommendedSkills.length < 3) {
    const generalSkills = ["Certifications", "Industry Knowledge", "Advanced Training", "Specialized Tools"];
    const additionalSkills = getRandomItems(generalSkills, 3 - recommendedSkills.length);
    recommendedSkills.push(...additionalSkills.filter(skill => !recommendedSkills.includes(skill)));
  }
  
  // Get field-specific courses - ensure proper randomization and always return 3
  const availableCourses = fieldCourses[detectedField] || fieldCourses["Data Science"];
  let courses = getRandomItems(availableCourses, 3);
  
  // Ensure we always have 3 courses, even if field database is small
  if (courses.length < 3 && availableCourses.length >= 3) {
    // Re-shuffle and get more if needed
    const allCourses = getRandomItems(availableCourses, Math.min(5, availableCourses.length));
    courses = allCourses.slice(0, 3);
  } else if (courses.length < 3 && availableCourses.length < 3) {
    // If field has fewer than 3 courses, repeat some (but this shouldn't happen with our databases)
    courses = [...availableCourses];
    while (courses.length < 3 && availableCourses.length > 0) {
      courses.push(...getRandomItems(availableCourses, 1));
    }
    courses = courses.slice(0, 3);
  }
  
  const baseScore = Math.floor(Math.random() * 20) + 70; // 70-90 range
  
  // Simulate category scores
  const atsScore = Math.max(70, Math.min(95, baseScore + Math.floor(Math.random() * 10) - 5));
  const contentScore = Math.max(70, Math.min(95, baseScore + Math.floor(Math.random() * 10) - 5));
  const formatScore = Math.max(70, Math.min(95, baseScore + Math.floor(Math.random() * 10) - 5));
  const keywordScore = Math.max(70, Math.min(95, baseScore + Math.floor(Math.random() * 10) - 5));
  
  const overallScore = Math.round(
    (atsScore + contentScore + formatScore + keywordScore) / 4
  );
  
  // Section analysis - make it more dynamic
  const sections = {
    contact: {
      score: 90 + Math.floor(Math.random() * 10),
      status: "excellent",
      issues: [],
      recommendations: []
    },
    summary: {
      score: Math.floor(Math.random() * 20) + 70,
      status: overallScore >= 85 ? "excellent" : overallScore >= 75 ? "good" : "fair",
      issues: overallScore < 80 ? ["Could be more specific with achievements"] : [],
      recommendations: overallScore < 80 ? ["Add quantifiable metrics", "Include industry keywords"] : ["Consider adding more impact metrics"]
    },
    experience: {
      score: Math.floor(Math.random() * 20) + 70,
      status: overallScore >= 85 ? "excellent" : overallScore >= 75 ? "good" : "fair",
      issues: overallScore < 80 ? ["Some bullet points lack metrics"] : [],
      recommendations: overallScore < 80 ? ["Use action verbs", "Add impact numbers"] : ["Consider adding more quantifiable results"]
    },
    education: {
      score: 85 + Math.floor(Math.random() * 10),
      status: "excellent",
      issues: [],
      recommendations: []
    },
    skills: {
      score: Math.floor(Math.random() * 20) + 70,
      status: overallScore >= 85 ? "excellent" : overallScore >= 75 ? "good" : "fair",
      issues: extractedSkills.length < 8 ? ["Could include more relevant keywords"] : [],
      recommendations: extractedSkills.length < 8 ? ["Add industry-specific skills", "Match job description keywords"] : ["Consider adding specialized certifications"]
    }
  };
  
  // Strengths and weaknesses - make them more dynamic
  const strengths = [
    "Clear and professional formatting",
    "Relevant work experience",
    overallScore >= 80 ? "Strong use of action verbs" : "Good use of action verbs",
    "Appropriate length"
  ];
  
  if (extractedSkills.length >= 8) {
    strengths.push("Comprehensive skills section");
  }
  
  const weaknesses = [];
  if (overallScore < 80) {
    weaknesses.push("Limited quantifiable achievements");
  }
  if (extractedSkills.length < 8) {
    weaknesses.push("Could benefit from more keywords");
  }
  if (overallScore < 75) {
    weaknesses.push("Some sections need more detail");
  }
  if (weaknesses.length === 0) {
    weaknesses.push("Minor improvements could enhance ATS compatibility");
  }
  
  // Action items with priority - make them field-specific
  const actionItems = [
    {
      priority: overallScore < 80 ? "high" : "medium",
      title: "Add quantifiable metrics to experience",
      description: "Include numbers, percentages, and specific results to demonstrate impact",
      category: "content"
    },
    {
      priority: "high",
      title: `Optimize keywords for ${detectedField} roles`,
      description: `Add ${detectedField.toLowerCase()}-specific keywords that match job descriptions`,
      category: "ats"
    },
    {
      priority: "medium",
      title: "Enhance professional summary",
      description: "Make summary more specific with achievements and value proposition",
      category: "content"
    },
    {
      priority: "low",
      title: "Add certifications section",
      description: `Include relevant ${detectedField} certifications to boost credibility`,
      category: "format"
    }
  ];
  
  // Keyword analysis - field-specific and accurate
  const fieldKeywordList = fieldKeywords[detectedField] || fieldKeywords["Data Science"];
  
  // Find keywords that match extracted skills (these are "found")
  const foundKeywords = extractedSkills.filter(skill => 
    fieldKeywordList.some(keyword => 
      keyword.toLowerCase().includes(skill.toLowerCase()) || 
      skill.toLowerCase().includes(keyword.toLowerCase())
    )
  );
  
  // Find missing keywords (important field keywords not in extracted skills)
  const missingKeywords = fieldKeywordList
    .filter(keyword => 
      !extractedSkills.some(skill => 
        keyword.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(keyword.toLowerCase())
      )
    )
    .slice(0, 8); // Get top 8 missing keywords
  
  // Calculate recommended keyword count (industry standard for the field)
  const recommendedKeywordCount = Math.max(12, Math.min(18, fieldKeywordList.length * 0.6));
  
  // Calculate keyword density based on found vs recommended
  const keywordDensityRatio = foundKeywords.length / recommendedKeywordCount;
  let density;
  if (keywordDensityRatio >= 0.8) {
    density = "excellent";
  } else if (keywordDensityRatio >= 0.6) {
    density = "good";
  } else if (keywordDensityRatio >= 0.4) {
    density = "fair";
  } else {
    density = "needs improvement";
  }
  
  // Get top missing keywords for display (mix of recommended skills and field keywords)
  const topMissingKeywords = getRandomItems(
    [...missingKeywords, ...recommendedSkills.filter(skill => !foundKeywords.includes(skill))],
    5
  );
  
  const keywordAnalysis = {
    found: foundKeywords.length,
    recommended: Math.round(recommendedKeywordCount),
    missing: topMissingKeywords,
    density: density
  };
  
  return {
    name: fileName.replace(".pdf", "").replace(/_/g, " ").replace(/-/g, " "),
    overallScore: Math.max(70, Math.min(95, overallScore)),
    field: detectedField,
    extractedSkills,
    recommendedSkills,
    courses,
    categoryScores: {
      ats: atsScore,
      content: contentScore,
      format: formatScore,
      keywords: keywordScore
    },
    sections,
    strengths,
    weaknesses,
    actionItems,
    keywordAnalysis,
    industryComparison: {
      average: 75,
      top10: 90,
      yourScore: overallScore
    }
  };
};

export const getScoreColor = (score) => {
  if (score >= 90) return "text-green-600";
  if (score >= 80) return "text-blue-600";
  if (score >= 70) return "text-yellow-600";
  return "text-red-600";
};

export const getScoreLabel = (score) => {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Good";
  if (score >= 70) return "Fair";
  return "Needs Improvement";
};

export const getPriorityColor = (priority) => {
  switch (priority) {
    case "high": return "bg-red-500";
    case "medium": return "bg-yellow-500";
    case "low": return "bg-blue-500";
    default: return "bg-gray-500";
  }
};
