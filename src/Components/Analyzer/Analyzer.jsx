import React, { useState } from "react";
import {
  UploadCloud,
  Loader2,
  FileText,
  Brain,
  ListChecks,
  Star,
  GraduationCap,
} from "lucide-react";

const Analyzer = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAnalyze = () => {
    if (!file) return alert("Please upload your resume first!");
    setIsLoading(true);
    setResult(null);

    // Simulate analysis delay
    setTimeout(() => {
      setResult({
        name: file.name.replace(".pdf", ""),
        score: 82,
        field: "Data Science",
        extractedSkills: ["Python", "Pandas", "Machine Learning"],
        recommendedSkills: ["TensorFlow", "SQL", "Data Visualization"],
        courses: [
          "Data Science Bootcamp by IBM",
          "Machine Learning Crash Course",
        ],
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="py-16 px-6">
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-10">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-blue-800 border-b-4 border-blue-500 pb-2 mb-8">
        Smart Resume Analyzer
      </h1>

      {/* Upload Section */}
      <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 max-w-3xl mx-auto">
        <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
          <UploadCloud className="w-6 h-6 text-blue-600 mr-2" />
          Choose Your Resume (PDF Only)
        </label>

        <div className="flex items-center gap-3">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
          />
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className={`px-5 py-2 rounded-lg font-semibold text-white shadow-md transition duration-300 ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin w-5 h-5" /> Analyzing...
              </span>
            ) : (
              "Analyze"
            )}
          </button>
        </div>

        {file && (
          <p className="mt-3 text-sm text-gray-600">📄 {file.name}</p>
        )}
      </div>

      {/* Results Section */}
      {result && (
        <div className="max-w-3xl mx-auto mt-10 space-y-6 animate-fadeIn">
          {/* Score */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">
                {result.name}'s Resume Score
              </h2>
            </div>
            <div className="text-5xl font-extrabold text-blue-700">
              {result.score}
              <span className="text-gray-500 text-2xl"> / 100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${result.score}%` }}
              ></div>
            </div>
          </div>

          {/* Predicted Field */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-bold text-gray-800">
                Predicted Job Field
              </h3>
            </div>
            <p className="inline-block bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-full text-lg shadow-sm">
              {result.field}
            </p>
          </div>

          {/* Skills */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <ListChecks className="w-6 h-6 text-yellow-600" />
                <h3 className="text-lg font-bold text-gray-800">
                  Extracted Skills
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {result.extractedSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-bold text-gray-800">
                  Recommended Skills
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {result.recommendedSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Courses */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-6 h-6 text-indigo-600" />
              <h3 className="text-lg font-bold text-gray-800">
                Recommended Courses
              </h3>
            </div>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              {result.courses.map((course, i) => (
                <li key={i}>{course}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Analyzer;
