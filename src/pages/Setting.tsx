import { Grid, Tab, Tabs } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from 'components/template/Layout';
import SettingTemplate from 'components/template/Setting';
import {
  getUserProfileAction,
} from 'redux/slices/account';
import { DashboardTabType } from 'types/global';
import { UserInfoType } from 'types/profile';
import { useGetProgramQuery } from 'redux/features/program/ProgramSlice';

let tabs: DashboardTabType[] = [
  {
    name: 'user',
    label: 'اطلاعات فردی',
    icon: '',
    component: <SettingTemplate type='user' />,
    isActive: true,
  },
  {
    name: 'school',
    label: 'اطلاعات دانش‌آموزی',
    icon: '',
    component: <SettingTemplate type='school' />,
    isActive: true,
  },
  {
    name: 'university',
    label: 'اطلاعات دانشجویی',
    icon: '',
    component: <SettingTemplate type='university' />,
    isActive: false,
  },
];

type SettingPropsType = {
  getUserProfile: any;
  userInfo: UserInfoType;
}

const Setting: FC<SettingPropsType> = ({
  getUserProfile,
  userInfo,
}) => {
  const navigate = useNavigate();
  const { programId, section } = useParams();
  const { data: program } = useGetProgramQuery({ programId }, { skip: !Boolean(programId) });

  useEffect(() => {
    if (!section) {
      if (programId) {
        navigate(`/program/${programId}/setting/user/`);
      } else {
        navigate('/setting/user/');
      }
    }
  }, [section])

  useEffect(() => {
    if (userInfo?.id) {
      getUserProfile({ id: userInfo.id });
    }
  }, [userInfo?.id]);

  if (program?.audience_type == 'Student') {
    tabs = [tabs[0], tabs[1]];
  } else if (program?.audience_type == 'Academic') {
    tabs = [tabs[0], tabs[2]];
  } else if (program?.audience_type == 'All') {
    tabs = [tabs[0]];
  }

  if (!section) return null;

  const tab: DashboardTabType = tabs.find(tab => tab.name == section);

  return (
    <Layout appbarMode={programId ? 'PROGRAM' : 'DASHBOARD'}>
      <Grid
        container
        justifyContent="center"
        spacing={4}>
        <Grid container item xs={12} sm={3} direction='column' spacing={2}>
          <Grid item>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={tabs.indexOf(tab)}
              onChange={(event, newValue) => navigate(programId ? `/program/${programId}/setting/${tabs[newValue].name}/` : `/setting/${tabs[newValue].name}/`)}>
              {
                tabs.map((tab, index) => {
                  return (
                    <Tab disabled={!tab.isActive} key={index} label={tab.label} />
                  )
                })
              }
            </Tabs>
          </Grid>
        </Grid>
        <Grid container item xs={12} sm={9}>
          {tab.component}
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.account.userInfo,
});

export default connect(mapStateToProps, {
  getUserProfile: getUserProfileAction,
})(Setting);