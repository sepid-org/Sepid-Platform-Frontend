import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';

import PersonalProfile from 'components/template/Profile/PersonalProfile';
import StudentProfile from 'components/template/Profile/StudentProfile';
import AcademicProfile from 'components/template/Profile/AcademicProfile';
import { getUserProfileAction } from 'redux/slices/account';
import { UserInfoType } from 'types/profile';

type ProfilePropsType = {
  userInfo: UserInfoType;
  type: 'personal' | 'student' | 'academic';
  getUserProfile: any;
  onSuccess?: any;
}

const Profile: FC<ProfilePropsType> = ({
  userInfo,
  type,
  getUserProfile,
  onSuccess,
}) => {

  useEffect(() => {
    if (userInfo?.id) {
      getUserProfile({ id: userInfo.id });
    }
  }, [userInfo?.id]);

  if (type === 'personal') return <PersonalProfile onSuccess={onSuccess} />
  if (type === 'student') return <StudentProfile onSuccess={onSuccess} />
  if (type === 'academic') return <AcademicProfile onSuccess={onSuccess} />
};

const mapStateToProps = (state) => ({
  userInfo: state.account.userInfo,
  registrationForm: state.programs.registrationForm,
});

export default connect(mapStateToProps, {
  getUserProfile: getUserProfileAction,
})(Profile);