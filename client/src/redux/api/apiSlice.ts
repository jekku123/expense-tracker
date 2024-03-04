import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../features/authSlice';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/api',
  credentials: 'include',
  prepareHeaders: (headers, api) => {
    const token = (api.getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    console.log('sending refresh token');

    // send refresh token to get new access token
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    if (refreshResult.data) {
      // @ts-expect-error accessToken is missing in refreshResult
      const { accessToken } = refreshResult.data;
      if (accessToken) {
        api.dispatch(setCredentials(accessToken));

        result = await baseQuery(args, api, extraOptions);
      } else {
        // Handle the case where accessToken is missing in refreshResult.data
        console.error('Access token is missing in refresh result data.');
      }
    } else {
      if (refreshResult?.error?.status === 403) {
        // Handle the case where there's an error with status 403
        // @ts-expect-error data is missing in refreshResult
        refreshResult.error.data.message = 'Your login has expired. ';
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Transactions', 'User'],
  endpoints: () => ({}),
});
