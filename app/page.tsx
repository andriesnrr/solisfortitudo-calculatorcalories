import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-3xl mb-6">
          Calculate Your Fitness Goals with Precision
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-12">
          Free tools to help you track your fitness journey. Calculate calories, analyze macros, and monitor your BMI.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/calorie-calculator">
            <Button size="lg" className="w-full sm:w-auto">
              Calculate Calories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/bmi-calculator">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Calculate BMI
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}