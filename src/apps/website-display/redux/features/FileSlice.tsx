import jsonToFormData from 'commons/utils/jsonToFromDate';
import { ContentManagementServiceApi } from './ManageContentServiceApiSlice';
import axios from 'axios';
import { setUploadProgress } from 'apps/website-display/redux/slices/Global';
import { CMS_URL } from 'commons/constants/Constants';

type CreateFileInputType = {
  file: File;
  // todo: add "party" as the folder name
}

type CreateFileOutputType = {
  file: string;
}

export const FileSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    uploadFile: builder.mutation<CreateFileOutputType, CreateFileInputType>({
      queryFn: async (data, api) => {
        try {
          const result = await axios.post(
            `${CMS_URL}api/file-storage/file/`,
            jsonToFormData(data),
            {
              //...other options like headers here
              onUploadProgress: upload => {
                //Set the progress value to show the progress bar
                const uploadProgress = Math.round((100 * upload.loaded) / upload.total);
                api.dispatch(setUploadProgress(uploadProgress));
              },
            });
          api.dispatch(setUploadProgress(null));
          return { data: result.data }
        } catch (axiosError) {
          let err: any = axiosError;
          return {
            error: {
              status: err.response?.status,
              data: err.response?.data || err.message,
            },
          }
        };
      }
    }),
  })
});

export const { useUploadFileMutation } = FileSlice;
