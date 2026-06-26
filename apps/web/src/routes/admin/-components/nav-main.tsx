import { useLingui } from '@lingui/react/macro';
import { Link, useMatchRoute } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import type { NavigationItem } from '../-domain/navigation';

export function NavMain({
  items,
  label,
}: {
  items: NavigationItem[];
  label?: string;
}) {
  const matchRoute = useMatchRoute();
  const { t } = useLingui();
  const getText = (value: string) => {
    switch (value) {
      case 'Overview':
        return t`Overview`;
      case 'Marketing Map':
        return t`Marketing Map`;
      case 'Potential':
        return t`Potential`;
      case 'Sale':
        return t`Sale`;
      case 'Stall':
        return t`Stall`;
      case 'User Management':
        return t`User Management`;
      case 'Dashboard':
        return t`Dashboard`;
      case 'Regions':
        return t`Regions`;
      case 'Province':
        return t`Province`;
      case 'Regency':
        return t`Regency`;
      case 'Lands':
        return t`Lands`;
      case 'Land Type':
        return t`Land Type`;
      case 'Province Land':
        return t`Province Land`;
      case 'Regency Land':
        return t`Regency Land`;
      case 'Commodities':
        return t`Commodities`;
      case 'Commodity Type':
        return t`Commodity Type`;
      case 'Province Commodity':
        return t`Province Commodity`;
      case 'Regency Commodity':
        return t`Regency Commodity`;
      case 'Products':
        return t`Products`;
      case 'Product Type':
        return t`Product Type`;
      case 'Product Brand':
        return t`Product Brand`;
      case 'Product Dosage':
        return t`Product Dosage`;
      case 'Sales Overview':
        return t`Sales Overview`;
      case 'Sales Realization':
        return t`Sales Realization`;
      case 'Daily Sales':
        return t`Daily Sales`;
      case 'Stalls Overview':
        return t`Stalls Overview`;
      case 'Province Potential':
        return t`Province Potential`;
      case 'Regency Potential':
        return t`Regency Potential`;
      default:
        return value;
    }
  };

  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{getText(label)}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => {
          // Use fuzzy matching only for items with sub-items
          // This keeps parent items active when on child routes
          const isActive = !!matchRoute({
            to: item.url,
            fuzzy: !!item.items?.length,
          });

          return (
            <Collapsible asChild defaultOpen={isActive} key={item.title}>
              <SidebarMenuItem>
                {item.items?.length ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={getText(item.title)}
                      >
                        <item.icon />
                        <span>{getText(item.title)}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 data-[state=open]:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => {
                          const isSubActive = !!matchRoute({ to: subItem.url });

                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isSubActive}
                              >
                                <Link to={subItem.url}>
                                  <span>{getText(subItem.title)}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : (
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={getText(item.title)}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{getText(item.title)}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
