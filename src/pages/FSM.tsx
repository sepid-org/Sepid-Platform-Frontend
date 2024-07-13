import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";

import { initParseServer } from 'parse/init';
import FSMStateTemplate from 'components/template/FSMStateTemplate';
import { createTeamState, getChangeTeamStateSubscription, getTeamState } from '../parse/team';
import {
  enterWorkshopAction,
  mentorGetCurrentStateAction,
  changeOpenChatRoomAction,
} from 'redux/slices/currentState';
import { addMentorToRoom, updateMentorTime } from 'parse/mentorsInRoom';
import DraggableChatRoom from 'components/organisms/DraggableMeeting';
import Layout from 'components/template/Layout';
import { FSMType, TeamType } from 'types/models';
import { toast } from 'react-toastify';
import { useGetFSMQuery } from 'redux/features/fsm/FSMSlice';

var moment = require('moment');

export const StatePageContext = React.createContext<any>({});

type FSMPagePropsType = {
  currentState: any;
  needUpdateState: any;
  paperId: any;
  studentPlayerId: any;
  myTeam: TeamType;
  enterWorkshop: any;
  mentorGetCurrentState: any;
  // todo:
  teamRoom: any;
  openChatRoom: any;
  changeOpenChatRoom: any;
  personsName: string;
  mentorId: string;
  teamId: string;
}
const FSM: FC<FSMPagePropsType> = ({
  currentState,
  needUpdateState,
  paperId,
  studentPlayerId,
  myTeam,
  enterWorkshop,
  mentorGetCurrentState,
  // todo:
  teamRoom,
  openChatRoom,
  changeOpenChatRoom,
  personsName,
  mentorId,
  teamId,
}) => {
  const { fsmId, programId } = useParams();
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const subscriberRef = useRef(null);
  const [mentorAdded, setMentorAdded] = useState(false)
  const search = useLocation().search;
  let playerId = new URLSearchParams(search).get('playerId');
  teamId = new URLSearchParams(search).get('teamId') || teamId
  let isMentor = false;
  if (playerId) {
    isMentor = true;
  } else {
    playerId = studentPlayerId;
  }

  let readyToAddMentor = false
  if (teamId !== undefined && mentorId !== undefined && personsName !== undefined) {
    readyToAddMentor = true
  }

  useEffect(() => {
    initParseServer();
  }, []);

  // useEffect(() => {
  //   let updateInterval
  //   if (!mentorAdded && isMentor && readyToAddMentor) {
  //     addMentorToRoom(teamId, mentorId.toString(), personsName)
  //     setMentorAdded(true)
  //     updateMentorTime(teamId, mentorId.toString())
  //     updateInterval = setInterval(() => { updateMentorTime(teamId, mentorId.toString()) }, 10000)
  //   }
  //   return (
  //     () => {
  //       if (updateInterval) {
  //         clearInterval(updateInterval)
  //       }
  //     }
  //   )
  // }, [isMentor, readyToAddMentor])

  useEffect(() => {
    if (isMentor) {
      mentorGetCurrentState({ id: playerId });
    }
  }, [playerId, isMentor]);

  useEffect(() => {
    if (!isMentor) {
      enterWorkshop({ programId, fsmId });
    }
  }, [fsmId, isMentor]);

  const getCurrentStateIfNeed = () => {
    if (needUpdateState) {
      if (isMentor) {
        mentorGetCurrentState({ id: playerId });
      } else {
        enterWorkshop({ programId, fsmId });
      }
    }
  };

  useEffect(getCurrentStateIfNeed, [needUpdateState]);

  const [parseTeamStateId, setParseTeamStateId] = useState(null);

  const onUpdateStateFromParse = (teamState) =>
    setParseTeamStateId(teamState.get('stateId'));

  useEffect(() => {
    if (!currentState?.id || !parseTeamStateId) return;
    if (+parseTeamStateId !== +currentState.id) {
      if (isMentor) {
        toast.info('یکی از دانش‌آموزان مکان گروه رو جا‌به‌جا کرد');
        mentorGetCurrentState({ id: playerId });
      } else {
        // با حرکت خود بازیکن هم، اینجا اجرا میشه!‌ نباید اینطوری باشه
        // toast.info('جابه‌جا شدید');
        enterWorkshop({ programId, fsmId });
      }
    }
  }, [parseTeamStateId]);

  useEffect(() => {
    if (!teamId || !currentState) return;
    const subscribe = async (teamId) => {
      const teamState = await getTeamState(teamId)
      if (!teamState) {
        await createTeamState(teamId, currentState.id.toString(), currentState.name, moment().format('HH:mm:ss'))
      }
      const subscriber = await getChangeTeamStateSubscription({
        uuid: teamId,
      });
      subscriber.on('create', onUpdateStateFromParse);
      subscriber.on('update', onUpdateStateFromParse);
      subscriberRef.current = subscriber;
    }
    subscribe(teamId);
    return () => {
      subscriberRef.current?.unsubscribe();
    }
  }, [teamId, currentState]);

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, [currentState])

  if (!currentState || !fsm) return null;

  return (
    <Fragment>
      {fsm &&
        <Helmet>
          <title>{fsm.name}</title>
        </Helmet>
      }
      <StatePageContext.Provider value={{ fsmId, paperId, playerId, teamId, isMentor, myTeam, teamRoom }}>
        <Layout appbarMode={isMentor ? 'MENTOR_FSM' : 'FSM'}>
          <FSMStateTemplate state={currentState} playerId={playerId} />
        </Layout>
        {(fsm.fsm_p_type == 'Team' || fsm.fsm_learning_type == 'Supervised') &&
          <DraggableChatRoom open={openChatRoom} handleClose={() => changeOpenChatRoom()} />
        }
      </StatePageContext.Provider>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => ({
  openChatRoom: state.currentState.openChatRoom,
  teamRoom: state.currentState.teamRoom,
  myTeam: state.currentState.myTeam,
  currentState: state.currentState.fsmState,
  needUpdateState: state.currentState.needUpdateState,
  studentPlayerId: state.currentState.playerId,
  teamId: state.currentState.teamId,
  personsName: `${state.account.userInfo?.first_name} ${state.account.userInfo?.last_name}`,
  mentorId: state.account.userInfo?.id,
});

export default connect(mapStateToProps, {
  enterWorkshop: enterWorkshopAction,
  mentorGetCurrentState: mentorGetCurrentStateAction,
  changeOpenChatRoom: changeOpenChatRoomAction,
})(FSM);
