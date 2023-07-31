import React, { useEffect, useState } from 'react';
import { CoinList } from '../config/api';
import axios from 'axios';
import { CryptoState } from '../CryptoContext';
import { Container, ThemeProvider, createTheme, Typography, TextField, Table,
    TableContainer, LinearProgress, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
    import useStyles from './Styles/Home.js';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Banner/Carousel' 
import { Pagination } from '@material-ui/lab';

const CoinsTable = () => {

    const classes = useStyles();
    const navigate = useNavigate();
    const [coins, setCoins] = useState([]);
    const [loading, setLoadiing] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const {currency, symbol} = CryptoState();
    
    const fetchCoins = async() =>{
        setLoadiing(true);
        try{
            const {data} = await axios.get(CoinList(currency));
            setCoins(data);
        }
        catch(error){
            alert("Network error occured. Please try again later.")
        }

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
    
    const handleSearch = () => {
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign: 'center'}}>
        
        <Typography variant="h4" style={{ margin: 18, fontFamily: "Montserrat" }}>
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField label="Search for a Crypto Currency" variant='outlined' 
            style={{marginBottom: 20, width: '100%'}} onChange={(e)=>setSearch(e.target.value)}/>

        <TableContainer>
            {
                loading ? (
                    <LinearProgress style={{backgroundColor: 'gold'}} />
                ) : (
                    <Table>
                        <TableHead style={{backgroundColor: '#EEBC1D'}} >
                            <TableRow>
                                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (

                                    <TableCell style={{color: "black", fontWeight: "700",
                                        fontFamily: "Montserrat",}}
                                        key={head} align={head === "Coin" ? "" : "right"} >
                                        {head}
                                    </TableCell>

                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {handleSearch().slice((page-1)*10, (page-1)*10+10).map((row)=>{
                                const profit = row.price_change_percentage_24h > 0;

                                return (

                                    // Each table row content
                                    <TableRow onClick={()=>navigate(`/coins/${row.id}`)}
                                        className={classes.row} key={row.name}>

                                            {/* Cell for coin  */}
                                            <TableCell component='th' scope='row' 
                                                style={{display: 'flex', gap: 15}}>

                                                <img src={row?.image} alt={row.name} height='50'
                                                    style={{marginBottom: 10}} />

                                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                                    
                                                    <span style={{textTransform: 'uppercase', fontSize: '22'}}>
                                                        {row.symbol}
                                                    </span>

                                                    <span style={{color: 'darkgray'}}>{row.name}</span>
                                                </div>
                                            </TableCell>

                                            {/* Cell for price  */}
                                            <TableCell align='right'>
                                                {symbol}{" "}
                                                {numberWithCommas(row.current_price.toFixed(2))}
                                            </TableCell>

                                            {/* Cell for 24h change */}
                                            <TableCell align='right' style={{fontWeight: 5000, 
                                                color: profit > 0 ? 'rgb(14,203,129)' : 'red'}}>
                                                    
                                                    {profit && '+'} {row.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell>
                                            
                                            {/* Cell for market cap  */}
                                            <TableCell align='right'>
                                                {symbol}{" "}
                                                {numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                                            </TableCell>

                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                )
            }
        </TableContainer>

        <Pagination style={{padding: 20, width: '100%', display: 'flex', justifyContent: 'center'}} 
            classes={{ul: classes.pagination}}  count={(handleSearch()?.length/10).toFixed(0)} 
            onChange={(_, value)=>{ 
                setPage(value);
                window.scroll(0,450);
                }}/>

        </Container>
      
    </ThemeProvider>
  )
}

export default CoinsTable;
