import {
  Grid,
  Typography,
} from '@mui/material';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
  addUserToTeamAction,
} from 'redux/slices/events';

function Index({
  event,
}) {

  return (
    <Fragment>
      <Grid
        container item
        spacing={2}
        alignItems="center"
        justify="center"
        direction="row">
        <Grid item xs={12}>
          <Typography variant='h1' align='center'>{event?.name}</Typography>
        </Grid>
        <Grid item xs={12} >
          <Typography align='center'>{event?.description}</Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  event: state.events.event,
});

export default connect(
  mapStateToProps,
  {
    addUserToTeam: addUserToTeamAction,
  }
)(Index);
