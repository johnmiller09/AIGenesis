import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Settings, 
  User, 
  Crown, 
  Zap,
  BarChart3,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      {/* Header */}
      <header className="border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">AI Fiesta</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="glass-card">
              Pro Plan
            </Badge>
            <Button variant="ghost" size="sm" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.user_metadata?.full_name || user?.email}!
          </h1>
          <p className="text-muted-foreground">
            Ready to chat with the world's most powerful AI models?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
            <Link to="/chat">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <MessageSquare className="w-6 h-6 text-primary" />
                <div className="ml-4">
                  <CardTitle className="text-lg">Start Chatting</CardTitle>
                  <CardDescription>
                    Chat with multiple AI models simultaneously
                  </CardDescription>
                </div>
              </CardHeader>
            </Link>
          </Card>

          <Card className="glass-card border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
            <Link to="/profile">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <User className="w-6 h-6 text-primary" />
                <div className="ml-4">
                  <CardTitle className="text-lg">Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your account and preferences
                  </CardDescription>
                </div>
              </CardHeader>
            </Link>
          </Card>

          <Card className="glass-card border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Crown className="w-6 h-6 text-primary" />
              <div className="ml-4">
                <CardTitle className="text-lg">Upgrade Plan</CardTitle>
                <CardDescription>
                  Get access to more AI models
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Messages Today</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">AI Models Used</p>
                  <p className="text-2xl font-bold">6</p>
                </div>
                <Zap className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Accuracy Score</p>
                  <p className="text-2xl font-bold">94%</p>
                </div>
                <Star className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="glass-card border-primary/20">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest AI conversations and interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/20">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Multi-model comparison</p>
                  <p className="text-sm text-muted-foreground">Compared responses from GPT-4, Claude, and Gemini</p>
                </div>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/20">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Profile updated</p>
                  <p className="text-sm text-muted-foreground">Changed display name and preferences</p>
                </div>
                <p className="text-sm text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;