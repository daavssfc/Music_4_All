import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SidebarNav } from './SidebarNav';

const avatarImage = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={avatarImage} 
            alt="Music4All Editor"
            className="w-10 h-10 rounded-lg object-cover"
          />
          <span className="font-display font-bold text-xl text-primary">MUSIC4ALL</span>
        </Link>
        
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-foreground">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-sidebar border-sidebar-border p-6">
            <SheetHeader className="text-left mb-6">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <Link 
                to="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="block w-16 h-16 rounded-lg overflow-hidden focus-gold"
              >
                <img 
                  src={avatarImage} 
                  alt="About Music4All"
                  className="w-full h-full object-cover"
                />
              </Link>
              <span className="meta-label mt-4 block">(menu)</span>
            </SheetHeader>
            <SidebarNav onNavigate={() => setMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>
      </header>
      
      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-screen">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-screen w-56 lg:w-64 bg-sidebar border-r border-sidebar-border p-6 lg:p-8 flex flex-col">
          <Link 
            to="/about" 
            className="block w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden mb-4 focus-gold hover:ring-2 hover:ring-primary/30 transition-all"
          >
            <img 
              src={avatarImage} 
              alt="About Music4All"
              className="w-full h-full object-cover"
            />
          </Link>
          
          <span className="meta-label mb-4">(menu)</span>
          
          <SidebarNav />
          
          <div className="mt-auto pt-8">
            <span className="meta-label">(since)</span>
            <p className="text-foreground text-sm font-medium mt-1">2012–Present</p>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 ml-56 lg:ml-64">
          <div className="editorial-panel min-h-screen m-4 lg:m-6 p-6 lg:p-8 relative overflow-hidden">
            {/* Background Wordmark */}
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden">
              <span className="wordmark-bg block text-right -mb-12 opacity-40">
                MUSIC4ALL
              </span>
            </div>
            
            {/* Content */}
            <div className="relative z-10 animate-fade-in">
              {children}
            </div>
          </div>
        </main>
      </div>
      
      {/* Mobile Content */}
      <main className="md:hidden pt-16 pb-8">
        <div className="editorial-panel min-h-[calc(100vh-4rem)] m-3 p-4 relative overflow-hidden">
          {/* Background Wordmark */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden">
            <span className="wordmark-bg block text-right -mb-8 text-6xl opacity-40">
              MUSIC4ALL
            </span>
          </div>
          
          {/* Content */}
          <div className="relative z-10 animate-fade-in">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
