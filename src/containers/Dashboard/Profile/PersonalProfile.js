import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
const PROFILE_PICTURE = process.env.PUBLIC_URL + '/profile.png';

import {
  getInstitutesAction,
  getUserProfileAction,
  updateStudentShipAction,
  updateUserAccountAction,
} from '../../../redux/slices/account';
import Iran from '../../../utils/iran';
import { toEnglishNumber } from '../../../utils/translateNumber';

import moment from "moment";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import {
  TimePicker,
  DateTimePicker,
  DatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";


jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });


const useStyles = makeStyles((theme) => ({
  profileImage: {
    maxHeight: '100px',
    borderRadius: '5px',
  },
  logo: {
    height: 100,
  },
  formControl: {
    width: '100%',
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
  },
}));

function Index({
  updateUserAccount,
  getUserProfile,
  updateStudentShip,
  getInstitutes,
  userAccount,
  userProfile,
  institutes,
}) {
  const classes = useStyles();
  const [newProfile, setNewProfile] = useState({});
  const [birthDate, setBirthDate] = useState();

  useEffect(() => {
    getUserProfile({ id: userAccount?.id });
  }, []);

  useEffect(() => {
    if (userProfile?.birth_date) {
      setBirthDate(moment(userProfile.birth_date));
    }
  }, [userProfile])

  const isJustDigits = (number) => {
    var regex = new RegExp(`\\d{${number.length}}`);
    if (regex.test(toEnglishNumber(number))) {
      return true;
    } else {
      return false;
    }
  };

  const handleProfilePictureChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setNewProfile({
        ...newProfile,
        profile_picture: event.target.files[0],
      });
    }
  };


  const handleProfileChange = (event) => {
    setNewProfile({
      ...newProfile,
      [event.target.name]: toEnglishNumber(event.target.value),
    });
  };

  const submitProfile = () => {
    let data = {
      id: userProfile?.id,
      ...newProfile,
    }
    if (birthDate) {
      data = {
        ...data,
        birth_date: birthDate.format('YYYY-MM-DD'),
      }
    }
    updateUserAccount(data);
  };

  if (!userProfile) {
    return <></>;
  }

  return (
    <>
      <Grid container item spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom>تصویر</Typography>
          <Divider />
        </Grid>
        <Grid item container spacing={2} alignItems="center">
          <Grid item>
            <img
              alt=""
              className={classes.profileImage}
              src={
                (newProfile?.profile_picture &&
                  URL.createObjectURL(newProfile?.profile_picture)) ||
                userProfile?.profile_picture ||
                PROFILE_PICTURE
              }
            />
          </Grid>
          <Grid item>
            <Typography>
              برای تغییر تصویر بر روی گزینه‌ی زیر کلیک کنید.
            </Typography>
            <br />
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                document.getElementById('userProfilePicture').click()
              }>
              انتخاب تصویر
            </Button>
            <input
              id="userProfilePicture"
              style={{ display: 'none' }}
              type="file"
              onChange={handleProfilePictureChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom>مشخصات فردی</Typography>
          <Divider />
        </Grid>
        <Grid item container spacing={2}>

          <Grid item xs={12} sm={6}>
            <TextField
              error={!userProfile.first_name}
              fullWidth
              required
              defaultValue={userProfile?.first_name}
              value={newProfile.first_name}
              name="first_name"
              onChange={handleProfileChange}

              label='نام'
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              error={!userProfile.last_name ? true : false}
              fullWidth
              required
              defaultValue={userProfile?.last_name}
              value={newProfile.last_name}
              name="last_name"
              onChange={handleProfileChange}

              label="نام خانوادگی"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              error={!userProfile.national_code}
              fullWidth
              required
              defaultValue={userProfile?.national_code}
              value={newProfile.national_code}
              name="national_code"
              onChange={(e) => {
                if (isJustDigits(e.target.value)) {
                  handleProfileChange(e);
                }
              }}
              inputProps={{ className: 'ltr-input' }}

              label="کد ملی"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              disabled={true}
              required
              defaultValue={userProfile?.phone_number}
              name="phone_number"
              inputProps={{ className: 'ltr-input' }}

              label="شماره موبایل"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
              <DatePicker
                error={!birthDate}
                required
                label='تاریخ تولد'
                fullWidth
                okLabel="تأیید"
                cancelLabel="لغو"
                labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                value={birthDate}
                onChange={setBirthDate}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              defaultValue={userProfile?.email}
              value={newProfile.email}
              name="email"
              onChange={handleProfileChange}
              inputProps={{ className: 'ltr-input' }}

              label="ایمیل"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl required>
              <FormLabel error={!userProfile?.gender}>جنیست</FormLabel>
              <RadioGroup
                name="gender"
                row
                required
                defaultValue={userProfile?.gender}
                onChange={handleProfileChange}>
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="پسر"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="دختر"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item container xs={12} sm={6}>
            <FormControl
              required
              error={!userProfile?.province}
              className={classes.formControl}>
              <InputLabel>استان</InputLabel>
              <Select
                className={classes.dropDown}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newProfile?.province || userProfile?.province}
                onChange={handleProfileChange}
                name="province"
                label="استان">
                {Iran.Provinces.map((province) => (
                  <MenuItem key={province.id} value={province.title}>
                    {province.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item container xs={12} sm={6}>
            <FormControl
              required
              error={!userProfile?.city}
              className={classes.formControl}>
              <InputLabel>شهر</InputLabel>
              <Select
                className={classes.dropDown}
                disabled={!newProfile?.province && !userProfile?.city}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newProfile?.city || userProfile?.city}
                onChange={handleProfileChange}
                name="city"
                label="شهر">
                {Iran.Cities.filter(
                  (city) =>
                    Iran.Provinces.find(province => province.id == city.province_id).title == newProfile?.province ||
                    Iran.Provinces.find(province => province.id == city.province_id).title == userProfile?.province
                ).map((city) => (
                  <MenuItem key={city.id} value={city.title}>
                    {city.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              helperText='جوایز و یادگاری‌ها به این آدرس پست می‌شوند.'
              defaultValue={userProfile?.address}
              value={newProfile.address}
              name="address"
              multiline
              rows={2}
              onChange={handleProfileChange}

              label="آدرس منزل"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              defaultValue={userProfile?.postal_code}
              name="postal_code"
              value={newProfile.postal_code}
              onChange={(e) => {
                if (isJustDigits(e.target.value)) {
                  handleProfileChange(e);
                }
              }}
              inputProps={{ className: 'ltr-input' }}

              label="کد پستی"
            />
          </Grid>
        </Grid>

        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <Button
              onClick={submitProfile}
              fullWidth
              variant="contained"
              color="secondary">
              ذخیره
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  userAccount: state.account.userAccount,
  userProfile: state.account.userProfile,
  isFetching: state.account.isFetching,
  payments: state.account.payments,
  institutes: state.account.institutes,
});

export default connect(mapStateToProps, {
  updateUserAccount: updateUserAccountAction,
  getUserProfile: getUserProfileAction,
  updateStudentShip: updateStudentShipAction,
  getInstitutes: getInstitutesAction,
})(Index);
