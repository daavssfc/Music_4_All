import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { NewsArticle } from '@/lib/types';

interface NewsCardProps {
  article: NewsArticle;
  variant?: 'default' | 'featured' | 'compact';
}

const categoryLabels: Record<NewsArticle['category'], string> = {
  announcement: 'Announcement',
  interview: 'Interview',
  feature: 'Feature',
  industry: 'Industry'
};

export function NewsCard({ article, variant = 'default' }: NewsCardProps) {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';
  
  return (
    <Link 
      to={`/news/${article.id}`}
      className="group block"
    >
      <article className={cn(
        'bg-surface-alt rounded-xl border border-border overflow-hidden card-hover',
        isFeatured ? 'md:flex' : '',
        isCompact ? 'flex gap-4 p-3' : ''
      )}>
        <div className={cn(
          'overflow-hidden',
          isFeatured ? 'md:w-1/2' : '',
          isCompact ? 'w-20 h-20 rounded-lg flex-shrink-0' : 'aspect-video'
        )}>
          <img 
            src={article.featuredImage} 
            alt={article.title}
            className="w-full h-full object-cover image-zoom"
          />
        </div>
        
        <div className={cn(
          isFeatured ? 'md:w-1/2 md:flex md:flex-col md:justify-center' : '',
          isCompact ? 'flex-1 min-w-0' : 'p-4'
        )}>
          <div className="flex items-center gap-3 mb-2">
            <span className="meta-label text-primary">
              {categoryLabels[article.category]}
            </span>
            <span className="text-muted-foreground text-xs">
              {new Date(article.publishDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
          
          <h3 className={cn(
            'font-semibold text-foreground group-hover:text-primary transition-colors',
            isFeatured ? 'text-xl md:text-2xl mb-3' : 'text-base',
            isCompact ? 'text-sm line-clamp-2' : 'line-clamp-2'
          )}>
            {article.title}
          </h3>
          
          {!isCompact && (
            <p className={cn(
              'text-muted-foreground text-sm line-clamp-2',
              isFeatured ? 'md:line-clamp-3' : ''
            )}>
              {article.excerpt}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
