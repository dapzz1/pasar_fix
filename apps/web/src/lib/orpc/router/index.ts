import { protectedProcedure, publicProcedure } from '@/lib/orpc';
import { getDashboardSummary } from '@/routes/admin/-app/get-dashboard-summary';
import { createCommodityType } from '@/routes/admin/commodity/-app/create-commodity-type';
import { deleteCommodityType } from '@/routes/admin/commodity/-app/delete-commodity-type';
import { getCommodityTypes } from '@/routes/admin/commodity/-app/get-commodity-types';
import { updateCommodityType } from '@/routes/admin/commodity/-app/update-commodity-type';
import { getProvinceCommodities } from '@/routes/admin/commodity/province-commodity/-app/get-province-commodities';
import { createRegencyCommodity } from '@/routes/admin/commodity/regency-commodity/-app/create-regency-commodity';
import { deleteRegencyCommodity } from '@/routes/admin/commodity/regency-commodity/-app/delete-regency-commodity';
import { getRegencyCommodities } from '@/routes/admin/commodity/regency-commodity/-app/get-regency-commodities';
import { updateRegencyCommodity } from '@/routes/admin/commodity/regency-commodity/-app/update-regency-commodity';
import { createLandType } from '@/routes/admin/land/-app/create-land-type';
import { deleteLandType } from '@/routes/admin/land/-app/delete-land-type';
import { getLandTypes } from '@/routes/admin/land/-app/get-land-types';
import { updateLandType } from '@/routes/admin/land/-app/update-land-type';
import { createProvinceLand } from '@/routes/admin/land/province-land/-app/create-province-land';
import { deleteProvinceLand } from '@/routes/admin/land/province-land/-app/delete-province-land';
import { getProvinceLands } from '@/routes/admin/land/province-land/-app/get-province-lands';
import { updateProvinceLand } from '@/routes/admin/land/province-land/-app/update-province-land';
import { getRegencyLands } from '@/routes/admin/land/regency-land/-app/get-regency-lands';
import { createProvincePotential } from '@/routes/admin/potential/province_potential/-app/create-province-potential';
import { deleteProvincePotential } from '@/routes/admin/potential/province_potential/-app/delete-province-potential';
import { getProvincePotentials } from '@/routes/admin/potential/province_potential/-app/get-province-potentials';
import { updateProvincePotential } from '@/routes/admin/potential/province_potential/-app/update-province-potential';
import { createRegencyPotential } from '@/routes/admin/potential/regency_potential/-app/create-regency-potential';
import { deleteRegencyPotential } from '@/routes/admin/potential/regency_potential/-app/delete-regency-potential';
import { getRegencyPotentials } from '@/routes/admin/potential/regency_potential/-app/get-regency-potentials';
import { updateRegencyPotential } from '@/routes/admin/potential/regency_potential/-app/update-regency-potential';
import { createProductType } from '@/routes/admin/product/-app/create-product-type';
import { deleteProductType } from '@/routes/admin/product/-app/delete-product-type';
import { getProductTypes } from '@/routes/admin/product/-app/get-product-types';
import { updateProductType } from '@/routes/admin/product/-app/update-product-type';
import { createProductBrand } from '@/routes/admin/product/product-brand/-app/create-product-brand';
import { deleteProductBrand } from '@/routes/admin/product/product-brand/-app/delete-product-brand';
import { getProductBrands } from '@/routes/admin/product/product-brand/-app/get-product-brands';
import { updateProductBrand } from '@/routes/admin/product/product-brand/-app/update-product-brand';
import { createProductDosage } from '@/routes/admin/product/product-dosage/-app/create-product-dosage';
import { deleteProductDosage } from '@/routes/admin/product/product-dosage/-app/delete-product-dosage';
import { getProductDosages } from '@/routes/admin/product/product-dosage/-app/get-product-dosages';
import { updateProductDosage } from '@/routes/admin/product/product-dosage/-app/update-product-dosage';
import { createProvince } from '@/routes/admin/region/province/-app/create-province';
import { deleteProvince } from '@/routes/admin/region/province/-app/delete-province';
import { getProvinces } from '@/routes/admin/region/province/-app/get-provinces';
import { updateProvince } from '@/routes/admin/region/province/-app/update-province';
import { createRegency } from '@/routes/admin/region/regency/-app/create-regency';
import { deleteRegency } from '@/routes/admin/region/regency/-app/delete-regency';
import { getRegencies } from '@/routes/admin/region/regency/-app/get-regencies';
import { updateRegency } from '@/routes/admin/region/regency/-app/update-regency';
import { createSalesRealization } from '@/routes/admin/sale/-app/create-sales-realization';
import { deleteSalesRealization } from '@/routes/admin/sale/-app/delete-sales-realization';
import { getSalesRealizations } from '@/routes/admin/sale/-app/get-sales-realizations';
import { updateSalesRealization } from '@/routes/admin/sale/-app/update-sales-realization';
import { createDailySales } from '@/routes/admin/sale/sale-daily/-app/create-daily-sales';
import { deleteDailySales } from '@/routes/admin/sale/sale-daily/-app/delete-daily-sales';
import { getDailySales } from '@/routes/admin/sale/sale-daily/-app/get-daily-sales';
import { updateDailySales } from '@/routes/admin/sale/sale-daily/-app/update-daily-sales';
import { assignProductBrand } from '@/routes/admin/stall/-app/assign-product-brand';
import { createStall } from '@/routes/admin/stall/-app/create-stall';
import { deleteStall } from '@/routes/admin/stall/-app/delete-stall';
import { getStallProductBrands } from '@/routes/admin/stall/-app/get-stall-product-brand';
import { getStalls } from '@/routes/admin/stall/-app/get-stalls';
import { updateStall } from '@/routes/admin/stall/-app/update-stall';
import { deleteUser } from '@/routes/admin/user/-app/delete-user';
import { getUserById } from '@/routes/admin/user/-app/get-user-by-id';
import { getUsers } from '@/routes/admin/user/-app/get-users';
import { updateUser } from '@/routes/admin/user/-app/update-user';
import { getSession } from '@/routes/auth/-app/get-session';
import { createTodo } from '@/routes/todos/-app/create-todo';
import { deleteTodo } from '@/routes/todos/-app/delete-todo';
import { getTodos } from '@/routes/todos/-app/get-todos';
import { toggleTodo } from '@/routes/todos/-app/toggle-todo';
/**

 * Main oRPC Router
 *
 * This router provides a unified API interface for the entire application,
 * following Clean Architecture principles with feature-based organization.
 *
 * **Architecture Benefits:**
 * - **Unified Data Layer**: All API calls go through oRPC for consistency
 * - **Type Safety**: End-to-end TypeScript inference from server to client
 * - **Feature Organization**: Endpoints grouped by business domain (auth, todos, etc.)
 * - **Clean Architecture**: Domain logic separated in feature modules (_api folders)
 *
 * **Better Auth Integration:**
 * - Auth endpoints follow Better Auth conventions and terminology
 * - Session management integrated with Better Auth context
 * - Compatible with existing Better Auth patterns and middleware
 */
