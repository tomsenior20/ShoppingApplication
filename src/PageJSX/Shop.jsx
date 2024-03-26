import React from 'react';
import Nav from 'src/Components/Nav';
import { Typography } from '@mui/material';
import 'src/Styling/Pages/Shop.css'

export default function Shop() {
    return(
        <div>
            <Nav/>
            <div className='welcomeShopContainer d-flex flex-column justify-content-around px-3 py-2'>
                <Typography variant="h3" className='welcomeHeader p-4 my-4 text-center'>Welcome To The Shop</Typography>
                <Typography paragraph className='welcomeSubHeader my-3 mx-5 py-4 px-4'>
                    Add Items to basket below, which can be viewed by the basket page. Each item will be able to add it to a basket, for checking out purposes. 
                    So Why not start shopping?
                </Typography>
            </div>
        </div>
    )
}