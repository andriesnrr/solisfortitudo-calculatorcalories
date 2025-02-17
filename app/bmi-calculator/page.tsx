import { Metadata } from "next"
import { BMICalculator } from "@/components/bmi-calculator"

export const metadata: Metadata = {
  title: "BMI Calculator | Solisfortitudo",
  description: "Calculate and monitor your Body Mass Index (BMI) to check if you&apos;re at a healthy weight.",
};

export default function BMIPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            BMI Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate your Body Mass Index (BMI) to check if you're at a healthy weight.
          </p>
        </div>

        <BMICalculator />

        <div className="mt-8 space-y-6 text-sm text-muted-foreground">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              BMI Categories
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              <li className="p-3 bg-yellow-50 rounded-lg">
                <div className="font-semibold text-yellow-700">Underweight</div>
                <div className="text-yellow-600">Below 18.5</div>
              </li>
              <li className="p-3 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-700">Normal Weight</div>
                <div className="text-green-600">18.5 - 24.9</div>
              </li>
              <li className="p-3 bg-orange-50 rounded-lg">
                <div className="font-semibold text-orange-700">Overweight</div>
                <div className="text-orange-600">25 - 29.9</div>
              </li>
              <li className="p-3 bg-red-50 rounded-lg">
                <div className="font-semibold text-red-700">Obese</div>
                <div className="text-red-600">30 or greater</div>
              </li>
            </ul>
          </div>

          <div className="text-xs border-t pt-4">
            <p>
              Note: BMI is a general indicator and doesn't account for factors like muscle mass, age, or gender.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}