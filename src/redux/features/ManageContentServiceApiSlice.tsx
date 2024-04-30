import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MCS_URL } from 'configs/Constants'
import { logoutAction } from 'redux/slices/account';

const _manageContentServiceBaseQuery = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({
    baseUrl: MCS_URL + 'api/',
    prepareHeaders: (headers, { getState, endpoint }) => {
      const accessToken = (getState() as any).account?.accessToken;
      //todo: what should we do with refresh token?!
      const refreshToken = (getState() as any).account?.refreshToken;
      if (accessToken) {
        headers.append('Authorization', `JWT ${accessToken}`)
      }
      return headers
    },
  })(args, api, extraOptions);

  if (result.error) {
    if (result.error.status === 401 || result.error.status === 403) {
      // Handle 403 error
      // For example, you can dispatch a logout action
      api.dispatch(logoutAction());
    }
    // Handle other types of errors
  }
  return result;
};

export const ManageContentServiceApi = createApi({
  reducerPath: 'manage-content-service',
  tagTypes: ['program', 'programs', 'fsm', 'fsms'],
  baseQuery: _manageContentServiceBaseQuery,
  endpoints: build => ({
  })
})
