import { count, countDistinct, desc, max, sum } from 'drizzle-orm';
import {
  commodityTypes,
  landTypes,
  productBrands,
  productTypes,
  provincePotentials,
  provinces,
  regencies,
} from '@/lib/db/schema/map-product';
import { salesRealizations } from '@/lib/db/schema/sale';
import { stalls } from '@/lib/db/schema/stall';
import { protectedProcedure } from '@/lib/orpc';

export const getDashboardSummary = protectedProcedure.handler(
  async ({ context }) => {
    const [
      [provinceSummary],
      [regencySummary],
      [landTypeSummary],
      [commoditySummary],
      [productTypeSummary],
      [productBrandSummary],
      [stallSummary],
      [salesSummary],
      [potentialSummary],
      recentProductBrands,
    ] = await Promise.all([
      context.db.select({ count: count() }).from(provinces),
      context.db.select({ count: count() }).from(regencies),
      context.db.select({ count: count() }).from(landTypes),
      context.db.select({ count: count() }).from(commodityTypes),
      context.db.select({ count: count() }).from(productTypes),
      context.db.select({ count: count() }).from(productBrands),
      context.db.select({ count: count() }).from(stalls),
      context.db.select({ count: count() }).from(salesRealizations),
      context.db
        .select({
          count: count(),
          coveredProvinces: countDistinct(provincePotentials.provinceId),
          latestUpdatedAt: max(provincePotentials.updatedAt),
          totalPotential: sum(provincePotentials.potential),
        })
        .from(provincePotentials),
      context.db
        .select({
          id: productBrands.id,
          name: productBrands.name,
          industry: productBrands.industry,
          description: productBrands.description,
        })
        .from(productBrands)
        .orderBy(desc(productBrands.createdAt))
        .limit(5),
    ]);

    return {
      commodityTypes: Number(commoditySummary?.count ?? 0),
      landTypes: Number(landTypeSummary?.count ?? 0),
      potential: {
        coveredProvinces: Number(potentialSummary?.coveredProvinces ?? 0),
        entries: Number(potentialSummary?.count ?? 0),
        latestUpdatedAt: potentialSummary?.latestUpdatedAt ?? null,
        total: Number(potentialSummary?.totalPotential ?? 0),
      },
      productBrands: Number(productBrandSummary?.count ?? 0),
      productTypes: Number(productTypeSummary?.count ?? 0),
      provinces: Number(provinceSummary?.count ?? 0),
      recentProductBrands,
      regencies: Number(regencySummary?.count ?? 0),
      salesRealizations: Number(salesSummary?.count ?? 0),
      stalls: Number(stallSummary?.count ?? 0),
    };
  }
);
