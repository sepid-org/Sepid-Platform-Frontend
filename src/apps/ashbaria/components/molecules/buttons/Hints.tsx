import { IconButton } from "@mui/material";
import React, { Fragment, useState } from "react";
import HintsIcon from "../../atoms/icons/Hints";
import BuyHintDialog from "../../organisms/dialogs/BuyHint";

const HintsButton = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Fragment>
      <IconButton disableRipple onClick={() => setOpenDialog(true)}>
        <HintsIcon />
      </IconButton>
      <BuyHintDialog
        hintId="1234"
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </Fragment>
  )
}

export default HintsButton;