export default {
  /**
   * Health check endpoint for monitoring
   */
  healthCheck: publicProcedure.handler(() => {
    return 'OK';
  }),

  /**
   * Authentication endpoints following Better Auth conventions
   */
  auth: {
    getSession,
  },

  /**
   * Protected data endpoint demonstrating auth-required functionality
   */
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: 'This is private',
      user: context.session?.user,
    };
  }),

  /**
   * Todo feature endpoints organized by domain
   */
  todo: {
    getAll: getTodos,
    create: createTodo,
    toggle: toggleTodo,
    delete: deleteTodo,
  },

  /**
   * Map data feature endpoints
   */
  map: {},

  admin: {
    dashboard: {
      getSummary: getDashboardSummary,
    },
    region: {
      province: {
        get: getProvinces,
        create: createProvince,
        update: updateProvince,
        delete: deleteProvince,
      },
      regency: {
        get: getRegencies,
        create: createRegency,
        update: updateRegency,
        delete: deleteRegency,
      },
    },
    land: {
      land_type: {
        get: getLandTypes,
        create: createLandType,
        update: updateLandType,
        delete: deleteLandType,
      },
      province_land: {
        get: getProvinceLands,
        create: createProvinceLand,
        update: updateProvinceLand,
        delete: deleteProvinceLand,
      },
      regency_land: {
        get: getRegencyLands,
        // create: createRegencyLand,
        // update: updateRegencyLand,
        // delete: deleteRegencyLand,
      },
    },
    commodity: {
      commodity_type: {
        get: getCommodityTypes,
        create: createCommodityType,
        update: updateCommodityType,
        delete: deleteCommodityType,
      },
      province_commodity: {
        get: getProvinceCommodities,
        // createProvinceCommodity,
        // updateProvinceCommodity,
        // deleteProvinceCommodity,
      },
      regency_commodity: {
        get: getRegencyCommodities,
        create: createRegencyCommodity,
        update: updateRegencyCommodity,
        delete: deleteRegencyCommodity,
      },
    },
    product: {
      product_type: {
        get: getProductTypes,
        create: createProductType,
        update: updateProductType,
        delete: deleteProductType,
      },
      product_brand: {
        get: getProductBrands,
        create: createProductBrand,
        update: updateProductBrand,
        delete: deleteProductBrand,
      },
      product_dosage: {
        get: getProductDosages,
        create: createProductDosage,
        update: updateProductDosage,
        delete: deleteProductDosage,
      },
    },

    potential: {
      province_potential: {
        get: getProvincePotentials,
        create: createProvincePotential,
        update: updateProvincePotential,
        delete: deleteProvincePotential,
      },
      regency_potential: {
        get: getRegencyPotentials,
        create: createRegencyPotential,
        update: updateRegencyPotential,
        delete: deleteRegencyPotential,
      },
    },

    sale: {
      sale_overview: {},
      sales_realization: {
        get: getSalesRealizations,
        create: createSalesRealization,
        update: updateSalesRealization,
        delete: deleteSalesRealization,
      },

      daily_sales: {
        get: getDailySales,
        create: createDailySales,
        delete: deleteDailySales,
        update: updateDailySales,
      },
    },

    stall: {
      get: getStalls,
      getStallProduct: getStallProductBrands,
      create: createStall,
      update: updateStall,
      delete: deleteStall,

      stall_product_brand: {
        get: getStallProductBrands,
        get_product_brands: getProductBrands,

        assign: assignProductBrand,
      },
    },

    user: {
      get: getUsers,
      getById: getUserById,
      update: updateUser,
      delete: deleteUser,
    },
  },
};
