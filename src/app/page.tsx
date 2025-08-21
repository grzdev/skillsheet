
import Link from 'next/link';
import TemplateCard from '@/components/TemplateCard';
import { FileText } from 'lucide-react';
import ModernTemplatePreview from '@/components/templates/ModernTemplatePreview';
import SerifTemplatePreview from '@/components/templates/SerifTemplatePreview';
import CoralTemplatePreview from '@/components/templates/CoralTemplatePreview';
import ModernWriterTemplatePreview from '@/components/templates/ModernWriterTemplatePreview';

const templates = [
  { name: 'Coral', slug: 'coral', hint: 'classic resume', previewComponent: <CoralTemplatePreview /> },
  { name: 'Modern', slug: 'modern', hint: 'modern resume', previewComponent: <ModernTemplatePreview /> },
  { name: 'Serif', slug: 'serif', hint: 'academic resume', previewComponent: <SerifTemplatePreview /> },
  { name: 'Modern Writer', slug: 'modern-writer', hint: 'creative resume', previewComponent: <ModernWriterTemplatePreview /> },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="text-center mb-12">
        <div className="inline-block bg-primary text-primary-foreground p-4 rounded-full mb-4 shadow-lg">
          <FileText className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">Skill Sheet</h1>
        <p className=" text-2xl text-foreground/80 max-w-2xl mx-auto">
          A Resume Builder
        </p>
      </div>

      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-semibold text-center mb-8 text-foreground">1. Choose Your Template</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <Link key={template.slug} href={`/build/${template.slug}`} passHref>
              <TemplateCard {...template} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
