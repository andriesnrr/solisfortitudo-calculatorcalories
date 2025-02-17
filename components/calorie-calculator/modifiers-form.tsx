import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Label } from "@/components/ui/label"
  import { Input } from "@/components/ui/input"
  import { Info } from "lucide-react"
  
  interface ModifiersFormProps {
    modifiers: {
      activityLevel: string;
      goal: string;
      proteinIntake: string;
      fatRatio: string;
      calorieAdjustment: string;
    };
    onModifiersChange: (modifiers: any) => void;
  }
  
  export function ModifiersForm({ modifiers, onModifiersChange }: ModifiersFormProps) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <h2 className="text-lg sm:text-xl font-semibold">Modifiers</h2>
          <Info className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="activity">Activity Level:</Label>
            <Select
              value={modifiers.activityLevel}
              onValueChange={(value) => 
                onModifiersChange({ ...modifiers, activityLevel: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (Office Job)</SelectItem>
                <SelectItem value="lightly-active">Lightly Active (1-2x/week)</SelectItem>
                <SelectItem value="moderately-active">Moderately Active (3-5x/week)</SelectItem>
                <SelectItem value="very-active">Very Active (6-7x/week)</SelectItem>
                <SelectItem value="extremely-active">Extremely Active (Athletes)</SelectItem>
              </SelectContent>
            </Select>
          </div>
  
          <div className="grid gap-2">
            <Label htmlFor="goal">Goal:</Label>
            <Select
              value={modifiers.goal}
              onValueChange={(value) => 
                onModifiersChange({ ...modifiers, goal: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lose-20">Lose Weight (-20%)</SelectItem>
                <SelectItem value="lose-10">Slowly Lose Weight (-10%)</SelectItem>
                <SelectItem value="maintain">Maintain Weight (0%)</SelectItem>
                <SelectItem value="gain-10">Slowly Gain Weight (+10%)</SelectItem>
                <SelectItem value="gain-20">Gain Weight (+20%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
  
          <div className="grid gap-2">
            <Label>Calorie Deficit/Surplus:</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={modifiers.calorieAdjustment}
                onChange={(e) => 
                  onModifiersChange({ ...modifiers, calorieAdjustment: e.target.value })
                }
                min="-40"
                max="40"
                className="w-24"
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Recommended range: -20% to +20%
            </p>
          </div>
  
          <div className="grid gap-2">
            <Label htmlFor="protein">How Much Protein?</Label>
            <Select
              value={modifiers.proteinIntake}
              onValueChange={(value) => 
                onModifiersChange({ ...modifiers, proteinIntake: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select protein intake" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="acceptable">0.82g per pound (acceptable)</SelectItem>
                <SelectItem value="standard">1g per pound (standard)</SelectItem>
                <SelectItem value="high">1.5g per pound (RIP hunger)</SelectItem>
              </SelectContent>
            </Select>
          </div>
  
          <div className="grid gap-2">
            <Label>Fat/Carb Split:</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={modifiers.fatRatio}
                onChange={(e) => 
                  onModifiersChange({ ...modifiers, fatRatio: e.target.value })
                }
                min="0"
                max="100"
                className="w-24"
              />
              <span className="text-sm text-muted-foreground">% calories from fat</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Recommended range: 20-40%
            </p>
          </div>
        </div>
      </div>
    )
  }