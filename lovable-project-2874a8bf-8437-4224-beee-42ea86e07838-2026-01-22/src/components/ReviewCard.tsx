import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { Review } from '@/lib/types';

interface ReviewCardProps {
  review: Review;
  variant?: 'default' | 'compact';
}

export function ReviewCard({ review, variant = 'default' }: ReviewCardProps) {
  const isCompact = variant === 'compact';
  
  return (
    <Link 
      to={`/reviews/${review.id}`}
      className="group block"
    >
      <article className={cn(
        'bg-surface-alt rounded-xl border border-border overflow-hidden card-hover',
        isCompact ? 'flex gap-4 p-3' : ''
      )}>
        <div className={cn(
          'overflow-hidden',
          isCompact ? 'w-20 h-20 rounded-lg flex-shrink-0' : 'aspect-square'
        )}>
          <img 
            src={review.coverImage} 
            alt={`${review.album} by ${review.artist}`}
            className="w-full h-full object-cover image-zoom"
          />
        </div>
        
        <div className={cn(isCompact ? 'flex-1 min-w-0' : 'p-4')}>
          <div className="flex items-center gap-2 mb-2">
            <span className="meta-label">{review.genre}</span>
            <span className="text-primary font-bold text-sm">{review.rating}/10</span>
          </div>
          
          <h3 className={cn(
            'font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1',
            isCompact ? 'text-sm' : 'text-lg'
          )}>
            {review.album}
          </h3>
          
          <p className="text-muted-foreground text-sm">{review.artist}</p>
          
          {!isCompact && (
            <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
              {review.excerpt}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
