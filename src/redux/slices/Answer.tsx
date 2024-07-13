import { createSlice } from '@reduxjs/toolkit';
import { Apis } from 'redux/apis';
import { createAsyncThunkApi } from 'redux/apis/cerateApiAsyncThunk';
import {
  clearQuestionAnswerUrl,
  sendWidgetAnswerUrl,
  uploadFileUrl,
} from 'redux/constants/urls';

export type InitialStateType = {
  isFetching: boolean;
  answers: object;
}

const initialState: InitialStateType = {
  answers: {},
  isFetching: false,
}

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

/////////////////////////// SEND ANSWER ///////////////////////////

const _sendWidgetAnswerAction = createAsyncThunkApi(
  'widget/sendWidgetAnswerAction',
  Apis.POST,
  sendWidgetAnswerUrl,
  {
    defaultNotification: {
      error: 'مشکلی در ثبت پاسخ وجود داشت.',
    },
  }
);

export const sendBigAnswerAction = ({ questionId, text, onSuccess, onFailure }) =>
  _sendWidgetAnswerAction({
    question_id: questionId,
    text,
    answer_type: 'BigAnswer',
    onSuccess,
    onFailure,
  });

export const sendSmallAnswerAction = ({ questionId, text, onSuccess, onFailure }) =>
  _sendWidgetAnswerAction({
    question_id: questionId,
    text,
    answer_type: 'SmallAnswer',
    onSuccess,
    onFailure,
  });

export const sendInviteeUsernameResponseAction = ({ questionId, username, onSuccess, onFailure }) =>
  _sendWidgetAnswerAction({
    question_id: questionId,
    username,
    answer_type: 'InviteeUsernameResponse',
    onSuccess,
    onFailure,
  });

export const sendMultiChoiceAnswerAction = ({ questionId, selectedChoices, onSuccess, onFailure }) =>
  _sendWidgetAnswerAction({
    question_id: questionId,
    choices: selectedChoices,
    answer_type: 'MultiChoiceAnswer',
    onSuccess,
    onFailure,
  });


export const uploadFileAnswerAction = createAsyncThunkApi(
  'widget/uploadFileAnswerAction',
  Apis.POST_FORM_DATA,
  uploadFileUrl,
  {
    bodyCreator: ({ questionId, answerFile, onSuccess, onFailure }) => ({
      problem: questionId,
      answer_file: answerFile,
      is_final_answer: true,
      onSuccess,
      onFailure,
    }),
    defaultNotification: {
      error: 'مشکلی در ثبت پاسخ وجود داشت.',
    },
  }
);

export const clearQuestionAnswerAction = createAsyncThunkApi(
  'widget/clearQuestionAnswerAction',
  Apis.POST,
  clearQuestionAnswerUrl,
  {
    defaultNotification: {
      error: 'مشکلی در حذف‌کردن پاسخ وجود داشت.',
    },
  }
);

const AnswerSlice = createSlice({
  name: 'AnswerSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [_sendWidgetAnswerAction.pending.toString()]: isFetching,
    [_sendWidgetAnswerAction.fulfilled.toString()]: isNotFetching,
    [_sendWidgetAnswerAction.rejected.toString()]: isNotFetching,


    [uploadFileAnswerAction.pending.toString()]: isFetching,
    [uploadFileAnswerAction.fulfilled.toString()]: isNotFetching,
    [uploadFileAnswerAction.rejected.toString()]: isNotFetching,
  },
});

export const { reducer: AnswerReducer } = AnswerSlice;
