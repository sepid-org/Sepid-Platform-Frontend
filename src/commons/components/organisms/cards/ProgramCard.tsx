import {
  Card,
  Chip,
  Grid,
  Stack,
  Typography,
  Tooltip,
  ButtonBase,
  Box,
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import React, { FC } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useNavigate } from 'react-router-dom';
import { toPersianNumber } from 'commons/utils/translateNumber';
import { ProgramType } from 'commons/types/models';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

type ProgramCardPropsType = {
  program: Partial<ProgramType>;
}

const ProgramCard: FC<ProgramCardPropsType> = ({
  program
}) => {
  const t = useTranslate();
  const navigate = useNavigate();

  if (!program) return null;

  const MAX_DESCRIPTION_LENGTH = 90;

  return (
    <ButtonBase
      disableRipple
      onClick={() => program.is_active && navigate(`/program/${program.slug}/registration/`)}>
      <Card
        sx={{
          position: 'relative',
          height: { xs: 480, md: 240 },
          width: '100%',
          padding: '0px !important',
          textDecoration: 'none',
          overflow: 'hidden',
          boxShadow: '0 0 1px 0rem rgba(0, 0, 0, 0.5)',
          transition: 'all 0.1s ease-in-out',
          filter: program.is_active ? 'none' : 'grayscale(100%)',
          opacity: program.is_active ? 1 : 0.6,
          cursor: program.is_active ? 'pointer' : 'not-allowed',
          '&:hover': program.is_active && {
            transform: 'translateY(-0.1rem) scale(1.02)',
            boxShadow: '0 0.5em 2rem -1rem rgba(0, 0, 0, 0.5)',
          },
        }}>
        <Grid
          container
          sx={{
            height: '100%',
            justifyContent: { xs: 'center', md: 'space-between' },
          }}>
          <Grid
            item
            xs={12} md={5}
            sx={{
              padding: 0,
              width: '100%',
              height: { xs: 300, md: 240 },
            }}
            position={'relative'}
            justifyContent="center" alignItems="center">
            <img
              alt=""
              src={program.cover_image}
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
              }} />
          </Grid>
          <Grid
            item
            xs={12} md={7}
            sx={{
              padding: 2,
              width: '100%',
              height: { xs: 180, md: 240 },
            }}>
            <Stack height={'100%'} justifyContent="space-between" spacing={1}>

              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'}>
                <Typography
                  sx={{
                    color: '#4d4a70',
                    wordWrap: 'break-word',
                    whiteSpace: 'normal',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  textAlign={'start'}
                  variant="h3">
                  {program.name}
                </Typography>
              </Stack>

              <Typography textAlign={'start'} variant="body2" color="textSecondary">
                {program.description.length > MAX_DESCRIPTION_LENGTH
                  ? `${program.description.slice(0, program.description.slice(0, MAX_DESCRIPTION_LENGTH).lastIndexOf(' '))}...`
                  : program.description}
              </Typography>

              <Box display="flex" flexWrap="wrap" gap={0.5}>
                <Chip
                  variant='outlined'
                  color='info'
                  sx={{ userSelect: 'none' }}
                  icon={<PeopleAltIcon />}
                  label={
                    program.participation_type === 'Individual'
                      ? 'انفرادی'
                      : `${toPersianNumber(program.team_size)} ${t('person')}`
                  }
                />
                {program.is_free &&
                  <Chip
                    variant='outlined'
                    color='success'
                    sx={{ userSelect: 'none', color: '#36CF8D', borderColor: '#36CF8D' }}
                    icon={<InsertEmoticonIcon />}
                    label={'رایگان'}
                  />
                }
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </ButtonBase>
  );
};

export default ProgramCard;
