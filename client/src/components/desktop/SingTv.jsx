import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { getOneTvshow } from '../../state/tvshows'
import { Box, CardMedia, Divider, ImageList, ImageListItem, ImageListItemBar, Tooltip, Typography, Button, Collapse, Alert, Rating } from '@mui/material'
import ProgressBar from '../../commons/desktop/ProgressBar'
import notPhoto from '../../assets/notPhoto.svg'
import { Link } from 'react-router-dom'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { setUser } from '../../state/user'
import fetchAPI from '../../utils/fetchAPI'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const SingTv = () => {
    const navigate = useNavigate()
    const params = useLocation()
    const dispatch = useDispatch()
    const {tvshows} = useSelector(state=>state)
    const {user} = useSelector(state=>state)
    const imgUrl = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2'
    const [fav, setFav] = useState(false)
    const [watched, setWatched] = useState(false)
    const [watchlist, setWatchlist] = useState(false)
    const [status, setStatus] = useState(0)
    const [open, setOpen] = useState(false)
    const [text, setText] = useState('')
    const [severity, setSeverity] = useState('success')
    const [rating, setRating] = useState(false)
    const [rate, setRate] = useState(0)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const opener = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRate = (event, newValue) => {
        fetchAPI({method:"POST", url:`/api/user/rate/add/${user._id}`, data:{rate:newValue, id: tvshows.id}})
            .then(res=>{setUser(res.data);return res.status})
            .then((res)=>{
                if(res < 399){
                    setSeverity('success')
                    setText(`${tvshows.name} was rated successfully`)
                    setRating(true)
                    setRate(newValue)
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false)
                        setText(``)
                    }, 3000)
                }else{
                    setSeverity('error')
                    setText(`An error was occurred`)
                    setRating(false)
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false)
                        setText(``)
                    }, 3000)
                }
            })
    }

    const handleWatched = ()=>{
        watched
        ?fetchAPI({method:"DELETE",data: tvshows, url:`/api/user/watched/remove/${user._id}`})
            .then(res=>{setUser(res.data);return res.status})
            .then((res)=>{
                if(res < 399){
                    setSeverity('success')
                    setWatched(false)
                    setText(`${tvshows.name} was removed successfully from Watched`)
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false)
                        setText(``)
                    }, 3000)
                }else{
                    setSeverity('error')
                    setWatched(true)
                    setText(`An error was occurred`)
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false)
                        setText(``)
                    }, 3000)
                }
            })
        :fetchAPI({method:"POST",data: tvshows, url:`/api/user/watched/add/${user._id}`})
            .then(res=>{setUser(res.data);return res.status})
            .then((res)=>{
                if(res < 399){
                    setSeverity('success')    
                    setWatched(true)
                    setText(`${tvshows.name} was added successfully to Watched`)
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false)
                        setText(``)
                    }, 3000)
                }else{
                    setSeverity('error')
                    setWatched(false)
                    setText(`An error was occurred`)
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false)
                        setText(``)
                    }, 3000)
                }
            })
    }

    const handleFavorites = ()=>{
        fav
        ?fetchAPI({method:"DELETE",data: tvshows, url:`/api/user/favorites/remove/${user._id}`})
            .then(res=>{setUser(res.data);return res.status})
            .then((res)=>{
                if(res < 399){
                    setSeverity('success')
                    setFav(false)
                    setText(`${tvshows.name} was removed successfully from Favorites`)
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false)
                        setText(``)
                    }, 3000)
                }else{
                    setSeverity('error')
                    setFav(true)
                    setText(`An error has occurred`)
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false)
                        setText(``)
                    }, 3000)
                }
            })
        :fetchAPI({method:"POST",data: tvshows, url:`/api/user/favorites/add/${user._id}`})
            .then(res=>{setUser(res.data);return res.status})
            .then((res)=>{
                if(res < 399){
                    setSeverity('success')
                    setFav(true)
                    setText(`${tvshows.name} was added successfully to Favorites`)
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false)
                        setText(``)
                    }, 3000)
                }else{
                    setSeverity('error')
                    setFav(false)
                    setText(`An error has occurred`)
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false)
                        setText(``)
                    }, 3000)
                }
            })
    }

    const handleWatchlist = ()=>{
        watchlist
        ?fetchAPI({method:"DELETE",data: tvshows, url:`/api/user/watchlist/remove/${user._id}`})
            .then(res=>{setUser(res.data);return res.status})
            .then((res)=>{
                if(res < 399){
                    setSeverity('success')
                    setWatchlist(false)
                    setText(`${tvshows.name} was removed successfully from Watchlist`)
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false)
                        setText(``)
                    }, 3000)
                }else{
                    setSeverity('error')
                    setWatchlist(true)
                    setText(`An error has occurred`)
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false)
                        setText(``)
                    }, 3000)
                }
            })
        :fetchAPI({method:"POST",data: tvshows, url:`/api/user/watchlist/add/${user._id}`})
            .then(res=>{setUser(res.data);return res.status})
            .then((res)=>{
                if(res < 399){
                    setSeverity('success')
                    setWatchlist(true)
                    setText(`${tvshows.name} was added successfully to Watchlist`)
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false)
                        setText(``)
                    }, 3000)
                }else{
                    setSeverity('error')
                    setWatchlist(false)
                    setText(`An error has occurred`)
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false)
                        setText(``)
                    }, 3000)
                }
            })
    }

    let ImageStyle = { width: '90%', height: '80%', display:'flex', flexDirection:'row', margin:'auto'}

    function Slider({ items, type }) {
        return (
          <ImageList sx={ImageStyle} className='imageList'>
            {!items?<ProgressBar/>:items?.map((item) => {
            return(
              <Link to={`/${type}/${item.id}`} style={{color: 'inherit', textDecoration:'none', padding:5, width:200}} key={item.id}>
                <ImageListItem>
                  <img
                    src={item.profile_path?`${imgUrl}/${item.profile_path}`:notPhoto}
                    alt={item?.name}
                    loading="lazy"
                    style={{height:300, borderRadius:15, width:200, backgroundColor:'lightgray'}}
                    />
                  <ImageListItemBar
                    title={item?.name}
                    subtitle={<Typography variant='text.secondary'>{}</Typography>}
                    position="below"
                    sx={{display:'flex', justifyContent:'center', pt:1}}
                  />
                </ImageListItem>
              </Link>
            )})}
          </ImageList>
        );
      }

    useEffect(()=>{
        dispatch(getOneTvshow(params.pathname.substring(4)))
            .then((res)=>{
                user.favorites?.map(item=>{
                    if(item.id === res.payload.id) setFav(true)
                })
                user.watched?.map(item=>{
                    if(item.id === res.payload.id) setWatched(true)
                })
                user.to_watch?.map(item=>{
                    if(item.id === res.payload.id) setWatchlist(true)
                })
                user.rating?.map(item=>{
                    if(item.id === res.payload.id) {
                        setRating(true)
                        setRate(item.rate)
                    }
                })
            })
    },[user])

    return (
        <>
            <Collapse in={open}>
                <Alert severity={severity}>
                    {text}
                </Alert>
            </Collapse>
            <Box sx={{width:'100%', height:500, display:'flex', paddingTop:5}}>
                <Box sx={{mr:10, ml:10, width:'100%', height:500, display:'flex'}}>
                    <Box sx={{width:'25%'}}>
                        <CardMedia component='img' image={`${imgUrl}/${tvshows.poster_path}`} sx={{borderRadius:2, width:300, height:450, ml:'10%'}}/>
                    </Box>
                    <Box sx={{width:'75%', paddingTop:6, pl:5/* pl:5 temporal */}}>
                        <Box id='firstInfo' sx={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
                            <Typography variant='h4'>{tvshows.name}</Typography>
                            <Typography variant='body1'>{tvshows.genres?.map((item, i)=>{
                                return(
                                    <span key={item.id}>
                                        {i === tvshows.genres.length-1?(item.name):(item.name+',')}
                                    </span>
                                )
                            })}{` - ${tvshows.episode_run_time} min`}</Typography>
                            <Typography variant='text.secondary'>{`(${tvshows.first_air_date?.substring(0, 4)})`}</Typography>
                        </Box>
                        <Box id='userButtons' sx={{display:'flex', justifyContent:'start', width:'100%', pt:1}}>
                            <Tooltip title='Add to Favorites'>
                                <Button sx={{color:'inherit', mt:1, mb:1}} onClick={()=>{user.email?handleFavorites():navigate('/login')}}>{fav?<FavoriteIcon sx={{width:30, height:28}}/>:<FavoriteBorderIcon sx={{width:30, height:28}}/>}</Button>
                            </Tooltip>
                            <Tooltip title='Add to your Watchlist'>
                                <Button sx={{color:'inherit', mt:1, mb:1}} onClick={()=>{user.email?handleWatchlist():navigate('/login')}}>{watchlist?<BookmarkIcon sx={{width:30, height:28}}/>:<BookmarkBorderIcon sx={{width:30, height:28}}/>}</Button>
                            </Tooltip>
                            <Tooltip title='Add to Watched'>
                                <Button sx={{color:'inherit', mt:1, mb:1}} onClick={()=>{user.email?handleWatched():navigate('/login')}}>{watched?<AddCircleIcon sx={{width:30, height:28}}/>:<AddCircleOutlineIcon sx={{width:30, height:28}}/>}</Button>
                            </Tooltip>
                            {watched
                            ?<>
                                {rating
                                    ?<>
                                        <Button
                                            id="basic-button"
                                            aria-controls={opener ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={opener ? 'true' : undefined}
                                            onClick={handleClick}
                                            sx={{color:'inherit', mt:1, mb:1}}
                                        >
                                            <StarIcon sx={{width:30, height:28}}/>
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={opener}
                                            onClose={handleClose}
                                            MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <Rating
                                                readOnly
                                                name="simple-controlled"
                                                value={rate}
                                                onChange={handleRate}
                                            />
                                        </Menu>
                                    </>
                                    :
                                    <>
                                        <Button
                                            id="basic-button"
                                            aria-controls={opener ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={opener ? 'true' : undefined}
                                            onClick={handleClick}
                                            sx={{color:'inherit', mt:1, mb:1}}
                                        >
                                            <StarBorderIcon sx={{width:30, height:28}}/>
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={opener}
                                            onClose={handleClose}
                                            MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <Rating
                                                name="simple-controlled"
                                                value={rate}
                                                onChange={handleRate}
                                            />
                                        </Menu>
                                    </>
                                }
                                
                            </>
                            :<></>}
                        </Box>
                        <Box id='tagline' sx={{display:'flex', justifyContent:'start', width:'100%', pt:1}}>
                            <Typography variant='body1' sx={{opacity:0.7, fontStyle:'italic'}}>{tvshows.tagline}</Typography>
                        </Box>
                        <Box id='overviewNCreators' sx={{display:'flex', justifyContent:'start', width:'100%', pt:1, flexDirection:'column'}}>
                            <Typography variant='h6'><strong>Overview</strong></Typography>
                            <Typography variant='body2' sx={{pt:1}}>{tvshows.overview}</Typography>
                            <Typography variant='subtitle1' sx={{pt:2}}>{tvshows.created_by?.length>1?'Creators':'Creator'}:  {tvshows.created_by?.map((item, i)=>i===tvshows.created_by.length-1?`${item.name}`:`${item.name}, `)}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider variant="inset" sx={{width:'90%'}}/>
            <Box sx={{display:'flex', width:'100%', justifyContent:'center'}}>
                <Box sx={{mr:10, ml:10, width:'100%', height:500, display:'flex', justifyContent:'center'}}>
                    <Slider items={tvshows.aggregate_credits?.cast} type='person'/>
                </Box>
            </Box>
        </>
    )
}

export default SingTv