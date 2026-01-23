// Mock data for Music4All - CMS-ready structure
import type { Review, NewsArticle, Tour, Product, MediaItem, TeamMember } from './types';

export const reviews: Review[] = [
  {
    id: '1',
    title: 'A Masterclass in Modern Soul',
    artist: 'Midnight Echoes',
    album: 'Velvet Hours',
    rating: 9,
    excerpt: 'An atmospheric journey through late-night contemplation, blending neo-soul with electronic textures.',
    content: 'Full review content here...',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    genre: 'Neo-Soul',
    publishDate: '2026-01-18',
    author: 'Marcus Chen'
  },
  {
    id: '2',
    title: 'Raw Energy Unleashed',
    artist: 'The Northern Lights',
    album: 'Electric Dawn',
    rating: 8,
    excerpt: 'A powerful indie rock statement that channels 90s grunge through a modern lens.',
    content: 'Full review content here...',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    genre: 'Indie Rock',
    publishDate: '2026-01-15',
    author: 'Sarah Williams'
  },
  {
    id: '3',
    title: 'Hip-Hop\'s New Frontier',
    artist: 'Chromatic',
    album: 'Future Nostalgia',
    rating: 9,
    excerpt: 'Blending jazz samples with trap beats, this album redefines what hip-hop can be.',
    content: 'Full review content here...',
    coverImage: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800',
    genre: 'Hip-Hop',
    publishDate: '2026-01-12',
    author: 'Marcus Chen'
  },
  {
    id: '4',
    title: 'Ethereal Pop Perfection',
    artist: 'Luna Silva',
    album: 'Dreamweaver',
    rating: 8,
    excerpt: 'Haunting vocals meet lush production in this standout art-pop release.',
    content: 'Full review content here...',
    coverImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800',
    genre: 'Art Pop',
    publishDate: '2026-01-10',
    author: 'Elena Rodriguez'
  },
  {
    id: '5',
    title: 'Electronic Odyssey',
    artist: 'Synth Collective',
    album: 'Neon Horizons',
    rating: 7,
    excerpt: 'A sprawling double album that explores the boundaries of electronic music.',
    content: 'Full review content here...',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
    genre: 'Electronic',
    publishDate: '2026-01-08',
    author: 'James Park'
  },
  {
    id: '6',
    title: 'R&B Renaissance',
    artist: 'Velvet Jones',
    album: 'After Midnight',
    rating: 9,
    excerpt: 'Smooth, sensual, and deeply personal - a return to classic R&B with modern production.',
    content: 'Full review content here...',
    coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
    genre: 'R&B',
    publishDate: '2026-01-05',
    author: 'Sarah Williams'
  }
];

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Festival Lineups 2026: The Biggest Announcements Yet',
    excerpt: 'From Coachella to Glastonbury, this year\'s festival season promises to be the most exciting in a decade.',
    content: 'Full article content here...',
    featuredImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
    category: 'announcement',
    publishDate: '2026-01-20',
    author: 'Elena Rodriguez'
  },
  {
    id: '2',
    title: 'Exclusive: Inside the Studio with The Northern Lights',
    excerpt: 'We spent a week with the band as they recorded their upcoming album. Here\'s what we learned.',
    content: 'Full article content here...',
    featuredImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
    category: 'interview',
    publishDate: '2026-01-18',
    author: 'Marcus Chen'
  },
  {
    id: '3',
    title: 'The Rise of Bedroom Pop: How Gen Z is Redefining Music',
    excerpt: 'A deep dive into the DIY movement that\'s taking over streaming platforms.',
    content: 'Full article content here...',
    featuredImage: 'https://images.unsplash.com/photo-1598387846148-47e82ee120cc?w=800',
    category: 'feature',
    publishDate: '2026-01-16',
    author: 'James Park'
  },
  {
    id: '4',
    title: 'Streaming Revenue Hits Record High in 2025',
    excerpt: 'New industry reports show unprecedented growth in music streaming worldwide.',
    content: 'Full article content here...',
    featuredImage: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=800',
    category: 'industry',
    publishDate: '2026-01-14',
    author: 'Sarah Williams'
  },
  {
    id: '5',
    title: 'Grammy Predictions: Who Will Take Home the Gold?',
    excerpt: 'Our editors weigh in on the most anticipated awards of the year.',
    content: 'Full article content here...',
    featuredImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    category: 'feature',
    publishDate: '2026-01-12',
    author: 'Elena Rodriguez'
  }
];

