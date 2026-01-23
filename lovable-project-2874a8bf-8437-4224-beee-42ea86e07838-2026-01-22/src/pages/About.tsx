import { Layout } from '@/components/Layout';
import { TeamCard } from '@/components/TeamCard';
import { MetaPair } from '@/components/MetaPair';
import { teamMembers } from '@/lib/data';

const editorImage = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800';

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="mb-12 lg:mb-16">
        <div className="flex flex-wrap gap-6 lg:gap-12 mb-6">
          <MetaPair label="page" value="About Us" />
          <MetaPair label="since" value="2012" />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-primary tracking-tight mb-6">
              The Voice of Modern Music
            </h1>
            <p className="text-foreground text-lg leading-relaxed mb-4">
              Music4All was founded in 2012 with a simple mission: to celebrate music in all its forms. 
              What started as a small blog has grown into one of the most trusted sources for album reviews, 
              music news, and concert coverage.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe that great music deserves great writing. Our team of passionate critics and 
              journalists work tirelessly to bring you thoughtful reviews, breaking news, and in-depth 
              features that go beyond the surface.
            </p>
          </div>
          
          <div className="relative">
            <div className="rounded-xl border border-border overflow-hidden">
              <img 
                src={editorImage}
                alt="Alex Rivera - Editor-in-Chief"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-4 py-3">
              <span className="meta-label">(editor-in-chief)</span>
              <p className="text-foreground font-semibold mt-1">Alex Rivera</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="mb-12 lg:mb-16 bg-surface-alt rounded-xl border border-border p-6 lg:p-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6">Our Mission</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-foreground font-semibold text-lg mb-2">Discover</h3>
            <p className="text-muted-foreground">
              We dig deep to find the best new music, from underground artists to rising stars, 
              bringing fresh sounds to your ears.
            </p>
          </div>
          <div>
            <h3 className="text-foreground font-semibold text-lg mb-2">Inform</h3>
            <p className="text-muted-foreground">
              Our news team delivers timely, accurate coverage of the music industry, 
              from tour announcements to industry trends.
            </p>
          </div>
          <div>
            <h3 className="text-foreground font-semibold text-lg mb-2">Connect</h3>
            <p className="text-muted-foreground">
              We bridge the gap between artists and fans, providing context and insight 
              that deepens your appreciation of music.
            </p>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary">Meet the Team</h2>
          <span className="meta-label">({teamMembers.length} writers)</span>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
