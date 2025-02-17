"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BMIReport } from './report'
import html2canvas from 'html2canvas'
import { Download } from 'lucide-react'

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  idealWeight: {
    min: number;
    max: number;
  };
  recommendations: string[];
  userName: string;
}

export function BMICalculator() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [userName, setUserName] = useState('')
  const [result, setResult] = useState<BMIResult | null>(null)
  const [aspectRatio, setAspectRatio] = useState('3:4')

  const calculateIdealWeight = (heightCm: number, gender: 'male' | 'female') => {
    const heightInInches = heightCm / 2.54;
    const baseHeight = 60;
    const extraInches = heightInInches - baseHeight;

    let baseWeight = gender === 'male' ? 106 : 100;
    let weightPerInch = gender === 'male' ? 6 : 5;

    const idealWeightLbs = baseWeight + (extraInches * weightPerInch);
    const idealWeightKg = idealWeightLbs * 0.453592;

    return {
      min: Math.round(idealWeightKg * 0.9),
      max: Math.round(idealWeightKg * 1.1),
    };
  }

  const getBMICategory = (bmi: number): { 
    category: string; 
    color: string;
    recommendations: string[];
  } => {
    if (bmi < 18.5) {
      return { 
        category: "Underweight", 
        color: "text-yellow-600",
        recommendations: [
          "Increase caloric intake",
          "Focus on nutrient-dense foods",
          "Add strength training",
          "Consult with a nutritionist"
        ]
      }
    } else if (bmi < 24.9) {
      return { 
        category: "Normal weight", 
        color: "text-green-600",
        recommendations: [
          "Maintain balanced diet",
          "Regular exercise",
          "Regular health check-ups",
          "Stay hydrated"
        ]
      }
    } else if (bmi < 29.9) {
      return { 
        category: "Overweight", 
        color: "text-orange-600",
        recommendations: [
          "Reduce caloric intake",
          "Increase physical activity",
          "Monitor portion sizes",
          "Choose whole foods"
        ]
      }
    } else {
      return { 
        category: "Obese", 
        color: "text-red-600",
        recommendations: [
          "Seek medical advice",
          "Structured weight loss plan",
          "Regular exercise routine",
          "Consider professional support"
        ]
      }
    }
  }

  const handleDownload = async () => {
    try {
      const element = document.getElementById('bmi-report')
      if (!element) {
        console.error('Report element not found')
        return
      }

      const getScale = () => {
        switch (aspectRatio) {
          case "9:16":
            return 3;
          case "16:9":
            return 2;
          case "1:1":
            return 2.5;
          case "3:4":
          default:
            return 2.5;
        }
      };

      const options = {
        scale: getScale(),
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.offsetWidth,
        height: element.offsetHeight
      }

      const canvas = await html2canvas(element, options)
      const image = canvas.toDataURL('image/png', 1.0)
      
      const downloadLink = document.createElement('a')
      downloadLink.href = image
      const fileName = userName 
        ? `bmi-report-${userName.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.png`
        : `bmi-report-${new Date().toISOString().split('T')[0]}.png`;
      downloadLink.download = fileName
      
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)

    } catch (error) {
      console.error('Error generating report:', error)
      alert('Failed to generate report. Please try again.')
    }
  }

  const calculateBMI = () => {
    if (!height || !weight || !age) {
      alert("Please fill in all required fields")
      return
    }

    const heightInMeters = parseFloat(height) / 100
    const weightInKg = parseFloat(weight)
    const ageNum = parseFloat(age)

    if (ageNum < 18 || ageNum > 80) {
      alert("Age should be between 18 and 80")
      return
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters)
    const { category, color, recommendations } = getBMICategory(bmi)
    const idealWeight = calculateIdealWeight(parseFloat(height), gender)

    setResult({ 
      bmi: parseFloat(bmi.toFixed(1)), 
      category,
      color,
      idealWeight,
      recommendations,
      userName
    })
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-8">
          {/* Input Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age:</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="18"
                  max="80"
                />
              </div>

              <div className="space-y-2">
                <Label>Gender:</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant={gender === 'male' ? 'default' : 'outline'}
                    onClick={() => setGender('male')}
                  >
                    Male
                  </Button>
                  <Button
                    type="button"
                    variant={gender === 'female' ? 'default' : 'outline'}
                    onClick={() => setGender('female')}
                  >
                    Female
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm):</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter your height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  min="140"
                  max="220"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg):</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter your weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="40"
                  max="200"
                />
              </div>
            </div>

            <Button 
              className="w-full" 
              size="lg"
              onClick={calculateBMI}
            >
              Calculate BMI
            </Button>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6 pt-6 border-t">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                  {result.bmi}
                </div>
                <div className={`text-xl font-semibold ${result.color}`}>
                  {result.category}
                </div>
              </div>

              {/* BMI Scale Indicator */}
              <div className="space-y-2">
                <Progress 
                  value={(result.bmi / 40) * 100} 
                  className="h-3"
                  style={{
                    background: 'linear-gradient(to right, #FCD34D, #10B981, #F97316, #EF4444)',
                  }}
                />
                <div className="grid grid-cols-4 text-xs text-center">
                  <div className="text-yellow-600">Underweight</div>
                  <div className="text-green-600">Normal</div>
                  <div className="text-orange-600">Overweight</div>
                  <div className="text-red-600">Obese</div>
                </div>
                <div className="grid grid-cols-4 text-xs text-center text-muted-foreground">
                  <div>{'<18.5'}</div>
                  <div>18.5-24.9</div>
                  <div>25-29.9</div>
                  <div>{'>30'}</div>
                </div>
              </div>

              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-sm font-medium mb-2">Ideal Weight Range</div>
                <div className="text-xl font-bold">
                  {result.idealWeight.min} - {result.idealWeight.max} kg
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Your Name:</Label>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Report Aspect Ratio:</Label>
                  <Select
                    value={aspectRatio}
                    onValueChange={setAspectRatio}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select aspect ratio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9:16">Portrait (9:16)</SelectItem>
                      <SelectItem value="16:9">Landscape (16:9)</SelectItem>
                      <SelectItem value="1:1">Square (1:1)</SelectItem>
                      <SelectItem value="3:4">Portrait (3:4)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleDownload}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </div>

              {/* Preview Report */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Preview Report</h3>
                <div className="rounded-lg border bg-card text-card-foreground shadow overflow-hidden">
                  <BMIReport 
                    result={result}
                    userData={{
                      age,
                      gender,
                      height,
                      weight,
                      name: userName
                    }}
                    aspectRatio={aspectRatio}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}