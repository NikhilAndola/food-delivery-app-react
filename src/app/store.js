import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import foodDeliveryReducer from '../features/foodDeliverySlice/foodDeliverSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    foodDeliveryStore: foodDeliveryReducer,
  },
});
