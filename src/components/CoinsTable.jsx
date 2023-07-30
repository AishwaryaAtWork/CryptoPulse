import React, { useEffect, useState } from 'react';
import { CoinList } from '../config/api';
import axios from 'axios';
import { CryptoState } from '../CryptoContext';
import { Container, ThemeProvider, createTheme, Typography } from '@material-ui/core';

const CoinsTable = () => {

    const [coin, setCoin] = useState([]);
    const [loading, setLoadiing] = useState(false);

    const {currency, symbol} = CryptoState();
    
    const fetchCoins = async() =>{
        setLoadiing(true);

        const {data} = await axios.get(CoinList(currency));

        setCoin(data);
        setLoadiing(false);
    };

    useEffect(()=>{
        fetchCoins();
        // eslint-disable-next-line 
    },[currency]);

    const darkTheme = createTheme({
        palette:{
            primary:{
                main: '#fff',
            },
            type: 'dark',
        }
    });

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign: 'center'}}>
        
        <Typography variant="h4" style={{ margin: 18, fontFamily: "Montserrat" }}>
          Cryptocurrency Prices by Market Cap
        </Typography>

        </Container>
      
    </ThemeProvider>
  )
}

export default CoinsTable;
