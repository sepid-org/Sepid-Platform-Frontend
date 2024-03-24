import React from "react";
import { Skeleton, Stack, Typography } from "@mui/material";
import { useGetPartyQuery } from "redux/features/PartySlice";

const Brand = () => {

  const {
    data: party,
    isSuccess,
  } = useGetPartyQuery();

  if (!isSuccess) {
    return (
      <Stack direction='row' alignItems={'center'} justifyContent={'center'} sx={{ userSelect: 'none' }} spacing={1}>
        <Skeleton variant="circular" width={50} height={50} />
        <Skeleton variant="rounded" width={150} height={50} />
      </Stack>
    );
  }

  return (
    <Stack direction='row' alignItems={'center'} justifyContent={'center'} sx={{ userSelect: 'none' }} spacing={1}>
      <img alt="academy-logo" src={party.logo.desktop_image} width={50} />
      <Typography fontFamily={"Lalezar"} sx={{ color: "#3498DB", fontSize: { xs: 36, md: 40 }, fontWeight: 500 }}>
        {party.display_name}
      </Typography>
    </Stack>
  );
}

export default Brand;