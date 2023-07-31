import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../config/api';
import axios from 'axios';
import { CircularProgress, ThemeProvider, createTheme } from '@material-ui/core';
import useStyles from './Styles/CoinPage';
import { Line } from 'react-chartjs-2';
import { chartDays } from '../config/data';
import SelectButton from './SelectButton'; 
import { enUS } from 'date-fns/locale'; 
import 'chartjs-adapter-date-fns'; 
// import { Chart } from 'react-chartjs-2';
// import Chart from 'chart.js/auto'
// import {LineController}
import {
  Chart as ChartJS,
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale,TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const CoinInfo = ({coin}) => {

  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const {currency} = CryptoState();
  const [flag, setFlag] =useState(false);

  const fetchHistoricData = async()=>{
    try{
      const {data} = await axios.get(HistoricalChart(coin.id, days, currency));
      setFlag(true);
      setHistoricData(data.prices);
    }
    catch(error){
      <CircularProgress style={{color: 'gold'}} size={250} thickness={1}/>
    }
  }

  useEffect(()=>{
    fetchHistoricData();
    // eslint-disable-next-line 
  },[currency, days]);

  const classes = useStyles();

  const darkTheme = createTheme({
    palette:{
      primary:{
        main: '#fff',
      },
      type: 'dark',
    }
  });

  const chartData = {
    data: {
      labels: historicData?.map((coin)=>{

        let date = new Date(coin[0]);
        let time = date.getHours() > 12
              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              : `${date.getHours()}:${date.getMinutes()} AM`;

            return days === 1 ? time : date.toLocaleString('en-US');
      }),
      datasets: [
        {
          data: historicData?.map((coin) => (coin[1])),
          label: `Price ( Past ${days} Days ) in ${currency}`,
          borderColor: "#EEBC1D",
        },
      ],
    },
    options: {
      elements:{
        point:{
          radius: 1,
        }
      },
      scales:{
        x:{
          type: 'time',
          adapters: {
            date:{
              locale: enUS,
            },
          }
        }
      }
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.chartContainer}>

        {/* Chart  */}
        {
          !historicData || flag === false ? (
            <CircularProgress style={{color: 'gold'}} size={250} thickness={1}/>
          ) : (
            <>
            {/* Chart  */}
            <Line key={coin.id} data={chartData.data}
            options={chartData.options} />

             {/* Buttons  */}
             <div style={{display: 'flex', marginTop: 20, justifyContent: 'space-around', width: '100%'}}>
             
             {chartDays.map((day)=>(
                <SelectButton key={day.value} onClick={()=>{
                  setDays(day.value);
                  setFlag(false);
                }}
                  selected={day.value === days}>
                  {day.label}
                </SelectButton> 
             ))}
             </div>
            </>
          )
        }

      </div>
    </ThemeProvider>
  )
}

export default CoinInfo;
