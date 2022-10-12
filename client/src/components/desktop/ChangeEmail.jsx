import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import fetchAPI from '../../utils/fetchAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Alert, Collapse } from '@mui/material';
import { logoutRequest } from '../../state/user';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState(false)
  const [newEmail, setNewEmail] = React.useState('')
  const {user} = useSelector(state=>state)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = () => {
    fetchAPI({method:'PUT', data: {email:newEmail}, url:`/api/user/resetEmail/${user._id}`})
        .then((res)=>{
            if(res.status===204){
                dispatch(logoutRequest())
                navigate('/login')
            }else{
                setAlert(true)
                setTimeout(() => {
                    setAlert(false)
                }, 3000);
            }
        })
  }

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen} sx={{ml:2}}>
        Change Password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            After changing the e-mail address this session will expire.
          </DialogContentText>
          <TextField
            value={newEmail}
            onChange={(e)=>{setNewEmail(e.target.value)}}
            autoFocus
            margin="dense"
            id="name"
            label="New Email"
            type="email"
            fullWidth
            variant="standard"
          />
          <Collapse in={alert}>
            <Alert severity='error'>
                An error has ocurred... Try again!!
            </Alert>
          </Collapse>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleChange}>Change</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
