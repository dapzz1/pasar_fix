import { Trans, useLingui } from '@lingui/react/macro';
import { Link, useLocation } from '@tanstack/react-router';
import { LogIn, LogOut, Map as MapIcon, Shield, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import LanguageSwitcher from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import authClient from '@/lib/auth/auth-client';
import { orpc } from '@/lib/orpc/client';
import { Route } from '@/routes/__root';

export default function Header() {
  const { user } = Route.useRouteContext();
  const { t } = useLingui();
  const location = useLocation();
  const [hasViewerAccess, setHasViewerAccess] = useState(false);
  const [hasAdminAccess, setHasAdminAccess] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (!user) {
      setHasAdminAccess(false);
      setHasViewerAccess(false);
      return;
    }

    const loadAccess = async () => {
      try {
        const response = await orpc.admin.user.getById.call({
          userId: user.id,
        });
        if (!mounted) {
          return;
        }
        setHasAdminAccess(response.data?.some((role) => role.role === 'admin'));
        setHasViewerAccess(
          response.data?.some((role) => role.role === 'viewer')
        );
      } catch {
        if (mounted) {
          setHasAdminAccess(false);
          setHasViewerAccess(false);
        }
      }
    };

    loadAccess();
    return () => {
      mounted = false;
    };
  }, [user]);

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.reload();
        },
      },
    });
  };

  const hasMapAccess = Boolean(user && (hasAdminAccess || hasViewerAccess));

  return (
    <header className="sticky top-0 z-50 border-emerald-950 border-b bg-[#082c1d] text-white shadow-lg">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">
        <Link className="flex shrink-0 items-center gap-2.5" to="/">
          <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500 text-emerald-950">
            <MapIcon className="size-4" />
          </span>
          <span className="hidden sm:block">
            <span className="block font-semibold text-sm leading-none">
              PasarPupuk
            </span>
            <span className="mt-1 block text-[9px] text-emerald-300 uppercase tracking-[0.16em]">
              Marketing Intelligence
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="flex h-full items-center">
          <Link
            className={`flex h-full items-center border-b-2 px-3 text-xs transition ${
              location.pathname === '/'
                ? 'border-emerald-400 text-white'
                : 'border-transparent text-emerald-50/65 hover:text-white'
            }`}
            to="/"
          >
            <Trans>Home</Trans>
          </Link>
          {hasMapAccess && (
            <Link
              className={`flex h-full items-center border-b-2 px-3 text-xs transition ${
                location.pathname.startsWith('/map')
                  ? 'border-emerald-400 text-white'
                  : 'border-transparent text-emerald-50/65 hover:text-white'
              }`}
              to="/map"
            >
              <Trans>Potential Maps</Trans>
            </Link>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <LanguageSwitcher />
          {user ? (
            <>
              {hasAdminAccess && (
                <Button
                  asChild
                  className="hidden border-amber-300/20 bg-amber-300/5 text-amber-300 hover:bg-amber-300/10 hover:text-amber-200 sm:inline-flex"
                  size="sm"
                  variant="outline"
                >
                  <Link to="/admin">
                    <Shield className="mr-1.5 size-3.5" />
                    <Trans>Admin Panel</Trans>
                  </Link>
                </Button>
              )}
              <span className="hidden max-w-36 truncate text-emerald-50/70 text-xs md:block">
                {t`Welcome, ${user.name}!`}
              </span>
              <Button
                className="border-red-300/20 bg-red-300/5 text-red-300 hover:bg-red-300/10 hover:text-red-200"
                onClick={handleSignOut}
                size="sm"
                variant="outline"
              >
                <LogOut className="mr-1.5 size-3.5" />
                <span className="hidden sm:inline">
                  <Trans>Sign Out</Trans>
                </span>
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                size="sm"
                variant="outline"
              >
                <Link to="/auth/login">
                  <LogIn className="mr-1.5 size-3.5" />
                  <Trans>Sign In</Trans>
                </Link>
              </Button>
              <Button
                asChild
                className="hidden bg-emerald-500 text-emerald-950 hover:bg-emerald-400 sm:inline-flex"
                size="sm"
              >
                <Link to="/auth/signup">
                  <UserPlus className="mr-1.5 size-3.5" />
                  <Trans>Sign Up</Trans>
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
