
'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

type TemplateCardProps = {
  name: string;
  imageUrl?: string;
  hint: string;
  previewComponent?: React.ReactNode;
};

const TemplateCard = (props: TemplateCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer group">
      <CardContent className="p-0 bg-gray-200 aspect-[400/565] flex items-center justify-center">
        {props.previewComponent ? (
          <div className="w-full h-full">
             {props.previewComponent}
          </div>
        ) : (
          <Image
            src={props.imageUrl || 'https://placehold.co/400x565'}
            alt={`Preview of ${props.name} template`}
            width={400}
            height={565}
            className="object-cover w-full h-auto"
            data-ai-hint={props.hint}
          />
        )}
      </CardContent>
      <CardFooter className="p-4 bg-card">
        <h3 className="text-lg font-semibold text-card-foreground">{props.name}</h3>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
