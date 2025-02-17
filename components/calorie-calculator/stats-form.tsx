import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"

interface StatsFormProps {
  stats: {
    age: string;
    weight: string;
    height: string;
    gender: 'male' | 'female';
  };
  onStatsChange: (stats: any) => void;
}

export function StatsForm({ stats, onStatsChange }: StatsFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-lg sm:text-xl font-semibold">Stats</h2>
        <Info className="h-4 w-4 text-muted-foreground" />
      </div>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="age">Age:</Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter your age"
            value={stats.age}
            onChange={(e) => onStatsChange({ ...stats, age: e.target.value })}
            className="h-10"
            min="15"
            max="80"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="weight">Weight (kg):</Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter weight"
              value={stats.weight}
              onChange={(e) => onStatsChange({ ...stats, weight: e.target.value })}
              className="h-10"
              min="40"
              max="200"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="height">Height (cm):</Label>
            <Input
              id="height"
              type="number"
              placeholder="Enter height"
              value={stats.height}
              onChange={(e) => onStatsChange({ ...stats, height: e.target.value })}
              className="h-10"
              min="140"
              max="220"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Gender:</Label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant={stats.gender === 'male' ? 'default' : 'outline'}
              onClick={() => onStatsChange({ ...stats, gender: 'male' })}
              className="h-10"
            >
              Male
            </Button>
            <Button
              type="button"
              variant={stats.gender === 'female' ? 'default' : 'outline'}
              onClick={() => onStatsChange({ ...stats, gender: 'female' })}
              className="h-10"
            >
              Female
            </Button>
          </div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <p>Age should be between 15-80 years</p>
        <p>Weight should be between 40-200 kg</p>
        <p>Height should be between 140-220 cm</p>
      </div>
    </div>
  )
}