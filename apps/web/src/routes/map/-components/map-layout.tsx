import { Link } from '@tanstack/react-router';
import { Home, Map as MapIcon, Menu } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { MapProvider } from './map-context';
import { MapSidebar } from './map-sidebar';

type MapLayoutProps = {
  children: ReactNode;
};

export function MapLayout({ children }: MapLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <MapProvider>
      <SidebarProvider defaultOpen={!isMobile}>
        <div className="flex h-screen w-full overflow-hidden bg-slate-100">
          <MapSidebar className="border-emerald-950" />
          <SidebarInset className="min-w-0 bg-slate-100">
            <header className="z-[1001] flex h-14 shrink-0 items-center border-emerald-950 border-b bg-[#082c1d] px-3 text-white shadow-lg">
              <SidebarTrigger className="mr-2 text-emerald-50 hover:bg-white/10 hover:text-white">
                <Menu className="size-5" />
                <span className="sr-only">Toggle map controls</span>
              </SidebarTrigger>
              <Link className="flex items-center gap-3" to="/">
                <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500 text-emerald-950">
                  <MapIcon className="size-4" />
                </span>
                <span>
                  <span className="block font-semibold text-sm leading-none">
                    PasarPupuk
                  </span>
                  <span className="mt-1 block text-[10px] text-emerald-300 uppercase tracking-[0.16em]">
                    Marketing Intelligence
                  </span>
                </span>
              </Link>
              <div className="ml-auto flex items-center gap-2">
                <Link
                  className="inline-flex h-8 items-center gap-2 rounded-md border border-white/10 px-3 text-emerald-50 text-xs transition hover:bg-white/10"
                  to="/"
                >
                  <Home className="size-3.5" />
                  Home
                </Link>
              </div>
            </header>
            <main className="min-h-0 flex-1 overflow-hidden">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </MapProvider>
  );
}
