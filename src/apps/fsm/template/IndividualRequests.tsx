import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect, useRef, FC } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { getRequestSubscription } from 'apps/website-display/parse/mentor';
import {
  createRequestMentorAction,
  deleteRequestMentorAction,
  getRequestMentorAction,
  removeRequestMentorAction,
} from 'apps/website-display/redux/slices/programs';
import {
  getFSMPlayersAction,
} from 'apps/website-display/redux/slices/workshop';
import { PlayerRequestType, Token, PlayerType } from 'commons/types/models'

type InfoPropsType = {
  getFSMPlayers: Function,
  getRequestMentor: Function,
  deleteRequestMentor: Function,
  accessToken?: Token,
  requests: PlayerRequestType,
  players: PlayerType[],
  createRequestMentor: Function,
  removeRequestMentor: Function,
}

const Teams: FC<InfoPropsType> = ({
  getFSMPlayers,
  getRequestMentor,
  deleteRequestMentor,
  accessToken,
  requests,
  players,
  createRequestMentor,
  removeRequestMentor,
}) => {
  const fsmId = parseInt(useParams().fsmId);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    getFSMPlayers({ fsmId });
  }, [])

  useEffect(() => {
    const subscribe = async () => {
      // todo
      await getRequestMentor();
      const subscription = await getRequestSubscription();
      subscription.on('create', (requestMentor) => {
        const playerId = requestMentor.get('playerId');
        const teamId = requestMentor.get('teamId');
        const fsmId = requestMentor.get('fsmId');
        createRequestMentor({ playerId, teamId, fsmId });
      });
      subscription.on('delete', (requestMentor) => {
        const teamId = requestMentor.get('teamId');
        const fsmId = requestMentor.get('fsmId');
        removeRequestMentor({
          teamId,
          fsmId,
        });
      });
      subscriptionRef.current = subscription;
    }
    subscribe()
    return () => {
      subscriptionRef.current?.unsubscribe();
    };
  }, []);

  const reqPlayers = players?.filter(
    (player) => requests[player.id + '.' + fsmId]
  );
  const nonReqPlayers = players?.filter(
    (player) => !requests[player.id + '.' + fsmId]
  );

  const visitPlayer = (playerId) => {
    deleteRequestMentor({ teamId: playerId, fsmId })
    window.open(`https://kamva.academy/join/${playerId}/${accessToken}/`);
  }

  return (
    <Grid container spacing={1} alignItems="center" justifyContent="center">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>شناسه</TableCell>
              <TableCell align='center'>نام</TableCell>
              <TableCell align='center'>آخرین بازدید</TableCell>
              <TableCell align='center'>عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reqPlayers?.map((player) => (
              <TableRow key={player.id}>
                <TableCell align='center'>
                  {player.id}
                </TableCell>
                <TableCell align='center'>
                  {player.user}
                </TableCell>
                <TableCell align='center'>
                  {player.last_visit}
                </TableCell>
                <TableCell align='center'>
                  <Button color='primary' variant='contained' onClick={() => visitPlayer(player.id)}>
                    {'سرزدن'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {nonReqPlayers?.map((player) => (
              <TableRow key={player.id}>
                <TableCell align='center'>
                  {player.id}
                </TableCell>
                <TableCell align='center'>
                  {player.user}
                </TableCell>
                <TableCell align='center'>
                  {player.last_visit}
                </TableCell>
                <TableCell align='center'>
                  <Button disabled color='primary' variant='contained' onClick={() => visitPlayer(player.id)}>
                    {'سرزدن'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  accessToken: state.account.accessToken,
  players: state.workshop.players,
  requests: state.programs.teamsRequests || {},
});

export default connect(
  mapStateToProps,
  {
    deleteRequestMentor: deleteRequestMentorAction,
    getFSMPlayers: getFSMPlayersAction,
    getRequestMentor: getRequestMentorAction,
    createRequestMentor: createRequestMentorAction,
    removeRequestMentor: removeRequestMentorAction,
  }
)(Teams);
