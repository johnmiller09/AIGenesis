import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-chat-mockup.jpg";

export const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <Badge variant="secondary" className="w-fit glass-card border-primary/30">
              Built by Y Combinator Alumni
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                World's Most
                <br />
                <span className="text-gradient">Powerful AIs.</span>
                <br />
                One Subscription.
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Stop juggling tabs and subscriptions - AI Fiesta gives you access to all best-in-class AI models for just $12/month. That's almost half of what you'd pay for a single premium AI chat subscription.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Get Started Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="glass" size="lg">
                View Pricing
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Experience smarter & more accurate answers
            </p>
          </div>

          {/* Right Content - Chat Interface Mockup */}
          <div className="relative">
            <div className="relative">
              <img 
                src={heroImage} 
                alt="AI Chat Interface showing multiple AI models in conversation"
                className="rounded-2xl shadow-card border border-primary/20"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full blur-xl opacity-60 animate-pulse-glow"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-accent to-primary rounded-full blur-2xl opacity-40 animate-float"></div>
          </div>
        </div>
      </div>
    </section>
  );
};