import React, { FC, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import TinyPreview from 'commons/components/organisms/TinyEditor/Preview';
import { WidgetModes } from 'commons/components/organisms/Widget';
import MultiChoiceQuestionEditWidget from './edit';
import Choice from 'commons/components/molecules/Choice';
import { toast } from 'react-toastify';
import { toPersianNumber } from 'commons/utils/translateNumber';
import { AnswerType } from 'commons/types/models';
import { ChoiceType } from 'commons/types/widgets';
import { QuestionWidgetType } from 'commons/types/widgets/QuestionWidget';
import IsRequired from 'commons/components/atoms/IsRequired';
export { MultiChoiceQuestionEditWidget };

type MultiChoiceQuestionWidgetPropsType = {
  useSubmitAnswerMutation: any;
  onAnswerChange: any;
  id: string;
  text: string;
  choices: ChoiceType[];
  mode: WidgetModes;
  max_selections: number;
  min_selections: number;
  lock_after_answer: boolean;
  submittedAnswer: AnswerType;
} & QuestionWidgetType;

const MultiChoiceQuestionWidget: FC<MultiChoiceQuestionWidgetPropsType> = ({
  useSubmitAnswerMutation,
  onAnswerChange,

  id: questionId,
  text: questionText,
  choices: questionChoices,
  mode,
  max_selections: maxSelections,
  min_selections: minSelections,
  lock_after_answer: lockAfterAnswer,
  submittedAnswer,
  ...questionWidgetProps
}) => {
  const [selectedChoices, _setSelectedChoices] = useState<ChoiceType[]>(submittedAnswer?.choices || []);
  const [onSubmitAnswer, onSubmitAnswerResult] = useSubmitAnswerMutation();
  const setSelectedChoices = (newSelectedChoices) => {
    onAnswerChange({ choices: newSelectedChoices });
    _setSelectedChoices(newSelectedChoices);
  }

  const onChoiceSelect = (choice) => {
    if (mode === WidgetModes.Edit || mode === WidgetModes.Disable) {
      return;
    }
    if (maxSelections === 1) {
      setSelectedChoices([choice])
      if (mode === WidgetModes.View) {
        submitAnswer([choice]);
      }
    } else {
      const choiceIndex = selectedChoices.indexOf(choice);
      if (choiceIndex === -1) {
        if (selectedChoices.length === maxSelections) {
          toast.error(`حداکثر ${toPersianNumber(maxSelections)} گزینه را می‌توانید انتخاب کنید.`)
          return;
        }
        setSelectedChoices([
          ...selectedChoices,
          choice,
        ]);
      } else {
        const selectedChoicesCopy = [...selectedChoices]
        selectedChoicesCopy.splice(choiceIndex, 1);
        setSelectedChoices(selectedChoicesCopy);
      }
    }
  }

  const submitAnswer = (selectedChoices) => {
    if (mode === WidgetModes.View) {
      onSubmitAnswer({ questionId, selectedChoices });
    }
  }

  return (
    <Stack spacing={1}>
      <IsRequired disabled={!questionWidgetProps.is_required}>
        <TinyPreview
          styles={{ width: '100%' }}
          content={questionText}
        />
      </IsRequired>
      <Stack spacing={1}>
        {questionChoices.map((choice) =>
          <Choice
            disabled={mode === WidgetModes.Review}
            key={choice.id}
            choice={choice}
            mode={WidgetModes.View}
            isSelected={selectedChoices.map(choice => choice.id).includes(choice.id)}
            onSelectionChange={() => onChoiceSelect(choice)}
            variant={maxSelections > 1 ? 'checkbox' : 'radio'}
          />
        )}
      </Stack>
      {mode === WidgetModes.View && maxSelections > 1 && selectedChoices.length > 0 &&
        <Button
          sx={{ width: 80, alignSelf: 'end' }}
          variant='contained'
          onClick={() => submitAnswer(selectedChoices)}>
          <Typography fontWeight={400}>
            {'ثبت'}
          </Typography>
        </Button>
      }
    </Stack>
  );
};

export default MultiChoiceQuestionWidget;
