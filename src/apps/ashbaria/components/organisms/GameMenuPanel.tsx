import { Box, Button, Paper, Skeleton, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

import useLocalNavigate from '../../hooks/useLocalNavigate';
import ProgramLogo from 'commons/components/atoms/logos/ProgramLogo';
import MyFirstNameChip from '../molecules/chips/MyFirstName';
import useLogout from 'commons/hooks/useLogout';
import HeartIcon from '../atoms/icons/Heart';
import RankingIcon from '../atoms/icons/Ranking';
import MyFirstName from '../atoms/MyFirstName';
import PurpleInfoIcon from '../atoms/icons/PurpleInfo';
import { Golden } from 'apps/ashbaria/constants/colors';
import { useGetProfileQuery } from 'apps/ashbaria/redux/slices/Profile';
import { useGetMyRankQuery } from 'commons/redux/apis/bank/MyInfo';
import { ASHBARIA_COIN } from 'apps/ashbaria/constants/game-info';
import { useGetMyFriendshipNetworkQuery } from 'apps/ashbaria/redux/slices/FriendshipNetwork';

type PropsType = {}

const GameMenuPanel: FC<PropsType> = () => {
  const localNavigate = useLocalNavigate();
  const { data: myAshbariaProfile, isLoading: isGetProfileLoading } = useGetProfileQuery();
  const { data: myFriendshipNetwork, isLoading: isGetMyFriendshipNetworkLoading } = useGetMyFriendshipNetworkQuery()
  const { data: myRank, isLoading: isGetMyRankLoading } = useGetMyRankQuery({ currencyName: ASHBARIA_COIN });
  const { logout } = useLogout();

  return (
    <Stack
      component={Paper}
      spacing={2}
      padding={2}
      alignItems={'center'}
      sx={(theme) => ({
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        transform: 'scale(1)',
        transformOrigin: 'top left',
        [theme.breakpoints.up('lg')]: {
          transform: 'scale(1.3)',
        },
        [theme.breakpoints.down('md')]: {
          transform: 'scale(0.7)',
        },
        [theme.breakpoints.down('sm')]: {
          transform: 'scale(0.6)',
        },
      })}
    >
      <ProgramLogo />
      {
        isGetProfileLoading ? (
          <Skeleton width={'80%'} height={60} />
        ) : myAshbariaProfile?.has_received_reward ? (
          <MyFirstNameChip />
        ) : (
          <Button
            sx={{ background: '#00000066' }}
            fullWidth variant='contained' onClick={() => localNavigate('/profile/')}
          >
            <Stack spacing={0.5} width={'100%'}>
              <Stack direction={'row'} spacing={0.5} alignItems={'center'} justifyContent={'center'}>
                <PurpleInfoIcon size={36} />
                <MyFirstName />
              </Stack>
              <Stack sx={{ background: '#0000001A', borderRadius: 2 }}>
                <Typography color={Golden}>
                  {'با تکمیل نمایه امتیاز بگیر'}
                </Typography>
              </Stack>
            </Stack>
          </Button>
        )
      }

      {/* <Typography textAlign={'center'}>
          {'مهلت تا پایان دوره: ۱۷ روز'}
        </Typography> */}

      <Button
        sx={{ background: 'linear-gradient(0deg, #006D5A 100%, #01BE9C 100%)' }}
        fullWidth variant='contained' onClick={() => localNavigate('/friendship-network/')}
      >
        <Stack spacing={0.5} width={'100%'}>
          <Stack direction={'row'} spacing={0.5} alignItems={'center'} justifyContent={'center'}>
            <HeartIcon size={24} />
            <Typography fontWeight={600} fontSize={18} color={'white'}>
              {'حلقه دوستان'}
            </Typography>
          </Stack>
          <Stack spacing={0.5} alignItems={'center'} justifyContent={'center'} direction={'row'} sx={{ background: '#0000001A', borderRadius: 2 }}>
            <Typography color={'white'}>
              {isGetMyFriendshipNetworkLoading ?
                <Skeleton width={10} height={20} /> :
                <>{(myFriendshipNetwork?.network.user_followings_count || 0) + (myFriendshipNetwork?.network.user_followers_count || 0)}</>
              }
            </Typography>
            <Typography color={'white'}>
              {'نفر'}
            </Typography>
          </Stack>
        </Stack>
      </Button>

      <Button
        sx={{ background: 'linear-gradient(0deg, #601724 100%, #C24040 100%)' }}
        fullWidth variant='contained' onClick={() => localNavigate('/scoreboard/')}
      >
        <Stack spacing={0.5} width={'100%'}>
          <Stack direction={'row'} spacing={0.5} alignItems={'center'} justifyContent={'center'}>
            <RankingIcon size={24} />
            <Typography fontWeight={600} fontSize={18} color={'white'}>
              {'شاخ‌ترین‌ها'}
            </Typography>
          </Stack>
          <Stack spacing={0.5} alignItems={'center'} justifyContent={'center'} direction={'row'} sx={{ background: '#0000001A', borderRadius: 2 }}>
            <Typography color={'white'}>
              {'رتبه شما: '}
            </Typography>
            <Typography color={'white'}>
              {isGetMyRankLoading ?
                <Skeleton width={10} height={20} /> :
                <>{myRank?.rank + 10 || '-'}</>
              }
            </Typography>
          </Stack>
        </Stack>
      </Button>

      <Button variant='outlined' onClick={() => logout()}>
        {'خروج'}
      </Button>
    </Stack >
  );
}

export default GameMenuPanel;
