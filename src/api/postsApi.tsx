import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4001/',
  }),
  endpoints: (build) => ({
    getPosts: build.query({
      query: (limit = 0) => `posts?${limit && `_limit=${limit}`}`,
      providesTags: (result) => {
        return result
          ? // @ts-ignore
            [...result.map(({ id }) => ({ types: 'Posts', id })), { type: 'Posts', id: 'LIST' }]
          : [{ type: 'Posts', id: 'LIST' }];
      },
    }),
    appPost: build.mutation({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
});

export const { useGetPostsQuery, useAppPostMutation, useDeleteProductMutation } = postsApi;
