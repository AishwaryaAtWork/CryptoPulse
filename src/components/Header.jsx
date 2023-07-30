import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme } from '@material-ui/core';
import React from 'react';
import useStyles from './Styles/HeaderStyles';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const Header = () => {

  const classes = useStyles();

  const nevigate = useNavigate();

  const { currency, setCurrency } = CryptoState();
  
  const darkTheme = createTheme({
    palette:{
      primary:{
        main: '#fff',
      },
      type: 'dark'
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <Typography className={classes.title}
            variant='h6'
            onClick ={()=> nevigate('/')}
              >CryptoPulse</Typography>

          <Select variant='outlined' className={classes.Select}
            value={currency} onChange={(e) => setCurrency(e.target.value)}>
            
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'INR'}>INR</MenuItem>
          
          </Select>

        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header;
