import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Star, Zap, Target, Award } from "lucide-react";
import { SpeechResult } from "@/pages/Index";

interface LevelDisplayProps {
  result: SpeechResult;
}

const levelData = {
  core: {
    icon: Target,
    title: "Core Speaker",
    description: "Building foundation skills",
    color: "level-core",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20"
  },
  clear: {
    icon: Zap,
    title: "Clear Speaker", 
    description: "Developing clarity and confidence",
    color: "level-clear",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20"
  },
  fluid: {
    icon: Star,
    title: "Fluid Speaker",
    description: "Smooth and expressive delivery",
    color: "level-fluid", 
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20"
  },
  bold: {
    icon: Award,
    title: "Bold Speaker",
    description: "Confident and engaging",
    color: "level-bold",
    bgColor: "bg-blue-500/10", 
    borderColor: "border-blue-500/20"
  },
  pro: {
    icon: Crown,
    title: "Pro Speaker",
    description: "Masterful speech delivery",
    color: "level-pro",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20"
  }
};

export const LevelDisplay = ({ result }: LevelDisplayProps) => {
  const level = levelData[result.level];
  const IconComponent = level.icon;
  
  const averageScore = Math.round(
    Object.values(result.scores).reduce((a, b) => a + b, 0) / 6
  );

  return (
    <Card className={`glass-card ${level.borderColor} p-6 shadow-glow`}>
      <div className="text-center space-y-4">
        <div className={`w-20 h-20 mx-auto rounded-full ${level.bgColor} flex items-center justify-center`}>
          <IconComponent className={`w-10 h-10 ${level.color}`} />
        </div>
        
        <div>
          <h2 className={`text-2xl font-bold ${level.color}`}>
            {level.title}
          </h2>
          <p className="text-muted-foreground mt-1">
            {level.description}
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-4">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Score: {averageScore}/100
          </Badge>
          <Badge className={`${level.bgColor} ${level.color} border-current`}>
            {result.emotion.toUpperCase()} Analysis
          </Badge>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Key Feedback</h3>
          <div className="space-y-1">
            {result.feedback.map((item, index) => (
              <p key={index} className="text-sm text-muted-foreground">
                • {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};