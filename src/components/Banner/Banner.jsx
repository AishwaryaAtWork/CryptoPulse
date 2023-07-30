import React from 'react';
import useStyles from '../Styles/Banner.js';
import { Container, Typography } from '@material-ui/core';
import Carousel from './Carousel.jsx';


const Banner = () => {

  const classes = useStyles();
  
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          
          <Typography variant='h2' style={{fontWeight: 'bold', marginBottom: 15, fontFamily: 'Montserrat'}}>
            CryptoPulse
          </Typography>
          
          <Typography variant="subtitle2"
            style={{ color: "darkgrey", textTransform: "capitalize", fontFamily: "Montserrat",}}>
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
          
        </div>

        <Carousel />
      </Container>
    </div>
  )
}

export default Banner;
