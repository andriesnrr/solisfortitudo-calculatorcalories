import { Metadata } from "next"
import CalorieCalculator from "@/components/calorie-calculator"

export const metadata: Metadata = {
  title: "Calorie Calculator | Solisfortitudo",
  description: "Calculate your daily caloric needs, macros and create a personalized nutrition plan.",
}

export default function CalorieCalculatorPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Calorie & Macro Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate your daily calorie needs and get a customized macro breakdown based on your goals.
          </p>
        </div>

        <CalorieCalculator />

        <div className="mt-8 space-y-6 text-sm text-muted-foreground">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Understanding Your Results
            </h2>
            <ul className="list-disc pl-4 space-y-2">
              <li>
                <strong>BMR:</strong> Your Basal Metabolic Rate - calories burned at rest.
              </li>
              <li>
                <strong>TDEE:</strong> Total Daily Energy Expenditure - your maintenance calories.
              </li>
              <li>
                <strong>Macros:</strong> Recommended protein, fats, and carbs based on your goals.
              </li>
            </ul>
          </div>

          <div className="text-xs border-t pt-4">
            <p>
              Note: Results are estimates and should be adjusted based on your progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}