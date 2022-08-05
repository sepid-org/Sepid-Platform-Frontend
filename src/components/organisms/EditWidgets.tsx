import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Save as SaveIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import React, { useEffect, useState, FC } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router';
import {
  removeStateAction,
  updateStateAction,
} from '../../redux/slices/workshop';
import AreYouSure from '../Dialog/AreYouSure';
import Widget, { WidgetModes } from '../Widget';
import CreateWidgetDialog from './dialogs/CreateWidgetDialog';

type EditWidgetsPropsType = {
  removeState: any;
  updateState: any;
  widgets: any[];
  id: number;
  name: string;
}

const EditWidgets: FC<EditWidgetsPropsType> = ({
  removeState,
  updateState,

  widgets = [],
  id: stateId,
  name,
}) => {
  const t = useTranslate();
  const { fsmId } = useParams()
  const [openCreateProblemDialog, setOpenCreateProblemDialog] = useState(false);
  const [openCreateContentDialog, setOpenCreateContentDialog] = useState(false);
  const [openDeleteWidgetDialog, setOpenDeleteWidgetDialog] = useState(false);
  const [isEditingStateName, setIsEditingStateName] = useState(false);
  const [newName, setNewName] = useState<string>(null);

  useEffect(() => {
    if (name) {
      setNewName(name)
    }
  }, [name])

  const questions = widgets?.filter((widget) =>
    widget.widget_type.includes('Problem')
  );

  const notQuestions = widgets?.filter(
    (widget) => !widget.widget_type.includes('Problem')
  );

  return (
    <>
      <Stack spacing={2}>
        {stateId &&
          <Stack direction='row'>
            {isEditingStateName &&
              <TextField
                onChange={(e) => setNewName(e.target.value)}
                fullWidth variant='outlined'
                defaultValue={name} />
            }
            {!isEditingStateName &&
              <Typography align="center" variant="h1" gutterBottom>
                {name}
              </Typography>
            }

            {isEditingStateName &&
              <Tooltip title='ذخیره' arrow>
                <IconButton size='small'
                  onClick={() => {
                    updateState({ stateId, name: newName, fsm: fsmId });
                    setIsEditingStateName(false);
                  }
                  }>
                  <SaveIcon />
                </IconButton>
              </Tooltip>
            }
            {!isEditingStateName &&
              <Tooltip title='ویرایش نام' arrow>
                <IconButton size='small' onClick={() => setIsEditingStateName(true)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            }

            <Tooltip title='حذف گام' arrow>
              <IconButton size='small' onClick={() => setOpenDeleteWidgetDialog(true)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        }
        <Typography variant='h2' gutterBottom>
          {'مسئله'}
        </Typography>
        <Divider />
        {
          questions.map((widget) => (
            <Box key={widget.index}>
              <Widget
                stateId={stateId}
                widget={widget}
                mode={WidgetModes.Edit}
              />
            </Box>
          ))
        }
        {
          questions?.length === 0 &&
          <Box m={2}>
            <Typography variant='h4' align="center">{'مسئله‌ای در این گام وجود ندارد!'}</Typography>
          </Box>
        }
        {
          stateId &&
          <Button
            color="primary" variant="contained"
            fullWidth startIcon={<AddIcon />}
            onClick={() => setOpenCreateProblemDialog(true)}>
            {'افزودن مسئله جدید'}
          </Button>
        }
        <Typography variant='h2' gutterBottom>
          {'محتوا'}
        </Typography>
        <Divider />
        {
          notQuestions.map((widget) => (
            <Box key={widget.id}>
              <Widget
                stateId={stateId}
                widget={widget}
                mode={WidgetModes.Edit}
              />
            </Box>
          ))
        }
        {
          notQuestions?.length === 0 &&
          <Box m={2}>
            <Typography variant='h4' align="center">{'محتوایی در این گام وجود ندارد!'}</Typography>
          </Box>
        }
        {
          stateId &&
          <Button
            color="primary" variant="contained"
            fullWidth startIcon={<AddIcon />}
            onClick={() => setOpenCreateContentDialog(true)}>
            {'افزودن محتوای جدید'}
          </Button>
        }
      </Stack >
      <CreateWidgetDialog
        showQuestions={true}
        showContent={false}
        stateId={stateId}
        open={openCreateProblemDialog}
        handleClose={() => setOpenCreateProblemDialog(false)}
      />
      <CreateWidgetDialog
        stateId={stateId}
        open={openCreateContentDialog}
        handleClose={() => setOpenCreateContentDialog(false)}
      />
      <AreYouSure
        open={openDeleteWidgetDialog}
        handleClose={() => setOpenDeleteWidgetDialog(false)}
        callBackFunction={() => removeState({ stateId })}
      />
    </>
  );
}

export default connect(
  null,
  {
    removeState: removeStateAction,
    updateState: updateStateAction,
  }
)(EditWidgets);
