'use client';

import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud } from 'lucide-react';
import { useState, useRef } from 'react';

export default function ComparePage() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  return (
    <div className="flex flex-col flex-1">
      <Header />
      <main className="flex-1 flex flex-col items-center p-4 md:p-8">
        <div className="w-full max-w-6xl text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-headline">
            Compare Two Legal Documents
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Paste the text of two documents below to see a side-by-side comparison and an AI-generated analysis of the differences.
          </p>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <DocumentInput text={text1} setText={setText1} title="Document 1" />
            <DocumentInput text={text2} setText={setText2} title="Document 2" />
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button size="lg" disabled={!text1.trim() || !text2.trim()}>
              Compare Documents
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

function DocumentInput({ text, setText, title }: { text: string, setText: (text: string) => void, title: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div
          className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg transition-colors duration-200 border-border hover:border-primary/50`}
        >
          <UploadCloud className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="font-semibold text-lg mb-2">Drag & drop your document here</p>
          <p className="text-muted-foreground mb-4">or</p>
          <Button onClick={triggerFileSelect}>
            Upload Document
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".txt,.md,.html,.pdf"
          />
        </div>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or Paste Text Below</span>
          </div>
        </div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your legal text here..."
          className="min-h-[200px] text-sm font-mono"
        />
      </CardContent>
    </Card>
  );
}
