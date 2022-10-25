import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import notPhoto from '../../assets/notPhoto.svg'

const PeopleCard = ({prop}) => {

    const imgUrl = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2'
    const [known, setKnown] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{

    },[])

  return (
    <Card sx={{ width: 235,  mb:'4%' }} onClick={()=>{navigate(`/person/${prop.id}`)}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="235"
          image={prop.profile_path?`${imgUrl}/${prop.profile_path}`:notPhoto}
          alt="people"
          sx={prop.profile_path?{}:{backgroundColor:'lightgray'}}
        />
        <CardContent sx={{height:'100%', textAlign:'center'}}>
          <Typography gutterBottom variant="h5" component="div">
            {prop.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {prop.known_for.map((item, i)=>{
                let result
                if(item.name){
                    prop.known_for.length-1 === i?
                        result = `${item.original_name}`
                    :
                        result = `${item.original_name},`
                }else{
                    prop.known_for.length-1 === i?
                        result = `${item.original_title}`
                    :
                        result = `${item.original_title},`
                }
                return result
            })}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default PeopleCard