import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  Loader2,
  FileText,
  Brain,
  ListChecks,
  Star,
  GraduationCap,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Target,
  AlertTriangle,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Award,
  Lightbulb,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Badge } from "@/Components/ui/badge";
import { Progress } from "@/Components/ui/progress";
import { AnalyzerSkeleton } from "@/Components/loading-skeleton";
import { validateFile, formatFileSize } from "../../utils/errorHandler";
import { analyzeResume, getScoreColor, getScoreLabel, getPriorityColor } from "../../utils/analyzerUtils";
import { generatePDFReport } from "../../utils/pdfExport";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const Analyzer = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError(null);
    
    if (!selectedFile) {
      setFile(null);
      return;
    }
    
    const validation = validateFile(selectedFile);
    if (!validation.isValid) {
      setError(validation.error);
      toast.error(validation.error);
      e.target.value = "";
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
    toast.success("File uploaded successfully!");
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setError(null);
      
      const validation = validateFile(selectedFile);
      if (!validation.isValid) {
        setError(validation.error);
        toast.error(validation.error);
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      toast.success("File uploaded successfully!");
    }
  };

  const handleAnalyze = () => {
    if (!file) {
      const errorMsg = "Please upload your resume first!";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }
    
    setError(null);
    setIsLoading(true);
    setResult(null);
    setProgress(0);
    setExpandedSections({});
    toast.info("Analyzing your resume...", { duration: 2000 });

    // Simulate realistic analysis stages
    const stages = [
      { name: "Parsing PDF", progress: 20 },
      { name: "Extracting text", progress: 40 },
      { name: "Analyzing content", progress: 60 },
      { name: "Checking ATS compliance", progress: 80 },
      { name: "Generating insights", progress: 95 },
    ];

    let currentStage = 0;
    const progressInterval = setInterval(() => {
      if (currentStage < stages.length) {
        setProgress(stages[currentStage].progress);
        currentStage++;
      } else {
        clearInterval(progressInterval);
      }
    }, 400);

    setTimeout(() => {
      setProgress(100);
      const analysisResult = analyzeResume(file.name);
      setResult(analysisResult);
      setIsLoading(false);
      toast.success("Analysis complete! 🎉");
      clearInterval(progressInterval);
    }, 2000);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleExport = () => {
    if (!result) {
      toast.error("No results to export. Please analyze a resume first.");
      return;
    }
    
    try {
      toast.info("Generating PDF report...", { duration: 2000 });
      generatePDFReport(result, file?.name || "resume");
      toast.success("PDF report downloaded successfully! 🎉");
    } catch {
      // Log error for debugging (in production, consider using error tracking service)
      // Error is caught and user is notified via toast
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Resume Analysis Results",
        text: `My resume scored ${result.overallScore}/100! Check it out.`,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  // Prepare chart data
  const categoryChartData = result ? [
    { name: "ATS", score: result.categoryScores.ats },
    { name: "Content", score: result.categoryScores.content },
    { name: "Format", score: result.categoryScores.format },
    { name: "Keywords", score: result.categoryScores.keywords },
  ] : [];

  // Radar chart data (currently not used but kept for future use)
  // const radarData = result ? [
  //   { category: "ATS", score: result.categoryScores.ats, fullMark: 100 },
  //   { category: "Content", score: result.categoryScores.content, fullMark: 100 },
  //   { category: "Format", score: result.categoryScores.format, fullMark: 100 },
  //   { category: "Keywords", score: result.categoryScores.keywords, fullMark: 100 },
  // ] : [];

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
    <section id="analyzer" className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Smart Resume Analyzer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your resume and get comprehensive AI-powered analysis with actionable insights
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UploadCloud className="w-6 h-6 text-primary" />
                Upload Your Resume
              </CardTitle>
              <CardDescription>
                Supported format: PDF (Max size: 5MB)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Drag and Drop Area */}
              <motion.div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50"
                }`}
              >
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="file-upload"
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <motion.div
                    animate={dragActive ? { scale: 1.1 } : { scale: 1 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <UploadCloud className="w-12 h-12 text-primary" />
                    <div>
                      <p className="text-lg font-semibold">
                        {file ? file.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        PDF files only
                      </p>
                    </div>
                  </motion.div>
                </Label>
              </motion.div>

              {/* File Info */}
              <AnimatePresence>
                {file && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Analyze Button */}
              <Button
                onClick={handleAnalyze}
                disabled={isLoading || !file}
                size="lg"
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Analyze Resume
                  </>
                )}
              </Button>

              {/* Progress Bar */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4"
                >
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    {progress}% complete
                  </p>
                </motion.div>
              )}

              {/* Loading Skeleton */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6"
                >
                  <AnalyzerSkeleton />
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-6xl mx-auto mt-12 space-y-6"
            >
              {/* Overall Score Card */}
              <motion.div variants={itemVariants}>
                <Card className="overflow-hidden border-2">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-500/10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-lg">
                          <TrendingUp className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>{result.name}'s Resume Score</CardTitle>
                          <CardDescription>Overall ATS compatibility & quality</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" onClick={handleExport}>
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleShare}>
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="text-center"
                      >
                        <div className={`text-6xl font-extrabold ${getScoreColor(result.overallScore)}`}>
                          {result.overallScore}
                          <span className="text-2xl text-muted-foreground">/100</span>
                        </div>
                        <Badge variant="secondary" className="mt-2 text-lg px-4 py-1">
                          {getScoreLabel(result.overallScore)}
                        </Badge>
                      </motion.div>
                      <div className="flex-1 max-w-md">
                        <div className="w-full bg-secondary rounded-full h-4 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.overallScore}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className={`h-full rounded-full ${
                              result.overallScore >= 90 ? "bg-green-500" :
                              result.overallScore >= 80 ? "bg-blue-500" :
                              result.overallScore >= 70 ? "bg-yellow-500" : "bg-red-500"
                            }`}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-2">
                          <span>Industry Avg: {result.industryComparison.average}</span>
                          <span>Top 10%: {result.industryComparison.top10}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Category Scores Chart */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-6 h-6 text-primary" />
                      <div>
                        <CardTitle>Score Breakdown by Category</CardTitle>
                        <CardDescription>Detailed analysis across key areas</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={categoryChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Bar dataKey="score" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Category Scores Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(result.categoryScores).map(([category, score]) => (
                  <motion.div
                    key={category}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-2 capitalize">{category}</p>
                          <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
                            {score}
                          </div>
                          <Progress value={score} className="mt-2 h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <Card className="border-green-500/20">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                          <Award className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <CardTitle>Strengths</CardTitle>
                          <CardDescription>What's working well</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.strengths.map((strength, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-2"
                          >
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{strength}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="border-yellow-500/20">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-500/20 rounded-lg">
                          <AlertTriangle className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                          <CardTitle>Areas for Improvement</CardTitle>
                          <CardDescription>Opportunities to enhance</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.weaknesses.map((weakness, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-2"
                          >
                            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{weakness}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Action Items */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Target className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle>Action Items</CardTitle>
                        <CardDescription>Prioritized recommendations to improve your resume</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {result.actionItems.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-3 h-3 rounded-full ${getPriorityColor(item.priority)} mt-1.5 flex-shrink-0`} />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold">{item.title}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {item.priority}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Section Analysis */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <ListChecks className="w-6 h-6 text-primary" />
                      <div>
                        <CardTitle>Section-by-Section Analysis</CardTitle>
                        <CardDescription>Detailed breakdown of each resume section</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(result.sections).map(([section, data]) => (
                        <div
                          key={section}
                          className="border rounded-lg overflow-hidden"
                        >
                          <button
                            onClick={() => toggleSection(section)}
                            className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${
                                data.score >= 90 ? "bg-green-500" :
                                data.score >= 80 ? "bg-blue-500" :
                                data.score >= 70 ? "bg-yellow-500" : "bg-red-500"
                              }`} />
                              <div className="text-left">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold capitalize">{section}</span>
                                  <Badge variant="outline">{data.score}/100</Badge>
                                  <Badge variant="secondary" className="capitalize">{data.status}</Badge>
                                </div>
                              </div>
                            </div>
                            {expandedSections[section] ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>
                          <AnimatePresence>
                            {expandedSections[section] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-4 pb-4 space-y-2"
                              >
                                {data.issues.length > 0 && (
                                  <div>
                                    <p className="text-sm font-medium text-yellow-600 mb-1">Issues:</p>
                                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                                      {data.issues.map((issue, i) => (
                                        <li key={i} className="list-disc">{issue}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {data.recommendations.length > 0 && (
                                  <div>
                                    <p className="text-sm font-medium text-blue-600 mb-1">Recommendations:</p>
                                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                                      {data.recommendations.map((rec, i) => (
                                        <li key={i} className="list-disc">{rec}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Predicted Field */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <Brain className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle>Predicted Job Field</CardTitle>
                        <CardDescription>AI-powered field prediction based on your resume</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      {result.field}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Skills Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-500/20 rounded-lg">
                          <ListChecks className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                          <CardTitle>Extracted Skills</CardTitle>
                          <CardDescription>Skills found in your resume ({result.extractedSkills.length})</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {result.extractedSkills.map((skill, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Badge variant="outline" className="text-sm px-3 py-1">
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                          <Star className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <CardTitle>Recommended Skills</CardTitle>
                          <CardDescription>Skills to boost your profile</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {result.recommendedSkills.map((skill, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Badge className="text-sm px-3 py-1">
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Keyword Analysis */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Zap className="w-6 h-6 text-primary" />
                      <div>
                        <CardTitle>Keyword Analysis</CardTitle>
                        <CardDescription>ATS keyword optimization insights</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-secondary/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{result.keywordAnalysis.found}</div>
                        <div className="text-sm text-muted-foreground">Keywords Found</div>
                      </div>
                      <div className="text-center p-4 bg-secondary/50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{result.keywordAnalysis.recommended}</div>
                        <div className="text-sm text-muted-foreground">Recommended</div>
                      </div>
                      <div className="text-center p-4 bg-secondary/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 capitalize">{result.keywordAnalysis.density}</div>
                        <div className="text-sm text-muted-foreground">Density</div>
                      </div>
                    </div>
                    {result.keywordAnalysis.missing.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Missing Keywords:</p>
                        <div className="flex flex-wrap gap-2">
                          {result.keywordAnalysis.missing.map((keyword, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Courses */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-500/20 rounded-lg">
                        <GraduationCap className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <CardTitle>Recommended Courses</CardTitle>
                        <CardDescription>Enhance your skills with these courses</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {result.courses.map((course, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                        >
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                          <span>{course}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Analyzer;
