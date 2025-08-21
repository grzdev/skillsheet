
'use client';

import React, { useRef, useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { parseResumeText } from '@/lib/parsers';
import type { ResumeData } from '@/lib/types';
import SerifTemplate from './templates/SerifTemplate';
import ModernTemplate from './templates/ModernTemplate';
import CoralTemplate from './templates/CoralTemplate';
import ModernWriterTemplate from './templates/ModernWriterTemplate';

interface ResumePreviewProps {
  resumeText: string;
  templateName: string;
}

const getTemplateComponent = (templateName: string) => {
    switch (templateName.toLowerCase()) {
        case 'serif':
            return SerifTemplate;
        case 'modern':
            return ModernTemplate;
        case 'coral':
            return CoralTemplate;
        case 'modern-writer':
            return ModernWriterTemplate;
        default:
            return SerifTemplate; // Default to Serif
    }
}

export default function ResumePreview({
  resumeText,
  templateName,
}: ResumePreviewProps) {
  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  

  const handleDownload = async () => {
    const resumeElement = resumePreviewRef.current;
    if (!resumeElement || !resumeText) return;

    setIsDownloading(true);

    try {
      const canvas = await html2canvas(resumeElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        backgroundColor: '#ffffff',
      });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      const pageWidthToCanvasRatio = pdfWidth / canvasWidth;
      
      const finalHeight = canvasHeight * pageWidthToCanvasRatio;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, finalHeight);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
        setIsDownloading(false);
    }
  };
  
  const resumeData = resumeText ? parseResumeText(resumeText) : null;
  const TemplateComponent = getTemplateComponent(templateName);

  return (
    <div className="flex flex-col h-full min-w-0">
      <Card className="flex-1 flex flex-col min-h-0">
        <CardHeader className="flex-row items-center justify-between no-print">
          <div>
            <CardTitle>Resume Preview</CardTitle>
            <CardDescription>
              Your generated resume. Using {templateName} style.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleDownload} disabled={!resumeText || isDownloading}>
                {isDownloading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
              Download as PDF
            </Button>
          </div>
        </CardHeader>
        <Separator className="no-print" />
        <CardContent className="p-0 flex-1 bg-gray-200 min-h-0">
          <div className="h-full overflow-auto py-8">
             <div className="w-full flex justify-center">
                <div ref={resumePreviewRef} className="bg-white shadow-lg w-[8.5in] min-h-[11in] origin-top scale-[0.8]">
                  {resumeData ? (
                     <TemplateComponent data={resumeData} />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <p>Your resume will appear here once generated.</p>
                    </div>
                  )}
                 </div>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
