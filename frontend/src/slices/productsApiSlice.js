import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ filter, search, pageNumber }) => ({
          url: PRODUCTS_URL,
          params: { filter, search, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
  }),
  
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),   
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
} = productsApiSlice;
