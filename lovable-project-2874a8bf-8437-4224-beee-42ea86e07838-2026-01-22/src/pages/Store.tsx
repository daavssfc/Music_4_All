import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { MetaPair } from '@/components/MetaPair';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';

const categories: Array<{ value: Product['category'] | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'vinyl', label: 'Vinyl' },
  { value: 'merch', label: 'Merch' },
  { value: 'accessories', label: 'Accessories' },
];

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState<Product['category'] | 'all'>('all');
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);
  
  return (
    <Layout>
      {/* Header */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-6 lg:gap-12 mb-6">
          <MetaPair label="page" value="Store" />
          <MetaPair label="items" value={`${products.length} Products`} />
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold text-primary tracking-tight mb-4">
          The Shop
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Vinyl pressings, exclusive merch, and accessories for the discerning music lover. 
          Limited editions available while supplies last.
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
      
      {/* Products Grid */}
      <section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </section>
    </Layout>
  );
}
