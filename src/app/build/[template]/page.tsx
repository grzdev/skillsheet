
'use client';

import { useState, useEffect, useTransition, useRef, use } from 'react';
import { useParams } from 'next/navigation';
import { nanoid } from 'nanoid';
import ChatInterface from '@/components/ChatInterface';
import ResumePreview from '@/components/ResumePreview';
import type { Message } from '@/lib/types';
import { generateResumeAction, editResumeAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import type { Textarea } from '@/components/ui/textarea';

export default function BuilderPage() {
  const params = useParams<{ template: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [resumeText, setResumeText] = useState<string>('');
  const [phase, setPhase] = useState<'initial' | 'editing' | 'preview' | 'done'>('initial');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const chatInputRef = useRef<HTMLTextAreaElement>(null);
  
  // Safely derive templateName from params at the page level.
  const templateName = params.template ? params.template.charAt(0).toUpperCase() + params.template.slice(1) : '';

  useEffect(() => {
    const firstMessage: Message = {
      id: nanoid(),
      role: 'assistant',
      content: `Hello! I'm Skill Sheet. To start, please provide your name and some details about your work history, skills, and education in the text box below. \n\nWhen you're ready, click "Generate Resume". I'll create a complete resume for you, filling in any missing details.`,
    };
    setMessages([firstMessage]);
  }, []);

  const handleSendMessage = (content: string) => {
    // This is now only for the editing phase, triggered by the main button
    if (phase === 'editing') {
       const userMessage: Message = { id: nanoid(), role: 'user', content };
       setMessages((prev) => [...prev, userMessage]);
       handleEdit(content);
    }
  };

  const handleGenerate = () => {
    const userInput = chatInputRef.current?.value;
    if (!userInput || !userInput.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please provide some details before generating the resume.',
        variant: 'destructive',
      });
      return;
    }
    
    // Add user input as a message to the chat
    const userMessage: Message = { id: nanoid(), role: 'user', content: userInput };

    const assistantMessage: Message = {
      id: nanoid(),
      role: 'assistant',
      content: "Great! I'm now generating the first draft of your resume. This might take a moment.",
    };
    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    
    if (chatInputRef.current) {
        chatInputRef.current.value = '';
    }

    const userName = userInput.split('\n').find(line => line.toLowerCase().includes('name is'))?.split('is')[1]?.trim() || 'Your Name';

    startTransition(async () => {
      const result = await generateResumeAction(userInput, userName);
      if (result.startsWith('Sorry')) {
        toast({ title: 'Error', description: result, variant: 'destructive' });
        const errorMessage: Message = { id: nanoid(), role: 'assistant', content: result };
        setMessages((prev) => [...prev, errorMessage]);
      } else {
        setResumeText(result);
        setPhase('editing');
        const nextStepMessage: Message = {
          id: nanoid(),
          role: 'assistant',
          content: 'Here is the first draft. You can now ask for edits. For example, "Make the summary more concise" or "Change the second job description to be more results-oriented". When you are happy with the result, click "Preview Resume".',
        };
        setMessages((prev) => [...prev, nextStepMessage]);
      }
    });
  };

  const handleEdit = (instruction: string) => {
     startTransition(async () => {
       const result = await editResumeAction(resumeText, instruction);
        if (chatInputRef.current) {
            chatInputRef.current.value = '';
        }
       if (result.startsWith('Sorry')) {
        toast({ title: 'Error', description: result, variant: 'destructive' });
        const errorMessage: Message = { id: nanoid(), role: 'assistant', content: result };
        setMessages((prev) => [...prev, errorMessage]);
      } else {
        setResumeText(result);
        const confirmationMessage: Message = { id: nanoid(), role: 'assistant', content: "I've updated your resume. What's next?" };
        setMessages((prev) => [...prev, confirmationMessage]);
      }
     });
  };

  const handleApplyEdit = () => {
    const instruction = chatInputRef.current?.value;
    if (!instruction || !instruction.trim()) {
      toast({
        title: 'Instruction Required',
        description: 'Please provide an instruction for editing the resume.',
        variant: 'destructive',
      });
      return;
    }
    handleSendMessage(instruction);
  };


  const handlePreview = () => {
    setPhase('preview');
    const previewMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: "Here is the final preview. If you're happy with it, click 'Finalize Resume'. To make more changes, click 'Back to Editing'.",
    };
    setMessages((prev) => [...prev, previewMessage]);
  }

  const handleBackToEditing = () => {
    setPhase('editing');
    const editingMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: "You can now continue editing your resume.",
    };
    setMessages((prev) => [...prev, editingMessage]);
  }
  
  const handleFinalize = () => {
    setPhase('done');
    const finalMessage: Message = {
      id: nanoid(),
      role: 'assistant',
      content: "Your resume is complete! You can now print it or save it as a PDF using the buttons above the preview.",
    };
    setMessages((prev) => [...prev, finalMessage]);
  }

  const getPrimaryAction = () => {
    switch (phase) {
        case 'initial':
            return {
                label: 'Generate Resume',
                action: handleGenerate,
            };
        case 'editing':
            return {
                label: 'Apply Edit',
                action: handleApplyEdit,
            };
        case 'preview':
             return {
                label: 'Finalize Resume',
                action: handleFinalize,
            };
        default:
            return null;
    }
  }
  
  const getSecondaryAction = () => {
    if (phase === 'editing') {
      return {
        label: 'Preview Resume',
        action: handlePreview,
      };
    }
    return null;
  }

  const primaryAction = getPrimaryAction();
  const secondaryAction = getSecondaryAction();


  return (
    <div className="h-full flex flex-col px-4 py-6 md:px-8 md:py-10">
      <div className="flex-1 container mx-auto p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start min-h-0 rounded-xl bg-white shadow-sm">
        <div className="flex flex-col h-full max-h-[calc(100vh-120px)] min-w-0">
          <ChatInterface
            ref={chatInputRef}
            messages={messages}
            isLoading={isPending}
            phase={phase}
          />
          {/* Mobile Resume Preview: always show below buttons */}
          <div className="block lg:hidden mt-6">
            <ResumePreview resumeText={resumeText} templateName={templateName} />
          </div>
          <div className='flex gap-4 mt-4 no-print'>
            {phase === 'preview' && (
              <Button onClick={handleBackToEditing} disabled={isPending} className="w-full" variant="outline">
                Back to Editing
              </Button>
            )}
            {secondaryAction && (
                 <Button onClick={secondaryAction.action} disabled={isPending} className="w-full" variant="outline">
                    {secondaryAction.label}
                </Button>
            )}
            {primaryAction && (
              <Button onClick={primaryAction.action} disabled={isPending} className="w-full">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {primaryAction.label}
              </Button>
            )}
          </div>
        </div>
        {/* Desktop Resume Preview */}
        <div className="h-full max-h-[calc(100vh-120px)] hidden lg:flex flex-col min-w-0">
          <div className="w-full h-full min-h-0">
            <ResumePreview resumeText={resumeText} templateName={templateName} />
          </div>
        </div>
      </div>
    </div>
  );
}
