import { Stack, Typography } from "@mui/material"
import React from "react"
import { toPersianNumber } from "commons/utils/translateNumber"
import { Golden } from "apps/film-bazi/constants/colors"
import { FILMBAZI_EXTRA_CHANCE } from "apps/film-bazi/constants/game"
import CustomChip from "./CustomChip"
import { useGetMyBalancesQuery } from "commons/redux/apis/bank/MyInfo"
import BananaIcon from "../icons/BananaIcon"
import { useGetMyDiscountCodesQuery } from "apps/film-bazi/redux/slices/DiscountCode"
import { useGetSeatSelectionsQuery } from "apps/film-bazi/redux/slices/CinemaGame"

const MyChancesChip = ({ }) => {
  const { data: discountCodes = [] } = useGetMyDiscountCodesQuery();
  const { data: seatSelections = [] } = useGetSeatSelectionsQuery();
  const { data: balances } = useGetMyBalancesQuery();
  const seatSelectionsCount = seatSelections.length;
  const extraChances = balances?.[FILMBAZI_EXTRA_CHANCE] || 0;
  const boughtTickets = discountCodes
    .map(discountCode => discountCode.bought_tickets)
    .reduce((acc, curr) => acc + curr, 0)
  const chancesCount = Math.max(boughtTickets + extraChances - seatSelectionsCount, 0);

  return (
    <CustomChip>
      <Typography fontWeight={700} fontSize={18}>
        {'فرصت بازی'}
      </Typography>
      <Stack direction={'row'} spacing={0.5}>
        <Typography fontWeight={600} fontSize={16} color={Golden}>
          {toPersianNumber(chancesCount)}
        </Typography>
        <BananaIcon />
      </Stack>
    </CustomChip >
  )
}

export default MyChancesChip;