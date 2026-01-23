import { cn } from '@/lib/utils';
import type { TeamMember } from '@/lib/types';

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <article className="bg-surface-alt rounded-xl border border-border overflow-hidden card-hover">
      <div className="aspect-square overflow-hidden">
        <img 
          src={member.image} 
          alt={member.name}
          className="w-full h-full object-cover image-zoom"
        />
      </div>
      
      <div className="p-4">
        <span className="meta-label text-primary">{member.role}</span>
        
        <h3 className="font-semibold text-foreground text-lg mt-1">
          {member.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mt-2 line-clamp-3">
          {member.bio}
        </p>
      </div>
    </article>
  );
}
