import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { ReviewCard } from '@/components/ReviewCard';
import { MetaPair } from '@/components/MetaPair';
import { Button } from '@/components/ui/button';
import { reviews } from '@/lib/data';

const genres = ['All', 'Neo-Soul', 'Indie Rock', 'Hip-Hop', 'Art Pop', 'Electronic', 'R&B'];

export default function Reviews() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  
  const filteredReviews = selectedGenre === 'All' 
    ? reviews 
    : reviews.filter(r => r.genre === selectedGenre);
  
  return (
    <Layout>
      {/* Header */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-6 lg:gap-12 mb-6">
          <MetaPair label="page" value="Album Reviews" />
          <MetaPair label="total" value={`${reviews.length} Reviews`} />
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold text-primary tracking-tight mb-4">
          Album Reviews
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          In-depth reviews from our team of music critics. We listen so you don't have to—
          but trust us, you'll want to.
        </p>
      </section>
      
      {/* Genre Filter */}
      <section className="mb-8">
        <span className="meta-label mb-3 block">(filter by genre)</span>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedGenre(genre)}
              className={selectedGenre === genre 
                ? 'bg-primary text-primary-foreground' 
                : 'border-border text-foreground hover:border-primary hover:text-primary'
              }
            >
              {genre}
            </Button>
          ))}
        </div>
      </section>
      
      {/* Reviews Grid */}
      <section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
        
        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No reviews found for this genre.</p>
          </div>
        )}
      </section>
    </Layout>
  );
}
