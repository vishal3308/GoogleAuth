import React, { useEffect,useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

export default function OtpVerification({OPEN,EMAIL}) {
  const [resendloading, setresendLoading] = useState(false);
  const [Resendbutton, setResend] = useState(true);
  const [submitloading, setsubmitLoading] = useState(false);
  const [timer, settimer] = useState(null);
 
  useEffect(()=>{
    if(OPEN){
      setResend(true);
      return settimer(30);
    }
  },[OPEN])
  const VerifyingOTP = () => {
    setsubmitLoading(true)
    console.log('Submit')
  };

  const ResendOtp=()=>{
    console.log('Email id: ',EMAIL);
    setresendLoading(true)
  }
  // ==========Timer for Resend OTP=====================
useEffect(() => {
  const timerfun = setTimeout(() => {
    settimer(timer-1);
  }, 1000);
  if(timer <=0){
    setResend(false);
    console.log("Timer ",timer)
    return clearTimeout(timerfun)
  }
    
  return () => clearTimeout(timerfun);
},[timer]);

  return (
    <Dialog open={OPEN} className="OTPdialog">
        <DialogTitle>OTP Verification</DialogTitle>
        <DialogContent>
          <DialogContentText>
            For registration to this website, please enter your otp which is already send to your email id {EMAIL}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="otp"
            label="Enter OTP"
            type="number"
            fullWidth
            variant="standard"
            required
          />
        </DialogContent>
        <DialogActions>
        <LoadingButton
          size="small"
          onClick={VerifyingOTP}
          endIcon={<SendIcon />}
          loading={submitloading}
          loadingPosition="end"
          variant="contained"
        >
          Submit
        </LoadingButton>
        <span id="timer">wait for {timer} sec</span>
        <LoadingButton
          size="small"
          onClick={ResendOtp}
          endIcon={<SendIcon />}
          loading={resendloading}
          loadingPosition="end"
          variant="contained"
          disabled={Resendbutton}
        >
          Resend
        </LoadingButton>
        </DialogActions>
      </Dialog>
  )
}
