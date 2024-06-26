import {
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router-dom';
import Widget, { WidgetModes } from 'components/organisms/Widget';
import {
  getAnswerAction,
  getScoresAndCommentsAction,
  setScoreAction,
} from 'redux/slices/scoring';
import Layout from 'components/template/Layout';
import ScoringColumn from './ScoringColumn';
import { useGetWidgetQuery } from 'redux/features/widget/WidgetSlice';

function Correction({
  getAnswer,
  getScoresAndComments,
  answer,
}) {
  const t = useTranslate();
  const { answerId } = useParams();
  const { data: widget } = useGetWidgetQuery({ widgetId: answer?.problem }, { skip: !Boolean(answer?.problem) });

  useEffect(() => {
    getAnswer({ answerId })
    getScoresAndComments({ answer_id: answerId })
  }, [])

  if (!widget) {
    return null;
  }

  const problemWithAnswer = {
    ...widget,
    last_submitted_answer: answer,
  };

  return (
    <Layout appbarMode='GENERAL'>
      <Grid container spacing={4} justifyContent='center' alignItems='flex-start'>
        <Grid item xs={12}>
          <Typography variant="h1" align='center'>
            {'تصحیح'}
          </Typography>
        </Grid>
        <Grid item container spacing={2} xs={12} md={8}>
          <Paper sx={{ width: '100%', padding: 2 }}>
            {problemWithAnswer &&
              // todo: bug: answer should not use <Widget/> component
              <Widget paperId={null} coveredWithPaper={false} mode={WidgetModes.Review} widget={problemWithAnswer} />
            }
          </Paper>
        </Grid>
        <Grid item container spacing={2} xs={12} md={4}>
          <Paper sx={{ width: '100%', padding: 2 }}>
            <ScoringColumn />
          </Paper>
        </Grid>
      </Grid >
    </Layout >
  );
}

const mapStateToProps = (state) => ({
  answer: state.scoring.answer,
  scores: state.scoring.scores,
});

export default connect(mapStateToProps, {
  setScore: setScoreAction,
  getScoresAndComments: getScoresAndCommentsAction,
  getAnswer: getAnswerAction,
})(Correction);
