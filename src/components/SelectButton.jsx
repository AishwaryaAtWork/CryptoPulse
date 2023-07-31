import React from 'react';
import useStyles from './Styles/CoinPage.js';

const SelectButton = ({children, selected, onClick}) => {

    const classes = useStyles(selected);

  return (
    <span className={classes.selectbutton} onClick={onClick}>
      {children}
    </span>
  )
}

export default SelectButton;
