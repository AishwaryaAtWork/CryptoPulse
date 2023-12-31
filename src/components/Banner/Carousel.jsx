import React, { useEffect, useState } from 'react';
import useStyles from '../Styles/Home.js';
import axios from 'axios';
import { CryptoState } from '../../CryptoContext.js';
import { TrendingCoins } from '../../config/api.js';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const Carousel = () => {

    const [ trending, setTrending] = useState([]);
    const classes = useStyles();
    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async()=>{
        try{
            const {data} = await axios.get(TrendingCoins(currency));
            setTrending(data);
        }
        catch(error){
            alert("Network error occured. Please try again later.");
        }
    };

    useEffect(()=>{
        fetchTrendingCoins();
        // eslint-disable-next-line 
    },[currency]);

    const items = trending.map((coin)=>{
        let profit = coin.price_change_percentage_24h >0;

        return (
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
                <img src={coin?.image} alt={coin.name} height='80' style={{marginBottom: 10}} />
                
                <span>{coin?.symbol}
                    &nbsp;
                    <span style={{color: profit> 0 ? 'rgb(14,203,129)' : 'red', fontWeight: 500}}>
                        {profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

    const responsive = {
        0:{
            items: 2,
        },
        512:{
            items: 4,
        },
    }

  return (
    <div className={classes.carousel}>
      <AliceCarousel mouseTracking infinite autoPlayInterval={1000} animationDuration={1500} 
        disableButtonsControls disableDotsControls responsive={responsive} autoPlay items={items}/>
    </div>
  )
}

export default Carousel;
