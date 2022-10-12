import { Box, Button, FormControl, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ProfileBanner from '../../commons/desktop/ProfileBanner'
import ChangePassword from './ChangePassword'
import ChangeEmail from './ChangeEmail'
import fetchAPI from '../../utils/fetchAPI'
import { getMe } from '../../state/user'

const Profile = () => {
    const {user} = useSelector(state=>state);
    const [gender, setGender] = useState('');
    const [firstName, setFirstName] = useState(user.name?user.name:'');
    const [lastName, setLastName] = useState(user.last_name?user.lastName:'');
    const [age, setAge] = useState('0')
    const [able, setAble] = useState(true)

    const handleChanges = () => {
        const dataObj = {}
        if(gender !== '') dataObj.gender = gender
        if(firstName !== '') dataObj.name = firstName
        if(lastName !== '') dataObj.last_name = lastName
        if(age != '0') dataObj.age = age
        if(able === true){
            fetchAPI({method:'PUT', data:dataObj, url:`/api/user/update/${user._id}`})
                .then((res)=>{getMe()})
        }
    }

  return (
    <>
        <ProfileBanner/>
        <Box sx={{ml:30, mr:30}}>
            <Typography variant='h4'>Profile</Typography>
            <Box sx={{display:'flex', pt:3}} id='ChangeButtons'>
                <ChangePassword/>
                <ChangeEmail/>
            </Box>
            <Typography variant='h6' sx={{mt:3}}>Email</Typography>
            <Paper sx={{height:40, display:'flex', alignItems:'center', pl:2, mt:1}}>
                <Typography sx={{opacity:0.6}}>{user.email}</Typography>
            </Paper>
            <Button sx={{mt:3}} variant="contained">Change Photo</Button>
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
    </>
  )
}

export default Profile