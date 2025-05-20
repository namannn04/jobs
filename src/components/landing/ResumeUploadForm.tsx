"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent } from "../main _ui/card"
import { Button } from "../main _ui/button"
import { Progress } from "../main _ui/progress"
import { Upload, FileText, Search, ArrowLeft, CheckCircle, AlertCircle, Briefcase } from "lucide-react"
import { Badge } from "../main _ui/badge"
import { Skeleton } from "../main _ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../main _ui/tabs"

interface Job {
  title: string
  company: string
  location: string
  salary: string
  experience: string
  skills: string[]
  match?: number
}

const ResumeUploadForm = () => {
  const [file, setFile] = useState<File | null>(null)
  const [step, setStep] = useState<"upload" | "analyzing" | "score" | "jobs">("upload")
  const [score, setScore] = useState<number | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      startAnalysis()
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      startAnalysis()
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const startAnalysis = () => {
    setStep("analyzing")
    setAnalysisProgress(0)

    // Simulate progress updates
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 300)

    setTimeout(() => {
      clearInterval(interval)
      setAnalysisProgress(100)

      setTimeout(() => {
        const generatedScore = Math.floor(Math.random() * 61) + 40
        setScore(generatedScore)
        setStep("score")
      }, 500)
    }, 3500)
  }

  const handleJobSearch = () => {
    setStep("jobs")
    setJobs([])

    setTimeout(() => {
      const mockJobs: Job[] = [
        {
          title: "Frontend Developer",
          company: "Google",
          location: "Bangalore, India",
          salary: "₹12-18 LPA",
          experience: "2-4 years",
          skills: ["React", "TypeScript", "HTML", "CSS"],
          match: 92,
        },
        {
          title: "Backend Engineer",
          company: "Amazon",
          location: "Hyderabad, India",
          salary: "₹15-20 LPA",
          experience: "3+ years",
          skills: ["Node.js", "Express", "MongoDB"],
          match: 85,
        },
        {
          title: "Full Stack Developer",
          company: "Flipkart",
          location: "Remote",
          salary: "₹10-14 LPA",
          experience: "2+ years",
          skills: ["React", "Node.js", "PostgreSQL"],
          match: 78,
        },
        {
          title: "Software Engineer",
          company: "Microsoft",
          location: "Noida, India",
          salary: "₹14-22 LPA",
          experience: "3-5 years",
          skills: [".NET", "C#", "Azure"],
          match: 72,
        },
        {
          title: "AI Engineer",
          company: "TCS",
          location: "Pune, India",
          salary: "₹8-12 LPA",
          experience: "1-3 years",
          skills: ["Python", "TensorFlow", "NLP"],
          match: 68,
        },
        {
          title: "DevOps Engineer",
          company: "Infosys",
          location: "Chennai, India",
          salary: "₹10-16 LPA",
          experience: "2-4 years",
          skills: ["Docker", "Kubernetes", "AWS"],
          match: 65,
        },
        {
          title: "QA Analyst",
          company: "Cognizant",
          location: "Kolkata, India",
          salary: "₹6-10 LPA",
          experience: "1-2 years",
          skills: ["Selenium", "JIRA", "Postman"],
          match: 60,
        },
      ]

      setJobs(mockJobs)
    }, 2000)
  }

  const handleBackToScore = () => {
    setStep("score")
  }

  const getScoreColor = (score: number) => {
    if (score < 50) return "text-red-600"
    if (score < 70) return "text-yellow-600"
    return "text-green-600"
  }

  const getScoreRing = (score: number) => {
    if (score < 50) return "text-red-500"
    if (score < 70) return "text-yellow-500"
    return "text-green-500"
  }

  const getMatchBadgeColor = (match: number) => {
    if (match < 65) return "bg-red-50 text-red-700 border-red-200"
    if (match < 80) return "bg-yellow-50 text-yellow-700 border-yellow-200"
    return "bg-green-50 text-green-700 border-green-200"
  }

  const renderScoreDetails = () => {
    if (!score) return null

    const details = [
      {
        label: "Format",
        value: score > 60 ? "Good" : "Needs Improvement",
        icon:
          score > 60 ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          ),
      },
      {
        label: "Keywords",
        value: score > 70 ? "Excellent" : "Good",
        icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      },
      {
        label: "Readability",
        value: score > 50 ? "Average" : "Poor",
        icon:
          score > 50 ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          ),
      },
    ]

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        {details.map((detail, index) => (
          <div key={index} className="bg-blue-50 p-4 rounded-lg flex items-center">
            <div className="mr-3">{detail.icon}</div>
            <div>
              <p className="text-sm text-gray-600">{detail.label}</p>
              <p className="font-semibold text-blue-900">{detail.value}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Card className="shadow-lg border-blue-100 overflow-hidden">
      <CardContent className="p-0">
        {step === "upload" && (
          <div className="p-6 md:p-8">
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-blue-200 rounded-lg p-6 md:p-10 text-center cursor-pointer hover:border-blue-500 transition-colors bg-blue-50/50"
              onClick={triggerFileInput}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <Upload className="h-10 w-10 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-blue-900">Upload Your Resume</h3>
                  <p className="text-gray-600 mt-2">Drag and drop your resume here, or click to select</p>
                  <p className="text-sm text-gray-500 mt-1">Supported formats: PDF, DOC, DOCX</p>
                </div>
                <Button
                  className="mt-4 bg-blue-900 hover:bg-blue-800"
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    triggerFileInput()
                  }}
                >
                  <FileText className="mr-2 h-4 w-4" /> Select File
                </Button>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h4 className="font-medium text-blue-900 mb-2">Why use our ATS Resume Analyzer?</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>Get instant feedback on your resume's ATS compatibility</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>Find jobs that match your skills and experience</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>Improve your chances of getting past automated screening systems</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {step === "analyzing" && (
          <div className="p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-blue-900 mb-2">Analyzing your resume...</h2>
              <p className="text-gray-600">This will only take a moment</p>
            </div>

            <div className="space-y-6 max-w-md mx-auto">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-blue-700 font-medium">{Math.round(analysisProgress)}%</span>
                </div>
                <Progress value={analysisProgress} className="h-2" />
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <p className="text-sm text-gray-700">
                  We're scanning your resume for keywords, formatting, and ATS compatibility
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Scanning document", done: analysisProgress > 20 },
                  { label: "Extracting content", done: analysisProgress > 40 },
                  { label: "Analyzing keywords", done: analysisProgress > 60 },
                  { label: "Checking formatting", done: analysisProgress > 80 },
                  { label: "Generating score", done: analysisProgress >= 100 },
                ].map((step, index) => (
                  <div key={index} className="flex items-center">
                    {step.done ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-gray-300 mr-3" />
                    )}
                    <span className={`text-sm ${step.done ? "text-gray-900" : "text-gray-500"}`}>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === "score" && score !== null && (
          <div className="p-6 md:p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-2">ATS Resume Score</h2>
              <p className="text-gray-600 text-sm">Based on industry standards and keyword optimization</p>
            </div>

            <div className="flex justify-center mb-8">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className={getScoreRing(score)}
                    strokeWidth="10"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    strokeDasharray={`${score * 2.51}, 251`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}%</span>
                  <span className="text-xs text-gray-500 mt-1">ATS Score</span>
                </div>
              </div>
            </div>

            {renderScoreDetails()}

            <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
              <h3 className="font-medium text-blue-900 mb-2">Resume Feedback</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>Good use of industry-specific keywords</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                  <span>Consider adding more quantifiable achievements</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                  <span>Improve formatting for better readability</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
              <Button onClick={handleJobSearch} size="lg" className="bg-blue-900 hover:bg-blue-800">
                <Search className="mr-2 h-4 w-4" /> Find Matching Jobs
              </Button>
            </div>
          </div>
        )}

        {step === "jobs" && (
          <div>
            <div className="p-4 md:p-6 border-b border-blue-100 bg-blue-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-blue-900">Recommended Jobs</h2>
                <p className="text-sm text-gray-600">Based on your resume score and skills</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleBackToScore} className="text-blue-700">
                <ArrowLeft className="mr-1 h-4 w-4" /> Back to Score
              </Button>
            </div>

            <div className="p-4 md:p-6">
              <Tabs defaultValue="recommended" className="w-full">
                <TabsList className="mb-4 w-full sm:w-auto">
                  <TabsTrigger value="recommended" className="flex-1 sm:flex-initial">
                    Recommended
                  </TabsTrigger>
                  <TabsTrigger value="recent" className="flex-1 sm:flex-initial">
                    Recent Jobs
                  </TabsTrigger>
                  <TabsTrigger value="remote" className="flex-1 sm:flex-initial">
                    Remote
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="recommended" className="mt-0">
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                    {jobs.length === 0
                      ? Array(4)
                          .fill(0)
                          .map((_, i) => (
                            <div key={i} className="border rounded-lg p-4">
                              <Skeleton className="h-6 w-3/4 mb-2" />
                              <Skeleton className="h-4 w-1/2 mb-2" />
                              <Skeleton className="h-4 w-2/3 mb-2" />
                              <div className="flex gap-2 mt-3">
                                {Array(3)
                                  .fill(0)
                                  .map((_, j) => (
                                    <Skeleton key={j} className="h-5 w-16 rounded-full" />
                                  ))}
                              </div>
                            </div>
                          ))
                      : jobs.map((job, index) => (
                          <div
                            key={index}
                            className="border border-blue-100 rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
                          >
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="text-lg font-semibold text-blue-900">{job.title}</h3>
                                  {job.match && (
                                    <Badge className={getMatchBadgeColor(job.match)}>{job.match}% Match</Badge>
                                  )}
                                </div>
                                <p className="text-gray-700 flex items-center gap-1">
                                  <Briefcase className="h-3 w-3" /> {job.company}
                                </p>
                              </div>
                              <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 self-start">
                                {job.salary}
                              </Badge>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-600">
                              <span>{job.location}</span>
                              <span className="text-gray-300">•</span>
                              <span>{job.experience}</span>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                              {job.skills.map((skill, i) => (
                                <Badge
                                  key={i}
                                  variant="outline"
                                  className="bg-slate-50 text-slate-700 border-slate-200"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>

                            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                              <Button variant="outline" size="sm" className="text-blue-700">
                                Apply Now
                              </Button>
                            </div>
                          </div>
                        ))}
                  </div>
                </TabsContent>

                <TabsContent value="recent" className="mt-0">
                  <div className="bg-blue-50 rounded-lg p-6 text-center">
                    <p className="text-gray-600">Select "Recommended" to view jobs matching your profile</p>
                  </div>
                </TabsContent>

                <TabsContent value="remote" className="mt-0">
                  <div className="bg-blue-50 rounded-lg p-6 text-center">
                    <p className="text-gray-600">Select "Recommended" to view jobs matching your profile</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ResumeUploadForm
