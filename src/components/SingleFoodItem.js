import { Avatar, Box, Grid, Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddToCartButton from '../controls/Button';
import { addItemToCart, removeItemToCart } from '../features/foodDeliverySlice/foodDeliverSlice';


const SingleFoodItem = (props) => {
  const {foodItems} = props;
    // console.log("🚀 ~ file: SingleFoodItem.js ~ line 6 ~ SingleFoodItem ~ subItem", foodItems)

    const [count, setCount] = React.useState(0)

    const dispatch = useDispatch();

    const handleClick = (item) => {
      dispatch(addItemToCart(item))
  }

  // let storeData = useSelector(state => state.cartItems)
  let storeData = useSelector(state => state.foodDeliveryStore.cartItems)
  console.log("🚀 ~ file: SingleFoodItem.js ~ line 22 ~ SingleFoodItem ~ storeData", storeData)



  const handleMinusClick = (elem) => {
    const itemToBeHandled = storeData.filter(item => item.data.dish_id === elem.dish_id)
    let finalData;

    if(itemToBeHandled.length > 0 && itemToBeHandled[0].count > 1) {

    let manipulatedData = itemToBeHandled.map((item) => {
        return {data: item.data, count: item.count - 1}
    })

    finalData = storeData.map(item => {
        if(item.data.dish_id === elem.dish_id){
          return manipulatedData[0];
        } else {
          return item;
        }
      })

    } else if(itemToBeHandled.length > 0 && itemToBeHandled[0].count === 1) {
        finalData = storeData.filter(item => item.data.dish_id !== elem.dish_id)
    }

if(itemToBeHandled.length === 0){
  console.log("hello")
} else {
  dispatch(removeItemToCart(finalData))
}
}

if(foodItems){

  return (
    <Grid className="mango" container>
        <Grid item md={0.5} xs={1}>
            {/* <img className='food-type-icon' src="https://img.icons8.com/fluency/48/000000/non-vegetarian-food-symbol.png"/> */}
            {
            foodItems?.dish_Type === 1 ?
              <img alt="Remy Sharp"  className='food-type-icon' src="https://img.icons8.com/fluency/48/000000/non-vegetarian-food-symbol.png" />
              :
              <img alt="Remy Sharp" className='food-type-icon' src="https://img.icons8.com/color/48/000000/vegetarian-food-symbol.png" />
            }

        </Grid>
        <Grid item md={10} xs={9} lg={10}>
            <Grid container sx={{display: 'flex', justifyContent:"space-between"}}>
                <Grid item xs={9}>
                    <Typography>{foodItems?.dish_name}</Typography>
                    <Box component="div" sx={{display:"flex", gap: 1}}>
                      <Typography variant="subtitle2" >{foodItems?.dish_currency}</Typography>
                      <Typography variant="subtitle2" >{foodItems?.dish_price}</Typography>
                    </Box>
                    <Box component="div" gutterBottom={true}>
                      <Typography variant="caption" color="gray" gutterBottom={true} sx={{lineHeight: 0.5}}>{foodItems?.dish_description}</Typography>
                    </Box>
                    {
                    foodItems?.dish_Availability ? 
                      <Box component="div" gutterBottom={true}>
                      <AddToCartButton handleClick={handleClick} foodItems={foodItems} foodId={foodItems.dish_id} handleMinusClick={handleMinusClick}/>
                    </Box>
                    :
                    <Typography variant="caption" color="red" gutterBottom={true} sx={{lineHeight: 0.5}}>Not available</Typography>
                    }
                    {
                      foodItems?.addonCat.length > 0 &&
                      <Box component="div" gutterBottom={true}>
                        <Typography variant="caption" color="red" gutterBottom={true} sx={{lineHeight: 0.5}}>customizations available</Typography>
                      </Box>
                    }

                </Grid>
              
                <Grid item xs={3} md={2} lg={2} sx={{alignSelf: "center"}}>
                    <Typography variant="subtitle2" noWrap={true} alignCenter>
                        {foodItems?.dish_calories} calories
                    </Typography>
                </Grid>
            </Grid>

        </Grid>

        <Grid item md={1.5} xs={2} sx={{display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
            <img alt="Remy Sharp" className='food-image' src={foodItems?.dish_image} />
        </Grid>
    </Grid>
    // <Box sx={{padding: "0px"}}>
    //     <Box sx={{padding: "0px"}}>e</Box>
    //     <Box sx={{padding: "0px"}}>3</Box>
    //     <Box sx={{padding: "0px"}}>3f</Box>

    // </Box>
  )} else {
    return null;
  }
}

export default SingleFoodItem;