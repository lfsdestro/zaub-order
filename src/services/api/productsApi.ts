import { ProductCategory, ProductsResponse } from '@/types/product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type GetProductsParams = {
  limit?: number;
  skip?: number;
  search?: string;
  category?: string;
};

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, GetProductsParams>({
      query: ({ limit = 12, skip = 0, search, category }) => {
        if (search) {
          return {
            url: '/products/search',
            params: { q: search, limit, skip },
          };
        }

        if (category) {
          return {
            url: `/products/category/${category}`,
            params: { limit, skip },
          };
        }

        return {
          url: '/products',
          params: { limit, skip },
        };
      },
    }),

    getCategories: builder.query<ProductCategory[], void>({
      query: () => '/products/categories',
    }),
  }),
});

export const { useGetProductsQuery, useGetCategoriesQuery } = productsApi;