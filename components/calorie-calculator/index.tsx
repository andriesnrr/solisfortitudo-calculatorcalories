"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatsForm } from './stats-form'
import { ModifiersForm } from './modifiers-form'
import { ResultsDisplay } from './results-display'

interface Stats {
  age: string;
  weight: string;
  height: string;
  gender: 'male' | 'female';
}

interface Modifiers {
  activityLevel: string;
  goal: string;
  proteinIntake: string;
  fatRatio: string;
  calorieAdjustment: string;
}

interface Results {
  bmr: number;
  tdee: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  weeklyChange: number;
}

export default function CalorieCalculator() {
  const [stats, setStats] = useState<Stats>({
    age: '',
    weight: '',
    height: '',
    gender: 'male'
  })

  const [modifiers, setModifiers] = useState<Modifiers>({
    activityLevel: 'sedentary',
    goal: 'lose-10',
    proteinIntake: 'acceptable',
    fatRatio: '50',
    calorieAdjustment: '-10'
  })

  const [results, setResults] = useState<Results>({
    bmr: 0,
    tdee: 0,
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    weeklyChange: 0,
  })

  const calculateMacros = () => {
    if (!stats.weight || !stats.height || !stats.age) {
      alert("Please fill in all required fields");
      return;
    }

    // Parse input values
    const weight = parseFloat(stats.weight)    // in kg
    const height = parseFloat(stats.height)    // in cm
    const age = parseFloat(stats.age)
    const weightLbs = weight * 2.20462         // convert to lbs for protein calc

    // 1. Calculate BMR using Mifflin-St Jeor Equation
    let bmr = (10 * weight) + (6.25 * height) - (5 * age)
    bmr += stats.gender === 'male' ? 5 : -161

    // 2. Calculate TDEE based on activity level
    const activityMultipliers = {
      'sedentary': 1.2,
      'lightly-active': 1.375,
      'moderately-active': 1.55,
      'very-active': 1.725,
      'extremely-active': 1.9
    }
    const tdee = bmr * activityMultipliers[modifiers.activityLevel as keyof typeof activityMultipliers]

    // 3. Calculate target calories based on deficit/surplus percentage
    const adjustmentPercent = parseFloat(modifiers.calorieAdjustment) / 100
    const targetCalories = tdee * (1 + adjustmentPercent)

    // 4. Calculate protein based on selected ratio
    const proteinMultipliers = {
      'acceptable': 0.82,  // 0.82g per lb bodyweight
      'standard': 1.0,     // 1g per lb bodyweight
      'high': 1.5         // 1.5g per lb bodyweight
    }
    const proteinPerLb = proteinMultipliers[modifiers.proteinIntake as keyof typeof proteinMultipliers]
    const proteinGrams = weightLbs * proteinPerLb
    const proteinCalories = proteinGrams * 4

    // 5. Calculate fat based on selected ratio of remaining calories
    const fatRatio = parseInt(modifiers.fatRatio) / 100
    const remainingCalories = targetCalories - proteinCalories
    const fatCalories = remainingCalories * fatRatio
    const fatGrams = fatCalories / 9

    // 6. Calculate remaining carbs
    const carbCalories = remainingCalories - fatCalories
    const carbGrams = carbCalories / 4

    // 7. Calculate weekly weight change
    const calorieDeficit = tdee - targetCalories
    const weeklyChange = -(calorieDeficit * 7) / 7700

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calories: Math.round(targetCalories),
      protein: Math.round(proteinGrams),
      fat: Math.round(fatGrams),
      carbs: Math.round(carbGrams),
      weeklyChange
    })
  }

  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <StatsForm stats={stats} onStatsChange={setStats} />
          <ModifiersForm modifiers={modifiers} onModifiersChange={setModifiers} />
        </div>

        <Button 
          className="w-full mt-8" 
          size="lg"
          onClick={calculateMacros}
        >
          Calculate
        </Button>

        <div className="mt-8">
          <ResultsDisplay results={results} />
        </div>
      </CardContent>
    </Card>
  )
}