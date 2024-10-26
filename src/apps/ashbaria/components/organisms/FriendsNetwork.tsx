import React, { Fragment } from 'react';
import {
  Box,
  Container,
  IconButton,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import verify from "../../assets/verify.svg";
import bg from "../../assets/friendsNetworkBg.svg";
import BackButton from '../molecules/buttons/Back';
import HeartIcon from '../atoms/icons/Heart';
import ExclamationIcon from '../atoms/icons/Exclamation';
import FriendsNetworkPoints from '../molecules/FriedndsNetworkPoint';
import CustomOutlinedButton from '../molecules/buttons/CustomOutlinedButton';
import CopyIcon from '../atoms/icons/Copy';
import CustomContainedButton from '../molecules/buttons/CustomContainedButton';
import CodingMission from '../molecules/CodingMission';

const App = () => {

  const myCode = 12121212;

  const records = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
    // text: Record ${index + 1},
    //score: Math.floor(Math.random() * 100),
  }));

  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const shareOnMobile = (text: string) => {
    if (navigator.share) {
      navigator.share({
        text: text,
      }).then(() => {
        console.log('Successful share');
      }).catch((error) => {
        console.log('Error sharing', error);
      });
    } else {
      alert('Your browser does not support the Web Share API');
    }
  };

  const handleShare = () => {
    if (isMobileDevice()) {
      shareOnMobile(myCode.toString());
    } else {
      copyToClipboard(myCode.toString());
    }
  }

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "100vw",
          minHeight: "100vh",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <Container maxWidth='lg' component={Paper}>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 1,
            }}
          >
            <BackButton />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <HeartIcon />
              <Typography variant="h6" color="white" sx={{ ml: 1 }}>حلقه دوستان</Typography>
            </Box>
            <IconButton color="inherit">
              <ExclamationIcon />
            </IconButton>
          </Box>

          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
              margin: 0,
              gap: 2
            }}
          >
            {/* Right Component */}
            <Grid
              item
              xs={11}
              sm={5}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                height: "auto",
                borderRadius: 2,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                padding: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                  height: 36,
                }}
              >
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  sx={{
                    width: "100%",
                  }}
                >
                  کد دوستاتو بزن!
                </Typography>
                <FriendsNetworkPoints points={129} numberOfFriends={12} />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  fontSize={16}
                  fontWeight={400}
                  sx={{
                    marginTop: 3,
                    height: 60,
                  }}
                  style={{
                    direction: "rtl",
                    textAlign: "right"
                  }}
                >
                  اگه از دوستات کد معرف گرفتی، بزنش اینجا. هر کدی 10 تا اعتبار می‌ارزه
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder="کد ۱۰ رقمی"
                  sx={{
                    margin: 1,
                    '& .MuiOutlinedInput-root': {
                      height: 44,
                      width: 255,
                    }
                  }}
                />
              </Box>
              <CustomOutlinedButton buttonText='ثبتش کن' handleClick={() => { }} minWidth={80} fullWidth={false} />
            </Grid>

            {/* Left Component */}
            <Grid
              item
              xs={11}
              sm={5}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                height: "auto",
                borderRadius: 2,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                padding: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: 36,
                }}
              >
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  sx={{
                    width: "100%",
                  }}
                >
                  به دوستات کد بده!
                </Typography>
                <FriendsNetworkPoints numberOfFriends={1} points={9} />
              </Box>
              <Typography
                fontSize={16}
                fontWeight={400}
                sx={{
                  marginTop: 3,
                  height: 60,
                }}
                style={{
                  direction: "rtl",
                  textAlign: "right"
                }}
              >
                هر کسی کد اختصاصی تو رو بزنه، هم اون اعتبار میگیره هم تو!
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: 1,
                  minWidth: 255,
                  height: 44,
                  margin: 1,
                }}
              >
                <Typography
                  fontSize={16}
                  fontWeight={400}
                  sx={{
                    width: 172,
                    heigh: 24,
                    marginLeft: 1
                  }}
                  style={{
                    direction: "rtl",
                    textAlign: "right"
                  }}
                >
                  کد اختصاصی تو
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography>{myCode}</Typography>
                  <IconButton onClick={handleShare} color="inherit">
                    <CopyIcon />
                  </IconButton>
                </Box>
              </Box>
              <CustomContainedButton minWidth={255} handleClick={() => { }} fullWidth={false} buttonText={"ارسال دعوت‌نامه"} />
            </Grid>
          </Grid>

          {/* Records Section */}
          <Typography
            fontSize={16}
            fontWeight={600}
            sx={{
              textAlign: "left",
              margin: 2
            }}
          >
            ماموریت‌های کدزنی
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              margin: 2,
              overflowX: "auto",
            }}
          >
            {records.map(record => (
              <CodingMission missionID={record.id} />
            ))}
          </Box>
        </Container >
      </Box>
    </Fragment>
  );
};

export default App;