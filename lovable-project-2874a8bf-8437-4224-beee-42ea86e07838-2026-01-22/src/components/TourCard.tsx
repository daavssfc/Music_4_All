import { Link } from 'react-router-dom';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { Tour } from '@/lib/types';

interface TourCardProps {
  tour: Tour;
  variant?: 'default' | 'compact';
}

export function TourCard({ tour, variant = 'default' }: TourCardProps) {
  const isCompact = variant === 'compact';
  const formattedDate = new Date(tour.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <article className={cn(
      'bg-surface-alt rounded-xl border border-border overflow-hidden card-hover',
      isCompact ? 'flex items-center gap-4 p-4' : ''
    )}>
      {!isCompact && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={tour.image} 
            alt={`${tour.artist} at ${tour.venue}`}
            className="w-full h-full object-cover image-zoom"
          />
        </div>
      )}
      
      <div className={cn(isCompact ? 'flex-1 min-w-0' : 'p-4')}>
        <span className="meta-label text-primary mb-1 block">{tour.tourName}</span>
        
        <h3 className={cn(
          'font-semibold text-foreground',
          isCompact ? 'text-base' : 'text-lg mb-3'
        )}>
          {tour.artist}
        </h3>
        
        <div className={cn(
          'flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground',
          isCompact ? '' : 'mb-4'
        )}>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            {tour.city}
          </span>
        </div>
        
        {!isCompact && (
          <p className="text-muted-foreground text-sm mb-4">{tour.venue}</p>
        )}
      </div>
      
      {!isCompact && (
        <div className="px-4 pb-4">
          <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to={tour.ticketLink}>
              <Ticket className="w-4 h-4 mr-2" />
              Get Tickets
            </Link>
          </Button>
        </div>
      )}
      
      {isCompact && (
        <Button asChild size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-shrink-0">
          <Link to={tour.ticketLink}>
            <Ticket className="w-4 h-4" />
          </Link>
        </Button>
      )}
    </article>
  );
}
