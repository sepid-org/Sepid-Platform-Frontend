import { Button, IconButton, Stack, Typography } from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect, useState, FC, Fragment } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import {
  clearQuestionAnswerAction,
} from 'redux/slices/Answer';
import UploadFileProblemEditWidget from './edit';
import { WidgetModes } from 'components/organisms/Widget';
import { toast } from 'react-toastify';

type UploadFileProblemWidgetPropsType = {
  onAnswerChange: any;
  onAnswerSubmit: any;

  clearQuestionAnswer: any;
  id: number;
  text: string;
  last_submitted_answer: any;
  isFetching: boolean;
  mode: WidgetModes;
}

const UploadFileProblemWidget: FC<UploadFileProblemWidgetPropsType> = ({
  onAnswerChange,
  onAnswerSubmit,

  clearQuestionAnswer,
  id: questionId,
  text = 'محل بارگذاری فایل:',
  last_submitted_answer,
  isFetching,
  mode,
}) => {
  const t = useTranslate();
  const [fileLink, setFileLink] = useState(null);

  useEffect(() => {
    if (last_submitted_answer) {
      setFileLink(last_submitted_answer.answer_file)
    }
  }, [last_submitted_answer])

  const changeFile = (e) => {
    const selectedFile = e.target.files[0];
    e.target.value = null;
    if (!selectedFile) {
      return;
    }
    if (selectedFile.name.length > 100) {
      toast.error('حداکثر طول نام فایل حداکثر ۱۰۰ کاراکتر است.');
      return;
    }
    if (selectedFile.size > 11e6) {
      toast.error('حجم فایل ارسالی باید کمتر از ۱۰ مگابایت باشد.')
      return;
    }
    onAnswerSubmit({
      questionId,
      // fileName: file.name,
      answerFile: selectedFile,
      onSuccess: (response) => {
        setFileLink(response.answer_file);
        onAnswerChange({ upload_file_answer: response.id });
      }
    })
  };

  const clearFile = (e) => {
    e.preventDefault();
    clearQuestionAnswer({ question_id: questionId }).then((response) => {
      if (response.type?.endsWith('fulfilled')) {
        setFileLink(null);
        onAnswerChange({ upload_file_answer: null });
      }
    });
  }

  return (
    <Stack alignItems='center' justifyContent='space-between' direction='row' spacing={1}>
      <Typography>{text}</Typography>
      <Stack justifyContent='flex-end' spacing={1}>
        {(mode === WidgetModes.View || mode === WidgetModes.InForm) &&
          <Fragment>
            <Button
              component="label"
              htmlFor={'raised-button-file' + questionId}
              disabled={isFetching}
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<CloudUploadIcon />}
              sx={{ whiteSpace: 'nowrap' }}>
              {t('uploadFile')}
            </Button>
            <input
              accept="application/pdf,image/*,.zip,.rar"
              style={{ display: 'none' }}
              id={'raised-button-file' + questionId}
              type="file"
              onChange={changeFile}
            />
          </Fragment>
        }
        {(mode !== WidgetModes.Edit && fileLink?.link) &&
          <Button
            size="small"
            variant='outlined'
            sx={{
              whiteSpace: 'nowrap',
            }}
            endIcon={
              (mode !== WidgetModes.Review &&
                <IconButton size='small' onClick={clearFile}>
                  <ClearIcon sx={{ fontSize: 14 }} />
                </IconButton>
              )}
            // todo Hashem: href={BASE_URL + file?.link} or href={file?.link} ? bazi jaha momkeneh fargh koneh.
            href={fileLink}
            component="a"
            target="_blank">
            {'آخرین فایل ارسالی'}
          </Button>
        }
      </Stack>
      {mode === WidgetModes.Review && !fileLink &&
        <Typography color='red' variant='caption'>
          {'پاسخی برای این سوال ثبت نشده است.'}
        </Typography>
      }
    </Stack>
  );
};

export default connect(null, {
  clearQuestionAnswer: clearQuestionAnswerAction,
})(UploadFileProblemWidget);

export { UploadFileProblemEditWidget };
