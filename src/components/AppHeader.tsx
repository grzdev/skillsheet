import Link from 'next/link';
import { FileText } from 'lucide-react';

const AppHeader = () => {
  return (
    <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-10 no-print">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="w-7 h-7 text-primary" />
            <span className="text-xl font-bold text-primary tracking-tight">
              Skill Sheet
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
