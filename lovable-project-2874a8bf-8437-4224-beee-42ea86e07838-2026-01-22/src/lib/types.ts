// CMS-Ready Data Types for Music4All

export interface Review {
  id: string;
  title: string;
  artist: string;
  album: string;
  rating: number; // 1-10
  excerpt: string;
  content: string;
  coverImage: string;
  genre: string;
  publishDate: string;
  author: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: 'announcement' | 'interview' | 'feature' | 'industry';
  publishDate: string;
  author: string;
}

export interface Tour {
  id: string;
  artist: string;
  tourName: string;
  venue: string;
  city: string;
  date: string;
  ticketLink: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'vinyl' | 'merch' | 'accessories';
  inStock: boolean;
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  src: string;
  thumbnail: string;
  description: string;
  date: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}
