import {
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import { PaperEditor } from '../Paper';
import EditHints from '../EditHints';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';

type NormalStateEditorPropsType = {
  fsmStateId: string;
}

const NormalStateEditor: FC<NormalStateEditorPropsType> = ({ fsmStateId }) => {
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId });
  const paperId = fsmState.papers[0];

  return (
    <Container maxWidth='md' sx={{ paddingBottom: 2 }}>
      <Stack spacing={2}>
        <Typography variant='h2' gutterBottom>
          {'مسئله‌ها'}
        </Typography>
        <Divider />
        <PaperEditor paperId={paperId} mode='problems' />
        <Typography variant='h2' gutterBottom>
          {'محتواها'}
        </Typography>
        <Divider />
        <PaperEditor paperId={paperId} mode='contents' />
        <Typography variant="h2" gutterBottom>
          {'راهنمایی‌ها'}
        </Typography>
        <Divider />
        <EditHints hints={fsmState?.hints} type='state' referenceId={fsmStateId} />
      </Stack>
    </Container>
  );
}

export default NormalStateEditor;
