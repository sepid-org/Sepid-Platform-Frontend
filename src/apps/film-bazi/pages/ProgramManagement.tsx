import React, { FC, Fragment } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import ClassIcon from '@mui/icons-material/Class';
import VideocamIcon from '@mui/icons-material/Videocam';

import Info from 'apps/program/template/management/Info';
import Registration from 'apps/program/template/management/Registration';
import RegistrationReceipts from 'apps/program/template/management/RegistrationReceipts';
import { DashboardTabType } from 'commons/types/global';
import Admins from 'apps/program/template/management/Admins';
import Dashboard from 'commons/components/organisms/Dashboard';
import { Container } from '@mui/material';
import AppBarComponent from '../components/organisms/Appbar';
import FSMs from 'apps/program/template/management/FSMs';
import ManageMovieScreeningResponds from '../components/template/ManageMovieScreeningResponds';
import FilmbaziLayout from '../components/molecules/Layout';
import BarChartIcon from '@mui/icons-material/BarChart';
import Statistics from '../components/template/Statistics';
import ManageDiscountCodes from '../components/template/ManageDiscountCodes';

const tabs: DashboardTabType[] = [
  {
    slug: 'info',
    label: 'اطلاعات کلی',
    icon: InfoIcon,
    component: <Info />,
  },
  // {
  //   slug: 'registration-form',
  //   label: 'فرایند ثبت‌نام',
  //   icon: ArticleIcon,
  //   component: <Registration />,
  // },
  // {
  //   slug: 'registration-receipts',
  //   label: 'شرکت‌کنندگان',
  //   icon: PeopleIcon,
  //   component: <RegistrationReceipts />,
  // },
  {
    slug: 'mentors',
    label: 'مدیران',
    icon: PersonIcon,
    component: <Admins />,
  },
  {
    slug: 'fsms',
    label: 'کارگاه‌ها',
    icon: ClassIcon,
    component: <FSMs />,
  },
  {
    slug: 'movie-screening-responds',
    label: 'درخواست‌های اکران',
    icon: VideocamIcon,
    component: <ManageMovieScreeningResponds />,
  },
  {
    slug: 'discount-codes',
    label: 'کدهای تخفیف',
    icon: ClassIcon,
    component: <ManageDiscountCodes />,
  },
  {
    slug: 'statistics',
    label: 'آمار',
    icon: BarChartIcon,
    component: <Statistics />,
  },
];

type ProgramManagementPropsType = {}

const ProgramManagement: FC<ProgramManagementPropsType> = ({ }) => {

  return (
    <FilmbaziLayout>
      <Container maxWidth='lg'
        sx={{
          display: 'flex',
          paddingTop: 4,
          paddingBottom: 2,
          justifyContent: 'center',
          marginRight: 'auto !important',
          marginLeft: 'auto !important',
        }}>
        <Dashboard tabs={tabs} returnDirection={`/program/filmbazi/`} />
      </Container>
    </FilmbaziLayout>
  );
};

export default ProgramManagement;