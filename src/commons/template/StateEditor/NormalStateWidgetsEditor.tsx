import {
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import { EditPaper } from '../Paper';
import EditHints from '../EditHints';
import { useGetFSMStateQuery } from 'apps/website-display/redux/features/fsm/FSMStateSlice';

type NormalStateWidgetsEditorPropsType = {
  fsmStateId: string;
}

const NormalStateWidgetsEditor: FC<NormalStateWidgetsEditorPropsType> = ({
  fsmStateId,
}) => {
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId });

  return (
    <Container maxWidth='md' sx={{ paddingBottom: 2 }}>
      <Stack spacing={2}>
        <Typography variant='h2' gutterBottom>
          {'مسئله‌ها'}
        </Typography>
        <Divider />
        <EditPaper paperId={fsmStateId} mode='problems' />
        <Typography variant='h2' gutterBottom>
          {'محتواها'}
        </Typography>
        <Divider />
        <EditPaper paperId={fsmStateId} mode='contents' />
        <Typography variant="h2" gutterBottom>
          {'راهنمایی‌ها'}
        </Typography>
        <Divider />
        <EditHints paperId={fsmStateId} hints={fsmState?.hints} type='state' referenceId={fsmStateId} />
      </Stack>
    </Container>
  );
}

export default NormalStateWidgetsEditor;
