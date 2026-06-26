import { Trans, useLingui } from '@lingui/react/macro';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import authClient from '@/lib/auth/auth-client';
import { orpc } from '@/lib/orpc/client';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: '/auth/login',
        search: (prev) => ({
          ...prev,
          redirect: '/dashboard',
        }),
      });
    }
  },
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = Route.useRouteContext();
  const { t } = useLingui();

  const { data: privateData } = useQuery(
    orpc.privateData.queryOptions({
      input: {},
    })
  );

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = '/';
        },
      },
    });
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="mx-auto max-w-md">
          <CardContent className="pt-6 text-center">
            <p>
              <Trans>Loading...</Trans>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <Badge className="mb-4" variant="outline">
            <Trans>Protected Route</Trans>
          </Badge>
          <h1 className="mb-2 font-bold text-4xl text-slate-900">
            <Trans>Dashboard</Trans>
          </h1>
          <p className="text-slate-600 text-xl">
            {t`Welcome back, ${user.name}!`}
          </p>
        </div>

        <Card className="mx-auto mb-8 max-w-2xl">
          <CardHeader>
            <CardTitle>
              <Trans>Your Account</Trans>
            </CardTitle>
            <CardDescription>
              <Trans>Account information and session details</Trans>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">
                  <Trans>Name:</Trans>
                </span>
                <span className="text-slate-600 text-sm">{user.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">
                  <Trans>Email:</Trans>
                </span>
                <span className="text-slate-600 text-sm">{user.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">
                  <Trans>User ID:</Trans>
                </span>
                <span className="font-mono text-slate-600 text-sm">
                  {user.id}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">
                  <Trans>Email Verified:</Trans>
                </span>
                <Badge variant={user.emailVerified ? 'default' : 'secondary'}>
                  {user.emailVerified ? t`Verified` : t`Not Verified`}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {privateData && (
          <Card className="mx-auto mb-8 max-w-2xl">
            <CardHeader>
              <CardTitle>
                <Trans>Protected Data</Trans>
              </CardTitle>
              <CardDescription>
                <Trans>This data comes from a protected oRPC endpoint</Trans>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg bg-slate-100 p-4">
                  <p className="mb-2 font-medium text-sm">
                    <Trans>Server Message:</Trans>
                  </p>
                  <p className="text-slate-600 text-sm">
                    {privateData.message}
                  </p>
                </div>
                <div className="text-slate-500 text-xs">
                  <Trans>
                    This data is only accessible to authenticated users via the
                  </Trans>{' '}
                  <code className="rounded bg-slate-200 px-1">
                    protectedProcedure
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>
              <Trans>Quick Actions</Trans>
            </CardTitle>
            <CardDescription>
              <Trans>Explore the application features</Trans>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link to="/demo/orpc-todo">
                <Button className="w-full" variant="outline">
                  <Trans>View Todos</Trans>
                </Button>
              </Link>
              <Link to="/demo/form/simple">
                <Button className="w-full" variant="outline">
                  <Trans>Try Forms</Trans>
                </Button>
              </Link>
            </div>

            <Separator className="my-6" />

            <div className="flex justify-center">
              <Button onClick={handleSignOut} variant="destructive">
                <Trans>Sign Out</Trans>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link to="/">
            <Button variant="ghost">
              <Trans>Back to Home</Trans>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
