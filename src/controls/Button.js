import React from 'react'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector } from 'react-redux';

function AddToCartButton({handleClick, foodItems, foodId, handleMinusClick}) {
// console.log("🚀 ~ file: Button.js ~ line 7 ~ AddToCartButton ~ foodItems", foodItems)

    // const handleClick = () => {
    //     console.log("hello")
    // }
    let cartItems = useSelector(state => state.foodDeliveryStore.cartItems)

    let itemMatchFromStore = cartItems.filter(item => item.data.dish_id === foodId)
    console.log("🚀 ~ file: Button.js ~ line 16 ~ AddToCartButton ~ itemMatchFromStore", itemMatchFromStore)

    let CurrentItemCount = 0;

    if(itemMatchFromStore.length > 0){
        CurrentItemCount = itemMatchFromStore[0].count;
    }

  return (
    <>
        <Button sx={{borderRadius:"17px"}} color="success" variant="contained" size="small" startIcon={<RemoveIcon  onClick={()=> handleMinusClick(foodId)}/>} endIcon={<AddIcon onClick={()=> handleClick(foodItems)}/>}>
            {CurrentItemCount}
        </Button>
    </>
  )
}

export default AddToCartButton