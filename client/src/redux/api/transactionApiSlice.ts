import { apiSlice } from './apiSlice';

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: () => ({
        url: '/transactions',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: string }) => ({
                type: 'Transactions' as const,
                id,
              })),
              { type: 'Transactions', id: 'LIST' },
            ]
          : [{ type: 'Transactions', id: 'LIST' }],
    }),

    getSingleTransaction: builder.query({
      query: (id) => `/transactions/${id}`,
      providesTags: (result, _error, id) =>
        result ? [{ type: 'Transactions', id }] : [{ type: 'Transactions', id }],
    }),

    addNewTransaction: builder.mutation({
      query: (initialTransaction) => ({
        url: '/transactions',
        method: 'POST',
        body: {
          ...initialTransaction,
        },
      }),
      invalidatesTags: [{ type: 'Transactions', id: 'LIST' }],
    }),

    updateTransaction: builder.mutation({
      query: ({ id, transaction }) => ({
        url: `/transactions/${id}`,
        method: 'PATCH',
        body: transaction,
      }),
      invalidatesTags: (result, _error, { id }) =>
        result
          ? [
              { type: 'Transactions', id },
              { type: 'Transactions', id: 'LIST' },
            ]
          : [{ type: 'Transactions', id: 'LIST' }],
    }),

    deleteTransaction: builder.mutation({
      query: ({ id }) => ({
        url: `/transactions/${id}`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: [{ type: 'Transactions', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useGetSingleTransactionQuery,
  useAddNewTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionApiSlice;