export const tours: Tour[] = [
  {
    id: '1',
    artist: 'The Northern Lights',
    tourName: 'Electric Dawn World Tour',
    venue: 'Madison Square Garden',
    city: 'New York, NY',
    date: '2026-03-15',
    ticketLink: '#',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800'
  },
  {
    id: '2',
    artist: 'Midnight Echoes',
    tourName: 'Velvet Hours Tour',
    venue: 'The Forum',
    city: 'Los Angeles, CA',
    date: '2026-03-22',
    ticketLink: '#',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800'
  },
  {
    id: '3',
    artist: 'Chromatic',
    tourName: 'Future Nostalgia Experience',
    venue: 'United Center',
    city: 'Chicago, IL',
    date: '2026-04-05',
    ticketLink: '#',
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800'
  },
  {
    id: '4',
    artist: 'Luna Silva',
    tourName: 'Dreamweaver Tour',
    venue: 'Red Rocks Amphitheatre',
    city: 'Morrison, CO',
    date: '2026-04-12',
    ticketLink: '#',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800'
  },
  {
    id: '5',
    artist: 'Synth Collective',
    tourName: 'Neon Horizons Live',
    venue: 'The Fillmore',
    city: 'San Francisco, CA',
    date: '2026-04-20',
    ticketLink: '#',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800'
  },
  {
    id: '6',
    artist: 'Velvet Jones',
    tourName: 'After Midnight Tour',
    venue: 'Apollo Theater',
    city: 'New York, NY',
    date: '2026-05-01',
    ticketLink: '#',
    image: 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=800'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Music4All Classic Tee',
    price: 35,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    description: 'Premium cotton t-shirt with the Music4All logo.',
    category: 'merch',
    inStock: true
  },
  {
    id: '2',
    name: 'Velvet Hours - Vinyl Edition',
    price: 45,
    image: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=800',
    description: 'Limited edition 180g vinyl pressing.',
    category: 'vinyl',
    inStock: true
  },
  {
    id: '3',
    name: 'Editor\'s Choice Pin Set',
    price: 18,
    image: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=800',
    description: 'Collectible enamel pins featuring iconic album art.',
    category: 'accessories',
    inStock: true
  },
  {
    id: '4',
    name: 'Electric Dawn - Vinyl Edition',
    price: 42,
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800',
    description: 'Double LP on colored vinyl with gatefold sleeve.',
    category: 'vinyl',
    inStock: false
  },
  {
    id: '5',
    name: 'Music4All Hoodie',
    price: 65,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    description: 'Heavyweight fleece hoodie with embroidered logo.',
    category: 'merch',
    inStock: true
  },
  {
    id: '6',
    name: 'Record Cleaning Kit',
    price: 28,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    description: 'Keep your vinyl collection pristine with our premium kit.',
    category: 'accessories',
    inStock: true
  }
];

export const mediaItems: MediaItem[] = [
  {
    id: '1',
    title: 'The Northern Lights - Live at Red Rocks',
    type: 'video',
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800',
    description: 'Full concert recording from the Electric Dawn tour.',
    date: '2026-01-10'
  },
  {
    id: '2',
    title: 'Backstage at Coachella 2025',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800',
    thumbnail: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800',
    description: 'Exclusive photos from behind the scenes.',
    date: '2025-04-15'
  },
  {
    id: '3',
    title: 'Studio Session: Midnight Echoes',
    type: 'video',
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
    description: 'Watch the making of Velvet Hours.',
    date: '2026-01-05'
  },
  {
    id: '4',
    title: 'Festival Moments 2025',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
    thumbnail: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
    description: 'The best crowd shots from last summer.',
    date: '2025-08-20'
  },
  {
    id: '5',
    title: 'Interview: Chromatic on Hip-Hop\'s Future',
    type: 'video',
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800',
    description: 'An in-depth conversation about the album.',
    date: '2026-01-08'
  },
  {
    id: '6',
    title: 'Concert Photography Collection',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
    thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
    description: 'Award-winning concert photos from 2025.',
    date: '2025-12-01'
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Rivera',
    role: 'Editor-in-Chief',
    bio: 'Former Rolling Stone editor with 15 years in music journalism. Passionate about discovering emerging artists and preserving music history.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    role: 'Senior Music Critic',
    bio: 'Specializes in hip-hop and R&B. Has interviewed over 200 artists and hosts the popular podcast "Beat by Beat".',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800'
  },
  {
    id: '3',
    name: 'Sarah Williams',
    role: 'News Editor',
    bio: 'Breaking music news for over a decade. Known for exclusive industry scoops and in-depth festival coverage.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800'
  },
  {
    id: '4',
    name: 'Elena Rodriguez',
    role: 'Features Writer',
    bio: 'Award-winning journalist focusing on artist profiles and cultural trends. Former NPR Music contributor.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800'
  },
  {
    id: '5',
    name: 'James Park',
    role: 'Digital Editor',
    bio: 'Leads our digital strategy and multimedia content. Expert in electronic music and streaming culture.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800'
  }
];

// Featured content for homepage
export const featuredReview = reviews[0];
export const featuredNews = newsArticles[0];
export const upcomingTours = tours.slice(0, 3);
export const latestReviews = reviews.slice(0, 3);
export const breakingNews = newsArticles.slice(0, 3);
