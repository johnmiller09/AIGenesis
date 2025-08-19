import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Send, 
  Zap, 
  Bot, 
  User,
  Sparkles,
  Brain,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  model?: string;
  timestamp: Date;
}

const aiModels = [
  { name: 'GPT-4', icon: Brain, color: 'from-green-500 to-emerald-600' },
  { name: 'Claude', icon: Sparkles, color: 'from-orange-500 to-red-600' },
  { name: 'Gemini', icon: MessageSquare, color: 'from-blue-500 to-indigo-600' },
  { name: 'PaLM', icon: Bot, color: 'from-purple-500 to-pink-600' },
];

const Chat = () => {
  const { user, signOut } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate AI responses from different models
    setTimeout(() => {
      const responses = aiModels.map((model, index) => ({
        id: `${Date.now()}-${index}`,
        content: `This is a response from ${model.name}. ${input} - Here's how I would approach this question...`,
        role: 'assistant' as const,
        model: model.name,
        timestamp: new Date(),
      }));

      setMessages(prev => [...prev, ...responses]);
      setLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
            <h1 className="text-lg font-semibold">AI Chat</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="glass-card">
              {aiModels.length} Models Active
            </Badge>
            <Button variant="ghost" size="sm" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6 max-w-6xl">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
          {/* AI Models Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass-card border-primary/20 h-full">
              <CardHeader>
                <CardTitle className="text-lg">Active AI Models</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiModels.map((model) => {
                  const IconComponent = model.icon;
                  return (
                    <div key={model.name} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${model.color} flex items-center justify-center`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{model.name}</p>
                        <p className="text-xs text-muted-foreground">Active</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col">
            <Card className="glass-card border-primary/20 flex-1 flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">Multi-Model Chat</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <ScrollArea className="flex-1 mb-4">
                  <div className="space-y-4 pr-4">
                    {messages.length === 0 && (
                      <div className="text-center py-12 text-muted-foreground">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Start a conversation with AI models</p>
                        <p className="text-sm">Type your message below to get responses from multiple AI models</p>
                      </div>
                    )}
                    
                    {messages.map((message) => (
                      <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                        {message.role === 'assistant' && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-primary-foreground" />
                          </div>
                        )}
                        
                        <div className={`max-w-[80%] ${message.role === 'user' ? 'order-first' : ''}`}>
                          {message.model && (
                            <Badge variant="outline" className="mb-2 text-xs">
                              {message.model}
                            </Badge>
                          )}
                          <div className={`p-3 rounded-lg ${
                            message.role === 'user' 
                              ? 'bg-primary text-primary-foreground ml-auto' 
                              : 'bg-muted/50'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                        
                        {message.role === 'user' && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {loading && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-primary-foreground animate-pulse" />
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="text-sm text-muted-foreground">AI models are thinking...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask something to all AI models..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    className="flex-1"
                  />
                  <Button onClick={handleSend} disabled={loading || !input.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;