import { Stack } from "@mui/material";
import React, { FC } from "react";
import backgroundImg from "../../assets/profileBackground.svg";
import { useSearchParams } from "react-router-dom";
import IntroductionPage1 from "./IntroductionPage1";
import IntroductionPage2 from "./IntroductionPage2";
import IntroductionPage3 from "./IntroductionPage3";
import FullScreenPaper from "commons/components/atoms/FullScreenPaper";
import FullScreenBackgroundImage from "apps/ashbaria/components/molecules/FullScreenBackgroundImage";

export enum LoginTabs {
  EnterPhoneNumber = 'EnterPhoneNumber',
  EnterVerificationNumber = 'EnterVerificationNumber',
}

export type LoginPropsType = {};

const Introduction: FC<LoginPropsType> = () => {
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;

  return (
    <FullScreenBackgroundImage image={backgroundImg}>
      <Stack component={FullScreenPaper} padding={2} spacing={2} justifyContent={'space-between'}>
        {currentPage === 1 && <IntroductionPage1 />}
        {currentPage === 2 && <IntroductionPage2 />}
        {currentPage === 3 && <IntroductionPage3 />}
      </Stack>
    </FullScreenBackgroundImage>
  );
};

export default Introduction;