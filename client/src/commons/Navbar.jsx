import * as React from 'react';
import {
  AppBar, 
  Box, 
  Toolbar, 
  IconButton, 
  Typography, 
  Menu,
  Container, 
  Avatar, 
  Button, 
  Tooltip, 
  MenuItem, 
  InputBase
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import {Menu as MenuIcon, Search as SearchIcon} from '@mui/icons-material';
import useMatches from '../hooks/useMatches';
import { useState } from 'react';
import logo from '../assets/tmdb.svg'

const pagesDesktop = [{name:'Movies', url:'movies'}, {name:'TV Shows', url:'tv'}, {name:'People', url:'people'}];
const pagesMobile = [{name:'Search', url:'search'}, {name:'Movies', url:'movies'}, {name:'TV Shows', url:'tv'}, {name:'People', url:'people'}];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const ResponsiveAppBar = () => {

  const matches = useMatches();
  const navigate = useNavigate()
  // eslint-disable-next-line
  const [founder, setFounder] = useState('')

  const handleSubmit = () => {
    navigate(`/search/${founder}`)
  }
  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let search
  let TMDBStyle
  let account
  
  if(''){
    account = <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                    
                  {settings.map((setting) => {
                  return(
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  )})}
                </Menu>
              </>
  }else{
    account = <>
                <Button color='inherit' onClick={()=>{navigate('/login')}}>
                  <Typography
                    variant="h6"
                    noWrap
                    sx={{
                      display: { xs: 'flex', md: 'flex' },
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.1rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    LOGIN
                  </Typography>
                </Button>
              </>
  }

  if(matches){
    TMDBStyle = {textDecoration:'none', color:'inherit'}
    search =  <>
                <Search>
                  <Button sx={{color:'inherit', height:'39px', width:'50px'}} onClick={handleSubmit}>
                    <SearchIconWrapper>
                      <SearchIcon/>
                    </SearchIconWrapper>
                  </Button>
                  <StyledInputBase
                    onChange={(e)=>{
                      setFounder(e.target.value)
                    }}
                    sx={{float:'left'}}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
              </>
  }else{
    TMDBStyle = {textDecoration:'none', color:'inherit', width:'50%'}
    search =  <>
                
              </>
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar >
          <Link to='/' style={{textDecoration:'none', color:'inherit'}}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <img src={logo} alt="" />
              TMDBlogo
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pagesMobile.map((page) => (
                <Link to={page.url} style={{textDecoration:'none', color:'inherit'}} key={page.name}>
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
            <Link to='/' style={TMDBStyle}>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <img src={logo} alt="" />
                TMDBlogo
              </Typography>
            </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pagesDesktop.map((page) => (
              <Link to={page.url} style={{textDecoration:'none', color:'inherit'}} key={page.name}>
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
          {search}
          <Box sx={{ flexGrow: 0, ml:2 }}>
            {account}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
