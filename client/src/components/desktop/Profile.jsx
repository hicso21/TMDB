import { Box, Button, FormControl, IconButton, MenuItem, Paper, Select, Snackbar, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ProfileBanner from '../../commons/desktop/ProfileBanner'
import ChangePassword from './ChangePassword'
import ChangeEmail from './ChangeEmail'
import fetchAPI from '../../utils/fetchAPI'
import { getMe } from '../../state/user'
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react'

const Profile = () => {
    const {user} = useSelector(state=>state);
    const [open, setOpen] = useState(false)
    const [text, setText] = useState('')
    const [gender, setGender] = useState(user?.gender);
    const [firstName, setFirstName] = useState(user?.name);
    const [lastName, setLastName] = useState(user?.last_name);
    const [age, setAge] = useState(user?.age)
    const [able, setAble] = useState(true)
    const [image, setImage] = useState(user?.profile_picture)
    const seleccionArchivos = document.querySelector("#seleccionArchivos");
    const imagenPrevisualizacion = document.querySelector(
      "#imagenPrevisualizacion"
    );

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={()=>{setOpen(false)}}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

    const handleChanges = () => {
        console.log(image)
        const dataObj = {}
        if(gender !== '') dataObj.gender = gender
        if(image !== '') dataObj.profile_picture = image
        if(firstName !== '') dataObj.name = firstName
        if(lastName !== '') dataObj.last_name = lastName
        if(age != '0') dataObj.age = age
        if(able === true){
            fetchAPI({method:'PUT', data:dataObj, url:`/api/user/update/${user._id}`})
                .then((res)=>{getMe()})
        }
    }

    const handleImage = (e) => {
        const reader = new FileReader();
        const archivos = seleccionArchivos.files;
    
        if (!archivos || !archivos.length) {
          imagenPrevisualizacion.src = "";
          return;
        }
    
        reader.addEventListener("loadend", function () {
          imagenPrevisualizacion.src = reader.result;
          setImage(reader.result);
        });
    
        reader.readAsDataURL(archivos[0]);
      };

    const sendImage = () => {
      fetchAPI({url:'/api/upload/', data: { Base64: image}, method:'POST'})
        .then((res)=>{
            setImage(res.data)
            if(res.status < 400){
                setText('Profile picture was charged successfully. Save changes to see it.')
                setOpen(true)
            }else{
                setText('An error has occurred, try it again.')
                setOpen(true)
            }
        })
    }

    useEffect(()=>{
        setAge(user?.age)
        setFirstName(user?.name)
        setLastName(user?.last_name)
        setImage(user?.profile_picture)
        setGender(user?.gender)
    },[user])

  return (
    <>
        <ProfileBanner/>
            {!localStorage.getItem('google')?
            <>
                <Box sx={{ml:30, mr:30}}>
                    <Typography variant='h4'>Profile</Typography>
                    <Box sx={{display:'flex', pt:3}} id='ChangeButtons'>
                        <ChangePassword/>
                        <ChangeEmail/>
                    </Box>
                    <Typography variant='h6' sx={{mt:3}}>Email</Typography>
                    <Paper sx={{height:40, display:'flex', alignItems:'center', pl:2, mt:1}}>
                        <Typography sx={{opacity:0.6}}>{user?.email}</Typography>
                    </Paper>
                    <Stack alignItems="start" flexDirection='row' spacing={1}>
                        <Button sx={{mr:3, mt:'24px'}} variant="contained" component="label">
                            Subir imagen
                            <input
                                hidden
                                id="seleccionArchivos"
                                accept="image/*"
                                type="file"
                                onChange={handleImage}
                            />
                        </Button>
                        <Box sx={{width:40, height:40, mt:'24px !important', borderRadius:10, mr:'24px !important'}}>
                            <img id="imagenPrevisualizacion" src={user.profile_picture?user.profile_picture:''}  style={{borderRadius:50}} alt="" width='100%' height='100%'/>
                        </Box>
                        <Button variant="contained" sx={{mt:'24px !important', ml:3}} onClick={sendImage}>
                            Save Image
                        </Button>
                    </Stack>
                    <Box sx={{display:'flex'}}>
                        <Box>
                            <Typography sx={{mt:1}}>Gender</Typography>
                            <FormControl sx={{width:100}}>
                                <Select
                                    sx={{height:42}}
                                    value={gender}
                                    onChange={(e)=>{setGender(e.target.value)}}
                                >
                                    <MenuItem value={'male'}>Male</MenuItem>
                                    <MenuItem value={'female'}>Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{pl:5}}>
                            <Typography sx={{mt:1}}>First Name</Typography>
                            <TextField value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} sx={{pt:1}} variant="standard"/>
                        </Box>
                        <Box sx={{pl:5}}>
                            <Typography sx={{mt:1}}>Last Name</Typography>
                            <TextField value={lastName} onChange={(e)=>{setLastName(e.target.value)}} sx={{pt:1}} variant="standard"/>
                        </Box>
                        <Box sx={{pl:5, width:40}}>
                            <Typography sx={{mt:1}}>Age</Typography>
                            <TextField value={age} onChange={(e)=>{setAge(e.target.value)}} sx={{pt:1, justifyContent:'end'}} variant="standard"/>
                        </Box>
                    </Box>
                    <Box sx={{mt:3}}>
                        <Button variant="contained" onClick={handleChanges}>
                            Save Changes
                        </Button>
                    </Box>
                </Box>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    message={text}
                    action={action}
                />
            </>
            :
            <Box sx={{ml:30, mr:30, height:500, display:'flex', alignItems:'center'}}>
                <Typography sx={{justifyContent:'center', width:'100%', display:'flex'}} variant='h5'>
                    You are logged with a Google Account
                </Typography>
            </Box>}
    </>
  )
}

export default Profile