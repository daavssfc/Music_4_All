import { Layout } from '@/components/Layout';
import { TourCard } from '@/components/TourCard';
import { MetaPair } from '@/components/MetaPair';
import { tours } from '@/lib/data';

export default function Tours() {
  // Group tours by month
  const groupedTours = tours.reduce((acc, tour) => {
    const date = new Date(tour.date);
    const monthKey = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(tour);
    return acc;
  }, {} as Record<string, typeof tours>);
  
  return (
    <Layout>
      {/* Header */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-6 lg:gap-12 mb-6">
          <MetaPair label="page" value="Tours & Concerts" />
          <MetaPair label="upcoming" value={`${tours.length} Shows`} />
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold text-primary tracking-tight mb-4">
          Upcoming Tours
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Don't miss your favorite artists live. Find upcoming concerts, festival dates, 
          and tour announcements all in one place.
        </p>
      </section>
      
      {/* Tours by Month */}
      {Object.entries(groupedTours).map(([month, monthTours]) => (
        <section key={month} className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
            {month}
            <span className="meta-label">({monthTours.length} shows)</span>
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {monthTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </section>
      ))}
    </Layout>
  );
}
