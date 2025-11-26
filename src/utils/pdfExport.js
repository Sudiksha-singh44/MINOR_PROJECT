import jsPDF from 'jspdf';

/**
 * Generates a PDF report from resume analysis results
 * @param {Object} result - The analysis result object
 * @param {string} fileName - Original file name
 */
export const generatePDFReport = (result, fileName = 'resume') => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;
  const lineHeight = 7;
  const sectionSpacing = 10;

  // Helper function to add a new page if needed
  const checkPageBreak = (requiredSpace = 20) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Helper function to add text with word wrap
  const addText = (text, fontSize = 12, isBold = false, color = [0, 0, 0]) => {
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);
    if (isBold) {
      doc.setFont(undefined, 'bold');
    } else {
      doc.setFont(undefined, 'normal');
    }
    
    const maxWidth = pageWidth - (margin * 2);
    const lines = doc.splitTextToSize(text, maxWidth);
    
    lines.forEach((line) => {
      checkPageBreak(lineHeight);
      doc.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
    
    doc.setFont(undefined, 'normal');
  };

  // Helper function to add a section header
  const addSectionHeader = (title, color = [0, 0, 0]) => {
    checkPageBreak(15);
    yPosition += 5;
    addText(title, 16, true, color);
    yPosition += 3;
    // Add underline
    doc.setDrawColor(color[0], color[1], color[2]);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += sectionSpacing;
  };

  // Title Page
  doc.setFillColor(79, 70, 229); // Primary color
  doc.rect(0, 0, pageWidth, 60, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont(undefined, 'bold');
  doc.text('Resume Analysis Report', pageWidth / 2, 30, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont(undefined, 'normal');
  doc.text(`Generated for: ${result.name}`, pageWidth / 2, 45, { align: 'center' });
  
  yPosition = 80;
  doc.setTextColor(0, 0, 0);

  // Overall Score Section
  addSectionHeader('Overall Resume Score', [79, 70, 229]);
  
  const scoreColor = 
    result.overallScore >= 90 ? [34, 197, 94] :
    result.overallScore >= 80 ? [59, 130, 246] :
    result.overallScore >= 70 ? [234, 179, 8] : [239, 68, 68];
  
  doc.setFontSize(48);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  const scoreText = `${result.overallScore}/100`;
  const scoreWidth = doc.getTextWidth(scoreText);
  doc.text(scoreText, (pageWidth - scoreWidth) / 2, yPosition);
  yPosition += 15;
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  const scoreLabel = 
    result.overallScore >= 90 ? 'Excellent' :
    result.overallScore >= 80 ? 'Good' :
    result.overallScore >= 70 ? 'Fair' : 'Needs Improvement';
  addText(`Rating: ${scoreLabel}`, 12, false, [100, 100, 100]);
  yPosition += sectionSpacing;

  // Category Scores
  addSectionHeader('Score Breakdown by Category', [79, 70, 229]);
  
  Object.entries(result.categoryScores).forEach(([category, score]) => {
    checkPageBreak(15);
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    addText(`${categoryName}: ${score}/100`, 12, true);
    
    // Progress bar representation
    const barWidth = pageWidth - (margin * 2);
    const barHeight = 5;
    const filledWidth = (score / 100) * barWidth;
    
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(200, 200, 200);
    doc.rect(margin, yPosition, barWidth, barHeight, 'FD');
    
    const barColor = 
      score >= 90 ? [34, 197, 94] :
      score >= 80 ? [59, 130, 246] :
      score >= 70 ? [234, 179, 8] : [239, 68, 68];
    doc.setFillColor(barColor[0], barColor[1], barColor[2]);
    doc.rect(margin, yPosition, filledWidth, barHeight, 'F');
    
    yPosition += barHeight + 5;
  });
  yPosition += sectionSpacing;

  // Strengths
  addSectionHeader('Strengths', [34, 197, 94]);
  result.strengths.forEach((strength) => {
    addText(`• ${strength}`, 11);
  });
  yPosition += sectionSpacing;

  // Areas for Improvement
  addSectionHeader('Areas for Improvement', [234, 179, 8]);
  result.weaknesses.forEach((weakness) => {
    addText(`• ${weakness}`, 11);
  });
  yPosition += sectionSpacing;

  // Action Items
  addSectionHeader('Action Items', [59, 130, 246]);
  result.actionItems.forEach((item, index) => {
    checkPageBreak(20);
    addText(`${index + 1}. ${item.title} [${item.priority.toUpperCase()}]`, 11, true);
    addText(`   ${item.description}`, 10, false, [100, 100, 100]);
    yPosition += 3;
  });
  yPosition += sectionSpacing;

  // Section-by-Section Analysis
  addSectionHeader('Section-by-Section Analysis', [79, 70, 229]);
  Object.entries(result.sections).forEach(([section, data]) => {
    checkPageBreak(30);
    const sectionName = section.charAt(0).toUpperCase() + section.slice(1);
    addText(`${sectionName} - Score: ${data.score}/100 (${data.status})`, 12, true);
    
    if (data.issues.length > 0) {
      addText('Issues:', 10, true, [234, 179, 8]);
      data.issues.forEach((issue) => {
        addText(`  • ${issue}`, 10);
      });
    }
    
    if (data.recommendations.length > 0) {
      addText('Recommendations:', 10, true, [59, 130, 246]);
      data.recommendations.forEach((rec) => {
        addText(`  • ${rec}`, 10);
      });
    }
    yPosition += 5;
  });
  yPosition += sectionSpacing;

  // Predicted Field
  addSectionHeader('Predicted Job Field', [34, 197, 94]);
  addText(result.field, 14, true, [79, 70, 229]);
  yPosition += sectionSpacing;

  // Skills
  addSectionHeader('Skills Analysis', [79, 70, 229]);
  
  addText('Extracted Skills:', 12, true);
  const skillsText = result.extractedSkills.join(', ');
  addText(skillsText, 10);
  yPosition += 5;
  
  addText('Recommended Skills:', 12, true);
  const recommendedSkillsText = result.recommendedSkills.join(', ');
  addText(recommendedSkillsText, 10);
  yPosition += sectionSpacing;

  // Keyword Analysis
  addSectionHeader('Keyword Analysis', [79, 70, 229]);
  addText(`Keywords Found: ${result.keywordAnalysis.found}`, 11, true);
  addText(`Recommended: ${result.keywordAnalysis.recommended}`, 11, true);
  addText(`Density: ${result.keywordAnalysis.density}`, 11, true);
  
  if (result.keywordAnalysis.missing.length > 0) {
    yPosition += 3;
    addText('Missing Keywords:', 10, true, [234, 179, 8]);
    const missingKeywordsText = result.keywordAnalysis.missing.join(', ');
    addText(missingKeywordsText, 10);
  }
  yPosition += sectionSpacing;

  // Recommended Courses
  addSectionHeader('Recommended Courses', [99, 102, 241]);
  result.courses.forEach((course, index) => {
    addText(`${index + 1}. ${course}`, 11);
  });
  yPosition += sectionSpacing;

  // Industry Comparison
  addSectionHeader('Industry Comparison', [79, 70, 229]);
  addText(`Your Score: ${result.industryComparison.yourScore}/100`, 12, true);
  addText(`Industry Average: ${result.industryComparison.average}/100`, 11);
  addText(`Top 10%: ${result.industryComparison.top10}/100`, 11);

  // Footer on last page
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${totalPages} | Generated on ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  const sanitizedFileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  doc.save(`resume_analysis_${sanitizedFileName}_${Date.now()}.pdf`);
};

