import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    boxShadow:'0 2px 8px rgba(0,0,0,0.1)',
  borderRadius:'10px',
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = useState('');
  const [search, setSearch] = useState('');
  const params = useLocation()
  const navigate = useNavigate();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChangeSelect = (event) => {
    setSearch(event.target.value);
  };

  useEffect(()=>{
    if(params.search.substring(7) === 'popular') setSearch('popular')
    if(params.search.substring(7) === 'nowPlaying') setSearch('nowPlaying')
    if(params.search.substring(7) === 'upcoming') setSearch('upcoming')
    if(params.search.substring(7) === 'topRated') setSearch('topRated')
    if(params.search.substring(7) === 'airingToday') setSearch('airingToday')
    if(params.search.substring(7) === 'ontv') setSearch('ontv')
  },[params.search])

  useEffect(()=>{
    if(params.pathname === '/movies'){
      navigate(`/movies?query=${search}`)
    }
    else{
      navigate(`/tv?query=${search}`)
    }
  },[search])

  console.log(params)

  return (
    <div style={{width:'100%'}}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography>Sort</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{mb:1}}>Sort Result By</Typography>
                {params.pathname === '/movies'?
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-customized-select-label"
                        value={search}
                        onChange={handleChangeSelect}
                      >
                        <MenuItem value={'popular'}>Popular</MenuItem>
                        <MenuItem value={'nowPlaying'}>Now Playing</MenuItem>
                        <MenuItem value={'upcoming'}>Upcoming</MenuItem>
                        <MenuItem value={'topRated'}>Top Rated</MenuItem>
                      </Select>
                    </FormControl>                    
                  :
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-customized-select-label"
                        value={search}
                        onChange={handleChangeSelect}
                      >
                        <MenuItem value={'popular'}>Popular</MenuItem>
                        <MenuItem value={'airingToday'}>Airing Today</MenuItem>
                        <MenuItem value={'ontv'}>On TV</MenuItem>
                        <MenuItem value={'topRated'}>Top Rated</MenuItem>
                      </Select>
                    </FormControl>
                }
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
