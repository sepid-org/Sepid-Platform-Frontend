import { Button, FormControl, InputLabel, Autocomplete, MenuItem, Stack, Typography, TextField } from '@mui/material';
import React, { FC, Fragment, useState } from 'react';

import CreateStateDialog from './dialogs/CreateStateDialog';
import { State } from 'types/models';

type StatesMenuPropsType = {
  stateIndex: any;
  setStateIndex: any;
  states: State[];
}

const StatesMenu: FC<StatesMenuPropsType> = ({
  stateIndex,
  setStateIndex,
  states = [],
}) => {
  const [openCreateStateDialog, setOpenCreateStateDialog] = useState(false);

  return (
    <Fragment>
      <Stack direction={'row'} alignContent={'stretch'} justifyContent={'space-between'}>
        <Autocomplete
          fullWidth
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => {
            setStateIndex(states.indexOf(newValue));
          }}
          value={states[stateIndex] || null}
          renderInput={(params) =>
            <TextField {...params} label="مشاهده گام" />
          }
          options={states}
        />
        <Button
          sx={{
            paddingX: 2,
            boxShadow: 0,
            whiteSpace: 'nowrap',
          }}
          size="small"
          color="primary"
          onClick={() => setOpenCreateStateDialog(true)}
          variant="contained">
          <Typography variant='h6'>
            {'ایجاد گام جدید'}
          </Typography>
        </Button>
      </Stack>
      <CreateStateDialog
        open={openCreateStateDialog}
        handleClose={() => setOpenCreateStateDialog(false)}
      />
    </Fragment>
  );
}

export default StatesMenu;