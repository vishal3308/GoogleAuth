import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
import { Url } from '../../App';


export default function OtpVerification({ HandleOTP, EMAIL,Setlocalstorage }) {
  const [open, setopen] = useState(true);
  const [resendloading, setresendLoading] = useState(false);
  const [Resendbutton, setResend] = useState(true);
  const [submitloading, setsubmitLoading] = useState(false);
  const [timer, settimer] = useState(30);
  const [otp, setotp] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate()
  const url = useContext(Url);

  useEffect(() => {
      setopen(true);
      setResend(true);
      return settimer(30);
    
  },[EMAIL])

  const handleclose=()=>{
    setopen(false);
    HandleOTP();
  }
  // ================================OTP Verifivcation API================
  const VerifyingOTP = () => {
    if (!otp || otp.length !== 6) {
      setError(true)
      return setErrorMessage("Please Fill the OTP of 6 digit")
    }
    // =============================API Calling=================
    setsubmitLoading(true)
    const data = {
      email: EMAIL,
      OTP: otp
    }
    fetch(url + '/Otpverification', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((resp) => resp.json())
      .then((res) => {
        if (res.Error) {
          setError(true)
          setErrorMessage(res.Error);
        }
        else {
          Setlocalstorage();
          navigate('/productlist')
        }
      }).catch((err) => {
        setError(true)
        setErrorMessage("Something went Wrong, please try again.");
      }).finally(() => {
        setsubmitLoading(false)
      })

  };

  const ResendOtp = () => {
    console.log('Email id: ', EMAIL);
    setresendLoading(true)
  }
  // ==========Timer for Resend OTP=====================
  useEffect(() => {
    const timerfun = setTimeout(() => {
      settimer(timer - 1);
    }, 1000);
    if (timer <= 0) {
      setResend(false);
      return clearTimeout(timerfun)
    }
    else {
      return setResend(true);
    }
  }, [timer]);

  return (
    <Dialog open={open} className="OTPdialog">
      <Tooltip title="Close">
      <IconButton aria-label="delete" size="large" sx={{position:"absolute",right:0,top:0}} onClick={handleclose}>
        <CloseIcon />
      </IconButton>
      </Tooltip>
      <DialogTitle>OTP Verification</DialogTitle>
      <DialogContent>
        <DialogContentText>
          For registration to this website, please enter your OTP which is already send to your email id <b>{EMAIL}</b>.
        </DialogContentText>
        <TextField
          error={error}
          autoFocus
          margin="dense"
          id="otp"
          label="Enter OTP"
          type="number"
          fullWidth
          variant="standard"
          onChange={(e) => setotp(e.target.value)}
          value={otp}
          helperText={error && errorMessage}
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
