import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { MetaPair } from '@/components/MetaPair';
import { FeaturedImageFrame } from '@/components/FeaturedImageFrame';
import { ReviewCard } from '@/components/ReviewCard';
import { NewsCard } from '@/components/NewsCard';
import { TourCard } from '@/components/TourCard';
import { Button } from '@/components/ui/button';
import { featuredReview, featuredNews, latestReviews, breakingNews, upcomingTours } from '@/lib/data';

const heroImage = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200';
const secondaryImage = 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600';

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="mb-12 lg:mb-16">
        {/* Meta Info Row */}
        <div className="flex flex-wrap gap-6 lg:gap-12 mb-6 lg:mb-8">
          <MetaPair 
            label="categories" 
            value="Album Reviews, Music News" 
          />
          <MetaPair 
            label="focus" 
            value="Tours & Concerts" 
          />
          <MetaPair 
            label="genres" 
            value="Indie • Hip-Hop / R&B" 
          />
        </div>
        
        {/* Hero Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Featured Image */}
          <div className="lg:col-span-2">
            <FeaturedImageFrame
              src={heroImage}
              alt="Featured Artist"
              ratio={16/10}
              overlay={
                <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm rounded-lg px-3 py-2">
                  <span className="meta-label">(updated)</span>
                  <p className="text-foreground text-sm font-medium">Weekly</p>
                </div>
              }
            />
          </div>
          
          {/* Side Content */}
          <div className="flex flex-col gap-4">
            <FeaturedImageFrame
              src={secondaryImage}
              alt="Concert Scene"
              ratio={4/3}
              className="flex-1"
            />
            
            <div className="bg-surface-alt rounded-xl border border-border p-4">
              <p className="text-foreground font-medium leading-relaxed">
                Your daily source for reviews, news, and upcoming tours.
              </p>
              <Button asChild className="mt-3 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/reviews">
                  Explore Reviews
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Three Column Cards */}
      <section className="grid md:grid-cols-3 gap-6">
        {/* Latest Reviews */}
        <div className="bg-surface-alt rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-primary font-bold text-lg">Latest Reviews</h2>
            <Link to="/reviews" className="text-secondary hover:text-primary text-sm font-medium transition-colors">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {latestReviews.map((review) => (
              <ReviewCard key={review.id} review={review} variant="compact" />
            ))}
          </div>
        </div>
        
        {/* Breaking News */}
        <div className="bg-surface-alt rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-primary font-bold text-lg">Breaking News</h2>
            <Link to="/news" className="text-secondary hover:text-primary text-sm font-medium transition-colors">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {breakingNews.map((article) => (
              <NewsCard key={article.id} article={article} variant="compact" />
            ))}
          </div>
        </div>
        
        {/* Upcoming Shows */}
        <div className="bg-surface-alt rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-primary font-bold text-lg">Upcoming Shows</h2>
            <Link to="/tours" className="text-secondary hover:text-primary text-sm font-medium transition-colors">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} variant="compact" />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
