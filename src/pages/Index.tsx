import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Play, Pause, RotateCcw, Activity } from "lucide-react";
import { NarrativeGenerator } from "@/components/NarrativeGenerator";
import { SpeechAnalysis } from "@/components/SpeechAnalysis";
import { LevelDisplay } from "@/components/LevelDisplay";
import { useToast } from "@/hooks/use-toast";

export interface SpeechResult {
  level: "core" | "clear" | "fluid" | "bold" | "pro";
  scores: {
    tonalVariation: number;
    vocalRange: number;
    confidence: number;
    energy: number;
    clarity: number;
    emotionalExpression: number;
  };
  emotion: string;
  feedback: string[];
}

const Index = () => {
  const [currentNarrative, setCurrentNarrative] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SpeechResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      
      const chunks: BlobPart[] = [];
      mediaRecorder.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      setIsRecording(true);
      setRecordingTime(0);
      mediaRecorder.current.start();
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      toast({
        title: "Recording Started",
        description: "Begin reading the narrative aloud",
      });
    } catch (error) {
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access to record your speech",
        variant: "destructive",
      });
    }
  }, [toast]);

  const stopRecording = useCallback(() => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      toast({
        title: "Recording Complete",
        description: "Click 'Analyze Speech' to see your results",
      });
    }
  }, [isRecording, toast]);

  const playRecording = useCallback(() => {
    if (audioBlob && !isPlaying) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      setIsPlaying(true);
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
    } else if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [audioBlob, isPlaying]);

  const analyzeSpeech = useCallback(async () => {
    if (!audioBlob || !currentNarrative) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis result based on narrative emotion
    const emotionScores = {
      excitement: { energy: 85, confidence: 78, emotionalExpression: 82 },
      sorrow: { energy: 45, confidence: 65, emotionalExpression: 75 },
      anger: { energy: 90, confidence: 85, emotionalExpression: 88 },
      fear: { energy: 60, confidence: 55, emotionalExpression: 70 },
      joy: { energy: 88, confidence: 82, emotionalExpression: 85 }
    };
    
    const baseScores = emotionScores[currentNarrative.emotion as keyof typeof emotionScores] || 
                      { energy: 70, confidence: 70, emotionalExpression: 70 };
    
    const variance = () => Math.random() * 20 - 10; // ±10 variation
    
    const scores = {
      tonalVariation: Math.max(20, Math.min(100, 75 + variance())),
      vocalRange: Math.max(20, Math.min(100, 70 + variance())),
      confidence: Math.max(20, Math.min(100, baseScores.confidence + variance())),
      energy: Math.max(20, Math.min(100, baseScores.energy + variance())),
      clarity: Math.max(20, Math.min(100, 80 + variance())),
      emotionalExpression: Math.max(20, Math.min(100, baseScores.emotionalExpression + variance()))
    };
    
    const averageScore = Object.values(scores).reduce((a, b) => a + b, 0) / 6;
    
    let level: SpeechResult["level"];
    let feedback: string[];
    
    if (averageScore >= 85) {
      level = "pro";
      feedback = ["Exceptional vocal control", "Masterful emotional delivery", "Outstanding audience engagement"];
    } else if (averageScore >= 75) {
      level = "bold";
      feedback = ["Strong confidence in delivery", "Good tonal variation", "Work on maintaining consistency"];
    } else if (averageScore >= 65) {
      level = "fluid";
      feedback = ["Smooth delivery overall", "Practice emotional expression", "Increase vocal range"];
    } else if (averageScore >= 50) {
      level = "clear";
      feedback = ["Basic proficiency achieved", "Focus on confidence building", "Practice tonal variation"];
    } else {
      level = "core";
      feedback = ["Great start! Keep practicing", "Work on clarity and pace", "Focus on reducing hesitations"];
    }
    
    const result: SpeechResult = {
      level,
      scores,
      emotion: currentNarrative.emotion,
      feedback
    };
    
    setAnalysisResult(result);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis Complete",
      description: `You achieved ${level.toUpperCase()} speaker level!`,
    });
  }, [audioBlob, currentNarrative, toast]);

  const resetSession = useCallback(() => {
    setAudioBlob(null);
    setAnalysisResult(null);
    setIsRecording(false);
    setIsPlaying(false);
    setRecordingTime(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen animated-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold gradient-primary bg-clip-text text-transparent mb-4 floating">
            NEURA
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Personalized Speech Development System powered by AI
          </p>
          <Badge variant="secondary" className="mt-4">
            <Activity className="w-4 h-4 mr-2" />
            Speech Analysis Engine
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Narrative & Controls */}
          <div className="space-y-6">
            <NarrativeGenerator 
              onNarrativeChange={setCurrentNarrative}
              currentNarrative={currentNarrative}
            />
            
            {currentNarrative && (
              <Card className="glass-card border-primary/20 p-6">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Speech Recording</h3>
                    <p className="text-sm text-muted-foreground">
                      Read the narrative above with proper {currentNarrative.emotion} emotion
                    </p>
                  </div>
                  
                  {/* Recording Controls */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center space-x-4">
                      <Button
                        size="lg"
                        onClick={isRecording ? stopRecording : startRecording}
                        variant={isRecording ? "destructive" : "default"}
                        className={`relative ${isRecording ? 'recording-pulse' : ''}`}
                      >
                        {isRecording ? (
                          <>
                            <MicOff className="w-5 h-5 mr-2" />
                            Stop Recording
                          </>
                        ) : (
                          <>
                            <Mic className="w-5 h-5 mr-2" />
                            Start Recording
                          </>
                        )}
                      </Button>
                      
                      {audioBlob && (
                        <Button
                          variant="outline"
                          onClick={playRecording}
                          disabled={isRecording}
                        >
                          {isPlaying ? (
                            <Pause className="w-4 h-4 mr-2" />
                          ) : (
                            <Play className="w-4 h-4 mr-2" />
                          )}
                          {isPlaying ? 'Pause' : 'Play'}
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        onClick={resetSession}
                        size="sm"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                    
                    {isRecording && (
                      <div className="text-center">
                        <div className="text-2xl font-mono text-primary">
                          {formatTime(recordingTime)}
                        </div>
                        <div className="text-sm text-muted-foreground">Recording...</div>
                      </div>
                    )}
                    
                    {audioBlob && !isRecording && (
                      <Button
                        onClick={analyzeSpeech}
                        disabled={isAnalyzing}
                        className="gradient-primary"
                        size="lg"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Analyzing...
                          </>
                        ) : (
                          "Analyze Speech"
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            )}
          </div>
          
          {/* Right Column - Results */}
          <div className="space-y-6">
            {analysisResult && (
              <>
                <LevelDisplay result={analysisResult} />
                <SpeechAnalysis result={analysisResult} />
              </>
            )}
            
            {!analysisResult && (
              <Card className="glass-card border-muted/20 p-8">
                <div className="text-center text-muted-foreground">
                  <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Ready for Analysis</h3>
                  <p>Record your speech reading the narrative to see your personalized analysis and improvement suggestions.</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;