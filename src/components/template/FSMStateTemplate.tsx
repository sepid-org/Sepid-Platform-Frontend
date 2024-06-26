import { Box, Divider, Grid, Paper, Typography, Stack } from '@mui/material';
import React, { FC, Fragment, useMemo } from 'react';
import Widget from 'components/organisms/Widget';
import BackButton from 'components/atoms/BackButton';
import NextButton from 'components/atoms/NextButton';
import FSMStateRoadMap from 'components/organisms/FSMStateRoadMap';
import FSMStateHelpButton from 'components/molecules/FSMStateHelpButton';
import { useGetPaperQuery } from 'redux/features/paper/PaperSlice';
import { FSMStateType } from 'types/models';

type FSMStateTemplatePropsType = {
  state: FSMStateType;
  playerId: string;
}

const FSMStateTemplate: FC<FSMStateTemplatePropsType> = ({ state, playerId }) => {
  const { data: paper } = useGetPaperQuery({ paperId: state.id }, { skip: !state.id });

  const widgets = [...(paper?.widgets || [])];
  const hints = [...state.hints];

  const { inward_edges, outward_edges } = state;

  hints.sort((a, b) => a.id - b.id);
  widgets.sort((a, b) => a.id - b.id);

  const questions = widgets.filter((widget) =>
    widget.widget_type.includes('Problem')
  );

  const questionWidgets = useMemo(() =>
    questions.map((widget, index) => (
      <Stack key={widget.id}>
        <Divider style={{ marginBottom: 20 }} />
        <Widget paperId={state.id} coveredWithPaper={false} key={widget.id} widget={widget} />
      </Stack>
    )), [questions]);

  const notQuestions = widgets.filter(
    (widget) => !widget.widget_type.includes('Problem')
  );

  const notQuestionWidgets = useMemo(() =>
    notQuestions.map((widget) => (
      <Stack key={widget.id}>
        <Widget paperId={state.id} coveredWithPaper={false} widget={widget} />
      </Stack>
    )), [notQuestions]);

  return (
    <Fragment>
      <Grid container spacing={2} justifyContent="center" alignItems='flex-start'>
        <Grid
          item xs={12}
          md={notQuestions.length > 0 ? 4 : 6}
          lg={notQuestions.length > 0 ? 4 : 8}
          position={{ xs: null, md: 'sticky' }} top={0}>
          <Stack spacing={2}>
            <Stack spacing={2} component={Paper} sx={{ padding: 2 }} position={'relative'}>
              <Box sx={{ position: 'absolute', left: -26, top: -24, rotate: '24deg' }}>
                <FSMStateHelpButton hints={hints} />
              </Box>
              <Typography component="h2" variant="h3" align='center' alignSelf={'center'}>
                {state.name}
              </Typography>
              {questionWidgets}
              <Divider sx={{ display: { xs: 'none', md: 'inherit' } }} />
              <Stack sx={{ display: { xs: 'none', md: 'inherit' } }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <BackButton inwardEdges={inward_edges} playerId={playerId} />
                  </Grid>
                  <Grid item xs={6}>
                    <NextButton outwardEdges={outward_edges} />
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
            <FSMStateRoadMap currentNodeName={state.name} playerId={playerId} fsmId={state.fsm} />
            {notQuestions.length === 0 &&
              <Stack sx={{ display: { xs: 'inherit', md: 'none' } }} >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <BackButton inwardEdges={inward_edges} playerId={playerId} />
                  </Grid>
                  <Grid item xs={6}>
                    <NextButton outwardEdges={outward_edges} />
                  </Grid>
                </Grid>
              </Stack>
            }
          </Stack>
        </Grid>
        {notQuestions.length > 0 && (
          <Grid item xs={12} md={8} lg={8}>
            <Stack spacing={2}>
              <Stack component={Paper} sx={{ padding: 1 }} spacing={1}>
                {notQuestionWidgets}
              </Stack>
              <Stack sx={{ display: { xs: 'inherit', md: 'none' } }} >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <BackButton inwardEdges={inward_edges} playerId={playerId} />
                  </Grid>
                  <Grid item xs={6}>
                    <NextButton outwardEdges={outward_edges} />
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
          </Grid>
        )}
      </Grid >
    </Fragment>
  );
}

export default FSMStateTemplate;
