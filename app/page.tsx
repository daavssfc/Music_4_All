const highlights = [
  {
    title: "Latest Album Review",
    description: "Deep dives into the records shaping culture right now.",
    icon: "🎧"
  },
  {
    title: "Breaking Music News",
    description: "Stay ahead with daily industry updates and artist drops.",
    icon: "⚡"
  },
  {
    title: "Upcoming Tours",
    description: "Track global dates, tickets, and venue details.",
    icon: "🗓️"
  }
];

const reviews = [
  {
    title: "Neon Reverie",
    artist: "Luna Arc",
    rating: "9.2",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Midnight Signal",
    artist: "Echo Valley",
    rating: "8.7",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Velvet Static",
    artist: "Nova & The Lines",
    rating: "9.0",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Golden Hours",
    artist: "Sable Street",
    rating: "8.4",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80"
  }
];

const tours = [
  {
    artist: "Aurora City",
    city: "Berlin, DE",
    date: "Apr 12, 2025",
    image:
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=80"
  },
  {
    artist: "Silver Frame",
    city: "New York, US",
    date: "May 02, 2025",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80"
  },
  {
    artist: "Night Pulse",
    city: "Tokyo, JP",
    date: "May 18, 2025",
    image:
      "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?auto=format&fit=crop&w=800&q=80"
  }
];

const news = [
  {
    title: "Synthwave revival hits the mainstream charts",
    tag: "News",
    time: "2h ago"
  },
  {
    title: "Festival season adds 12 new headline acts",
    tag: "Update",
    time: "Yesterday"
  },
  {
    title: "Producer collective announces global livestream",
    tag: "Feature",
    time: "2 days ago"
  }
];

const artists = [
  {
    name: "Mira Sol",
    genre: "Alt Pop",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Juno Grey",
    genre: "Indie Rock",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Kai Drift",
    genre: "Electronic",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80"
  }
];

export default function HomePage() {
  return (
    <main className="page">
      <header className="navbar">
        <div className="container nav-inner">
          <div className="logo">Music4All</div>
          <nav className="nav-links">
            <a href="#reviews">Reviews</a>
            <a href="#news">News</a>
            <a href="#tours">Tours</a>
            <a href="#artists">Artists</a>
            <a href="#about">About</a>
          </nav>
          <button className="btn btn-primary">Explore Music</button>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="pill">Music Platform</span>
            <h1>Everything Music. One Place.</h1>
            <p className="muted">
              Music4All delivers premium album reviews, breaking music news, and tour
              intelligence curated for true fans.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg">Start Listening</button>
              <button className="btn btn-secondary btn-lg">View Reviews</button>
            </div>
            <div className="hero-metrics">
              <div>
                <h3>320+</h3>
                <p className="muted">Reviews this year</p>
              </div>
              <div>
                <h3>58</h3>
                <p className="muted">Upcoming tours tracked</p>
              </div>
              <div>
                <h3>120K</h3>
                <p className="muted">Monthly readers</p>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <img
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80"
                alt="Futuristic music collage"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="highlights">
        <div className="container card-grid">
          {highlights.map((item) => (
            <article className="card" key={item.title}>
              <div className="card-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p className="muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="reviews" className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="label">Latest Reviews</span>
              <h2>Album reviews that cut through the noise</h2>
            </div>
            <button className="btn btn-ghost">View all</button>
          </div>
          <div className="grid-4">
            {reviews.map((review) => (
              <article className="card review-card" key={review.title}>
                <div className="media">
                  <img src={review.image} alt={`${review.title} cover`} />
                  <span className="badge">{review.rating}</span>
                </div>
                <h3>{review.title}</h3>
                <p className="muted">{review.artist}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="section">
        <div className="container two-col">
          <div>
            <span className="label">Newsroom</span>
            <h2>Breaking stories from across the music world</h2>
            <p className="muted">
              Real-time reporting on releases, tours, and industry shifts.
            </p>
            <button className="btn btn-primary">Read the newsroom</button>
          </div>
          <div className="stack">
            {news.map((item) => (
              <article className="card news-card" key={item.title}>
                <span className="pill pill-outline">{item.tag}</span>
                <h3>{item.title}</h3>
                <p className="muted">{item.time}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="tours" className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="label">Tours & Concerts</span>
              <h2>Plan your next live show</h2>
            </div>
            <button className="btn btn-ghost">See all tours</button>
          </div>
          <div className="grid-3">
            {tours.map((tour) => (
              <article className="card tour-card" key={tour.artist}>
                <img src={tour.image} alt={`${tour.artist} tour`} />
                <div className="tour-body">
                  <h3>{tour.artist}</h3>
                  <p className="muted">{tour.city}</p>
                  <div className="tour-footer">
                    <span className="pill pill-outline">{tour.date}</span>
                    <button className="btn btn-secondary">View details</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="artists" className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="label">Featured Artists</span>
              <h2>Spotlight on the voices shaping tomorrow</h2>
            </div>
            <button className="btn btn-ghost">Meet the artists</button>
          </div>
          <div className="grid-3">
            {artists.map((artist) => (
              <article className="card artist-card" key={artist.name}>
                <img src={artist.image} alt={artist.name} />
                <div>
                  <h3>{artist.name}</h3>
                  <p className="muted">{artist.genre}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section about">
        <div className="container about-card">
          <div>
            <span className="label">About Music4All</span>
            <h2>Editorial depth with a pulse on culture</h2>
            <p className="muted">
              Our team of critics and insiders curates the releases, live shows, and
              artists you need to know. Built for fans who want more than headlines.
            </p>
          </div>
          <button className="btn btn-primary">Join the community</button>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <div className="logo">Music4All</div>
            <p className="muted">Premium music editorial, always on.</p>
          </div>
          <div className="footer-links">
            <a href="#reviews">Reviews</a>
            <a href="#news">News</a>
            <a href="#tours">Tours</a>
            <a href="#artists">Artists</a>
          </div>
          <div className="muted">© 2025 Music4All</div>
        </div>
      </footer>
    </main>
  );
}
