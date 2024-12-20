import React, { FC, useEffect, useState } from "react";
import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { toEnglishNumber } from "commons/utils/translateNumber";
import GenderSelector from "../components/molecules/profile-inputs/GenderSelector";
import NameInput from "../components/molecules/profile-inputs/NameInput";
import LastNameInput from "../components/molecules/profile-inputs/LastNameInput";
import NationalCodeInput from "../components/molecules/profile-inputs/NationalIDInput";
import BirthDateInput from "../components/molecules/profile-inputs/BirthDateInput";
import IntroductionSelector from "../components/molecules/profile-inputs/IntroductionSelector";
import RegionSelector from "../components/molecules/profile-inputs/RegionSelector";
import PhoneNumberInput from "../components/molecules/profile-inputs/PhoneNumberInput";
import PostNumberInput from "../components/molecules/profile-inputs/PostNumberInput";
import AddressInput from "../components/molecules/profile-inputs/AddressInput";
import ProfileImageSelector from "../components/molecules/profile-inputs/ProfileImageSelector";
import { useGetProfileQuery, useUpdateProfileMutation } from "../redux/slices/Profile";
import BackButton from "../components/molecules/buttons/Back";
import PersonIcon from "../components/atoms/icons/Person";
import ScoreChip from "../components/molecules/chips/Score";
import useLocalNavigate from "../hooks/useLocalNavigate";
import { AshbariaProfileType } from "../types";
import dialogService from "commons/components/organisms/PortalDialog";
import CustomDialogContent from "commons/components/molecules/CustomDialogContent";
import ScoreAnnouncement from "apps/film-bazi/components/atoms/icons/ScoreAnnouncement";
import useUserProfile from "commons/hooks/useUserProfile";
import AreYouSure from "commons/components/organisms/dialogs/AreYouSure";

type UserSettingPropsType = {}

const UserInfo: FC<UserSettingPropsType> = ({ }) => {
  const localNavigate = useLocalNavigate();
  const [updateProfile, updateProfileResult] = useUpdateProfileMutation();
  const { data: initialAshbariaProfile } = useGetProfileQuery();
  const [AshbariaProfile, setAshbariaProfile] = useState<AshbariaProfileType>(null);
  const [isSubmitConfirmationOpen, setIsSubmitConfirmationOpen] = useState(false);
  const { data: userProfile } = useUserProfile();

  useEffect(() => {
    if (userProfile) {
      setAshbariaProfile(prevProfile => ({
        ...prevProfile,
        phone_number: userProfile.phone_number,
      }))
    }
  }, [userProfile])

  useEffect(() => {
    if (initialAshbariaProfile) {
      setAshbariaProfile(initialAshbariaProfile);
    }
  }, [initialAshbariaProfile]);

  useEffect(() => {
    if (updateProfileResult?.data?.reward_granted) {
      dialogService.open({
        component:
          <CustomDialogContent
            image={<ScoreAnnouncement />}
            title={`تبریک! با تکمیل نمایه ۱۵۰ سکه به شما اضافه شد.`}
            onClick={() => {
              dialogService.close();
              localNavigate('/');
            }}
          />
      })
    } else if (updateProfileResult?.isSuccess) {
      toast.success('اطلاعات با موفقیت به‌روز شد');
    } else if (updateProfileResult?.isError) {
      toast.error('مشکلی در به‌روز‌رسانی نمایه وجود داشت');
    }
  }, [updateProfileResult.isSuccess]);

  const handleChange = (event) => {
    setAshbariaProfile({
      ...AshbariaProfile,
      [event.target.name]: toEnglishNumber(event.target.value),
    });
  }

  const handleGenderChange = (selectedGender) => {
    setAshbariaProfile({
      ...AshbariaProfile,
      gender: selectedGender,
    })
  }

  const handleProfileImgChange = (selectedImg) => {
    setAshbariaProfile({
      ...AshbariaProfile,
      profile_image: selectedImg,
    });
  }

  const handleSubmit = () => {
    if (checkForBlankFields(AshbariaProfile)) {
      toast.error('لطفاً همه‌ی مشخصات رو کامل کن');
      return;
    }
    updateProfile(AshbariaProfile);
  }

  return (
    <Container maxWidth='md' component={Paper} sx={{ position: 'relative', paddingY: 2 }}>
      <Grid container spacing={2}>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
        >
          <Box position={'absolute'} left={10} top={10}>
            <BackButton />
          </Box>
          <Stack direction={'row'}>
            <PersonIcon />
            <Typography variant="h6" fontSize={24} fontWeight={800}>
              {'نمایه'}
            </Typography>
          </Stack>
          <Box position={'absolute'} right={10} top={10}>
            {AshbariaProfile?.has_received_reward === false && <ScoreChip value={150} />}
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <NameInput handleChange={handleChange} first_name={AshbariaProfile?.first_name} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LastNameInput handleChange={handleChange} last_name={AshbariaProfile?.last_name} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <NationalCodeInput handleChange={handleChange} national_code={AshbariaProfile?.national_code} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BirthDateInput birthDate={AshbariaProfile?.birth_date} setBirthDate={(value) => setAshbariaProfile({ ...AshbariaProfile, birth_date: value })} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <GenderSelector gender={AshbariaProfile?.gender} handleChange={handleGenderChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <IntroductionSelector handleChange={handleChange} referral_method={AshbariaProfile?.referral_method} />
        </Grid>
        <RegionSelector data={AshbariaProfile} setData={setAshbariaProfile} />
        <Grid item xs={12} sm={6}>
          <PhoneNumberInput setPhoneNumber={handleChange} phoneNumber={AshbariaProfile?.phone_number} disabled={true} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PostNumberInput handleChange={handleChange} postal_code={AshbariaProfile?.postal_code} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AddressInput handleChange={handleChange} address={AshbariaProfile?.address} />
        </Grid>
        <Grid item xs={12}>
          <ProfileImageSelector profile_image={AshbariaProfile?.profile_image} handleChange={handleProfileImgChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button onClick={() => localNavigate('/')} size="large" fullWidth={true} variant='outlined'>
            {'ولش کن'}
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            disabled={Boolean(AshbariaProfile?.profile_completion_count_from_28Nov)}
            onClick={() => setIsSubmitConfirmationOpen(true)}
            size="large" fullWidth={true} variant='contained'
          >
            {'همینو ذخیره کن'}
          </Button>
        </Grid>
      </Grid>
      <AreYouSure
        text='توجه کن که تنها یک بار می‌تونی نمایه‌ت را ذخیره کنی. آیا مطمئنی؟'
        open={isSubmitConfirmationOpen}
        handleClose={() => setIsSubmitConfirmationOpen(false)}
        callBackFunction={handleSubmit}
      />
    </Container>
  );
}

export default UserInfo;

const checkForBlankFields = (profile: AshbariaProfileType): boolean => {
  const requiredFields = [
    'first_name',
    'last_name',
    'national_code',
    'birth_date',
    'gender',
    'province',
    'city',
    'phone_number',
    'postal_code',
    'address',
  ];

  return requiredFields.some((field) => profile[field as keyof AshbariaProfileType] === null || profile[field as keyof AshbariaProfileType] === '');
};