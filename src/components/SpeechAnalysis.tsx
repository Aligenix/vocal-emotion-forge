import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Volume2, Mic, Zap, Target, Heart } from "lucide-react";
import { SpeechResult } from "@/pages/Index";

interface SpeechAnalysisProps {
  result: SpeechResult;
}

const scoreMetrics = [
  {
    key: "tonalVariation" as keyof SpeechResult["scores"],
    label: "Tonal Variation",
    icon: TrendingUp,
    description: "How well you vary your pitch and tone",
    color: "chart-1"
  },
  {
    key: "vocalRange" as keyof SpeechResult["scores"],
    label: "Vocal Range", 
    icon: Volume2,
    description: "The breadth of your vocal expression",
    color: "chart-2"
  },
  {
    key: "confidence" as keyof SpeechResult["scores"],
    label: "Confidence",
    icon: Zap,
    description: "How assured and steady your delivery sounds",
    color: "chart-3"
  },
  {
    key: "energy" as keyof SpeechResult["scores"],
    label: "Energy Level",
    icon: Target,
    description: "The vitality and enthusiasm in your voice",
    color: "chart-4"
  },
  {
    key: "clarity" as keyof SpeechResult["scores"],
    label: "Clarity",
    icon: Mic,
    description: "How clear and understandable your speech is",
    color: "chart-5"
  },
  {
    key: "emotionalExpression" as keyof SpeechResult["scores"],
    label: "Emotional Expression",
    icon: Heart,
    description: "How well you convey the intended emotion",
    color: "chart-1"
  }
];

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-400";
  if (score >= 65) return "text-yellow-400";
  if (score >= 50) return "text-orange-400";
  return "text-red-400";
};

const getScoreText = (score: number) => {
  if (score >= 80) return "Excellent";
  if (score >= 65) return "Good";
  if (score >= 50) return "Fair";
  return "Needs Work";
};

const getProgressColor = (score: number) => {
  if (score >= 80) return "bg-green-500";
  if (score >= 65) return "bg-yellow-500";
  if (score >= 50) return "bg-orange-500";
  return "bg-red-500";
};

export const SpeechAnalysis = ({ result }: SpeechAnalysisProps) => {
  const averageScore = Math.round(
    Object.values(result.scores).reduce((a, b) => a + b, 0) / 6
  );

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card className="glass-card border-primary/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Speech Analysis Report</h3>
          <Badge className="gradient-primary">
            Overall: {averageScore}/100
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Emotion Analyzed</p>
            <p className="text-lg font-semibold capitalize">{result.emotion}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Speaker Level</p>
            <p className="text-lg font-semibold capitalize">{result.level} Speaker</p>
          </div>
        </div>
      </Card>

      {/* Detailed Metrics */}
      <Card className="glass-card border-primary/20 p-6">
        <h4 className="text-lg font-semibold mb-6">Detailed Metrics</h4>
        
        <div className="space-y-6">
          {scoreMetrics.map((metric) => {
            const score = result.scores[metric.key];
            const IconComponent = metric.icon;
            
            return (
              <div key={metric.key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{metric.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {metric.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${getScoreColor(score)}`}>
                      {getScoreText(score)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {score}/100
                    </span>
                  </div>
                </div>
                
                <div className="relative">
                  <Progress value={score} className="h-2" />
                  <div
                    className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-1000 ${getProgressColor(score)}`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Improvement Suggestions */}
      <Card className="glass-card border-primary/20 p-6">
        <h4 className="text-lg font-semibold mb-4">Improvement Suggestions</h4>
        
        <div className="space-y-3">
          {result.feedback.map((feedback, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{feedback}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
          <h5 className="font-medium text-primary mb-2">Next Steps</h5>
          <p className="text-sm text-muted-foreground">
            Practice reading narratives with different emotions daily. Focus on the metrics where you scored below 70 points. 
            Record yourself regularly and track your progress over time.
          </p>
        </div>
      </Card>
    </div>
  );
};