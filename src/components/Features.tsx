import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Users, Mic, Image, Target, Clock } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Compare All Premium AIs at Once",
    description: "Free AI models often deliver restricted and inferior answers. With AI Fiesta, you get access to multiple top‑tier premium models, all in one place.",
    benefits: [
      "Save hours of manual comparison",
      "Customize your AI team instantly", 
      "Never miss the most accurate answer again"
    ]
  },
  {
    icon: Zap,
    title: "Prompt Boost – Instant Enhancement",
    description: "No need to craft the perfect question. Just write what you want, hit Enhance Prompt, and watch every AI respond with smarter, richer answers.",
    benefits: [
      "Turn rough ideas into perfect prompts",
      "Get 10x better responses instantly",
      "No prompt engineering skills needed"
    ]
  },
  {
    icon: Image,
    title: "Generate Images & Transcribe Audio",
    description: "Bring your creative and content ideas to life instantly with AI-powered image generation and fast, accurate audio transcription — no extra tools needed.",
    benefits: [
      "Generate high-quality images for any purpose",
      "Get instant, clear transcripts from your recorded audio",
      "Effortlessly edit outputs to meet specific project needs"
    ]
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold">
            One Window. Six Perspectives.
            <br />
            <span className="text-gradient">Achieve Optimal Efficiency.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every feature is designed to amplify your AI-powered productivity
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="glass-card border-primary/20 hover:border-primary/40 transition-all duration-300 group">
                <CardHeader className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Secondary Features */}
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Smart Accuracy</h3>
            <p className="text-muted-foreground text-sm">Compare responses side-by-side to find the most accurate answer every time.</p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Time Saving</h3>
            <p className="text-muted-foreground text-sm">Eliminate the need to switch between multiple AI platforms and subscriptions.</p>
          </div>
          
          <div className="text-center space-y-4 md:col-span-2 lg:col-span-1">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Mic className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Multi-Modal</h3>
            <p className="text-muted-foreground text-sm">Text, images, and audio - all AI capabilities unified in one powerful interface.</p>
          </div>
        </div>
      </div>
    </section>
  );
};