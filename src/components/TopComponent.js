import { Typography, Box, Grid, Badge } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';

const TopComponent = () => {
    const [hideBackArrow, setHideBackArrow] = useState(true)

    useEffect(()=> {
        if(window.innerWidth < 600) {
            setHideBackArrow(false)
        }
    }, [])

    let itemsInCart = useSelector(state => state.foodDeliveryStore.cartItems.length)
    // console.log("🚀 ~ file: TopComponent.js ~ line 17 ~ TopComponent ~ itemsInCart", itemsInCart)

  return (
    <Box  sx={{ flexGrow: 1 }} pt={2}>
        <Grid container spacing={2}>
            <Grid item xs={6} sm={10} md={10} lg={10} sx={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                { !hideBackArrow && <ArrowBackIcon />}
                <Typography variant='body2' color="action">UNI Resto Cafe</Typography>
            </Grid>
            <Grid item xs={6} sm={2} md={2} lg={2}>
                    <Grid item sx={{display:"flex", flexDirection:"row", justifyContent:"flex-end", paddingRight:"5px"}}>
                        <Typography color="action" variant='body2'>My Orders</Typography>
                        <Badge badgeContent={itemsInCart} color="primary" invisible={itemsInCart === 0 ? true : false }>
                            <ShoppingCartIcon color="action"/>
                        </Badge>            
                    </Grid>
            </Grid>
      </Grid>
    </Box>
  )
}

export default TopComponent;