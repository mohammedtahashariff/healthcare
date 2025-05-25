"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, Heart, Smile, AlertCircle, CheckCircle, MessageCircle } from "lucide-react"

export default function MentalHealthPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [assessment, setAssessment] = useState<any>(null)

  const questions = [
    "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
    "How often have you had little interest or pleasure in doing things?",
    "How often have you felt nervous, anxious, or on edge?",
    "How often have you been unable to stop or control worrying?",
    "How often have you had trouble falling or staying asleep?",
    "How often have you felt tired or had little energy?",
    "How often have you had poor appetite or overeating?",
    "How often have you had trouble concentrating on things?",
    "How often have you felt bad about yourself or that you're a failure?",
    "How often have you had thoughts of hurting yourself?",
  ]

  const options = [
    { text: "Not at all", value: 0 },
    { text: "Several days", value: 1 },
    { text: "More than half the days", value: 2 },
    { text: "Nearly every day", value: 3 },
  ]

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateAssessment(newAnswers)
    }
  }

  const calculateAssessment = (allAnswers: number[]) => {
    const totalScore = allAnswers.reduce((sum, answer) => sum + answer, 0)

    let severity = ""
    let color = ""
    let recommendations = []
    let urgency = "low"

    if (totalScore <= 4) {
      severity = "Minimal"
      color = "text-green-600"
      recommendations = [
        "Continue maintaining good mental health habits",
        "Regular exercise and healthy sleep schedule",
        "Stay connected with friends and family",
        "Practice mindfulness or meditation",
      ]
    } else if (totalScore <= 9) {
      severity = "Mild"
      color = "text-yellow-600"
      recommendations = [
        "Consider stress management techniques",
        "Maintain regular sleep and exercise routines",
        "Talk to trusted friends or family",
        "Consider counseling if symptoms persist",
      ]
    } else if (totalScore <= 14) {
      severity = "Moderate"
      color = "text-orange-600"
      urgency = "medium"
      recommendations = [
        "Strongly consider professional counseling",
        "Speak with your primary care doctor",
        "Implement stress reduction strategies",
        "Avoid alcohol and substance use",
      ]
    } else if (totalScore <= 19) {
      severity = "Moderately Severe"
      color = "text-red-600"
      urgency = "high"
      recommendations = [
        "Seek professional help immediately",
        "Contact a mental health professional",
        "Consider medication evaluation",
        "Reach out to support systems",
      ]
    } else {
      severity = "Severe"
      color = "text-red-800"
      urgency = "urgent"
      recommendations = [
        "Seek immediate professional help",
        "Contact emergency services if needed",
        "Reach out to crisis hotlines",
        "Don't wait - get help today",
      ]
    }

    setAssessment({
      score: totalScore,
      severity,
      color,
      recommendations,
      urgency,
    })
    setShowResults(true)
  }

  const resetAssessment = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setAssessment(null)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Mental Health Assessment</h1>
            <p className="text-xl text-gray-600">A confidential screening to help understand your mental wellbeing</p>
          </div>

          {!showResults ? (
            <Card className="shadow-xl border-0 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-purple-600" />
                  <span>Mental Health Screening</span>
                </CardTitle>
                <CardDescription>
                  Question {currentQuestion + 1} of {questions.length}
                </CardDescription>
                <Progress value={progress} className="h-2" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-lg font-medium text-gray-900 leading-relaxed">{questions[currentQuestion]}</div>

                <div className="space-y-3">
                  {options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-4 px-6 hover:bg-purple-50"
                      onClick={() => handleAnswer(option.value)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 border-2 border-purple-300 rounded-full" />
                        <span>{option.text}</span>
                      </div>
                    </Button>
                  ))}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Privacy Notice:</strong> Your responses are confidential and used only for assessment
                    purposes. This screening is not a substitute for professional diagnosis.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Results */}
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-6 w-6 text-red-500" />
                    <span>Assessment Results</span>
                  </CardTitle>
                  <CardDescription>Your mental health screening results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-2">{assessment.score}/30</div>
                    <div className={`text-2xl font-semibold ${assessment.color} mb-4`}>{assessment.severity}</div>
                    <Progress value={(assessment.score / 30) * 100} className="h-3" />
                  </div>

                  {assessment.urgency === "urgent" && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 text-red-800">
                        <AlertCircle className="h-5 w-5" />
                        <span className="font-semibold">Immediate Attention Needed</span>
                      </div>
                      <p className="text-red-700 mt-2">
                        Your responses indicate you may need immediate professional support. Please reach out to a
                        mental health professional or crisis hotline.
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Recommendations:</h4>
                    <ul className="space-y-2">
                      {assessment.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button onClick={resetAssessment} className="w-full">
                    Take Assessment Again
                  </Button>
                </CardContent>
              </Card>

              {/* Resources */}
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-6 w-6 text-blue-600" />
                    <span>Mental Health Resources</span>
                  </CardTitle>
                  <CardDescription>Support and help when you need it</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Crisis Hotlines */}
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-3">Crisis Support</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>National Suicide Prevention Lifeline:</strong>
                        <br />
                        <a href="tel:988" className="text-red-700 font-medium">
                          988
                        </a>
                      </div>
                      <div>
                        <strong>Crisis Text Line:</strong>
                        <br />
                        Text HOME to{" "}
                        <a href="sms:741741" className="text-red-700 font-medium">
                          741741
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Professional Help */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Professional Support</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Smile className="h-4 w-4 mr-2" />
                        Find a Therapist
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Brain className="h-4 w-4 mr-2" />
                        Online Counseling
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Heart className="h-4 w-4 mr-2" />
                        Support Groups
                      </Button>
                    </div>
                  </div>

                  {/* Self-Care Tips */}
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-3">Daily Self-Care</h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Practice deep breathing exercises</li>
                      <li>• Maintain regular sleep schedule</li>
                      <li>• Stay physically active</li>
                      <li>• Connect with supportive people</li>
                      <li>• Limit alcohol and caffeine</li>
                      <li>• Practice mindfulness or meditation</li>
                    </ul>
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-600">
                      <strong>Disclaimer:</strong> This assessment is for informational purposes only and is not a
                      substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of
                      qualified health providers.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
