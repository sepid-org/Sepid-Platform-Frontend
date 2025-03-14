import { Button, Dialog, DialogActions, DialogContent, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { toPersianNumber } from 'commons/utils/translateNumber';
import Paper from 'commons/template/Paper';

function HintDialog({ open, handleClose, hints }) {
  const t = useTranslate();
  const [index, setIndex] = useState(0);

  const help = hints[index];

  if (!help) {
    return null;
  }

  return (
    <Dialog disableScrollLock open={open} onClose={handleClose} maxWidth="xs" fullWidth >
      <DialogContent>
        <Typography gutterBottom>{t('helpNumber') + " " + (toPersianNumber(index + 1))}</Typography>
        <Paper paperId={help.id} mode='general' />
      </DialogContent>
      <DialogActions>
        <Grid container justifyContent="space-between">
          <Grid item>
            {index > 0 && (
              <Button variant='outlined' color="primary" onClick={() => setIndex(index - 1)}>
                قبلی
              </Button>
            )}
          </Grid>
          <Grid item>
            {index < hints.length - 1 && (
              <Button
                sx={{ animation: "shake 12s infinite" }}
                variant="contained"
                color="primary"
                onClick={() => setIndex(index + 1)}>
                بازم کمک لازم دارم
              </Button>
            )}
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default HintDialog;
