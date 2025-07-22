import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Volume2, Mic, Zap, Target, Heart, Brain, BarChart3 } from "lucide-react";
import { SpeechResult } from "@/pages/Index";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';

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

  // Prepare data for charts
  const radarData = scoreMetrics.map(metric => ({
    subject: metric.label,
    score: result.scores[metric.key],
    fullMark: 100
  }));

  const barData = scoreMetrics.map(metric => ({
    name: metric.label.split(' ')[0], // Shorter names for mobile
    score: result.scores[metric.key],
    target: 85
  }));

  const trendData = [
    { session: 'Previous', score: Math.max(20, averageScore - 15) },
    { session: 'Current', score: averageScore },
    { session: 'Target', score: Math.min(100, averageScore + 20) }
  ];

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

      {/* Speech Performance Overview */}
      <Card className="glass-card border-primary/20 p-6">
        <div className="flex items-center mb-6">
          <Brain className="w-5 h-5 mr-2 text-primary" />
          <h4 className="text-lg font-semibold">Performance Radar</h4>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid gridType="polygon" />
              <PolarAngleAxis dataKey="subject" className="text-xs" />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={false}
              />
              <Radar
                name="Your Score"
                dataKey="score"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary) / 0.3)"
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Comparative Bar Chart */}
      <Card className="glass-card border-primary/20 p-6">
        <div className="flex items-center mb-6">
          <BarChart3 className="w-5 h-5 mr-2 text-primary" />
          <h4 className="text-lg font-semibold">Skills Comparison</h4>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" fill="hsl(var(--muted))" opacity={0.4} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Progress Trend */}
      <Card className="glass-card border-primary/20 p-6">
        <div className="flex items-center mb-6">
          <TrendingUp className="w-5 h-5 mr-2 text-primary" />
          <h4 className="text-lg font-semibold">Progress Trend</h4>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="session" />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary) / 0.3)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Detailed Metrics with Enhanced Progress Bars */}
      <Card className="glass-card border-primary/20 p-6">
        <h4 className="text-lg font-semibold mb-6">Detailed Analysis</h4>
        
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
                    <span className="text-lg font-bold text-primary">
                      {score}
                    </span>
                    <span className="text-sm text-muted-foreground">/100</span>
                  </div>
                </div>
                
                <div className="relative">
                  <Progress value={score} className="h-3" />
                  <div
                    className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-1000 shadow-lg ${getProgressColor(score)}`}
                    style={{ width: `${score}%` }}
                  />
                  {/* Score marker */}
                  <div 
                    className="absolute -top-1 w-5 h-5 rounded-full bg-white border-2 border-primary shadow-lg transform -translate-x-1/2 transition-all duration-1000"
                    style={{ left: `${score}%` }}
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