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
    text: "What an incredible day this turned out to be! I woke up feeling nervous about the presentation, but as I stood before the audience, my confidence grew with each word. When they erupted in applause, I felt a surge of pure excitement and joy. However, when I remembered my grandmother who always believed in me but couldn't be there to see this moment, a wave of sadness washed over me. Then anger crept in as I thought about all the people who doubted my abilities. But that fear of failure that once paralyzed me now seemed so distant and conquered.",
    emotion: "mixed",
    description: "Express excitement, joy, sorrow, anger, and overcoming fear"
  },
  {
    id: "2", 
    text: "The graduation ceremony was everything I had dreamed of and more. Walking across that stage filled me with overwhelming joy and excitement for the future ahead. But as I looked into the crowd and saw the empty seat where my father should have been, grief struck my heart like lightning. The anger I felt toward the illness that took him away burned inside me, while fear about facing the world without his guidance made my hands tremble. Yet somehow, through all these emotions, I found the courage to smile and wave at my family.",
    emotion: "mixed",
    description: "Navigate joy, excitement, sorrow, anger, and fear in one narrative"
  },
  {
    id: "3",
    text: "The old photo album fell open to a picture of our family vacation from ten years ago. My heart filled with such pure joy seeing all of us together, laughing on the beach. The excitement of those summer days came flooding back - building sandcastles, racing through the waves. But then the crushing sorrow hit me as I realized my brother and I haven't spoken in two years after our terrible fight. The anger I still feel about his harsh words makes my chest tight, while the fear that we might never reconcile keeps me awake at night.",
    emotion: "mixed",
    description: "Blend joy, excitement, deep sorrow, lingering anger, and fear"
  },
  {
    id: "4",
    text: "Starting my own business has been an emotional rollercoaster unlike anything I've ever experienced. The excitement of seeing my first customer walk through the door was absolutely electrifying - pure joy coursed through my veins! But when the bills started piling up and customers stopped coming, the sorrow was overwhelming. I became angry at myself for taking such a foolish risk, and fear consumed me as I worried about losing everything I had worked for. Every emotion battles for control of my heart.",
    emotion: "mixed",
    description: "Express excitement, joy, sorrow, self-directed anger, and deep fear"
  },
  {
    id: "5",
    text: "The championship game was the culmination of years of training and sacrifice. As we scored the winning goal, pure excitement and joy exploded from every part of my being - we had actually done it! But looking at my injured teammate on the bench, unable to play in our moment of triumph, filled me with profound sorrow. I felt angry at the unfairness of sports injuries, and fear crept in about whether this success was truly deserved. These conflicting emotions made victory bittersweet.",
    emotion: "mixed",
    description: "Navigate excitement, joy, sorrow, anger, and fear in triumph"
  },
  {
    id: "6",
    text: "When I received the call about my promotion, excitement shot through me like electricity - this was the opportunity I had dreamed about for years! The joy was infectious as I called my family to share the news. But then reality set in, and sorrow filled my heart knowing I would have to move away from everyone I love. Anger bubbled up as I questioned why success has to come with such difficult choices, and fear about starting over in a new city made my stomach churn with anxiety.",
    emotion: "mixed",
    description: "Experience excitement, joy, sorrow, anger, and fear about change"
  },
  {
    id: "7",
    text: "The art gallery opening was supposed to be my big break. Walking into the space and seeing my paintings on display filled me with such excitement and joy - my dreams were finally becoming reality! But as I overheard critics dismissing my work as 'amateur,' crushing sorrow replaced my elation. Anger burned inside me at their harsh judgment, while fear whispered that maybe they were right. These emotions swirled together as I tried to maintain my composure in front of the crowd.",
    emotion: "mixed",
    description: "Convey excitement, joy, sorrow, anger, and self-doubt fear"
  },
  {
    id: "8",
    text: "Reuniting with my childhood best friend after fifteen years brought waves of pure joy and excitement - we picked up exactly where we left off! But as she told me about all the adventures and milestones I had missed, deep sorrow settled in my chest. I felt angry at life for pulling us in different directions, and fear gripped me that too much time had passed for us to truly reconnect. The complexity of these emotions made our reunion both beautiful and heartbreaking.",
    emotion: "mixed",
    description: "Express joy, excitement, sorrow, anger, and fear about lost time"
  },
  {
    id: "9",
    text: "The birth of my first child brought indescribable joy and excitement - holding this tiny miracle filled my heart to overflowing! But as I watched my partner struggle through a difficult labor, profound sorrow and worry consumed me. Anger flared at my helplessness in that moment, and overwhelming fear about my ability to be a good parent made my hands shake. Every emotion known to humanity seemed to crash over me in those precious first moments of parenthood.",
    emotion: "mixed",
    description: "Navigate joy, excitement, sorrow, anger, and parental fear"
  },
  {
    id: "10",
    text: "Standing at my mentor's retirement party, I felt such excitement and joy celebrating her incredible career and the impact she had made. Her wisdom had shaped so many lives, including mine. But the sorrow of knowing she wouldn't be there to guide me anymore was overwhelming. Anger surfaced as I thought about how undervalued teachers are in our society, and fear crept in about navigating my career without her steady presence. These emotions made my farewell speech both a celebration and a lament.",
    emotion: "mixed",
    description: "Express excitement, joy, sorrow, anger, and fear about transition"
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
      case "mixed":
        return "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30";
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