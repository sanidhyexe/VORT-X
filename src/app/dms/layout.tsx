
'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import BottomNav from '@/components/layout/bottom-nav';

export default function DmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDmPage = pathname.startsWith('/dms');

  return (
    <div className="h-full w-full flex-1 overflow-hidden">
        {children}
    </div>
  );
}
