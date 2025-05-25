"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Wind, Play, Pause, RotateCcw, Settings } from "lucide-react"

export default function BreathingExercisePage() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "pause">("inhale")
  const [timeLeft, setTimeLeft] = useState(4)
  const [cycle, setCycle] = useState(0)
  const [totalCycles, setTotalCycles] = useState(5)
  const [pattern, setPattern] = useState({ inhale: 4, hold: 4, exhale: 4, pause: 2 })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const phaseConfig = {
    inhale: { duration: pattern.inhale, next: "hold" as const, color: "bg-blue-500", text: "Breathe In" },
    hold: { duration: pattern.hold, next: "exhale" as const, color: "bg-yellow-500", text: "Hold" },
    exhale: { duration: pattern.exhale, next: "pause" as const, color: "bg-green-500", text: "Breathe Out" },
    pause: { duration: pattern.pause, next: "inhale" as const, color: "bg-gray-400", text: "Pause" },
  }

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (isActive && timeLeft === 0) {
      const currentPhase = phaseConfig[phase]
      const nextPhase = currentPhase.next

      if (phase === "pause") {
        setCycle(cycle + 1)
        if (cycle + 1 >= totalCycles) {
          setIsActive(false)
          setCycle(0)
          setPhase("inhale")
          setTimeLeft(pattern.inhale)
          return
        }
      }

      setPhase(nextPhase)
      setTimeLeft(phaseConfig[nextPhase].duration)
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current)
      }
    }
  }, [isActive, timeLeft, phase, cycle, totalCycles, pattern])

  const startExercise = () => {
    setIsActive(true)
    setPhase("inhale")
    setTimeLeft(pattern.inhale)
    setCycle(0)
  }

  const pauseExercise = () => {
    setIsActive(false)
  }

  const resetExercise = () => {
    setIsActive(false)
    setPhase("inhale")
    setTimeLeft(pattern.inhale)
    setCycle(0)
  }

  const currentPhaseConfig = phaseConfig[phase]
  const progress = ((currentPhaseConfig.duration - timeLeft) / currentPhaseConfig.duration) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Focused Breathing Exercise</h1>
            <p className="text-xl text-gray-600">Reduce stress and improve focus with guided breathing techniques</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Breathing Visualizer */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wind className="h-6 w-6 text-cyan-600" />
                  <span>Breathing Guide</span>
                </CardTitle>
                <CardDescription>Follow the visual guide for your breathing rhythm</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-8">
                {/* Breathing Circle */}
                <div className="relative w-64 h-64 flex items-center justify-center">
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-1000 ${currentPhaseConfig.color} opacity-20`}
                    style={{
                      transform: phase === "inhale" ? "scale(1.2)" : phase === "exhale" ? "scale(0.8)" : "scale(1)",
                    }}
                  />
                  <div
                    className={`w-48 h-48 rounded-full ${currentPhaseConfig.color} flex items-center justify-center text-white transition-all duration-1000`}
                    style={{
                      transform: phase === "inhale" ? "scale(1.1)" : phase === "exhale" ? "scale(0.9)" : "scale(1)",
                    }}
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">{timeLeft}</div>
                      <div className="text-lg">{currentPhaseConfig.text}</div>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="w-full space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      Cycle {cycle + 1} of {totalCycles}
                    </span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Controls */}
                <div className="flex space-x-4">
                  {!isActive ? (
                    <Button onClick={startExercise} className="bg-cyan-600 hover:bg-cyan-700">
                      <Play className="h-4 w-4 mr-2" />
                      Start
                    </Button>
                  ) : (
                    <Button onClick={pauseExercise} variant="outline">
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </Button>
                  )}
                  <Button onClick={resetExercise} variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Settings & Information */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-6 w-6 text-gray-600" />
                  <span>Exercise Settings</span>
                </CardTitle>
                <CardDescription>Customize your breathing pattern and session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Pattern Settings */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Breathing Pattern (seconds)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Inhale</label>
                      <input
                        type="number"
                        min="2"
                        max="10"
                        value={pattern.inhale}
                        onChange={(e) => setPattern({ ...pattern, inhale: Number.parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        disabled={isActive}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Hold</label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={pattern.hold}
                        onChange={(e) => setPattern({ ...pattern, hold: Number.parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        disabled={isActive}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Exhale</label>
                      <input
                        type="number"
                        min="2"
                        max="10"
                        value={pattern.exhale}
                        onChange={(e) => setPattern({ ...pattern, exhale: Number.parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        disabled={isActive}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Pause</label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        value={pattern.pause}
                        onChange={(e) => setPattern({ ...pattern, pause: Number.parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        disabled={isActive}
                      />
                    </div>
                  </div>
                </div>

                {/* Cycles Setting */}
                <div>
                  <label className="block text-sm font-medium mb-1">Total Cycles</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={totalCycles}
                    onChange={(e) => setTotalCycles(Number.parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    disabled={isActive}
                  />
                </div>

                {/* Preset Patterns */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Preset Patterns</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setPattern({ inhale: 4, hold: 4, exhale: 4, pause: 2 })}
                      disabled={isActive}
                    >
                      Box Breathing (4-4-4-2)
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setPattern({ inhale: 4, hold: 7, exhale: 8, pause: 1 })}
                      disabled={isActive}
                    >
                      4-7-8 Technique
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setPattern({ inhale: 6, hold: 2, exhale: 6, pause: 2 })}
                      disabled={isActive}
                    >
                      Calm Breathing (6-2-6-2)
                    </Button>
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-cyan-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-cyan-900 mb-2">Benefits</h4>
                  <ul className="text-sm text-cyan-800 space-y-1">
                    <li>• Reduces stress and anxiety</li>
                    <li>• Improves focus and concentration</li>
                    <li>• Lowers blood pressure</li>
                    <li>• Enhances sleep quality</li>
                    <li>• Boosts immune system</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
