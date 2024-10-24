import React from "react";
import { Grid, TextField, Typography } from "@mui/material";


export default function NationalCodeInput({ handleChange, national_code }) {
  return (
    <Grid item xs={12} md={6} sx={{ marginTop: "16px" }}>
      <Typography fontWeight={400} fontSize={14}
        sx={{
          paddingBottom: "4px",
          textAlign: "left"
        }}
      >
        کد ملی
      </Typography>
      <TextField
        fullWidth
        required
        value={national_code || ''}
        name="national_code"
        onChange={handleChange}
        sx={{
          padding: "0px 16px 0px 16px",
          gap: "10px",
          borderRadius: "8px",
          border: "1px",
          '& .MuiOutlinedInput-root': {
            height: "44px",
            width: "100%"
          }
        }}
        placeholder="کد ملی خود را وارد کنید."
      />
    </Grid>
  );
}