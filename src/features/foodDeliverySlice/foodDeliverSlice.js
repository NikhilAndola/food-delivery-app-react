import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFoodApi = createAsyncThunk(
    'foodApiData',
    async (dispatch, action) => {
      const response = await fetch("https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099");
      // The value we return becomes the `fulfilled` action payload
      let result = await response.json();
      return result;
    }
  );

  let initialState = {
    foodApiData: null,
    apiStatus: "",
    cartItems: []
  }

  // {
  //   data: null,
  //   count: 0,
  // }

const foodDeliverySlice = createSlice({
    initialState,
    name: "foodCart",
    reducers: {
        addItemToCart: (state, action) => {

          let dataMatchedWithPayload = state.cartItems.filter((item,i) => item.data.dish_name === action.payload.dish_name);

          if(dataMatchedWithPayload.length > 0) {
            // console.log("case 1")
            state.cartItems = state.cartItems.map(item => {
              if(item.data.dish_name === action.payload.dish_name) {
                  return {data: item.data, count: item.count + 1}
              } else {
                return item;
              }
            })
          } else {
            // console.log("case 2")
            state.cartItems = [...state.cartItems, {data:action.payload, count: 1}]
          }
        },
        removeItemToCart: (state, {payload}) => {
            console.log(payload)

          let dataMatchedWithPayload = state.cartItems.filter((item,i) => item.data.dish_id === payload);


          if(dataMatchedWithPayload.length > 0){
              state.cartItems = state.cartItems.map(item => {
                if(item.data.dish_id === payload){
                  return {data: item.data, count: item.count - 1}
                } else {
                  console.log("***************", test)
                  return item;
                }
              })
            } else {
              // state.cartItems = 
               state.cartItems.filter((item,i) => item.data.dish_id !== payload);
            }
        }
    },
    extraReducers: {
        [fetchFoodApi.pending] : (state) => {
          state.apiStatus = "pending";
        },
        [fetchFoodApi.fulfilled] : (state, action) => {
          state.apiStatus = "fulfilled";
          state.foodApiData = action.payload;
        },
        [fetchFoodApi.rejected] : (state) => {
          state.apiStatus = "rejected";
        },

    }

    // extraReducers: (builder) => {
    //   builder
    //     .addCase(incrementAsync.pending, (state) => {
    //       state.status = 'loading';
    //     })
    //     .addCase(incrementAsync.fulfilled, (state, action) => {
    //       state.status = 'idle';
    //       state.value += action.payload;
    //     });
    // },
    
})

export const { addItemToCart, removeItemToCart } = foodDeliverySlice.actions;
export default foodDeliverySlice.reducer;