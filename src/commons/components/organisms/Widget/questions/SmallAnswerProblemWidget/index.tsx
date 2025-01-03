import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { FC, Fragment, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyPreview from 'commons/components/organisms/TinyEditor/Preview';
import { WidgetModes } from 'commons/components/organisms/Widget';
import SmallAnswerProblemEditWidget from './edit';
import IsRequired from 'commons/components/atoms/IsRequired';
import { QuestionWidgetType } from 'commons/types/widgets/QuestionWidget';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import { useFSMContext } from 'commons/hooks/useFSMContext';

type SmallAnswerProblemWidgetPropsType = {
  useSubmitAnswerMutation: any;
  on: any;

  id: number;
  mode: WidgetModes;
  text: string;
  correct_answer: any;
  submittedAnswer: any;
} & QuestionWidgetType;

const SmallAnswerProblemWidget: FC<SmallAnswerProblemWidgetPropsType> = ({
  onAnswerChange,
  useSubmitAnswerMutation,

  id: questionId,
  mode,
  text: problemText,
  submittedAnswer,
  ...questionWidgetProps
}) => {
  const t = useTranslate();
  const [answer, setAnswer] = useState<string>(submittedAnswer?.text || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [hasAnsweredCorrectly, setHasAnsweredCorrectly] = useState(false);
  const [submitAnswer, submitAnswerResult] = useSubmitAnswerMutation();
  const { player } = useFSMContext();

  const changeText = (e) => {
    if (mode === WidgetModes.InForm) {
      onAnswerChange({ text: e.target.value });
    }
    setAnswer(e.target.value);
  }

  const submit = () => {
    if (!answer) {
      return;
    }
    setIsSubmitting(true);
    submitAnswer({
      playerId: player.id,
      questionId,
      text: answer,
      onSuccess: () => {
        setIsSubmitting(false);
      },
      onFailure: () => {
        setIsSubmitting(false);
      },
    });
  }

  return (
    <Fragment>
      <Stack spacing={1}>
        <IsRequired hidden={!questionWidgetProps.is_required}>
          <TinyPreview
            styles={{ width: '100%' }}
            content={problemText}
          />
        </IsRequired>
        <Stack
          direction='row'
          justifyContent='flex-start'
          alignItems='stretch'
          spacing={1}>
          {(mode === WidgetModes.View || mode === WidgetModes.InForm) &&
            <Fragment>
              <TextField
                fullWidth
                variant='outlined'
                value={answer}
                disabled={hasAnsweredCorrectly}
                error={hasAnswered && !hasAnsweredCorrectly}
                autoComplete='false'
                placeholder={'لطفاً پاسخ خود را وارد کنید.'}
                onChange={changeText}
                size='small'
              />
              {mode === WidgetModes.View &&
                <Button
                  variant='outlined'
                  color='primary'
                  sx={{ whiteSpace: 'nowrap' }}
                  disabled={isSubmitting || hasAnsweredCorrectly}
                  onClick={submit}>
                  {t('submit')}
                </Button>
              }
            </Fragment>
          }
          {mode === WidgetModes.Review &&
            <Fragment>
              {answer ?
                <Typography>{answer}</Typography> :
                <Typography color='red' variant='caption'>
                  {'پاسخی برای این سوال ثبت نشده است.'}
                </Typography>
              }
            </Fragment>
          }
        </Stack>
      </Stack>
    </Fragment>
  );
};

export { SmallAnswerProblemEditWidget };
export default SmallAnswerProblemWidget;
