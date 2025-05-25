"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Heart, Activity, Thermometer, Droplets, Weight, Ruler } from "lucide-react"

export default function HealthMonitorPage() {
  const [vitals, setVitals] = useState({
    heartRate: "",
    bloodPressure: "",
    temperature: "",
    oxygenSaturation: "",
    weight: "",
    height: "",
  })

  const [results, setResults] = useState<any>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Calculate health metrics
    const bmi =
      vitals.weight && vitals.height
        ? (Number.parseFloat(vitals.weight) / Math.pow(Number.parseFloat(vitals.height) / 100, 2)).toFixed(1)
        : null

    setResults({
      bmi,
      status: getBMIStatus(Number.parseFloat(bmi || "0")),
      heartRateStatus: getHeartRateStatus(Number.parseInt(vitals.heartRate)),
      temperatureStatus: getTemperatureStatus(Number.parseFloat(vitals.temperature)),
    })
  }

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { text: "Underweight", color: "text-blue-600" }
    if (bmi < 25) return { text: "Normal", color: "text-green-600" }
    if (bmi < 30) return { text: "Overweight", color: "text-yellow-600" }
    return { text: "Obese", color: "text-red-600" }
  }

  const getHeartRateStatus = (hr: number) => {
    if (hr < 60) return { text: "Low", color: "text-blue-600" }
    if (hr <= 100) return { text: "Normal", color: "text-green-600" }
    return { text: "High", color: "text-red-600" }
  }

  const getTemperatureStatus = (temp: number) => {
    if (temp < 36.1) return { text: "Low", color: "text-blue-600" }
    if (temp <= 37.2) return { text: "Normal", color: "text-green-600" }
    return { text: "Fever", color: "text-red-600" }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Monitor</h1>
            <p className="text-xl text-gray-600">Track your vital signs and health metrics</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-6 w-6 text-blue-600" />
                  <span>Enter Your Vitals</span>
                </CardTitle>
                <CardDescription>Input your current health measurements for analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="heartRate" className="flex items-center space-x-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>Heart Rate (bpm)</span>
                      </Label>
                      <Input
                        id="heartRate"
                        type="number"
                        placeholder="72"
                        value={vitals.heartRate}
                        onChange={(e) => setVitals({ ...vitals, heartRate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bloodPressure" className="flex items-center space-x-2">
                        <Activity className="h-4 w-4 text-blue-500" />
                        <span>Blood Pressure</span>
                      </Label>
                      <Input
                        id="bloodPressure"
                        placeholder="120/80"
                        value={vitals.bloodPressure}
                        onChange={(e) => setVitals({ ...vitals, bloodPressure: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="temperature" className="flex items-center space-x-2">
                        <Thermometer className="h-4 w-4 text-orange-500" />
                        <span>Temperature (°C)</span>
                      </Label>
                      <Input
                        id="temperature"
                        type="number"
                        step="0.1"
                        placeholder="36.5"
                        value={vitals.temperature}
                        onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="oxygenSaturation" className="flex items-center space-x-2">
                        <Droplets className="h-4 w-4 text-cyan-500" />
                        <span>Oxygen Saturation (%)</span>
                      </Label>
                      <Input
                        id="oxygenSaturation"
                        type="number"
                        placeholder="98"
                        value={vitals.oxygenSaturation}
                        onChange={(e) => setVitals({ ...vitals, oxygenSaturation: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight" className="flex items-center space-x-2">
                        <Weight className="h-4 w-4 text-purple-500" />
                        <span>Weight (kg)</span>
                      </Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="70"
                        value={vitals.weight}
                        onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
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
                        placeholder="175"
                        value={vitals.height}
                        onChange={(e) => setVitals({ ...vitals, height: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Analyze Health Metrics
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Health Analysis</CardTitle>
                <CardDescription>Your health metrics analysis and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-6">
                    {results.bmi && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">BMI</span>
                          <span className={`font-bold ${results.status.color}`}>
                            {results.bmi} - {results.status.text}
                          </span>
                        </div>
                        <Progress value={Math.min((Number.parseFloat(results.bmi) / 40) * 100, 100)} />
                      </div>
                    )}

                    {vitals.heartRate && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Heart Rate</span>
                          <span className={`font-bold ${results.heartRateStatus.color}`}>
                            {vitals.heartRate} bpm - {results.heartRateStatus.text}
                          </span>
                        </div>
                        <Progress value={Math.min((Number.parseInt(vitals.heartRate) / 200) * 100, 100)} />
                      </div>
                    )}

                    {vitals.temperature && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Temperature</span>
                          <span className={`font-bold ${results.temperatureStatus.color}`}>
                            {vitals.temperature}°C - {results.temperatureStatus.text}
                          </span>
                        </div>
                        <Progress value={Math.min((Number.parseFloat(vitals.temperature) / 42) * 100, 100)} />
                      </div>
                    )}

                    {vitals.oxygenSaturation && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Oxygen Saturation</span>
                          <span className="font-bold text-green-600">{vitals.oxygenSaturation}%</span>
                        </div>
                        <Progress value={Number.parseInt(vitals.oxygenSaturation)} />
                      </div>
                    )}

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Recommendations</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Maintain regular exercise routine</li>
                        <li>• Stay hydrated throughout the day</li>
                        <li>• Monitor your vitals regularly</li>
                        <li>• Consult a doctor if any values are concerning</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Activity className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter your vitals to see analysis results</p>
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
