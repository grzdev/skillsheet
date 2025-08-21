
'use client';

import type { FormEvent } from 'react';
import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { CornerDownLeft, Loader2, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import type { Message } from '@/lib/types';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  phase: 'initial' | 'editing' | 'preview' | 'done';
}

const ChatInterface = forwardRef<HTMLTextAreaElement, ChatInterfaceProps>(({
  messages,
  isLoading,
  phase,
}, ref) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const localInputRef = useRef<HTMLTextAreaElement>(null);

  // Expose the localInputRef to the parent component
  useImperativeHandle(ref, () => localInputRef.current as HTMLTextAreaElement);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // Prevent default form submission. All actions are handled by dedicated buttons now.
    e.preventDefault();
  };
  
  const getPlaceholderText = () => {
    switch (phase) {
      case 'initial':
        return 'Tell me about your work, skills, and education...';
      case 'editing':
        return 'e.g., "Make my summary more concise"';
      case 'preview':
        return 'Previewing resume. No more edits allowed in chat.';
      case 'done':
        return 'Your resume is complete.';
      default:
        return 'Type your message...';
    }
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg shadow-lg border">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}
            >
              {message.role === 'assistant' && (
                <Avatar className="w-8 h-8 border-2 border-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    AI
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[75%] p-3 rounded-xl whitespace-pre-wrap text-sm ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {message.content}
              </div>
              {message.role === 'user' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-4">
              <Avatar className="w-8 h-8 border-2 border-primary">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  AI
                </AvatarFallback>
              </Avatar>
              <div className="max-w-[75%] p-3 rounded-lg bg-muted text-muted-foreground flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-card rounded-b-lg">
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            ref={localInputRef}
            name="message"
            rows={1}
            className="w-full min-h-[48px] resize-none"
            placeholder={getPlaceholderText()}
            disabled={isLoading || phase === 'done' || phase === 'preview'}
            aria-label="Chat input"
          />
        </form>
      </div>
    </div>
  );
});
ChatInterface.displayName = 'ChatInterface';
export default ChatInterface;
