import { Box, Paper } from '@mui/material';
import React, { FC, useMemo } from 'react';

import WidgetHintsButton from 'commons/components/molecules/buttons/WidgetHints';
import useWidgetFactory from './useWidgetFactory';
import { AnswerType } from 'commons/types/models';
import { WidgetType } from 'commons/types/widgets/widget';
import CollapseWidgetEditMenu from './CollapseWidgetEditMenu';

export enum WidgetModes {
  Create,
  View,
  Edit,
  Review,
  InForm,
  Disable,
};

export enum WidgetTypes {
  SmallAnswerProblem = 'SmallAnswerProblem',
  BigAnswerProblem = 'BigAnswerProblem',
  UploadFileProblem = 'UploadFileProblem',
  MultiChoiceProblem = 'MultiChoiceProblem',
  InviteeUsername = 'InviteeUsername',
  TextWidget = 'TextWidget',
  DetailBoxWidget = 'DetailBoxWidget',
  Image = 'Image',
  Video = 'Video',
  Iframe = 'Iframe',
}

type WidgetPropsType = {
  widget: WidgetType;
  mode?: WidgetModes;
  paperId: string;
  coveredWithPaper?: boolean;
  collectAnswer?: any;
  submittedAnswer?: AnswerType;
}

const Widget: FC<WidgetPropsType> = ({
  widget,
  mode = WidgetModes.View,
  paperId,
  coveredWithPaper = true,
  collectAnswer,
  submittedAnswer,
}) => {

  const {
    onAnswerChange,
    useSubmitAnswerMutation,
    WidgetComponent,
  } = useWidgetFactory({
    widgetId: widget.id,
    paperId,
    widgetType: widget.widget_type,
    collectAnswer,
  });

  const Cover = useMemo(() =>
    coveredWithPaper
      ? ({ children }) =>
        <Paper elevation={2} sx={{ padding: 1, width: '100%', height: '100%', position: 'relative' }}>
          {children}
        </Paper>
      : ({ children }) =>
        <Box width={'100%'} height={'100%'} position={'relative'}>
          {children}
        </Box>
    , [coveredWithPaper])

  return (
    <Cover>
      {mode === WidgetModes.Edit && <CollapseWidgetEditMenu widget={widget} paperId={paperId} />}
      {mode === WidgetModes.View && widget?.hints?.length > 0 && <WidgetHintsButton widgetId={widget.id} />}
      <WidgetComponent
        {...widget}
        mode={mode}
        paperId={paperId}
        submittedAnswer={submittedAnswer}
        useSubmitAnswerMutation={useSubmitAnswerMutation}
        onAnswerChange={onAnswerChange}
      />
    </Cover>
  );
};

export default Widget;
