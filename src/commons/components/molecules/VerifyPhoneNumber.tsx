import {
  Button,
  Stack,
  TextField,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import isNumber from 'commons/utils/validators/isNumber';
import isPhoneNumber from 'commons/utils/validators/isPhoneNumber';
import { useGetVerificationCodeMutation } from 'commons/redux/apis/party/UserApi';
import PhoneNumberInput from './profile-inputs/PhoneNumberInput';
import { normalizePhoneNumber } from 'commons/utils/NormalizePhoneNumber';
import VerificationCodeField from './form-fields/VerificationCode';

type VerificationCodeType = 'create-user-account' | 'change-user-password' | 'change-user-phone-number';

type VerifyPhoneNumberPropsType = {
  data: {
    phoneNumber: string;
    verificationCode: string;
  };
  setData: any;
  label: string;
  verificationType: VerificationCodeType
}

const VerifyPhoneNumber: FC<VerifyPhoneNumberPropsType> = ({
  data,
  setData,
  label,
  verificationType,
}) => {
  const [isButtonDisabled, setIsButtonDisable] = useState(false);
  const { data: website } = useGetWebsiteQuery();
  const [
    getVerificationCode,
    {
      isLoading: isGetVerificationCodeLoading,
      isSuccess: isGetVerificationCodeSuccess,
    }
  ] = useGetVerificationCodeMutation();

  const handleGettingVerificationCode = () => {
    if (!isPhoneNumber(data.phoneNumber)) {
      toast.error('شماره تلفن وارد‌شده معتبر نیست');
      return;
    }
    if (!website) {
      toast.error('نام سایت معتبر نیست.');
      return;
    }
    setIsButtonDisable(true);
    getVerificationCode({
      phoneNumber: normalizePhoneNumber(data.phoneNumber),
      codeType: verificationType,
      websiteDisplayName: website.title,
    }).then(() => {
      setTimeout(() => {
        setIsButtonDisable(false);
      }, 60000);
    });
  };

  useEffect(() => {
    if (isGetVerificationCodeSuccess) {
      toast.success('کد تایید فرستاده شد! این کد بعد از ۵ دقیقه منقضی می‌شود');
      setTimeout(
        () => {
          setIsButtonDisable(true);
        },
        process.env.NODE_ENV === 'production' ? 60000 : 1000
      );
    }
  }, [isGetVerificationCodeLoading])

  return (
    <Stack spacing={1}>
      <PhoneNumberInput
        setPhoneNumber={(value) => {
          setData({
            ...data,
            phoneNumber: value,
          });
        }}
        phoneNumber={data.phoneNumber}
        label={label}
        editable={false}
        //placeHolder={"09..."}
        textDir={"ltr"}
        isRequired={false}
      />
      <Stack direction='row' spacing={1}>
        <VerificationCodeField onChange={(e) => setData({ ...data, verificationCode: e.target.value })} />
        <Button
          size="small"
          variant="contained"
          color="primary"
          sx={{
            width: '40%',
            whiteSpace: 'nowrap',
          }}
          onClick={handleGettingVerificationCode}
          disabled={isButtonDisabled}>
          {isButtonDisabled ? '۱ دقیقه صبر کن' : 'دریافت کد'}
        </Button>
      </Stack>
    </Stack>
  );
};

export default VerifyPhoneNumber;
