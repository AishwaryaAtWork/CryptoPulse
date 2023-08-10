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
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [days, setDays] = useState(1);
  const {currency} = CryptoState();
  const [flag, setFlag] =useState(false);

  const fetchHistoricData = async()=>{
    try{
      const {data} = await axios.get(HistoricalChart(coin.id, days, currency));
      setFlag(true);
      setHistoricData(Object.values(data.prices));
    }
    catch(error){
      <CircularProgress style={{color: 'gold'}} size={250} thickness={1}/>
    }
  }
  historicData?.map((coin)=> console.log(coin))
  console.log(typeof(historicData))

  useEffect(()=>{
    fetchHistoricData();
    // eslint-disable-next-line 
  },[currency, days]);

  useEffect(() => {
    if (historicData) {
      const newLabels = historicData.map((coin) => {
        let date = new Date(coin[0]);
        let time = date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
  
        return days === 1 ? time : date.toLocaleString('en-US');
      });
  
      const newDataset = {
        data: historicData.map((coin) => coin[1]),
        label: `Price ( Past ${days} Days ) in ${currency}`,
        borderColor: "#EEBC1D",
      };
  
      setChartData({
        labels: newLabels,
        datasets: [newDataset], 
      });
    }
  }, [historicData, days, currency]);

  const classes = useStyles();

  const darkTheme = createTheme({
    palette:{
      primary:{
        main: '#fff',
      },
      type: 'dark',
    }
  });

  const ChartData = {
    data: {
      labels: chartData.labels,
      datasets: chartData.datasets
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
            <Line key={coin.id} data={ChartData.data}
            options={ChartData.options} />

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
