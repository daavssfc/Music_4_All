import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'HOME', path: '/' },
  { label: 'ABOUT', path: '/about' },
  { label: 'REVIEWS', path: '/reviews' },
  { label: 'NEWS', path: '/news' },
  { label: 'TOURS', path: '/tours' },
  { label: 'STORE', path: '/store' },
  { label: 'MEDIA', path: '/media' },
  { label: 'CONTACT', path: '/contact' },
];

interface SidebarNavProps {
  onNavigate?: () => void;
}

export function SidebarNav({ onNavigate }: SidebarNavProps) {
  const location = useLocation();
  
  return (
    <nav className="flex flex-col space-y-1">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={cn(
              'nav-link py-1.5 focus-gold rounded transition-all duration-200',
              isActive && 'active'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
