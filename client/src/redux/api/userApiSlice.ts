import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // TODO: Make for admin only
    getUsers: builder.query({
      query: () => ({
        url: '/user',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: string }) => ({
                type: 'User' as const,
                id,
              })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    getMe: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: (result, _error, id) =>
        result ? [{ type: 'User', id }] : [{ type: 'User', id }],
    }),

    createUser: builder.mutation({
      query: (initialUser) => ({
        url: '/user/register',
        method: 'POST',
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    updateUser: builder.mutation({
      query: ({ id, User }) => ({
        url: `/user/${id}`,
        method: 'PATCH',
        body: User,
      }),
      invalidatesTags: (result, _error, { id }) =>
        result
          ? [
              { type: 'User', id },
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetMeQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
