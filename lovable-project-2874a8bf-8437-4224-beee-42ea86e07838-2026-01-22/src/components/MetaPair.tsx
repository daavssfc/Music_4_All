import { cn } from '@/lib/utils';

interface MetaPairProps {
  label: string;
  value: string;
  className?: string;
}

export function MetaPair({ label, value, className }: MetaPairProps) {
  return (
    <div className={cn('space-y-1', className)}>
      <span className="meta-label">({label})</span>
      <p className="text-foreground font-medium">{value}</p>
    </div>
  );
}
