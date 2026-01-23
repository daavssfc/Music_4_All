import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface FeaturedImageFrameProps {
  src: string;
  alt: string;
  ratio?: number;
  overlay?: React.ReactNode;
  className?: string;
}

export function FeaturedImageFrame({ 
  src, 
  alt, 
  ratio = 4/3, 
  overlay,
  className 
}: FeaturedImageFrameProps) {
  return (
    <div className={cn(
      'relative rounded-xl border border-border overflow-hidden group',
      className
    )}>
      <AspectRatio ratio={ratio}>
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover image-zoom"
        />
      </AspectRatio>
      {overlay && (
        <div className="absolute inset-0 pointer-events-none">
          {overlay}
        </div>
      )}
    </div>
  );
}
