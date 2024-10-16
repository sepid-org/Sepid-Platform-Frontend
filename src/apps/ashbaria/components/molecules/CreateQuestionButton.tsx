import { Button, Dialog, Typography } from "@mui/material";
import React, { FC, Fragment, useState } from "react";
import QuestionEditor from "../organisms/QuestionEditor";

type CreateQuestionButtonPropsType = {}

const CreateQuestionButton: FC<CreateQuestionButtonPropsType> = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Fragment>
      <Button variant='contained' onClick={() => setOpenDialog(true)}>
        {'افزودن سوال جدید'}
      </Button>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <QuestionEditor onClose={() => setOpenDialog(false)} />
      </Dialog>
    </Fragment>
  )
}

export default CreateQuestionButton;