'use client';

import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! I am your legal AI assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      // @ts-ignore
      setMessages([...messages, { from: 'user', text: input }]);
      // Here you would typically call an AI service
      setInput('');
    }
  };

  return (
    <div className="flex flex-col flex-1 h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center p-4 md:p-8">
        <Card className="w-full max-w-4xl flex flex-col flex-1">
          <CardContent className="p-6 flex flex-col flex-1">
            <ScrollArea className="flex-1 mb-4 pr-4">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-end gap-2 ${
                      msg.from === 'bot' ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div
                      className={`max-w-md p-3 rounded-lg ${
                        msg.from === 'bot'
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about a legal topic..."
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button onClick={handleSend}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
