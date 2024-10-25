import React, { FC, Fragment } from "react";
import { Button, Container, Dialog, Paper, Stack, Typography } from "@mui/material";
import LampOnIcon from "../../atoms/icons/LampOn";
import ScoreChip from "../../molecules/chips/Score";
import { useSpendFundsOnObjectMutation } from "commons/redux/slices/cms/currency/Spend";

type BuyHintDialogPropsType = {
  hintId: string;
}

const BuyHint: FC<BuyHintDialogPropsType> = ({
  hintId,
}) => {
  const [spendFundsOnObject, result] = useSpendFundsOnObjectMutation();
  // const { data = hint } = useGetHint({ hintId });

  const handleBuyHint = () => {
    spendFundsOnObject({
      objectId: "1",
      funds: {
        "ashbaria-coin": 3,
      }
    })
  }

  return (
    <Stack padding={3} spacing={2} component={Paper} maxWidth={'xs'}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Stack alignItems={'center'} direction={'row'} spacing={0.5}>
          <LampOnIcon />
          <Typography variant="h5" textAlign={'center'} width={'100%'} noWrap>
            {"تقلب اون ور آبی"}
          </Typography>
        </Stack>

        <ScoreChip value={"34"} />
      </Stack>

      <Typography textAlign={'center'} color={'white'}>
        {`با خرید این راهنمایی ${34} سکه از خرج می کنی. آیا از خرید این راهنمایی مطمئنی؟`}
      </Typography>

      <Button variant='contained' fullWidth onClick={handleBuyHint}>
        {'خرید تقلب'}
      </Button>
      <Button variant='outlined' fullWidth>
        {'بی‌خیال'}
      </Button>
    </Stack>
  )
}

export default BuyHint;