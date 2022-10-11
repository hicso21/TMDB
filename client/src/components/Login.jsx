import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginRequest, sendSignUpRequest, signupRequest } from '../state/user';
import { useState } from 'react';
import { Alert, Checkbox, Collapse, FormControlLabel, Snackbar } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function SignUp() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  let alertText = 'An error occurred while trying to register. Please check that the data is correct'

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [checked, setChecked] = useState(false)

  const [name, setName] = useState('')
  const [nameLegend, setNameLegend] = useState('Enter your name')
  const [errorName, setErrorName] = useState(true)

  const [email, setEmail] = useState('')
  const [emailLegend, setEmailLegend] = useState('')
  const [errorEmail, setErrorEmail] = useState(false)

  const [password, setPassword] = useState('')
  const [pwLegend, setPwLegend] = useState('')
  const [errorPw, setErrorPw] = useState(false)
  const [type, setType] = useState('password')

  const handleChange = (event) => {
    setChecked(event.target.checked);
  }

  const handleType = () => {
    type === 'password'?setType('text'):setType('password')
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get('email') === '' || data.get('password') === '' )setOpen(true)
    else{
      dispatch(loginRequest({
        email: data.get('email'),
        password: data.get('password'),
      }))
      .then((resp)=>{
        if(resp.payload !== undefined){
          navigate('/')
        }else{
          setOpen(true)
        }
      })  
    }
  };

  return (
    <>
      <br />
      <br />
      <br />
      <Container maxWidth="xs">
      <Card style={{ maxWidth: 450, margin: "0 auto", borderRadius: "17px" }}>
        <CardContent>
        <CssBaseline />
        <Box
          sx={{
            margin: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              {alertText}
            </Alert>
          </Snackbar>
          <Avatar sx={{ m: 1, bgcolor: '#1e244b' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={(e)=>{
                    setEmail(e.target.value)
                    if(!email.includes('@') || !email.split('@')[0]){
                      setErrorEmail(true)
                      setEmailLegend('Email must exist')
                    }else{
                      setErrorEmail(false)
                      setEmailLegend('')
                    }
                  }}
                  error={errorEmail}
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  autoComplete="email"
                  helperText={emailLegend}
                />
              </Grid>
              <Grid item xs={12} sx={{display:'flex'}}>
                <TextField
                  onChange={(e)=>{
                    setPassword(e.target.value)
                    if(password.length<5){
                      setErrorPw(true)
                      setPwLegend('Password must contain at least 6 characters')
                    }else{
                      setErrorPw(false)
                      setPwLegend('')
                    }
                  }}
                  error={errorPw}
                  required
                  fullWidth
                  label="Password"
                  type={type}
                  name="password"
                  autoComplete="new-password"
                  helperText={pwLegend}
                />
                <Button color='inherit' onClick={handleType} sx={{height:56}}>
                  <VisibilityIcon/>
                </Button>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                ¿You do not have an account yet? Sign up here
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        </CardContent>
        </Card>
      </Container>
    </>
  );
}
