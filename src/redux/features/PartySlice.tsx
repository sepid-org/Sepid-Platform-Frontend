import {
  createSelector,
} from '@reduxjs/toolkit';
import { PartyType } from 'types/global';
import { api } from './apiSlice'

export const PartySlice = api.injectEndpoints({
  endpoints: builder => ({
    getParty: builder.query<PartyType, void>({
      query: () => `party-manager/get_party_by_domain/`,
    })
  })
})

export const selectPartyUUID = createSelector(
  PartySlice.endpoints.getParty.select(),
  reponse => reponse.data?.uuid,
)

export const { useGetPartyQuery } = PartySlice;