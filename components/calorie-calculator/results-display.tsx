import { Card } from "@/components/ui/card"

interface ResultsDisplayProps {
  results: {
    bmr: number;
    tdee: number;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    weeklyChange: number;
  };
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  if (!results.bmr) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-lg sm:text-xl font-semibold">Your Results</h2>

      <div className="space-y-4">
        {/* Main Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-4 bg-blue-50">
            <div className="text-center">
              <div className="text-sm font-medium text-blue-600">BMR</div>
              <div className="text-3xl font-bold text-blue-700">
                {results.bmr}
              </div>
              <div className="text-sm text-blue-600">calories/day</div>
            </div>
          </Card>

          <Card className="p-4 bg-green-50">
            <div className="text-center">
              <div className="text-sm font-medium text-green-600">TDEE</div>
              <div className="text-3xl font-bold text-green-700">
                {results.tdee}
              </div>
              <div className="text-sm text-green-600">calories/day</div>
            </div>
          </Card>
        </div>

        {/* Target Calories */}
        <Card className="p-4 bg-purple-50">
          <div className="text-center">
            <div className="text-sm font-medium text-purple-600">Target Calories</div>
            <div className="text-3xl font-bold text-purple-700">
              {results.calories}
            </div>
            <div className="text-sm text-purple-600">calories/day</div>
          </div>
        </Card>

        {/* Macros */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 bg-amber-50">
            <div className="text-center">
              <div className="text-sm font-medium text-amber-600">Protein</div>
              <div className="text-2xl font-bold text-amber-700">
                {results.protein}g
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-orange-50">
            <div className="text-center">
              <div className="text-sm font-medium text-orange-600">Fat</div>
              <div className="text-2xl font-bold text-orange-700">
                {results.fat}g
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-red-50">
            <div className="text-center">
              <div className="text-sm font-medium text-red-600">Carbs</div>
              <div className="text-2xl font-bold text-red-700">
                {results.carbs}g
              </div>
            </div>
          </Card>
        </div>

        {/* Weekly Change */}
        <Card className="p-4 bg-indigo-50">
          <div className="text-center">
            <div className="text-sm font-medium text-indigo-600">Weekly Change</div>
            <div className="text-2xl font-bold text-indigo-700">
              {results.weeklyChange > 0 ? '+' : ''}{results.weeklyChange.toFixed(2)} kg
            </div>
            <div className="text-sm text-indigo-600">
              {results.weeklyChange > 0 ? 'Weight Gain' : 'Weight Loss'}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}