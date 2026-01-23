import { Layout } from '@/components/Layout';
import { MediaCard } from '@/components/MediaCard';
import { MetaPair } from '@/components/MetaPair';
import { mediaItems } from '@/lib/data';

export default function Media() {
  const videos = mediaItems.filter(item => item.type === 'video');
  const images = mediaItems.filter(item => item.type === 'image');
  
  return (
    <Layout>
      {/* Header */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-6 lg:gap-12 mb-6">
          <MetaPair label="page" value="Media Gallery" />
          <MetaPair label="content" value={`${videos.length} Videos, ${images.length} Galleries`} />
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold text-primary tracking-tight mb-4">
          Media
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Exclusive videos, interviews, live performances, and behind-the-scenes photography 
          from concerts and studios around the world.
        </p>
      </section>
      
      {/* Videos Section */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
          Videos
          <span className="meta-label">({videos.length})</span>
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
      </section>
      
      {/* Photo Galleries Section */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
          Photo Galleries
          <span className="meta-label">({images.length})</span>
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
