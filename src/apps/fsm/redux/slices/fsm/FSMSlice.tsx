import { FSMEdgeType, FSMStateType, FSMType } from 'commons/types/models';
import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';

type UpdateFSMInputType = {
  fsmId: string;
} & FSMType;

type UpdateFSMOutputType = {

}

type CreateFSMInputType = {
  body: any;
};

type CreateFSMOutputType = {

}

type GetFSMsInputType = {
  programSlug: string;
  pageNumber: number;
};

type GetFSMsOutputType = {
  fsms: FSMType[];
  count: number;
}

type GetFSMInputType = {
  fsmId: string;
};

type GetFSMOutputType = FSMType;

type GetFSMStatesOutputType = FSMStateType[];

type GetFSMEdgesOutputType = FSMEdgeType[];



export const FSMSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    createFSM: builder.mutation<CreateFSMOutputType, CreateFSMInputType>({
      invalidatesTags: ['fsms'],
      query: ({ ...body }) => ({
        url: `/fsm/fsm/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): CreateFSMOutputType => {
        return response;
      },
    }),

    updateFSM: builder.mutation<UpdateFSMOutputType, UpdateFSMInputType>({
      invalidatesTags: ['fsm', 'fsms'],
      query: ({ fsmId, ...body }) => ({
        url: `/fsm/fsm/${fsmId}/`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: any): UpdateFSMOutputType => {
        return response;
      },
    }),

    getFSM: builder.query<GetFSMOutputType, GetFSMInputType>({
      providesTags: ['fsm'],
      query: ({ fsmId }) => `fsm/fsm/${fsmId}/`,
      transformResponse: (response: any): GetFSMOutputType => {
        return response;
      },
    }),

    getFSMs: builder.query<GetFSMsOutputType, GetFSMsInputType>({
      providesTags: ['fsms'],
      query: ({ programSlug, pageNumber = 1 }) => `fsm/fsm/?program=${programSlug}&page=${pageNumber}`,
      transformResponse: (response: any): GetFSMsOutputType => {
        return {
          fsms: response.results,
          count: response.count,
        };
      },
    }),

    getFSMStates: builder.query<GetFSMStatesOutputType, { fsmId: string }>({
      providesTags: ['fsm-states'],
      query: ({ fsmId }) => `fsm/fsm/${fsmId}/get_states/`,
      transformResponse: (response: any): GetFSMStatesOutputType => {
        return response;
      },
    }),

    getFSMEdges: builder.query<GetFSMEdgesOutputType, { fsmId: string }>({
      providesTags: ['fsm-edges'],
      query: ({ fsmId }) => `fsm/fsm/${fsmId}/get_edges/`,
      transformResponse: (response: any): GetFSMEdgesOutputType => {
        return response;
      },
    }),

    softDeleteFSM: builder.mutation<any, { fsmId: string }>({
      invalidatesTags: ['fsms'],
      query: ({ fsmId }) => `fsm/fsm/${fsmId}/soft_delete/`
    }),

    setFSMFirstState: builder.mutation<any, { fsmId: string; fsmStateId: string }>({
      invalidatesTags: ['fsm', 'fsm-states'],
      query: ({ fsmId, fsmStateId }) => ({
        url: `/fsm/fsm/${fsmId}/first_state/`,
        method: 'POST',
        body: {
          state: fsmStateId,
        },
      }),
    }),
  })
});

export const {
  useUpdateFSMMutation,
  useCreateFSMMutation,
  useGetFSMQuery,
  useGetFSMsQuery,
  useSoftDeleteFSMMutation,
  useGetFSMStatesQuery,
  useGetFSMEdgesQuery,
  useSetFSMFirstStateMutation,
} = FSMSlice;
