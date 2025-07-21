import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Sparkles } from "lucide-react";

interface Narrative {
  id: string;
  text: string;
  emotion: string;
  description: string;
}

const narratives: Narrative[] = [
  {
    id: "1",
    text: "I never thought I could climb to the top of that mountain, but as I stood there watching the sunrise paint the sky in brilliant oranges and pinks, I felt an incredible rush of pride and accomplishment. Every step of that difficult journey was worth this magical moment!",
    emotion: "excitement",
    description: "Express pure joy and triumph"
  },
  {
    id: "2", 
    text: "The old photograph fell from the dusty book, showing my grandmother's gentle smile one last time. I held it close to my heart, feeling the weight of all our lost conversations and the stories I'll never hear again.",
    emotion: "sorrow",
    description: "Convey deep sadness and loss"
  },
  {
    id: "3",
    text: "This is completely unacceptable! How could you make such a decision without consulting anyone? The consequences of your actions will affect everyone here, and frankly, I'm furious that you thought this was okay!",
    emotion: "anger",
    description: "Show controlled fury and indignation"
  },
  {
    id: "4",
    text: "The sound of footsteps echoing in the empty hallway made my heart race. I pressed myself against the wall, trying to stay invisible, as shadows danced menacingly in the flickering light. What if someone was actually there?",
    emotion: "fear",
    description: "Express anxiety and terror"
  },
  {
    id: "5",
    text: "When I saw my best friend walking through that door after two years apart, I couldn't contain my happiness! We ran toward each other laughing and crying at the same time. Nothing in the world could have made me happier than this perfect reunion!",
    emotion: "joy",
    description: "Radiate pure happiness and delight"
  },
  {
    id: "6",
    text: "I can't believe we actually won the championship! All those months of practice, the early morning training sessions, the setbacks and victories - it all led to this incredible moment. We proved that dreams really do come true when you never give up!",
    emotion: "excitement",
    description: "Channel triumph and exhilaration"
  },
  {
    id: "7",
    text: "As I walked through the empty house for the last time, each room whispered memories of the family that once filled these walls with laughter. Now only silence remains, heavy with the echoes of a lifetime that has passed.",
    emotion: "sorrow", 
    description: "Express melancholy and nostalgia"
  },
  {
    id: "8",
    text: "How dare you question my integrity! I have worked tirelessly for this organization for fifteen years, and I will not stand here and listen to these baseless accusations. This is an outrageous attack on my character!",
    emotion: "anger",
    description: "Show righteous indignation"
  },
  {
    id: "9",
    text: "The storm was getting worse, and I realized I was completely lost in the forest. Every tree looked the same, every path led nowhere, and darkness was falling fast. My phone had no signal, and panic was setting in.",
    emotion: "fear",
    description: "Convey growing panic and helplessness"
  },
  {
    id: "10",
    text: "Surprise! The entire family had gathered for my birthday, even my cousin from Australia who I hadn't seen in five years. The room erupted in laughter and cheers as I stood there overwhelmed by so much love and thoughtfulness!",
    emotion: "joy",
    description: "Express overwhelming happiness and gratitude"
  }
];

interface NarrativeGeneratorProps {
  onNarrativeChange: (narrative: Narrative) => void;
  currentNarrative: Narrative | null;
}

export const NarrativeGenerator = ({ onNarrativeChange, currentNarrative }: NarrativeGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNarrative = () => {
    setIsGenerating(true);
    
    // Add a small delay for better UX
    setTimeout(() => {
      let newNarrative;
      do {
        newNarrative = narratives[Math.floor(Math.random() * narratives.length)];
      } while (currentNarrative && newNarrative.id === currentNarrative.id);
      
      onNarrativeChange(newNarrative);
      setIsGenerating(false);
    }, 500);
  };

  // Generate initial narrative on mount
  useEffect(() => {
    if (!currentNarrative) {
      generateNarrative();
    }
  }, []);

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "excitement":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "sorrow":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "anger":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "fear":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "joy":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      default:
        return "bg-primary/20 text-primary border-primary/30";
    }
  };

  return (
    <Card className="glass-card border-primary/20 p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-primary" />
            Practice Narrative
          </h2>
          <Button
            onClick={generateNarrative}
            disabled={isGenerating}
            variant="outline"
            size="sm"
          >
            {isGenerating ? (
              <div className="w-4 h-4 animate-spin rounded-full border-2 border-primary border-t-transparent mr-2" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            New Narrative
          </Button>
        </div>

        {currentNarrative && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge className={getEmotionColor(currentNarrative.emotion)}>
                {currentNarrative.emotion.toUpperCase()}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {currentNarrative.description}
              </span>
            </div>
            
            <div className="p-4 bg-card/50 rounded-lg border border-border/50">
              <p className="text-foreground leading-relaxed text-lg">
                {currentNarrative.text}
              </p>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>Read this narrative aloud with the specified emotion. Focus on:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Matching your tone to the emotion</li>
                <li>Varying your vocal pitch and pace</li>
                <li>Speaking with confidence and clarity</li>
                <li>Expressing the feeling authentically</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};