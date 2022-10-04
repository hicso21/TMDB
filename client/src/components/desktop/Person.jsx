import React, { useState } from 'react'
import { Box, Divider, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material'
import { searchByPerson } from '../../state/people'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import ProgressBar from '../../commons/desktop/ProgressBar'
import numberToStringDate from '../../utils/dateFunction'
import noMoreThan14 from '../../utils/noMoreThan14'
import CircleIcon from '@mui/icons-material/Circle';
import '../../App.css'

const Person = () => {

    const dispatch = useDispatch()
    const params = useLocation()
    const {people} = useSelector(state=>state)
    const imgUrl = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2'

    const [acting, setActing] = useState([])
    const sort_lists = (key, list, inverse) =>
    inverse
        ? [...list].sort((b, a) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0))
        : [...list].sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0))

    let ImageStyle = { width: 880, height:260, display:'flex', flexDirection:'row'}

    function Slider({ items, type }) {
        return (
        <ImageList sx={ImageStyle} className='imageList'>
            {!items[0]?<ProgressBar/>:items.map((item) => {
            return(
                item.poster_path?
                    <Link to={`/${type}/${item.id}`} style={{color: 'inherit', textDecoration:'none', padding:5, width:200}} key={item.id.toString()}>
                        <ImageListItem>
                        <img
                            src={item.poster_path?`${imgUrl}/${item.poster_path}`:''}
                            alt={item.name}
                            loading="lazy"
                            style={{height:195, borderRadius:15, width:130}}
                            />
                        <ImageListItemBar
                            title={type === 'movie'?noMoreThan14(item.title):noMoreThan14(item.name)}
                            position="below"
                            sx={{display:'flex', justifyContent:'center', pt:1}}
                        />
                        </ImageListItem>
                    </Link>
                :
                    ''
            )})}
        </ImageList>
        );
    }

    useEffect(()=>{
        dispatch(searchByPerson(params.pathname.substring(8)))
    },[])
    
    if(!acting[0]){
        people.movieCredits?.cast.map((item, i)=>{
            setActing((curr)=>[...curr, {id:item.id, title:item.title, year:item.release_date.substring(0,4), character:item.character}])
        })
        people.tvCredits?.cast.map((item, i)=>{
            setActing((curr)=>[...curr, {id:item.id, name:item.name, year:item.first_air_date.substring(0,4), character:item.character}])
        })
    }
    useEffect(()=>{
        setActing(sort_lists('year', acting, true))
    },[acting.length])
    
  return (
    <Box sx={{m:5, ml:'12%', mr:'12%', display:'flex', flexDirection:'row'}}>
        <Box sx={{display:'flex', width:'26%', flexDirection:'column'}}>
            <img src={`${imgUrl}/${people.profile_path}`} alt="" style={{width:300, height:450, borderRadius:10}}/>
            <Typography variant='h6' sx={{mt:3}}>Personal info</Typography>
            <Typography variant='h6' sx={{mt:3, fontSize:'100%'}}><strong>Known for</strong></Typography>
            <Typography variant='h6' sx={{mt:1, fontSize:'100%'}}>{people.known_for_department}</Typography>
            <Typography variant='h6' sx={{mt:3, fontSize:'100%'}}><strong>Gender</strong></Typography>
            <Typography variant='h6' sx={{mt:1, fontSize:'100%'}}>{people.gender === 1?'Female':'Male'}</Typography>
            <Typography variant='h6' sx={{mt:3, fontSize:'100%'}}><strong>Date of Birth</strong></Typography>
            <Typography variant='h6' sx={{mt:1, fontSize:'100%'}}>{numberToStringDate(people?.birthday)}</Typography>
            <Typography variant='h6' sx={{mt:3, fontSize:'100%'}}><strong>Place of Birth</strong></Typography>
            <Typography variant='h6' sx={{mt:1, fontSize:'100%'}}>{people.place_of_birth}</Typography>
        </Box>
        <Box sx={{display:'flex', width:'74%', flexDirection:'column'}}>
            <Typography variant='h3' style={{fontSize:'250%'}}>{people.name}</Typography>
            <Typography variant='h3' style={{fontSize:'140%'}} sx={{mt:3}}><strong>Biography</strong></Typography>
            <Typography variant='p' sx={{mt:1}}>{people.biography}</Typography>
            <Typography variant='h3' style={{fontSize:'140%'}} sx={{mt:3}}><strong>Known for</strong></Typography>
            <Slider items={!people.movieCredits?.cast[0]?'':people.movieCredits.cast} type='movie'/>
            <Typography variant='h3' style={{fontSize:'140%'}}><strong>Acting</strong></Typography>
            <Box sx={{ width:880, boxShadow:'0 2px 8px rgba(0,0,0,0.1)', borderWidth:'thin', border:'1px lightgray solid'}}>
                {
                    acting.map((item, i)=>{
                        if(i===0){
                            return(
                                <Box sx={{display:'flex', alignItems:'center', height:50}}>
                                    <Typography sx={{padding:1, paddingLeft:2, paddingRight:2}}>{item.year !== ""?item.year:"-"}</Typography>
                                    <Typography sx={{height:'100%'}}><CircleIcon sx={{width:10, height:'100%'}}/></Typography>
                                    <Typography sx={{paddingLeft:2}}>
                                        <strong>
                                            <Link 
                                                style={{textDecoration:'none', color:'inherit'}}
                                                to={item.title?`/movie/${item.id}`:`/tv/${item.id}`}
                                            >
                                                {item.title?item.title:item.name}
                                            </Link>
                                        </strong>
                                    </Typography>
                                    <Typography sx={{paddingLeft:1, opacity:0.5}}>as</Typography>
                                    <Typography sx={{paddingLeft:1, opacity:0.8}}>{item.character}</Typography>
                                </Box>
                            )
                        }
                        if(i>0){
                            if(acting[i-1].year === acting[i].year){
                                return(
                                    <Box sx={{display:'flex', alignItems:'center', height:50}}>
                                        <Typography sx={{padding:1, paddingLeft:2, paddingRight:2}}>{item.year !== ""?item.year:"-"}</Typography>
                                        <Typography sx={{height:'100%'}}><CircleIcon sx={{width:10, height:'100%'}}/></Typography>
                                        <Typography sx={{paddingLeft:2}}>
                                            <strong>
                                                <Link 
                                                    style={{textDecoration:'none', color:'inherit'}}
                                                    to={item.title?`/movie/${item.id}`:`/tv/${item.id}`}
                                                >
                                                    {item.title?item.title:item.name}
                                                </Link>
                                            </strong>
                                        </Typography>
                                        <Typography sx={{paddingLeft:1, opacity:0.5}}>as</Typography>
                                        <Typography sx={{paddingLeft:1, opacity:0.8}}>{item.character}</Typography>
                                    </Box>
                                )
                            }else{
                                return(
                                    <>
                                        <Divider/>
                                        <Box sx={{display:'flex', alignItems:'center', height:50, borderTop:''}}>
                                            <Typography sx={{padding:1, paddingLeft:2, paddingRight:2}}>{item.year !== ""?item.year:" - "}</Typography>
                                            <Typography sx={{height:'100%'}} onClick={()=>{}}><CircleIcon sx={{width:10, height:'100%'}}/></Typography>
                                            <Typography sx={{paddingLeft:2}}>
                                                <strong>
                                                    <Link 
                                                        style={{textDecoration:'none', color:'inherit'}}
                                                        to={item.title?`/movie/${item.id}`:`/tv/${item.id}`}
                                                    >
                                                        {item.title?item.title:item.name}
                                                    </Link>
                                                </strong>
                                            </Typography>
                                            <Typography sx={{paddingLeft:1, opacity:0.5}}>as</Typography>
                                            <Typography sx={{paddingLeft:1, opacity:0.8}}>{item.character}</Typography>
                                        </Box>
                                    </>
                                )
                            }
                        }
                    })
                }
            </Box>
        </Box>
    </Box>
  )
}

export default Person