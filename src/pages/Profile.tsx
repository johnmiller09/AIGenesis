import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  User, 
  Zap, 
  Mail, 
  Calendar,
  Crown,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Profile = () => {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    subscription_tier: 'free'
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile({
          full_name: data.full_name || '',
          email: data.email || user?.email || '',
          subscription_tier: data.subscription_tier || 'free'
        });
      } else {
        // Create profile if it doesn't exist
        setProfile({
          full_name: user?.user_metadata?.full_name || '',
          email: user?.email || '',
          subscription_tier: 'free'
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          full_name: profile.full_name,
          email: profile.email,
          subscription_tier: profile.subscription_tier
        });

      if (error) throw error;

      setMessage('Profile updated successfully!');
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getSubscriptionBadge = (tier: string) => {
    switch (tier) {
      case 'pro':
        return <Badge className="bg-gradient-to-r from-primary to-accent">Pro</Badge>;
      case 'enterprise':
        return <Badge variant="secondary">Enterprise</Badge>;
      default:
        return <Badge variant="outline">Free</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      {/* Header */}
      <header className="border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">AI Fiesta</span>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-lg font-semibold">Profile Settings</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-2xl">
        {/* Profile Info */}
        <Card className="glass-card border-primary/20 mb-6">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-xl">{profile.full_name || 'User'}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {profile.email}
                </CardDescription>
              </div>
              {getSubscriptionBadge(profile.subscription_tier)}
            </div>
          </CardHeader>
        </Card>

        {/* Edit Profile */}
        <Card className="glass-card border-primary/20 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Edit Profile
            </CardTitle>
            <CardDescription>
              Update your personal information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={profile.full_name}
                onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
                disabled
              />
              <p className="text-sm text-muted-foreground">
                Email cannot be changed here. Please contact support to update your email.
              </p>
            </div>

            <Button onClick={updateProfile} disabled={loading} className="w-full">
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>

            {message && (
              <Alert className={message.includes('Error') ? 'border-destructive/50 text-destructive' : 'border-primary/50 text-primary'}>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Subscription Info */}
        <Card className="glass-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5" />
              Subscription
            </CardTitle>
            <CardDescription>
              Manage your AI Fiesta subscription
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
              <div>
                <p className="font-medium">Current Plan</p>
                <p className="text-sm text-muted-foreground">
                  {profile.subscription_tier === 'free' && 'Free - Limited access to AI models'}
                  {profile.subscription_tier === 'pro' && 'Pro - Full access to all AI models'}
                  {profile.subscription_tier === 'enterprise' && 'Enterprise - Custom solution'}
                </p>
              </div>
              {getSubscriptionBadge(profile.subscription_tier)}
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Member since {new Date(user?.created_at || '').toLocaleDateString()}</span>
            </div>

            {profile.subscription_tier === 'free' && (
              <Link to="/#pricing">
                <Button className="w-full" variant="hero">
                  Upgrade to Pro
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;