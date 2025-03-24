import React, { forwardRef } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { toPersianNumber } from 'commons/utils/translateNumber';
import { TableRecordType } from "apps/scoreboard/types";
import VerifyIcon from "../atoms/icons/Verify";

// Use forwardRef with props and ref types
const ScoreRecord = forwardRef<HTMLDivElement, TableRecordType>(
  ({ rank, name, score, currentUser, profileImg }, ref) => {
    const conditionalRankBackground = currentUser
      ? "linear-gradient(180deg, #FFEC88 100%, #FFA95A 100%)"
      : "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 100%, rgba(153, 153, 153, 0.01) 100%)";
    const conditionalRecordBackground = currentUser
      ? "#2B1A42"
      : "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 100%, rgba(153, 153, 153, 0.01) 100%)";

    return (
      <Stack
        ref={ref} // Attach ref to the main container
        width={'100%'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={1}
      >
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          borderRadius={2}
          minWidth={60}
          height={60}
          sx={{
            background: conditionalRankBackground,
            boxShadow: "0px 4px 10px 0px #00000026",
          }}
        >
          <Typography variant="body1" color='white' fontWeight='bold'>
            {toPersianNumber(rank) || '-'}
          </Typography>
        </Stack>
        <Stack
          spacing={1}
          direction={'row'}
          width={'100%'}
          height={60}
          alignItems={'center'}
          justifyContent={'space-between'}
          borderRadius={4}
          padding={2}
          sx={{
            background: conditionalRecordBackground,
          }}
        >
          <Box
            component="img"
            src={profileImg}
            width={48}
            height={48}
          />
          <Typography
            fontWeight={400}
            fontSize={18}
            color={'white'}
            sx={{
              flexGrow: 1,
              letterSpacing: "0.02em",
            }}
          >
            {name}
          </Typography>
          <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "400",
                letterSpacing: "0.02em",
                color: "white",
              }}
            >
              {toPersianNumber(score)}
            </Typography>
            <VerifyIcon />
          </Stack>
        </Stack>
      </Stack>
    );
  }
);

export default ScoreRecord;