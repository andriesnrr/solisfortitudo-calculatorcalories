import { Card, CardContent } from "@/components/ui/card"

interface BMIReportProps {
  result: {
    bmi: number;
    category: string;
    color: string;
    idealWeight: {
      min: number;
      max: number;
    };
    recommendations: string[];
  };
  userData: {
    age: string;
    gender: string;
    height: string;
    weight: string;
    name: string;
  };
  aspectRatio: string;
}

export function BMIReport({ result, userData, aspectRatio }: BMIReportProps) {
  const getAspectRatioStyles = () => {
    const baseStyles = "mx-auto bg-white relative overflow-hidden";
    
    switch (aspectRatio) {
      case "9:16":
        return {
          containerClass: `${baseStyles} h-[85vh]`,
          className: "w-[360px] h-[640px]",
          contentClass: "p-8 space-y-6"
        };
      case "16:9":
        return {
          containerClass: `${baseStyles} h-[50vh]`,
          className: "w-[640px] h-[360px]",
          contentClass: "p-6"
        };
      case "1:1":
        return {
          containerClass: `${baseStyles} h-[70vh]`,
          className: "w-[480px] h-[480px]",
          contentClass: "p-8 space-y-6"
        };
      case "3:4":
      default:
        return {
          containerClass: `${baseStyles} h-[80vh]`,
          className: "w-[420px] h-[560px]",
          contentClass: "p-8 space-y-6"
        };
    }
  };

  const { containerClass, className, contentClass } = getAspectRatioStyles();

  const getLandscapeContent = () => (
    <div className="grid grid-cols-2 h-full gap-6">
      <div className="flex flex-col justify-between">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">BMI Report</h2>
            {userData.name && (
              <p className="text-lg font-medium mt-1">{userData.name}</p>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              Generated on {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div>Age: {userData.age} years</div>
            <div>Gender: {userData.gender}</div>
            <div>Height: {userData.height} cm</div>
            <div>Weight: {userData.weight} kg</div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-6xl font-bold">{result.bmi}</div>
          <div className={`text-xl font-semibold ${result.color} mt-2`}>
            {result.category}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="space-y-6">
          <div className="text-center bg-muted/30 rounded-lg p-4">
            <div className="text-sm font-medium">Ideal Weight Range</div>
            <div className="text-2xl font-bold mt-1">
              {result.idealWeight.min} - {result.idealWeight.max} kg
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Recommendations:</h3>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              {result.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const getPortraitContent = () => (
    <div className="h-full flex flex-col justify-between">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">BMI Report</h2>
          {userData.name && (
            <p className="text-lg font-medium mt-1">{userData.name}</p>
          )}
          <p className="text-sm text-muted-foreground mt-1">
            Generated on {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>Age: {userData.age} years</div>
          <div>Gender: {userData.gender}</div>
          <div>Height: {userData.height} cm</div>
          <div>Weight: {userData.weight} kg</div>
        </div>

        <div className="text-center">
          <div className="text-6xl font-bold">{result.bmi}</div>
          <div className={`text-xl font-semibold ${result.color} mt-2`}>
            {result.category}
          </div>
        </div>

        <div className="text-center bg-muted/30 rounded-lg p-4">
          <div className="text-sm font-medium">Ideal Weight Range</div>
          <div className="text-2xl font-bold mt-1">
            {result.idealWeight.min} - {result.idealWeight.max} kg
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Recommendations:</h3>
          <ul className="list-disc pl-4 space-y-1 text-sm">
            {result.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className={containerClass}>
      <div className={className} id="bmi-report">
        <Card className="w-full h-full">
          <CardContent className={contentClass}>
            {aspectRatio === "16:9" ? getLandscapeContent() : getPortraitContent()}
          </CardContent>
        </Card>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-0 left-0 right-0 py-2 px-4 bg-gradient-to-t from-black/5 to-transparent">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Generated by Solisfortitudo</span>
          <span>solisfortitudo</span>
        </div>
      </div>
    </div>
  );
}