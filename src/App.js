import React, { useEffect } from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoodApi, addItemToCart } from './features/foodDeliverySlice/foodDeliverSlice';
import ScrollableItems from './components/ScrollableItems';
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme';
import TopComponent from './components/TopComponent';

function App() {

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchFoodApi())
    // dispatch(addItemToCart({data: "hello"}))
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <TopComponent />
      <ScrollableItems />
    </ThemeProvider>

  );
}

export default App;
