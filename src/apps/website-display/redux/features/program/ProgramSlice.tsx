import { UserFSMStatus, ProgramType, ProgramUserPermissions } from 'commons/types/models';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';

type GetProgramsInputType = {
  pageNumber?: number;
}

type GetProgramsOutputType = {
  programs: ProgramType[];
  count: number;
}

type GetProgramInputType = {
  programSlug: string;
}

type GetProgramOutputType = ProgramType;

type GetProgramUserPermissionsInputType = {
  programSlug: string;
}

type GetProgramUserPermissionsOutputType = ProgramUserPermissions;

type GetProgramUserFSMsStatusInputType = {
  programSlug: string;
}

type GetProgramUserFSMsStatusOutputType = UserFSMStatus[];

type UpdateProgramInputType = {
  programSlug: string;
  body: any;
};

type UpdateProgramOutputType = {

}

type CreateProgramInputType = {
  body: any;
};

type CreateProgramOutputType = {

}

export const ProgramSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({

    createProgram: builder.mutation<CreateProgramOutputType, CreateProgramInputType>({
      invalidatesTags: ['programs'],
      query: (body) => ({
        url: `/fsm/program/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): UpdateProgramOutputType => {
        return response;
      },
    }),

    updateProgram: builder.mutation<UpdateProgramOutputType, UpdateProgramInputType>({
      invalidatesTags: ['program', 'programs'],
      query: ({ programSlug, ...body }) => ({
        url: `/fsm/program/${programSlug}/`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: any): UpdateProgramOutputType => {
        return response;
      },
    }),

    getPrograms: builder.query<GetProgramsOutputType, GetProgramsInputType>({
      providesTags: ['programs'],
      query: ({ pageNumber = 1 }) => `fsm/program/?page=${pageNumber}`,
      transformResponse: (response: any): GetProgramsOutputType => {
        return {
          programs: response.results,
          count: response.count,
        };
      },
    }),

    getProgram: builder.query<GetProgramOutputType, GetProgramInputType>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) =>
        [{ type: 'program', id: item.programSlug }]
      ),
      query: ({ programSlug }) => `fsm/program/${programSlug}/`,
      transformResponse: (response: any): GetProgramOutputType => {
        return response;
      },
    }),

    getProgramUserPermissions: builder.query<GetProgramUserPermissionsOutputType, GetProgramUserPermissionsInputType>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) =>
        [
          'user-specific-data',
          { type: 'program', id: item.programSlug }
        ]
      ),
      query: ({ programSlug }) => `fsm/program/${programSlug}/get_user_permissions/`,
      transformResponse: (response: any): GetProgramUserPermissionsOutputType => {
        return response;
      },
    }),

    getProgramUserFSMsStatus: builder.query<GetProgramUserFSMsStatusOutputType, GetProgramUserFSMsStatusInputType>({
      providesTags: ['fsms', 'user-specific-data'],
      query: ({ programSlug }) => `fsm/program/${programSlug}/get_user_fsms_status/`,
      transformResponse: (response: any): GetProgramUserFSMsStatusOutputType => {
        return response;
      },
    }),

    softDeleteProgram: builder.mutation<any, { programSlug: string }>({
      invalidatesTags: ['programs'],
      query: ({ programSlug }) => `fsm/program/${programSlug}/soft_delete/`
    }),

    registerUserInProgram: builder.mutation<any, { registrationFormId: string, username: string }>({
      invalidatesTags: ['registration-receipt'],
      query: ({ registrationFormId, username }) => ({
        url: `fsm/registration_form_admin/${registrationFormId}/register_user_in_program/`,
        method: 'POST',
        body: {
          username,
        },
      }),
    }),
  })
});

export const {
  useGetProgramQuery,
  useGetProgramsQuery,
  useUpdateProgramMutation,
  useCreateProgramMutation,
  useSoftDeleteProgramMutation,
  useRegisterUserInProgramMutation,
  useGetProgramUserPermissionsQuery,
  useGetProgramUserFSMsStatusQuery,
} = ProgramSlice;
