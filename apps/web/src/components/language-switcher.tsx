import {
  useNavigate,
  useRouteContext,
  useRouter,
} from '@tanstack/react-router';
import { ChevronDown, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { dynamicActivate } from '@/lib/lingui/i18n';

const locales = {
  en: 'EN (English)',
  id: 'ID (Indonesia)',
};

export default function LanguageSwitcher() {
  const { i18n } = useRouteContext({
    from: '__root__',
  });
  const navigate = useNavigate({
    from: '/',
  });
  const router = useRouter();

  const handleLanguageChange = async (locale: string) => {
    // Follow official TanStack Start + Lingui pattern
    // 1. Update i18n immediately for instant feedback
    await dynamicActivate(i18n, locale);

    // 2. Update search params for persistence
    await navigate({
      search: (prev) => ({ ...prev, locale }),
    });

    // 3. Invalidate router to refresh all cached data
    await router.invalidate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="gap-2 border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          size="sm"
          variant="outline"
        >
          <Languages className="h-4 w-4" />
          <span className="font-semibold uppercase">{i18n.locale}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-popover text-popover-foreground"
      >
        {Object.entries(locales).map(([locale, label]) => (
          <DropdownMenuItem
            className={locale === i18n.locale ? 'font-semibold' : ''}
            key={locale}
            onClick={() => handleLanguageChange(locale)}
          >
            {label}
            {locale === i18n.locale && (
              <span className="ml-auto text-primary text-xs">Active</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
