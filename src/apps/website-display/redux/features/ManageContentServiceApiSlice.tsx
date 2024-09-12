import { createApi } from '@reduxjs/toolkit/query/react'
import CustomBaseQuery from '../../../../commons/redux/utilities/CustomBaseQuery';
import { CMS_URL } from 'commons/configs/Constants';

export const ManageContentServiceApi = createApi({
  reducerPath: 'manage-content-service',
  tagTypes: [
    'program',
    'programs',
    'program-user-permissions',
    'fsm',
    'fsms',
    'fsms-user-permissions',
    'program-admins',
    'fsm-states',
    'fsm-state',
    'fsm-edges',
    'widget',
    'paper',
    'articles',
    'article',
    'form',
    'forms',
    'receipt',
    'receipts',
    'player',
    'player-transited-path',
    'website-profile',
    'user-profile',
    'institutes',
    'schools',
    'merchandises',
    'merchandise',
    'discount-codes',
    'currencies',
    'teams',
    'team',
    'my-invitations',
    'team-invitations',
    'Position',
  ],
  baseQuery: CustomBaseQuery({ baseUrl: CMS_URL + 'api/' }),
  endpoints: build => ({
  })
})
