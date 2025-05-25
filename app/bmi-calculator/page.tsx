"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Calculator, Weight, Ruler, Target } from "lucide-react"

export default function BMICalculatorPage() {
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [result, setResult] = useState<any>(null)

  const calculateBMI = () => {
    if (!weight || !height) return

    const weightKg = Number.parseFloat(weight)
    const heightM = Number.parseFloat(height) / 100
    const bmi = weightKg / (heightM * heightM)

    let category = ""
    let color = ""
    let recommendations = []

    if (bmi < 18.5) {
      category = "Underweight"
      color = "text-blue-600"
      recommendations = [
        "Consider consulting a nutritionist",
        "Focus on healthy weight gain",
        "Include protein-rich foods in your diet",
        "Regular strength training exercises",
      ]
    } else if (bmi < 25) {
      category = "Normal Weight"
      color = "text-green-600"
      recommendations = [
        "Maintain your current healthy lifestyle",
        "Continue regular exercise",
        "Eat a balanced diet",
        "Monitor your weight regularly",
      ]
    } else if (bmi < 30) {
      category = "Overweight"
      color = "text-yellow-600"
      recommendations = [
        "Consider a balanced diet plan",
        "Increase physical activity",
        "Consult a healthcare provider",
        "Focus on gradual weight loss",
      ]
    } else {
      category = "Obese"
      color = "text-red-600"
      recommendations = [
        "Consult a healthcare professional",
        "Consider a structured weight loss program",
        "Focus on lifestyle changes",
        "Regular medical monitoring",
      ]
    }

    setResult({
      bmi: bmi.toFixed(1),
      category,
      color,
      recommendations,
      idealWeight: {
        min: (18.5 * heightM * heightM).toFixed(1),
        max: (24.9 * heightM * heightM).toFixed(1),
      },
    })
  }

  const resetCalculator = () => {
    setWeight("")
    setHeight("")
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">BMI Calculator</h1>
            <p className="text-xl text-gray-600">
              Calculate your Body Mass Index and get personalized health recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Input */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-6 w-6 text-blue-600" />
                  <span>BMI Calculator</span>
                </CardTitle>
                <CardDescription>Enter your measurements to calculate your BMI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="weight" className="flex items-center space-x-2">
                    <Weight className="h-4 w-4 text-purple-500" />
                    <span>Weight (kg)</span>
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Enter your weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height" className="flex items-center space-x-2">
                    <Ruler className="h-4 w-4 text-green-500" />
                    <span>Height (cm)</span>
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="Enter your height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={calculateBMI}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={!weight || !height}
                  >
                    Calculate BMI
                  </Button>
                  <Button onClick={resetCalculator} variant="outline" className="flex-1">
                    Reset
                  </Button>
                </div>

                {/* BMI Categories Reference */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">BMI Categories:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Underweight:</span>
                      <span className="text-blue-600 font-medium">Below 18.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Normal weight:</span>
                      <span className="text-green-600 font-medium">18.5 - 24.9</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overweight:</span>
                      <span className="text-yellow-600 font-medium">25 - 29.9</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Obese:</span>
                      <span className="text-red-600 font-medium">30 and above</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-6 w-6 text-green-600" />
                  <span>Your Results</span>
                </CardTitle>
                <CardDescription>BMI analysis and health recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6">
                    {/* BMI Score */}
                    <div className="text-center">
                      <div className="text-6xl font-bold text-gray-900 mb-2">{result.bmi}</div>
                      <div className={`text-2xl font-semibold ${result.color} mb-4`}>{result.category}</div>
                      <Progress value={Math.min((Number.parseFloat(result.bmi) / 40) * 100, 100)} className="h-3" />
                    </div>

                    {/* Ideal Weight Range */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Ideal Weight Range</h4>
                      <p className="text-blue-800">
                        {result.idealWeight.min} kg - {result.idealWeight.max} kg
                      </p>
                    </div>

                    {/* Recommendations */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Recommendations:</h4>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span className="text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-800">
                        <strong>Disclaimer:</strong> BMI is a general indicator and may not account for muscle mass,
                        bone density, and other factors. Consult a healthcare professional for comprehensive health
                        assessment.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter your weight and height to calculate your BMI</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
