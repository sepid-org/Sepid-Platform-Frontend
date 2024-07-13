import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleLogin from 'components/molecules/GoogleLogin';
import { useLoginMutation } from 'redux/features/user/UserSlice';
import { useGetWebsiteQuery } from 'redux/features/WebsiteSlice';

type LoginPagePropsType = {
  isFetching: boolean;
  accessToken: string;
};

const LoginPage: FC<LoginPagePropsType> = ({
  isFetching,
  accessToken,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({
    password: '',
    username: '',
  });
  const { data: website } = useGetWebsiteQuery();
  const [login, result] = useLoginMutation();

  useEffect(() => {
    if (accessToken) {
      const previousLocation = location.state?.from?.pathname
      const destinationLocation = previousLocation || '/programs/';
      navigate(destinationLocation, { replace: true });
    }
  }, [accessToken])

  const putData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const regularLogin = () => {
    const { username, password } = data;
    if (!username || !password) {
      return;
    }
    login(data);
  };

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Stack width={400} spacing={2}>
        <Stack
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              regularLogin();
            }
          }}
          width='md' sx={{ marginTop: 5, padding: 2, width: '100%' }} spacing={1.5} component={Paper}>
          <Typography
            gutterBottom
            component="h1"
            variant="h2"
            align="center">
            {'ورود'}
          </Typography>

          <TextField
            autoComplete="on"
            variant="outlined"
            fullWidth
            onChange={putData}
            value={data.username}
            name="username"
            label="شماره تلفن همراه، ایمیل یا نام کاربری"
            inputProps={{ className: 'ltr-input' }}
            type='text'
            inputMode='text'
          />

          <TextField
            autoComplete="on"
            variant="outlined"
            fullWidth
            onChange={putData}
            label="گذرواژه"
            name="password"
            inputProps={{ className: 'ltr-input' }}
            type="password"
            inputMode='text'
          />
          <Button
            onClick={regularLogin}
            variant="contained"
            color="primary"
            disabled={isFetching}
            fullWidth>
            بزن بریم
          </Button>
          {website?.has_login_with_google &&
            <GoogleLogin />
          }
        </Stack>
        <Stack>
          <Typography gutterBottom align='center'>
            <Link style={{ textDecoration: 'none' }} to={'/reset-password'}>
              {'گذروازه‌ام را فراموش کرده‌ام :('}
            </Link>
          </Typography>
          <Typography align='center'>
            <Link style={{ textDecoration: 'none' }} to={'/create-account'}>
              {'می‌خواهم یک حساب کاربری جدید بسازم...'}
            </Link>
          </Typography>
        </Stack>
      </Stack>

    </Container>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.account.accessToken,
  isFetching: state.account.isFetching,
});

export default connect(mapStateToProps, {
})(LoginPage);
