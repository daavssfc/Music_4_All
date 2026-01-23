import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { NewsCard } from '@/components/NewsCard';
import { MetaPair } from '@/components/MetaPair';
import { Button } from '@/components/ui/button';
import { newsArticles } from '@/lib/data';
import type { NewsArticle } from '@/lib/types';

const categories: Array<{ value: NewsArticle['category'] | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'announcement', label: 'Announcements' },
  { value: 'interview', label: 'Interviews' },
  { value: 'feature', label: 'Features' },
  { value: 'industry', label: 'Industry' },
];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState<NewsArticle['category'] | 'all'>('all');
  
  const filteredArticles = selectedCategory === 'all' 
    ? newsArticles 
    : newsArticles.filter(a => a.category === selectedCategory);
  
  const featuredArticle = filteredArticles[0];
  const remainingArticles = filteredArticles.slice(1);
  
  return (
    <Layout>
      {/* Header */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-6 lg:gap-12 mb-6">
          <MetaPair label="page" value="Music News" />
          <MetaPair label="updated" value="Daily" />
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold text-primary tracking-tight mb-4">
          Music News
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          The latest from the music world—tour announcements, industry updates, 
          exclusive interviews, and everything in between.
        </p>
      </section>
      
      {/* Category Filter */}
      <section className="mb-8">
        <span className="meta-label mb-3 block">(filter by category)</span>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
              className={selectedCategory === category.value 
                ? 'bg-primary text-primary-foreground' 
                : 'border-border text-foreground hover:border-primary hover:text-primary'
              }
            >
              {category.label}
            </Button>
          ))}
        </div>
      </section>
      
      {/* Featured Article */}
      {featuredArticle && (
        <section className="mb-8">
          <NewsCard article={featuredArticle} variant="featured" />
        </section>
      )}
      
      {/* Articles Grid */}
      <section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
        
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found in this category.</p>
          </div>
        )}
      </section>
    </Layout>
  );
}
