import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out AI Fiesta",
    features: [
      "Access to 2 AI models",
      "10 messages per day",
      "Basic image generation",
      "Community support"
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "Pro",
    price: "$12",
    description: "Everything you need for AI productivity",
    features: [
      "Access to ALL premium AI models",
      "Unlimited messages",
      "Advanced image generation",
      "Audio transcription",
      "Prompt enhancement",
      "Side-by-side comparison",
      "Priority support",
      "Early access to new features"
    ],
    buttonText: "Start Pro Trial",
    buttonVariant: "hero" as const,
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team management",
      "Usage analytics",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "Custom billing"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "glass" as const,
    popular: false
  }
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-20 px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Simple, Transparent
            <br />
            <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your AI productivity needs. Upgrade or downgrade at any time.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative glass-card border-primary/20 hover:border-primary/40 transition-all duration-300 ${
                plan.popular ? 'scale-105 border-primary/40 shadow-glow' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-4xl font-bold">
                    {plan.price}
                    {plan.price !== "Custom" && <span className="text-lg text-muted-foreground">/month</span>}
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {plan.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  variant={plan.buttonVariant} 
                  className="w-full group"
                  size="lg"
                >
                  {plan.buttonText}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Value Proposition */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-muted-foreground">
            Compare: ChatGPT Plus ($20) + Claude Pro ($20) + Copilot Pro ($20) = $60/month
          </p>
          <p className="text-xl font-semibold">
            Get all premium AI models for just <span className="text-gradient">$12/month</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Save 80% while getting access to more AI models than any single subscription
          </p>
        </div>
      </div>
    </section>
  );
};