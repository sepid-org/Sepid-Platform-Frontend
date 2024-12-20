import { combineReducers } from '@reduxjs/toolkit';
import allReducers from 'apps/website-display/redux/slices/allReducers';
import { PartyManagementServiceApi } from 'apps/website-display/redux/features/ManagePartyServiceApiSlice'
import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice'
import { WebsiteManagementServiceApi } from 'apps/website-display/redux/features/ManageWebsiteServiceApiSlice'
import { AshbariaApi } from 'apps/ashbaria/redux/AshbariaApi';
import { BankApi } from './apis/bank/BankApi';
import { FilmbaziApi } from 'apps/film-bazi/redux/FilmbaziApi';

const appReducer = combineReducers({
  ...allReducers,
  [PartyManagementServiceApi.reducerPath]: PartyManagementServiceApi.reducer,
  [ContentManagementServiceApi.reducerPath]: ContentManagementServiceApi.reducer,
  [WebsiteManagementServiceApi.reducerPath]: WebsiteManagementServiceApi.reducer,
  [AshbariaApi.reducerPath]: AshbariaApi.reducer,
  [FilmbaziApi.reducerPath]: FilmbaziApi.reducer,
  [BankApi.reducerPath]: BankApi.reducer,
});

export default appReducer;
