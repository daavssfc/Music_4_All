import { useState } from 'react';
import { Play, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import type { MediaItem } from '@/lib/types';

interface MediaCardProps {
  item: MediaItem;
}

export function MediaCard({ item }: MediaCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <article 
        className="bg-surface-alt rounded-xl border border-border overflow-hidden card-hover group cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="aspect-video overflow-hidden relative">
          <img 
            src={item.thumbnail} 
            alt={item.title}
            className="w-full h-full object-cover image-zoom"
          />
          {item.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center bg-card/40 group-hover:bg-card/20 transition-colors">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                <Play className="w-6 h-6 text-primary-foreground ml-1" />
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <span className="meta-label text-primary">
            {item.type === 'video' ? 'Video' : 'Gallery'}
          </span>
          
          <h3 className="font-semibold text-foreground mt-1 group-hover:text-primary transition-colors line-clamp-2">
            {item.title}
          </h3>
          
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
            {item.description}
          </p>
        </div>
      </article>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl bg-card border-border p-0 overflow-hidden">
          <DialogClose className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-card/80 flex items-center justify-center text-foreground hover:bg-card">
            <X className="w-4 h-4" />
          </DialogClose>
          
          {item.type === 'video' ? (
            <div className="aspect-video">
              <iframe
                src={item.src}
                title={item.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <img 
              src={item.src} 
              alt={item.title}
              className="w-full h-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
