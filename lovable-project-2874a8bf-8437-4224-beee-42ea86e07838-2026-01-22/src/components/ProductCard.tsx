import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

const categoryLabels: Record<Product['category'], string> = {
  vinyl: 'Vinyl',
  merch: 'Merch',
  accessories: 'Accessories'
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="bg-surface-alt rounded-xl border border-border overflow-hidden card-hover group">
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover image-zoom"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-card/80 flex items-center justify-center">
            <Badge variant="secondary">Sold Out</Badge>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <span className="meta-label text-primary">{categoryLabels[product.category]}</span>
        
        <h3 className="font-semibold text-foreground mt-1 group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-primary font-bold text-lg">${product.price}</span>
          
          <Button 
            size="sm" 
            disabled={!product.inStock}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}
